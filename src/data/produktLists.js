const makiMenuList = [
  {
    id: crypto.randomUUID(),
    name: "Kryddig tonfiskrulle",
    price: 95,
    ingredients: [],
	baseQuantity: 8,
    category: "maki",
    extraBitPrice: 15,
    description: "Smakrik maki med kryddig tonfisk, perfekt balanserad med sushi-ris."
  },
  {
    id: crypto.randomUUID(),
    name: "Kaliforniarulle",
    ingredients: ["Krabba", "avokado", "gurka"],
	baseQuantity: 8,
    price: 85,
    category: "maki",
    extraBitPrice: 12,
    description: "Klassisk maki med krämig krabba, len avokado och krispig gurka."
  },
  {
    id: crypto.randomUUID(),
    name: "Tempurarulle",
    ingredients: ["Räkor i tempura", "kryddig majonnäs"],
	baseQuantity: 8,
    price: 99,
    category: "maki",
    extraBitPrice: 16,
    description: "Krispig tempuraräka i maki med en klick kryddig majonnäs."
  },
  {
    id: crypto.randomUUID(),
    name: "Avokadorulle",
    price: 75,
    ingredients: [],
	baseQuantity: 8,
    category: "maki",
    extraBitPrice: 11,
    description: "Enkel och fräsch maki med krämig avokado i varje tugga."
  },
  {
    id: crypto.randomUUID(),
    name: "Gurkrulle",
    price: 70,
    ingredients: [],
	baseQuantity: 8,
    category: "maki",
    extraBitPrice: 10,
    description: "Lätt och krispig maki med färsk gurka, perfekt som tillbehör."
  },
];

const nigiriMenuList = [
  {
    id: crypto.randomUUID(),
    name: "Lax Nigiri",
    price: 42,
    ingredients: [],
	baseQuantity: 2,
    category: "nigiri",
	extraBitPrice: 10,
    description: "Två bitar nigiri med färsk, smältande lax av högsta kvalitet."
  },
  {
    id: crypto.randomUUID(),
    name: "Tonfisk Nigiri",
    price: 48,
    ingredients: [],
	baseQuantity: 2,
    category: "nigiri",
	extraBitPrice: 10,
    description: "Två bitar nigiri med fyllig tonfisk, en smakrik delikatess."
  },
  {
    id: crypto.randomUUID(),
    name: "Räka Nigiri",
    price: 38,
    ingredients: [],
	baseQuantity: 2,
    category: "nigiri",
	extraBitPrice: 10,
    description: "Två bitar nigiri med färska räkor, söta och delikata."
  },
  {
    id: crypto.randomUUID(),
    name: "Ål Nigiri",
    price: 52,
    ingredients: [],
	baseQuantity: 2,
    category: "nigiri",
	extraBitPrice: 10,
    description: "Två bitar nigiri med smakrik ål, toppad med lätt söt sås."
  },
];

const sashimiMenuList = [
  {
    id: crypto.randomUUID(),
    name: "Lax Sashimi",
    price: 98,
    ingredients: [],
	baseQuantity: 5,
    category: "sashimi",
    extraBitPrice: 25,
    description: "Färska skivor lax, smältande mjuk med ren smak."
  },
  {
    id: crypto.randomUUID(),
    name: "Tonfisk Sashimi",
    price: 110,
    ingredients: [],
	baseQuantity: 5,
    category: "sashimi",
    extraBitPrice: 27,
    description: "Premium tonfisk i tunna skivor, fyllig och smakrik."
  },
  {
    id: crypto.randomUUID(),
    name: "Hamachi Sashimi",
    price: 115,
    ingredients: [],
	baseQuantity: 5,
    category: "sashimi",
    extraBitPrice: 28,
    description: "Delikat hamachi sashimi, len med en lätt nötig ton."
  },
  {
    id: crypto.randomUUID(),
    name: "Hälleflundra Sashimi",
    price: 105,
    ingredients: [],
	baseQuantity: 5,
    category: "sashimi",
    extraBitPrice: 26,
    description: "Färsk hälleflundra i skivor, mild och elegant i smaken."
  },
];

const drinksMenuList = [
  {
    id: crypto.randomUUID(),
    name: "Pepsi Max",
    price: 20,
    ingredients: [],
	baseQuantity: 1,
    category: "drinks",
    volume: "0,33",
    description: "Klassisk sockerfri Pepsi Max, krispig och uppfriskande."
  },
  {
    id: crypto.randomUUID(),
    name: "Coca-Cola",
    price: 20,
    ingredients: [],
	baseQuantity: 1,
    category: "drinks",
    volume: "0,33",
    description: "Iskall Coca-Cola, tidlös och bubblande god."
  },
  {
    id: crypto.randomUUID(),
    name: "Sprite",
    price: 20,
    ingredients: [],
	baseQuantity: 1,
    category: "drinks",
    volume: "0,33",
    description: "Frisk Sprite med citron- och limesmak, perfekt törstsläckare."
  },
  {
    id: crypto.randomUUID(),
    name: "Ramlösa Citrus",
    price: 25,
    ingredients: [],
	baseQuantity: 1,
    category: "drinks",
    volume: "0,5",
    description: "Lätt kolsyrat mineralvatten med uppfriskande citrussmak."
  },
  {
    id: crypto.randomUUID(),
    name: "Loka Naturell",
    price: 25,
    ingredients: [],
	baseQuantity: 1,
    category: "drinks",
    volume: "0,5",
    description: "Rent kolsyrat vatten, fräscht och utan tillsatser."
  },
  {
    id: crypto.randomUUID(),
    name: "Apelsinjuice",
	baseQuantity: 1,
    price: 30,
    volume: "0,25",
    description: "Färskpressad apelsinjuice, söt och full av vitaminer."
  },
  {
    id: crypto.randomUUID(),
    name: "Äppeljuice",
	baseQuantity: 1,
    price: 30,
    ingredients: [],
    category: "drinks",
    volume: "0,25",
    description: "Krispig äppeljuice, naturligt söt och uppfriskande."
  },
  {
    id: crypto.randomUUID(),
    name: "Ramune Yuzu",
	baseQuantity: 1,
    price: 35,
    ingredients: [],
    category: "drinks",
    volume: "0,2",
    description: "Japansk Ramune med syrlig yuzusmak, rolig och unik."
  },
  {
    id: crypto.randomUUID(),
    name: "Iskaffe",
	baseQuantity: 1,
    price: 40,
    ingredients: [],
    category: "drinks",
    volume: "0,3",
    description: "Svalkande iskaffe, krämig och uppiggande."
  },
  {
    id: crypto.randomUUID(),
    name: "Japanskt grönt te",
    price: 25,
    ingredients: [],
	baseQuantity: 1,
    category: "drinks",
    volume: "0,5",
    description: "Autentiskt grönt te, mild och aromatisk."
  },
  {
    id: crypto.randomUUID(),
    name: "Kombucha Original",
    price: 45,
	baseQuantity: 1,
    ingredients: [],
    category: "drinks",
    volume: "0,33",
    description: "Probiotisk kombucha, fräsch med en lätt syrlighet."
  },
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
  