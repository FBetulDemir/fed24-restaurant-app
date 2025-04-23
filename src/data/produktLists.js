const makiMenuList = [
  {
    id: crypto.randomUUID(),
    name: "Kryddig tonfiskrulle",
    price: 95,
    ingredients: [],
    category: "maki",
  },
  {
    id: crypto.randomUUID(),
    name: "Kaliforniarulle",
    ingredients: ["Krabba", "avokado", "gurka"],
    price: 85,
    category: "maki",
  },
  {
    id: crypto.randomUUID(),
    name: "Tempurarulle",
    ingredients: ["Räkor i tempura", "kryddig majonnäs"],
    price: 99,
    category: "maki",
  },
  {
    id: crypto.randomUUID(),
    name: "Avokadorulle",
    price: 75,
    ingredients: [],
    category: "maki",
  },
  {
    id: crypto.randomUUID(),
    name: "Gurkrulle",
    price: 70,
    ingredients: [],
    category: "maki",
  },
];
  
const nigiriMenuList = [
    {
      id: crypto.randomUUID(),
      name: "Lax Nigiri",
      price: 42,
      extra: 25
    },
    {
      id: crypto.randomUUID(),
      name: "Tonfisk Nigiri",
      price: 48,
      extra: 25
    },
    {
      id: crypto.randomUUID(),
      name: "Räka Nigiri",
      price: 38,
      extra: 25
    },
    {
      id: crypto.randomUUID(),
      name: "Ål Nigiri",
      price: 52,
      extra: 30
    }
];
  
const sashimiMenuList = [
    {
      id: crypto.randomUUID(),
      name: "Lax Sashimi",
      price: 98,
      extra: 25
    },
    {
      id: crypto.randomUUID(),
      name: "Tonfisk Sashimi",
      price: 110,
      extra: 25
    },
    {
      id: crypto.randomUUID(),
      name: "Hamachi Sashimi",
      price: 115,
      extra: 25
    },
    {
      id: crypto.randomUUID(),
      name: "Hälleflundra Sashimi",
      price: 105,
      extra: 25
    }
];
  
const drinksMenuList = [
    { id: crypto.randomUUID(), name: "Pepsi Max", volume: "0.33l", price: 20 },
    { id: crypto.randomUUID(), name: "Coca-Cola", volume: "0.33l", price: 20 },
    // { id: crypto.randomUUID(), name: "Fanta Orange", volume: "0.33l", price: 20 },
    { id: crypto.randomUUID(), name: "Sprite", volume: "0.33l", price: 20 },
    { id: crypto.randomUUID(), name: "Ramlösa Citrus", volume: "0.5l", price: 25 },
    { id: crypto.randomUUID(), name: "Loka Naturell", volume: "0.5l", price: 25 },
    { id: crypto.randomUUID(), name: "Apelsinjuice", volume: "0.25l", price: 30 },
    { id: crypto.randomUUID(), name: "Äppeljuice", volume: "0.25l", price: 30 },
    { id: crypto.randomUUID(), name: "Ramune Yuzu", volume: "0.2l", price: 35 },
    // { id: crypto.randomUUID(), name: "Ananasjuice", volume: "0.25l", price: 35 },
    // { id: crypto.randomUUID(), name: "San Pellegrino Limonata", volume: "0.33l", price: 28 },
    // { id: crypto.randomUUID(), name: "San Pellegrino Aranciata", volume: "0.33l", price: 28 },
    { id: crypto.randomUUID(), name: "Iskaffe", volume: "0.3l", price: 40 },
    { id: crypto.randomUUID(), name: "Japanskt grönt te", volume: "0.5l", price: 30 },
    { id: crypto.randomUUID(), name: "Kombucha Original", volume: "0.33l", price: 45 }
];
  
const sushiMenu = [
    {
      id: crypto.randomUUID(),
      name: "Maki Sushi",
      description: "Maki sushi består av en kombination av sushi-ris (klibbigt ris kryddat med risvinäger, socker och salt) och olika fyllningar. Den är ofta enkel men mångsidig, och fyllningarna kan variera beroende på smak och regionala preferenser. Maki är populär för sin kompakta form och balanserade smaker.",
      sides: "8 bitar serveras med sojasås, wasabi, inlagd ingefära och miso-soppa.",
      image: "/src/assets/maki_sushi.jpg"
    },
    {
      id: crypto.randomUUID(),
      name: "Nigiri Sushi",
      description: "Nigiri sushi är en elegant och traditionell form av sushi, bestående av en skiva färsk rå eller lätt behandlad fisk eller skaldjur, som lax, tonfisk eller räka, placerad ovanpå en liten boll av kryddat sushi-ris. Den framhäver råvarornas naturliga smaker och texturer.",
      sides: "2 bitar serveras med sojasås, wasabi, inlagd ingefära och miso-soppa.",
      image: "/src/assets/nigiri_sushi.jpg"
    },
    {
      id: crypto.randomUUID(),
      name: "Sashimi",
      description: "Sashimi är tunna skivor av färsk rå fisk eller skaldjur, såsom lax, tonfisk eller hälleflundra, serverade utan ris. Det är en ren och minimalistisk rätt som fokuserar på råvarornas kvalitet och smak, ofta presenterad med vacker estetik.",
      sides: "5 bitar serveras med sojasås, wasabi, daikon och miso-soppa.",
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
  