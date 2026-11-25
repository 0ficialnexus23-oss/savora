/**
 * SAVORA - Gastronomía de Autor & Alta Cocina
 * Controlador de Aplicación Móvil
 */

(function () {
  'use strict';

  // ==========================================================================
  // ESTADO GLOBAL DE LA APLICACIÓN
  // ==========================================================================
  const State = {
    cart: [],
    favorites: new Set(),
    activeTab: 'home',
    currentCategory: 'all',
    searchQuery: '',
    selectedProductForModal: null,
    modalQuantity: 1,
    modalSelectedExtras: new Set(),
    modalNotes: '',
    checkoutOrderType: 'delivery', // 'delivery' o 'pickup'
  };

  // Claves de almacenamiento local
  const STORAGE_KEYS = {
    CART: 'savora_cart_v1',
    FAVORITES: 'savora_favorites_v1'
  };

  // ==========================================================================
  // INICIALIZACIÓN
  // ==========================================================================
  function initApp() {
    loadStoredData();
    renderPromotions();
    renderCategories();
    renderProducts();
    renderStoryAndStats();
    renderReviews();
    renderContactInfo();
    renderFaqs();
    setupEventListeners();
    updateCartUI();
    updateFavBadges();
  }

  // Cargar favoritos y carrito persistidos
  function loadStoredData() {
    try {
      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavs) {
        const parsed = JSON.parse(storedFavs);
        State.favorites = new Set(parsed);
      }
    } catch (e) {
      console.warn('Error leyendo favoritos de localStorage:', e);
    }

    try {
      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) {
        State.cart = JSON.parse(storedCart);
      }
    } catch (e) {
      console.warn('Error leyendo carrito de localStorage:', e);
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(Array.from(State.favorites)));
    } catch (e) {
      console.warn('Error guardando favoritos:', e);
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(State.cart));
    } catch (e) {
      console.warn('Error guardando carrito:', e);
    }
  }

  // ==========================================================================
  // RENDERIZADO DE COMPONENTES
  // ==========================================================================

  // 1. Promociones destacadas en carrusel
  function renderPromotions() {
    const container = document.getElementById('promosCarousel');
    if (!container) return;

    container.innerHTML = RESTAURANT_DATA.promotions.map(promo => `
      <div class="promo-card" data-promo-id="${promo.id}">
        <div class="promo-card-bg">
          <img src="${promo.image}" alt="${promo.title}" loading="lazy" />
        </div>
        <div class="promo-card-overlay"></div>
        <div class="promo-card-content">
          <span class="promo-badge">${promo.badge}</span>
          <h4 class="promo-title">${promo.title}</h4>
          <p class="promo-desc">${promo.description}</p>
          <div class="promo-footer">
            <div class="promo-prices">
              <span class="promo-price-current">${RESTAURANT_DATA.info.currency}${promo.price.toLocaleString()}</span>
              <span class="promo-price-old">${RESTAURANT_DATA.info.currency}${promo.originalPrice.toLocaleString()}</span>
            </div>
            <button class="btn-promo-action" onclick="app.showPromoAlert('${promo.title}')">
              <span>Ver promo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 2. Barra de Categorías del Menú
  function renderCategories() {
    const container = document.getElementById('categoriesTabs');
    if (!container) return;

    container.innerHTML = RESTAURANT_DATA.categories.map(cat => `
      <button class="cat-tab-btn ${cat.id === State.currentCategory ? 'active' : ''}" 
              data-cat-id="${cat.id}">
        ${getCategoryIconSvg(cat.icon)}
        <span>${cat.name}</span>
      </button>
    `).join('');

    // Listener para tabs
    container.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        setCategory(catId);
      });
    });
  }

  function setCategory(catId) {
    State.currentCategory = catId;
    renderCategories();
    renderProducts();
  }

  // 3. Catálogo de Productos
  function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    let filtered = RESTAURANT_DATA.products;

    // Filtro por categoría
    if (State.currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === State.currentCategory);
    }

    // Filtro por búsqueda
    if (State.searchQuery.trim() !== '') {
      const q = State.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="fav-empty-card" style="padding: 40px 16px;">
          <div class="fav-empty-icon" style="background: rgba(203,162,88,0.1); color: var(--gold-primary);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h4 style="color: var(--text-cream-light); font-size: 1.1rem;">Sin resultados</h4>
          <p style="color: var(--text-dim); font-size: 0.8rem;">No encontramos platillos que coincidan con "${State.searchQuery}".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(product => {
      const isFav = State.favorites.has(product.id);
      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-card-media" onclick="app.openProductModal('${product.id}')">
            <img class="product-card-img" src="${product.image}" alt="${product.name}" loading="lazy" />
            ${product.badge ? `<span class="product-badge-tag">${product.badge}</span>` : ''}
            <button class="product-fav-btn ${isFav ? 'is-fav' : ''}" 
                    aria-label="Agregar a favoritos" 
                    onclick="event.stopPropagation(); app.toggleFavorite('${product.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>
          <div class="product-card-body" onclick="app.openProductModal('${product.id}')">
            <div class="product-meta-row">
              <div class="product-rating">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>${product.rating}</span>
              </div>
              <div class="product-prep-time">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${product.prepTime}</span>
              </div>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-card-footer">
              <div class="product-price-tag">
                <span class="price-label">Precio</span>
                <span class="price-amount">${RESTAURANT_DATA.info.currency}${product.price}</span>
              </div>
              <button class="btn-card-add" 
                      aria-label="Agregar al carrito"
                      onclick="event.stopPropagation(); app.quickAddToCart('${product.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Ordenar</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // 4. Vista de Favoritos
  function renderFavoritesView() {
    const container = document.getElementById('favsListContainer');
    if (!container) return;

    const favIds = Array.from(State.favorites);
    const favProducts = RESTAURANT_DATA.products.filter(p => favIds.includes(p.id));

    if (favProducts.length === 0) {
      container.innerHTML = `
        <div class="fav-empty-card">
          <div class="fav-empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-cream-light);">Tu colección está vacía</h3>
          <p style="font-size: 0.82rem; color: var(--text-dim); max-width: 250px;">Guarda tus platillos predilectos tocando el corazón para tenerlos siempre a mano.</p>
          <button class="btn-primary-gold" style="margin-top: 10px; width: 100%;" onclick="app.switchTab('menu')">
            Explorar Menú
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = favProducts.map(product => `
      <div class="cart-item-row" style="cursor: pointer;" onclick="app.openProductModal('${product.id}')">
        <img class="cart-item-img" src="${product.image}" alt="${product.name}" />
        <div class="cart-item-details">
          <div class="cart-item-header">
            <h4 class="cart-item-name">${product.name}</h4>
            <button class="btn-remove-item" onclick="event.stopPropagation(); app.toggleFavorite('${product.id}')" title="Quitar de favoritos">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#ff4757" stroke="#ff4757" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
          <p style="font-size: 0.74rem; color: var(--text-cream-muted); margin-top: 2px;">${product.description.slice(0, 60)}...</p>
          <div class="cart-item-bottom">
            <span class="cart-item-price">${RESTAURANT_DATA.info.currency}${product.price}</span>
            <button class="btn-card-add" style="padding: 6px 12px; font-size: 0.72rem;" onclick="event.stopPropagation(); app.quickAddToCart('${product.id}')">
              + Agregar
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 5. Historia y Estadísticas
  function renderStoryAndStats() {
    const statsContainer = document.getElementById('statsGrid');
    if (statsContainer) {
      statsContainer.innerHTML = RESTAURANT_DATA.story.stats.map(s => `
        <div class="stat-card-item">
          <div class="stat-number">${s.number}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('');
    }
  }

  // 6. Reseñas y Críticas
  function renderReviews() {
    const container = document.getElementById('reviewsCarousel');
    if (!container) return;

    container.innerHTML = RESTAURANT_DATA.reviews.map(rev => `
      <div class="review-card-item">
        <div class="review-stars">
          ${Array(rev.rating).fill(0).map(() => `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          `).join('')}
        </div>
        <p class="review-text">"${rev.comment}"</p>
        <div class="review-author-wrap">
          <img class="review-avatar" src="${rev.avatar}" alt="${rev.author}" loading="lazy" />
          <div class="review-author-info">
            <h5 class="review-author-name">${rev.author}</h5>
            <span class="review-author-role">${rev.role} • ${rev.date}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 7. Información de Contacto
  function renderContactInfo() {
    const phoneEl = document.getElementById('contactPhone');
    const waEl = document.getElementById('contactWhatsapp');
    const addressEl = document.getElementById('contactAddress');
    const hoursEl = document.getElementById('contactHours');

    if (phoneEl) phoneEl.textContent = RESTAURANT_DATA.info.phone;
    if (waEl) waEl.textContent = RESTAURANT_DATA.info.whatsapp;
    if (addressEl) addressEl.textContent = RESTAURANT_DATA.info.address;
    if (hoursEl) hoursEl.textContent = RESTAURANT_DATA.info.hours;
  }

  // 8. Acordeón de FAQs
  function renderFaqs() {
    const container = document.getElementById('faqsAccordion');
    if (!container) return;

    container.innerHTML = RESTAURANT_DATA.faqs.map((faq, idx) => `
      <div class="faq-item" id="faq-item-${idx}">
        <button class="faq-question-btn" onclick="app.toggleFaq(${idx})">
          <span>${faq.q}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-answer-panel">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // DETALLES DEL PRODUCTO (BOTTOM SHEET MODAL)
  // ==========================================================================
  function openProductModal(productId) {
    const product = RESTAURANT_DATA.products.find(p => p.id === productId);
    if (!product) return;

    State.selectedProductForModal = product;
    State.modalQuantity = 1;
    State.modalSelectedExtras = new Set();
    State.modalNotes = '';

    const modal = document.getElementById('productDetailModal');
    const imgEl = document.getElementById('sheetProductImg');
    const badgeEl = document.getElementById('sheetBadge');
    const titleEl = document.getElementById('sheetTitle');
    const descEl = document.getElementById('sheetDesc');
    const calEl = document.getElementById('sheetCalories');
    const timeEl = document.getElementById('sheetPrepTime');
    const extrasContainer = document.getElementById('sheetExtrasContainer');
    const notesInput = document.getElementById('sheetSpecialNotes');

    imgEl.src = product.image;
    imgEl.alt = product.name;
    badgeEl.textContent = product.badge || 'Exclusivo';
    titleEl.textContent = product.name;
    descEl.textContent = product.description;
    calEl.textContent = product.calories || '350 kcal';
    timeEl.textContent = product.prepTime || '15 min';
    if (notesInput) notesInput.value = '';

    // Renderizar extras
    if (product.extras && product.extras.length > 0) {
      extrasContainer.style.display = 'block';
      extrasContainer.innerHTML = `
        <div class="sheet-options-block">
          <div class="options-title-wrap">
            <span class="options-title">Personaliza tu platillo</span>
            <span class="options-hint">Opcional</span>
          </div>
          <div class="extra-options-list">
            ${product.extras.map(extra => `
              <label class="extra-item-label">
                <div class="extra-item-left">
                  <input type="checkbox" class="extra-checkbox" data-extra-id="${extra.id}" onchange="app.onExtraToggle('${extra.id}')" />
                  <span class="extra-name">${extra.name}</span>
                </div>
                <span class="extra-price">+${RESTAURANT_DATA.info.currency}${extra.price}</span>
              </label>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      extrasContainer.style.display = 'none';
      extrasContainer.innerHTML = '';
    }

    updateModalTotalButton();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    const modal = document.getElementById('productDetailModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function onExtraToggle(extraId) {
    if (State.modalSelectedExtras.has(extraId)) {
      State.modalSelectedExtras.delete(extraId);
    } else {
      State.modalSelectedExtras.add(extraId);
    }
    updateModalTotalButton();
  }

  function changeModalQty(delta) {
    const newQty = State.modalQuantity + delta;
    if (newQty >= 1 && newQty <= 15) {
      State.modalQuantity = newQty;
      const qtyValEl = document.getElementById('modalQtyVal');
      if (qtyValEl) qtyValEl.textContent = State.modalQuantity;
      updateModalTotalButton();
    }
  }

  function updateModalTotalButton() {
    const p = State.selectedProductForModal;
    if (!p) return;

    let singleItemPrice = p.price;
    if (p.extras) {
      p.extras.forEach(ext => {
        if (State.modalSelectedExtras.has(ext.id)) {
          singleItemPrice += ext.price;
        }
      });
    }

    const total = singleItemPrice * State.modalQuantity;
    const btn = document.getElementById('btnAddModalSubmit');
    if (btn) {
      btn.innerHTML = `
        <span>Agregar al pedido</span>
        <span>${RESTAURANT_DATA.info.currency}${total.toLocaleString()}</span>
      `;
    }
  }

  function submitProductModal() {
    const p = State.selectedProductForModal;
    if (!p) return;

    const notesInput = document.getElementById('sheetSpecialNotes');
    const notes = notesInput ? notesInput.value.trim() : '';

    const selectedExtrasList = [];
    if (p.extras) {
      p.extras.forEach(ext => {
        if (State.modalSelectedExtras.has(ext.id)) {
          selectedExtrasList.push({ id: ext.id, name: ext.name, price: ext.price });
        }
      });
    }

    // Agregar al carrito
    addToCart({
      productId: p.id,
      name: p.name,
      basePrice: p.price,
      quantity: State.modalQuantity,
      extras: selectedExtrasList,
      notes: notes,
      image: p.image
    });

    closeProductModal();
    showToast(`"${p.name}" agregado al carrito`);
  }

  // ==========================================================================
  // GESTIÓN DEL CARRITO (CART)
  // ==========================================================================
  function quickAddToCart(productId) {
    const product = RESTAURANT_DATA.products.find(p => p.id === productId);
    if (!product) return;

    addToCart({
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      quantity: 1,
      extras: [],
      notes: '',
      image: product.image
    });

    showToast(`"${product.name}" agregado al carrito`);
  }

  function addToCart(item) {
    // Calcular precio unitario con extras
    const extrasTotal = item.extras.reduce((acc, curr) => acc + curr.price, 0);
    const unitPrice = item.basePrice + extrasTotal;

    // Buscar si ya existe un item idéntico (mismo producto, mismos extras, mismas notas)
    const extrasKey = item.extras.map(e => e.id).sort().join(',');
    const existingIndex = State.cart.findIndex(ci => 
      ci.productId === item.productId &&
      ci.notes === item.notes &&
      ci.extras.map(e => e.id).sort().join(',') === extrasKey
    );

    if (existingIndex > -1) {
      State.cart[existingIndex].quantity += item.quantity;
    } else {
      State.cart.push({
        id: 'ci_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        productId: item.productId,
        name: item.name,
        basePrice: item.basePrice,
        unitPrice: unitPrice,
        quantity: item.quantity,
        extras: item.extras,
        notes: item.notes,
        image: item.image
      });
    }

    saveCart();
    updateCartUI();
  }

  function updateCartItemQty(cartItemId, delta) {
    const item = State.cart.find(i => i.id === cartItemId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeCartItem(cartItemId);
    } else {
      item.quantity = newQty;
      saveCart();
      updateCartUI();
    }
  }

  function removeCartItem(cartItemId) {
    State.cart = State.cart.filter(i => i.id !== cartItemId);
    saveCart();
    updateCartUI();
    showToast('Producto retirado del pedido');
  }

  function clearCart() {
    if (State.cart.length === 0) return;
    if (confirm('¿Deseas vaciar todos los productos del pedido?')) {
      State.cart = [];
      saveCart();
      updateCartUI();
      showToast('Carrito vaciado');
    }
  }

  function updateCartUI() {
    const totalCount = State.cart.reduce((acc, curr) => acc + curr.quantity, 0);

    // Badges en headers y nav
    const headerBadge = document.getElementById('headerCartBadge');
    const navBadge = document.getElementById('navCartBadge');
    const drawerCount = document.getElementById('cartDrawerCount');
    const floatingBar = document.getElementById('floatingOrderBar');
    const floatingBadge = document.getElementById('floatingCartBadge');
    const floatingTotal = document.getElementById('floatingCartTotal');

    if (headerBadge) {
      headerBadge.textContent = totalCount;
      headerBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    if (navBadge) {
      navBadge.textContent = totalCount;
      navBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    if (drawerCount) {
      drawerCount.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
    }

    if (floatingBar) {
      if (totalCount > 0) {
        floatingBar.classList.add('visible');
        if (floatingBadge) floatingBadge.textContent = totalCount;
        if (floatingTotal) {
          const subtotal = State.cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
          floatingTotal.textContent = `${RESTAURANT_DATA.info.currency}${subtotal.toLocaleString()}`;
        }
      } else {
        floatingBar.classList.remove('visible');
      }
    }

    renderCartItemsList();
  }

  function renderCartItemsList() {
    const container = document.getElementById('cartItemsList');
    const footer = document.getElementById('cartDrawerFooter');
    if (!container || !footer) return;

    if (State.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-icon-wrap">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h4 class="empty-cart-title">Tu carrito está vacío</h4>
          <p class="empty-cart-desc">Explora nuestros platillos de alta cocina y crea una orden a la altura de tu paladar.</p>
          <button class="btn-primary-gold" style="width: 100%; margin-top: 10px;" onclick="app.closeCart(); app.switchTab('menu');">
            Ver Carta Gastronómica
          </button>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'flex';

    // Lista de items
    container.innerHTML = State.cart.map(item => {
      const itemSubtotal = item.unitPrice * item.quantity;
      return `
        <div class="cart-item-row" data-cart-id="${item.id}">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
          <div class="cart-item-details">
            <div class="cart-item-header">
              <h4 class="cart-item-name">${item.name}</h4>
              <button class="btn-remove-item" onclick="app.removeCartItem('${item.id}')" title="Eliminar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
            ${item.extras && item.extras.length > 0 ? `
              <div class="cart-item-extras-list">
                ${item.extras.map(e => `+ ${e.name} (${RESTAURANT_DATA.info.currency}${e.price})`).join('<br/>')}
              </div>
            ` : ''}
            ${item.notes ? `<span class="cart-item-notes">Nota: ${item.notes}</span>` : ''}
            <div class="cart-item-bottom">
              <span class="cart-item-price">${RESTAURANT_DATA.info.currency}${itemSubtotal.toLocaleString()}</span>
              <div class="cart-item-stepper">
                <button onclick="app.updateCartItemQty('${item.id}', -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="app.updateCartItemQty('${item.id}', 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Cálculos de subtotal y total
    const subtotal = State.cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
    const deliveryFee = State.checkoutOrderType === 'delivery' ? RESTAURANT_DATA.info.deliveryFee : 0;
    const total = subtotal + deliveryFee;

    const subtotalEl = document.getElementById('cartSubtotalVal');
    const deliveryRow = document.getElementById('cartDeliveryRow');
    const deliveryFeeEl = document.getElementById('cartDeliveryFeeVal');
    const totalEl = document.getElementById('cartTotalVal');

    if (subtotalEl) subtotalEl.textContent = `${RESTAURANT_DATA.info.currency}${subtotal.toLocaleString()}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = `${RESTAURANT_DATA.info.currency}${deliveryFee.toLocaleString()}`;
    if (deliveryRow) deliveryRow.style.display = State.checkoutOrderType === 'delivery' ? 'flex' : 'none';
    if (totalEl) totalEl.textContent = `${RESTAURANT_DATA.info.currency}${total.toLocaleString()}`;
  }

  function openCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateCartUI();
  }

  function closeCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // CHECKOUT & WHATSAPP GENERATION
  // ==========================================================================
  function openCheckoutModal() {
    if (State.cart.length === 0) {
      showToast('Agrega platillos antes de finalizar tu orden');
      return;
    }

    closeCart();

    const checkoutModal = document.getElementById('checkoutModal');
    const summaryItems = document.getElementById('checkoutSummaryItems');
    const summaryTotal = document.getElementById('checkoutSummaryTotal');

    const subtotal = State.cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
    const deliveryFee = State.checkoutOrderType === 'delivery' ? RESTAURANT_DATA.info.deliveryFee : 0;
    const total = subtotal + deliveryFee;

    // Vista previa de items
    if (summaryItems) {
      summaryItems.innerHTML = State.cart.map(i => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
          <span>${i.quantity}x ${i.name}</span>
          <span>${RESTAURANT_DATA.info.currency}${(i.unitPrice * i.quantity).toLocaleString()}</span>
        </div>
      `).join('');
    }

    if (summaryTotal) {
      summaryTotal.textContent = `${RESTAURANT_DATA.info.currency}${total.toLocaleString()}`;
    }

    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setCheckoutOrderType(type) {
    State.checkoutOrderType = type;
    const btnPickup = document.getElementById('btnOrderPickup');
    const btnDelivery = document.getElementById('btnOrderDelivery');
    const addressField = document.getElementById('checkoutAddressGroup');

    if (type === 'delivery') {
      btnDelivery.classList.add('active');
      btnPickup.classList.remove('active');
      addressField.classList.remove('hidden');
    } else {
      btnPickup.classList.add('active');
      btnDelivery.classList.remove('active');
      addressField.classList.add('hidden');
    }

    // Actualizar total
    const subtotal = State.cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
    const deliveryFee = type === 'delivery' ? RESTAURANT_DATA.info.deliveryFee : 0;
    const total = subtotal + deliveryFee;

    const summaryTotal = document.getElementById('checkoutSummaryTotal');
    if (summaryTotal) {
      summaryTotal.textContent = `${RESTAURANT_DATA.info.currency}${total.toLocaleString()}`;
    }
  }

  function submitWhatsAppOrder() {
    const nameInput = document.getElementById('checkoutClientName');
    const phoneInput = document.getElementById('checkoutClientPhone');
    const addressInput = document.getElementById('checkoutClientAddress');
    const obsInput = document.getElementById('checkoutClientObs');

    const clientName = nameInput ? nameInput.value.trim() : '';
    const clientPhone = phoneInput ? phoneInput.value.trim() : '';
    const clientAddress = addressInput ? addressInput.value.trim() : '';
    const clientObs = obsInput ? obsInput.value.trim() : '';

    if (!clientName) {
      alert('Por favor ingresa tu nombre completo.');
      nameInput.focus();
      return;
    }

    if (!clientPhone) {
      alert('Por favor ingresa un número de teléfono de contacto.');
      phoneInput.focus();
      return;
    }

    if (State.checkoutOrderType === 'delivery' && !clientAddress) {
      alert('Por favor ingresa la dirección completa de entrega.');
      addressInput.focus();
      return;
    }

    // Calcular montos
    const subtotal = State.cart.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);
    const deliveryFee = State.checkoutOrderType === 'delivery' ? RESTAURANT_DATA.info.deliveryFee : 0;
    const total = subtotal + deliveryFee;
    const orderFolio = 'SAV-' + Math.floor(1000 + Math.random() * 9000);

    // Formatear mensaje para WhatsApp
    let msg = `🍷 *NUEVO PEDIDO - SAVORA GOURMET* 🍷\n`;
    msg += `_Folio: #${orderFolio}_\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📍 *Modalidad:* ${State.checkoutOrderType === 'delivery' ? '🛵 Entrega a Domicilio' : '🛍️ Para Recoger en Restaurante'}\n`;
    msg += `👤 *Cliente:* ${clientName}\n`;
    msg += `📱 *Teléfono:* ${clientPhone}\n`;
    if (State.checkoutOrderType === 'delivery') {
      msg += `🏠 *Dirección de Entrega:* ${clientAddress}\n`;
    }
    if (clientObs) {
      msg += `📝 *Observaciones Generales:* ${clientObs}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *DETALLE DEL PEDIDO:*\n\n`;

    State.cart.forEach((item, index) => {
      msg += `*${index + 1}. ${item.quantity}x ${item.name}* (${RESTAURANT_DATA.info.currency}${(item.unitPrice * item.quantity).toLocaleString()})\n`;
      if (item.extras && item.extras.length > 0) {
        item.extras.forEach(ext => {
          msg += `   └ + ${ext.name} (${RESTAURANT_DATA.info.currency}${ext.price})\n`;
        });
      }
      if (item.notes) {
        msg += `   └ 📌 _Nota: ${item.notes}_\n`;
      }
      msg += `\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Subtotal: ${RESTAURANT_DATA.info.currency}${subtotal.toLocaleString()}\n`;
    if (State.checkoutOrderType === 'delivery') {
      msg += `Envío Gourmet: ${RESTAURANT_DATA.info.currency}${deliveryFee.toLocaleString()}\n`;
    }
    msg += `*TOTAL A PAGAR:* ${RESTAURANT_DATA.info.currency}${total.toLocaleString()}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `✨ _Generado desde la aplicación móvil de SAVORA. Aguardo confirmación de la orden._`;

    // Codificar URL de WhatsApp
    const waUrl = `https://api.whatsapp.com/send?phone=${RESTAURANT_DATA.info.whatsappClean}&text=${encodeURIComponent(msg)}`;

    // Cerrar modal y limpiar carrito
    closeCheckoutModal();
    State.cart = [];
    saveCart();
    updateCartUI();

    showToast('¡Pedido formulado con éxito! Abriendo WhatsApp...');

    // Redirigir a WhatsApp
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  }

  // ==========================================================================
  // GESTIÓN DE FAVORITOS
  // ==========================================================================
  function toggleFavorite(productId) {
    if (State.favorites.has(productId)) {
      State.favorites.delete(productId);
      showToast('Eliminado de favoritos');
    } else {
      State.favorites.add(productId);
      showToast('¡Guardado en tus favoritos!');
    }

    saveFavorites();
    updateFavBadges();
    renderProducts();
    if (State.activeTab === 'favorites') {
      renderFavoritesView();
    }
  }

  function updateFavBadges() {
    const badge = document.getElementById('headerFavBadge');
    if (badge) {
      badge.textContent = State.favorites.size;
      badge.style.display = State.favorites.size > 0 ? 'flex' : 'none';
    }
  }

  // ==========================================================================
  // NAVEGACIÓN Y PESTAÑAS (TABS)
  // ==========================================================================
  function switchTab(tabId) {
    State.activeTab = tabId;

    // Cambiar clases de vistas
    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Cambiar estado en bottom nav
    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      if (btn.getAttribute('data-tab-target') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Casos especiales al cambiar
    if (tabId === 'favorites') {
      renderFavoritesView();
    } else if (tabId === 'menu') {
      // Enfocar suavemente arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll arriba en el contenedor móvil
    const wrapper = document.querySelector('.mobile-device-wrapper');
    if (wrapper) {
      wrapper.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ==========================================================================
  // FEEDBACK Y TOASTS
  // ==========================================================================
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  function showPromoAlert(promoTitle) {
    showToast(`Promoción seleccionada: "${promoTitle}"`);
    switchTab('menu');
  }

  function toggleFaq(idx) {
    const item = document.getElementById(`faq-item-${idx}`);
    if (item) {
      item.classList.toggle('open');
    }
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================
  function setupEventListeners() {
    // Buscador
    const searchInput = document.getElementById('menuSearchInput');
    const searchClear = document.getElementById('searchClearBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        State.searchQuery = e.target.value;
        if (searchClear) {
          searchClear.style.display = State.searchQuery ? 'flex' : 'none';
        }
        renderProducts();
      });
    }

    if (searchClear && searchInput) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        State.searchQuery = '';
        searchClear.style.display = 'none';
        renderProducts();
      });
    }

    // Modal notas
    const notesInput = document.getElementById('sheetSpecialNotes');
    if (notesInput) {
      notesInput.addEventListener('input', (e) => {
        State.modalNotes = e.target.value;
      });
    }
  }

  // Ayudante de íconos SVG para categorías
  function getCategoryIconSvg(iconName) {
    switch (iconName) {
      case 'sparkles':
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`;
      case 'utensils':
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M14 2v20"/><path d="M4 2v7a4 4 0 0 0 4 4v9"/></svg>`;
      case 'flame':
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
      case 'award':
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
      case 'circle-dot':
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>`;
      case 'glass-water':
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z"/><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"/></svg>`;
      case 'cake':
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><circle cx="12" cy="4" r="1"/></svg>`;
      default:
        return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
    }
  }

  // ==========================================================================
  // EXPOSICIÓN GLOBAL
  // ==========================================================================
  window.app = {
    init: initApp,
    switchTab: switchTab,
    openProductModal: openProductModal,
    closeProductModal: closeProductModal,
    onExtraToggle: onExtraToggle,
    changeModalQty: changeModalQty,
    submitProductModal: submitProductModal,
    quickAddToCart: quickAddToCart,
    updateCartItemQty: updateCartItemQty,
    removeCartItem: removeCartItem,
    clearCart: clearCart,
    openCart: openCart,
    closeCart: closeCart,
    openCheckoutModal: openCheckoutModal,
    closeCheckoutModal: closeCheckoutModal,
    setCheckoutOrderType: setCheckoutOrderType,
    submitWhatsAppOrder: submitWhatsAppOrder,
    toggleFavorite: toggleFavorite,
    showPromoAlert: showPromoAlert,
    toggleFaq: toggleFaq
  };

  // Autoiniciar al cargar DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
