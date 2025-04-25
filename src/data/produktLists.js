const makiMenuList = [
  {
    id: crypto.randomUUID(),
    name: "Kryddig tonfiskrulle",
    price: 95,
    ingredients: [],
    category: "maki",
    extraBitPrice: 15
  },
  {
    id: crypto.randomUUID(),
    name: "Kaliforniarulle",
    ingredients: ["Krabba", "avokado", "gurka"],
    price: 85,
    category: "maki",
    extraBitPrice: 12
  },
  {
    id: crypto.randomUUID(),
    name: "Tempurarulle",
    ingredients: ["Räkor i tempura", "kryddig majonnäs"],
    price: 99,
    category: "maki",
    extraBitPrice: 16
  },
  {
    id: crypto.randomUUID(),
    name: "Avokadorulle",
    price: 75,
    ingredients: [],
    category: "maki",
    extraBitPrice: 11
  },
  {
    id: crypto.randomUUID(),
    name: "Gurkrulle",
    price: 70,
    ingredients: [],
    category: "maki",
    extraBitPrice: 10
  },
];
  
const nigiriMenuList = [
    {
      id: crypto.randomUUID(),
      name: "Lax Nigiri",
      price: 42,
      ingredients: [],
      category: "nigiri",
    },
    {
      id: crypto.randomUUID(),
      name: "Tonfisk Nigiri",
      price: 48,
      ingredients: [],
      category: "nigiri",
    },
    {
      id: crypto.randomUUID(),
      name: "Räka Nigiri",
      price: 38,
      ingredients: [],
      category: "nigiri",
    },
    {
      id: crypto.randomUUID(),
      name: "Ål Nigiri",
      price: 52,
      ingredients: [],
      category: "nigiri",
    }
];
  
const sashimiMenuList = [
    {
      id: crypto.randomUUID(),
      name: "Lax Sashimi",
      price: 98,
      ingredients: [],
      category: "sashimi",
      extraBitPrice: 25
    },
    {
      id: crypto.randomUUID(),
      name: "Tonfisk Sashimi",
      price: 110,
      ingredients: [],
      category: "sashimi",
      extraBitPrice: 27
    },
    {
      id: crypto.randomUUID(),
      name: "Hamachi Sashimi",
      price: 115,
      ingredients: [],
      category: "sashimi",
      extraBitPrice: 28
    },
    {
      id: crypto.randomUUID(),
      name: "Hälleflundra Sashimi",
      price: 105,
      ingredients: [],
      category: "sashimi",
      extraBitPrice: 26
    }
];
  

const drinksMenuList = [
    {
      id: crypto.randomUUID(), 
      name: "Pepsi Max", 
      price: 20,
      ingredients: [],
      category: "drinks",
      volume: "0,33"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Coca-Cola", 
      price: 20,
      ingredients: [],
      category: "drinks", 
      volume: "0,33"
    },   
    { 
      id: crypto.randomUUID(), 
      name: "Sprite", 
      price: 20,
      ingredients: [],
      category: "drinks",
      volume: "0,33"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Ramlösa Citrus", 
      price: 25,
      ingredients: [],
      category: "drinks",
      volume: "0,5"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Loka Naturell", 
      price: 25,
      ingredients: [],
      category: "drinks", 
      volume: "0,5"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Apelsinjuice", 
      price: 30, 
      volume: "0,25"
    },
    { 
      id: crypto.randomUUID(),
      name: "Äppeljuice", 
      price: 30,
      ingredients: [],
      category: "drinks", 
      volume: "0,25"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Ramune Yuzu", 
      price: 35,
      ingredients: [],
      category: "drinks",
      volume: "0,2"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Iskaffe", 
      price: 40,
      ingredients: [],
      category: "drinks",
      volume: "0,3"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Japanskt grönt te", 
      price: 25,
      ingredients: [],
      category: "drinks",
      volume: "0,5"
    },
    { 
      id: crypto.randomUUID(), 
      name: "Kombucha Original", 
      price: 45,
      ingredients: [],
      category: "drinks",
      volume: "0,33"
    }
];
  
const sushiMenu = [
    {
      id: crypto.randomUUID(),
      name: "Maki Sushi",
      description: "Maki sushi består av en kombination av sushi-ris (klibbigt ris kryddat med risvinäger, socker och salt) och olika fyllningar. Den är ofta enkel men mångsidig, och fyllningarna kan variera beroende på smak och regionala preferenser. Maki är populär för sin kompakta form och balanserade smaker.",
      sides: "Serveras med sojasås, wasabi, inlagd ingefära och miso-soppa.",
      image: "/src/assets/maki_sushi.jpg"
    },
    {
      id: crypto.randomUUID(),
      name: "Nigiri Sushi",
      description: "Nigiri sushi är en elegant och traditionell form av sushi, bestående av en skiva färsk rå eller lätt behandlad fisk eller skaldjur, som lax, tonfisk eller räka, placerad ovanpå en liten boll av kryddat sushi-ris. Den framhäver råvarornas naturliga smaker och texturer.",
      sides: "Serveras med sojasås, wasabi, inlagd ingefära och miso-soppa.",
      image: "/src/assets/nigiri_sushi.jpg"
    },
    {
      id: crypto.randomUUID(),
      name: "Sashimi",
      description: "Sashimi är tunna skivor av färsk rå fisk eller skaldjur, såsom lax, tonfisk eller hälleflundra, serverade utan ris. Det är en ren och minimalistisk rätt som fokuserar på råvarornas kvalitet och smak, ofta presenterad med vacker estetik.",
      sides: "Serveras med sojasås, wasabi, daikon och miso-soppa.",
      image: "/src/assets/sashimi.jpg"
    },
    {
      id: crypto.randomUUID(),
      name: "Drycker",
      description: "Ett urval av uppfriskande drycker, inklusive japanskt grönt te, och alkoholfria alternativ som ramune. Perfekt för att komplettera din måltid med autentiska japanska smaker.",
      sides: "Serveras kylda eller varma beroende på dryck, med möjlighet till påfyllning för te.",
      image: "/src/assets/drinks.jpg"
    }
];
  
export {
    makiMenuList,
    nigiriMenuList,
    sashimiMenuList,
    drinksMenuList,
    sushiMenu
};
  