/**
 * SAVORA - Gastronomía de Autor & Alta Cocina
 * Base de datos del restaurante ficticio
 */

const RESTAURANT_DATA = {
  info: {
    name: "SAVORA",
    tagline: "Alta Cocina Contemporánea & Fuego de Autor",
    slogan: "Donde la técnica milenaria, el fuego vivo y la sofisticación culinaria despiertan tus sentidos.",
    phone: "+52 (55) 8432-9900",
    whatsapp: "+52 55 8432 9900",
    whatsappClean: "525584329900", // Para el enlace directo api.whatsapp.com
    address: "Av. Paseo de las Lomas 740, Nivel 12 (Terraza Gourmet), Ciudad de México",
    hours: "Mar - Dom: 13:00 - 01:30 hrs | Lun: Cerrado por descanso técnico",
    instagram: "@savorarestaurante",
    email: "reservas@savora-gourmet.com",
    deliveryFee: 65, // Costo de envío base en pesos o moneda seleccionada
    currency: "$"
  },

  promotions: [
    {
      id: "promo-1",
      badge: "Edición Limitada",
      title: "Menú Degustación 5 Tiempos",
      subtitle: "Para 2 personas",
      description: "Una travesía sensorial maridada por nuestro Sommelier con cortes premium y postre de autor.",
      originalPrice: 1890,
      price: 1450,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      tag: "Experiencia Estrella"
    },
    {
      id: "promo-2",
      badge: "Martes & Jueves",
      title: "Noche de Fuego & Wagyu",
      subtitle: "20% OFF en Cortes Seleccionados",
      description: "Disfruta de nuestros cortes Wagyu A5 certificados y Tomahawk añejado 45 días a las brasas.",
      originalPrice: 1250,
      price: 990,
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
      tag: "Cortes de Autor"
    },
    {
      id: "promo-3",
      badge: "Sunset Mixology",
      title: "Cocktail Hour & Tapas",
      subtitle: "2x1 en Coctelería de Autor",
      description: "De 17:00 a 20:00 hrs. Cócteles humeados con maderas nobles acompañados de bocados ibéricos.",
      originalPrice: 620,
      price: 450,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
      tag: "Mixología"
    }
  ],

  categories: [
    { id: "all", name: "Todos", icon: "sparkles" },
    { id: "entradas", name: "Entradas", icon: "utensils" },
    { id: "hamburguesas", name: "Hamburguesas", icon: "flame" },
    { id: "principales", name: "Platos Fuertes", icon: "award" },
    { id: "pizzas", name: "Pizzas de Autor", icon: "circle-dot" },
    { id: "bebidas", name: "Bebidas & Mixología", icon: "glass-water" },
    { id: "postres", name: "Postres", icon: "cake" }
  ],

  products: [
    // --- ENTRADAS ---
    {
      id: "ent-1",
      category: "entradas",
      name: "Carpaccio de Res & Trufa Negra",
      price: 360,
      badge: "Recomendación del Chef",
      description: "Finas láminas de lomo angus madurado, lascas de trufa negra fresca, parmesano reggiano 24 meses, alcaparras crocantes y emulsión de dijon.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      calories: "320 kcal",
      prepTime: "12-15 min",
      extras: [
        { id: "trufa_extra", name: "Láminas extra de trufa negra", price: 95 },
        { id: "parmesano", name: "Queso Parmigiano Reggiano extra", price: 45 },
        { id: "pan_masa_madre", name: "Focaccia de masa madre a las brasas", price: 55 }
      ]
    },
    {
      id: "ent-2",
      category: "entradas",
      name: "Tártaro de Salmón & Maracuyá",
      price: 385,
      badge: "Fresco & Cítrico",
      description: "Salmón noruego cortado a cuchillo con aguacate cremoso, echalote confitado, gel de maracuyá, aceite de sésamo tostado y wonton crujiente.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      calories: "380 kcal",
      prepTime: "10-12 min",
      extras: [
        { id: "caviar", name: "Perlas de caviar negro (15g)", price: 140 },
        { id: "aguacate_extra", name: "Porción de aguacate hass extra", price: 40 }
      ]
    },
    {
      id: "ent-3",
      category: "entradas",
      name: "Pulpo Braseado al Carbón de Encino",
      price: 440,
      badge: "Fuego Vivo",
      description: "Tentáculo de pulpo del Pacífico laqueado con paprika ahumada sobre puré de camote rústico, alioli de ajo negro y chimichurri de hierbas silvestres.",
      image: "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=900&q=80",
      rating: 5.0,
      calories: "410 kcal",
      prepTime: "18-20 min",
      extras: [
        { id: "pure_camote", name: "Puré de camote extra", price: 50 },
        { id: "alioli_ajo_negro", name: "Dip adicional de alioli ahumado", price: 35 }
      ]
    },
    {
      id: "ent-4",
      category: "entradas",
      name: "Croquetas de Jamón Ibérico de Bellota",
      price: 290,
      badge: "Tradición Gourmet",
      description: "Cinco piezas de bechamel sedosa infusionada con hueso de jamón ibérico, trozos crujientes de bellota y velo de papada ibérica flameada.",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      calories: "450 kcal",
      prepTime: "10-14 min",
      extras: [
        { id: "extra_croqueta", name: "2 Croquetas adicionales", price: 90 },
        { id: "miel_trufa", name: "Toque de miel trufada", price: 30 }
      ]
    },

    // --- HAMBURGUESAS ---
    {
      id: "ham-1",
      category: "hamburguesas",
      name: "SAVORA Wagyu Imperial Gold",
      price: 495,
      badge: "Insignia de la Casa",
      description: "220g de carne Wagyu A5 a las brasas, queso Comté fundido, cebolla caramelizada al oporto, panceta curada crujiente, salsa de trufa negra y pan brioche artesanal dorado con mantequilla clarificada.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      rating: 5.0,
      calories: "780 kcal",
      prepTime: "15-18 min",
      extras: [
        { id: "papas_trufa", name: "Papas rústicas con aceite de trufa y parmesano", price: 85 },
        { id: "doble_wagyu", name: "Pattie adicional de Wagyu (200g)", price: 195 },
        { id: "foie_gras", name: "Escalope de Foie Gras a la plancha", price: 160 },
        { id: "tocino_glaseado", name: "Extra panceta gruesa glaseada en maple", price: 55 }
      ]
    },
    {
      id: "ham-2",
      category: "hamburguesas",
      name: "Smash Prime Black Angus & Cheddar",
      price: 360,
      badge: "Top Ventas",
      description: "Doble carne Black Angus aplastada con costra crujiente, triple queso cheddar madurado, pepinillos encurtidos en bourbon y salsa secreta Savora.",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      calories: "690 kcal",
      prepTime: "12-15 min",
      extras: [
        { id: "papas_francesas", name: "Papas corte fino crujientes con romero", price: 60 },
        { id: "triple_carne", name: "Tercer medallón smash Angus", price: 80 },
        { id: "salsa_savora", name: "Salsa secreta SAVORA extra", price: 25 }
      ]
    },
    {
      id: "ham-3",
      category: "hamburguesas",
      name: "Truffle Portobello & Queso de Cabra",
      price: 340,
      badge: "Opción Vegetariana",
      description: "Gran hongo portobello marinado en hierbas aromáticas y asado al sarmiento, medallón de queso de cabra tibio, rúcula fresca baby y mermelada de higos al balsámico.",
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80",
      rating: 4.7,
      calories: "510 kcal",
      prepTime: "14-16 min",
      extras: [
        { id: "papas_camote", name: "Chips de camote con sal marina y miel", price: 65 },
        { id: "queso_cabra_extra", name: "Medallón extra de queso de cabra", price: 60 }
      ]
    },

    // --- PLATOS FUERTES ---
    {
      id: "pri-1",
      category: "principales",
      name: "Ojo de Bife Tomahawk Madurado (600g)",
      price: 1180,
      badge: "Corte Maestro",
      description: "Corte premium con hueso madurado en seco por 45 días, asado a leña de nogal con mantequilla de romero y ajo confitado, servido con sal maldón escamada.",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
      rating: 5.0,
      calories: "920 kcal",
      prepTime: "25-30 min",
      extras: [
        { id: "salsa_pimienta", name: "Salsa demi-glace de tres pimientas y cognac", price: 50 },
        { id: "esparragos", name: "Espárragos verdes trigueros braseados", price: 85 },
        { id: "pure_trufa", name: "Puré de papas Robuchon con aroma a trufa", price: 90 }
      ]
    },
    {
      id: "pri-2",
      category: "principales",
      name: "Risotto de Hongos Silvestres & Foie",
      price: 490,
      badge: "Cremoso & Intenso",
      description: "Arroz Carnaroli mantecado con caldo de hongos Porcini, setas shiitake salteadas al vino blanco, escalope de foie gras sellado y lluvia de parmesano.",
      image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      calories: "620 kcal",
      prepTime: "20-22 min",
      extras: [
        { id: "foie_extra", name: "Escalope de Foie Gras extra", price: 160 },
        { id: "trufa_rallada", name: "Trufa fresca rallada en mesa", price: 110 }
      ]
    },
    {
      id: "pri-3",
      category: "principales",
      name: "Salmón Salvaje Glaseado en Miso & Cítricos",
      price: 520,
      badge: "Mar & Brasas",
      description: "Filete de salmón salvaje en costra de sésamo bicolor y glaseado de miso dulce con mirin, sobre cama de bok choy salteado y puré de edamame.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      calories: "540 kcal",
      prepTime: "18-20 min",
      extras: [
        { id: "arroz_jazmin", name: "Tazón de arroz jazmín al vapor", price: 45 },
        { id: "bok_choy", name: "Porción extra de vegetales al wok", price: 50 }
      ]
    },
    {
      id: "pri-4",
      category: "principales",
      name: "Costillar Short Rib Braseado 24 Horas",
      price: 680,
      badge: "Cocción Lenta",
      description: "Carne ultra tierna desprendiéndose del hueso, bañada en su propia reducción de vino tinto Nebbiolo, mousseline de zanahorias asadas y cebollas perla glaseadas.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      calories: "850 kcal",
      prepTime: "20-25 min",
      extras: [
        { id: "pure_zanahoria", name: "Mousseline extra de zanahoria asada", price: 55 },
        { id: "pan_brioche", name: "Pan brioche artesanal tostado (2 pzas)", price: 40 }
      ]
    },

    // --- PIZZAS ---
    {
      id: "piz-1",
      category: "pizzas",
      name: "Pizza Tartufata & Stracciatella",
      price: 430,
      badge: "Favorita de los Clientes",
      description: "Masa de fermentación lenta (72 horas) cocida a leña, base de crema de trufa negra, stracciatella fresca di búfala, mezcla de setas silvestres y aceite de oliva virgen extra infusionado.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
      rating: 5.0,
      calories: "680 kcal",
      prepTime: "15-18 min",
      extras: [
        { id: "prosciutto", name: "Láminas de Prosciutto di San Daniele", price: 85 },
        { id: "stracciatella_extra", name: "Porción extra de Stracciatella cremosa", price: 65 },
        { id: "borde_queso", name: "Borde relleno de ricotta ahumada", price: 60 }
      ]
    },
    {
      id: "piz-2",
      category: "pizzas",
      name: "Prosciutto di Parma, Higos & Miel",
      price: 410,
      badge: "Equilibrio Dulce & Salado",
      description: "Salsa de tomate San Marzano DOP, mozzarella fior di latte, jamón di Parma madurado 24 meses, higos frescos caramelizados, rúcula selvática y reducción de balsámico con miel de romero.",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      calories: "650 kcal",
      prepTime: "14-16 min",
      extras: [
        { id: "parmesano_lascas", name: "Lascas de Parmigiano Reggiano", price: 45 },
        { id: "chile_aceite", name: "Aceite picante artesanal de la casa", price: 20 }
      ]
    },
    {
      id: "piz-3",
      category: "pizzas",
      name: "Quattro Formaggi Ahumada & Nuez",
      price: 395,
      badge: "Intensa",
      description: "Combinación sublime de Gorgonzola piccante, Taleggio maduro, provolone ahumado artesanal, mozzarella di bufala y nueces de castaña tostadas con toque de orégano silvestre.",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
      rating: 4.7,
      calories: "720 kcal",
      prepTime: "15-17 min",
      extras: [
        { id: "miel_trufa_piz", name: "Hilo de miel con esencia de trufa", price: 35 },
        { id: "borde_queso_2", name: "Borde relleno de provolone", price: 60 }
      ]
    },

    // --- BEBIDAS ---
    {
      id: "beb-1",
      category: "bebidas",
      name: "Smoked Old Fashioned SAVORA",
      price: 245,
      badge: "Cóctel Insignia",
      description: "Bourbon premium añejado, bitter aromático de cacao tostado, jarabe de piloncillo artesanal y corteza de naranja, infusionado al instante con humo de roble americano en campana de cristal.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
      rating: 5.0,
      calories: "180 kcal",
      prepTime: "5-8 min",
      extras: [
        { id: "hielo_esfera", name: "Esfera de hielo cristalino con oro 24k comestible", price: 50 },
        { id: "doble_shot", name: "Shot adicional de Bourbon Reserva", price: 110 }
      ]
    },
    {
      id: "beb-2",
      category: "bebidas",
      name: "Gin Tonic Botánico de Lavanda & Romero",
      price: 220,
      badge: "Refrescante & Herbal",
      description: "Ginebra artesanal destilada con botánicos selectos, tónica mediterránea premium, ramita de romero carbonizada y bayas de enebro maceradas.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      calories: "160 kcal",
      prepTime: "4-6 min",
      extras: [
        { id: "extra_tonica", name: "Botella extra de tónica artesanal", price: 45 }
      ]
    },
    {
      id: "beb-3",
      category: "bebidas",
      name: "Mocktail Cítrico de Frutos Rojos & Yuzu",
      price: 155,
      badge: "Sin Alcohol",
      description: "Puré de frambuesas y zarzamoras frescas, infusión de té verde sencha, jugo de yuzu japonés y agua mineral de manantial gasificada con menta fresca.",
      image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      calories: "90 kcal",
      prepTime: "4-5 min",
      extras: [
        { id: "semillas_chia", name: "Toque de semillas de chía hidratadas", price: 20 }
      ]
    },
    {
      id: "beb-4",
      category: "bebidas",
      name: "Copa de Vino Tinto Gran Reserva (Ribera del Duero)",
      price: 290,
      badge: "Selección Sommelier",
      description: "Cosecha seleccionada con 18 meses en barrica de roble francés. Notas a frutos negros maduros, especias, tabaco y taninos aterciopelados.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
      rating: 5.0,
      calories: "130 kcal",
      prepTime: "3 min",
      extras: [
        { id: "botella_completa", name: "Cambiar por botella entera (750ml)", price: 950 }
      ]
    },

    // --- POSTRES ---
    {
      id: "pos-1",
      category: "postres",
      name: "Esfera de Chocolate Valrhona & Avellana",
      price: 260,
      badge: "Espectáculo en Mesa",
      description: "Esfera de chocolate amargo 70%, corazón de praliné de avellanas crujientes y helado de vainilla de Papantla. Se funde al momento con salsa de caramelo salado tibia.",
      image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=900&q=80",
      rating: 5.0,
      calories: "490 kcal",
      prepTime: "10-12 min",
      extras: [
        { id: "helado_extra", name: "Bola de helado artesanal de vainilla Bourbon", price: 55 },
        { id: "frambuesas_frescas", name: "Guarnición de frambuesas y moras frescas", price: 40 }
      ]
    },
    {
      id: "pos-2",
      category: "postres",
      name: "Milhojas Clásico con Crema Diplomática",
      price: 220,
      badge: "Pastelería Francesa",
      description: "Capas de hojaldre ultra crujiente caramelizado con azúcar glass, intercaladas con crema diplomática a la vainilla bourbon y compota de frutos rojos silvestres.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      rating: 4.8,
      calories: "410 kcal",
      prepTime: "8-10 min",
      extras: [
        { id: "salsa_frutos", name: "Salsa extra de frutos del bosque", price: 30 }
      ]
    },
    {
      id: "pos-3",
      category: "postres",
      name: "Tarta Tatin Tibia de Manzanas Asadas",
      price: 235,
      badge: "Caramelo & Fuego",
      description: "Manzanas caramelizadas al fuego lento durante horas con mantequilla de Bretaña y canela de Ceilán sobre pasta quebrada, acompañada de crema fresca espesa.",
      image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=900&q=80",
      rating: 4.9,
      calories: "430 kcal",
      prepTime: "10-12 min",
      extras: [
        { id: "helado_canela", name: "Bola de helado artesanal de canela y miel", price: 50 }
      ]
    }
  ],

  story: {
    title: "El Alma de SAVORA",
    subtitle: "Pasión por el origen, devoción por el fuego",
    p1: "Fundado bajo la premisa de devolver a la gastronomía su esencia más pura y emocionante, SAVORA nace de la fascinación por las brasas vivas, los ingredientes de origen noble y las técnicas culinarias de vanguardia.",
    p2: "Cada plato que sale de nuestra cocina abierta es un homenaje a los productores locales, a la maduración paciente de cortes selectos y al equilibrio armonioso entre texturas crujientes, aromas ahumados y salsas profundas.",
    chef: "Chef Ejecutivo Mateo Valenzuela",
    chefNote: "«Para nosotros la cocina no es sólo alimentar; es crear una memoria imborrable en cada bocado.»",
    stats: [
      { number: "100%", label: "Ingredientes Orgánicos & Certificados" },
      { number: "45+", label: "Días de Maduración en Cortes Dry-Aged" },
      { number: "72h", label: "Fermentación Natural de Nuestras Masas" },
      { number: "4.9★", label: "Calificación Promedio de Clientes" }
    ]
  },

  reviews: [
    {
      id: "rev-1",
      author: "Guillermo Morales",
      role: "Crítico Gastronómico & Sommelier",
      rating: 5,
      date: "Hace 3 días",
      comment: "La experiencia con la Hamburguesa Wagyu Gold y el Tomahawk superó cualquier expectativa. El ahumado a leña de nogal aporta una complejidad inigualable. Sin duda una de las propuestas más elegantes y pulidas del año.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "rev-2",
      author: "Valeria Santillán",
      role: "Comensal Habitual",
      rating: 5,
      date: "La semana pasada",
      comment: "El servicio para pedir a domicilio o recoger es impecable. Los platos llegan en un empaque térmico de lujo que mantiene la temperatura perfecta y el Carpaccio de Trufa estaba tan impecable como servido en el salón.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "rev-3",
      author: "Dr. Rodrigo Echeverría",
      role: "Aficionado a la Alta Cocina",
      rating: 5,
      date: "Hace 2 semanas",
      comment: "Pedí por WhatsApp mediante el sistema de la página web y fue una gozada: en menos de dos minutos confirmaron mi orden con todos los extras y notas especiales tal cual los seleccioné. El Risotto y la Esfera de Chocolate son imperdibles.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ],

  faqs: [
    {
      q: "¿Cómo funciona el pedido directo a WhatsApp?",
      a: "Al seleccionar tus platillos y extras en la aplicación web, el sistema consolida automáticamente un mensaje pulcro y organizado con cantidades, precios y detalles de entrega. Al presionar 'Enviar Pedido', se abrirá WhatsApp listo para que nuestro equipo confirme tu orden en tiempo real."
    },
    {
      q: "¿Tienen opciones para intolerancias o celíacos?",
      a: "Sí, varios de nuestros cortes, pescados y ensaladas son naturalmente libres de gluten. Además puedes especificar requerimientos en el campo de 'Notas especiales' de cada platillo."
    },
    {
      q: "¿Cuál es el tiempo promedio de entrega?",
      a: "Entre 35 y 50 minutos para entregas a domicilio, cuidando la temperatura exacta de cada preparación en contenedores térmicos ecológicos de alta gama."
    }
  ]
};
