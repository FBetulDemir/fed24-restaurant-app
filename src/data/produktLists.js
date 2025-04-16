const makiMenuList = [
    {
        name: "Kryddig tonfiskrulle",
        price: 95,
        extra: 14
    },
    {
        name: "Kaliforniarulle",
        ingredients: ["Krabba", "avokado", "gurka"],
        price: 85,
        extra: 12
    },
    {
        name: "Tempurarulle",
        ingredients: ["Räkor i tempura", "kryddig majonnäs"],
        price: 99,
        extra: 15
    },
    {
        name: "Avokadorulle",
        price: 75,
        extra: 11
    },
    {
        name: "Gurkrulle",
        price: 70,
        extra: 10
    }
    // {
    //     name: "Din Mix",
    //     ingredients: ["2 Kryddig tonfiskrullar", "2 Kaliforniarullar", "2 Tempurarullar", "Avokadorulle och Gurkrulle"],
    //     price: "Bygg"
    // }

];

const nigiriMenuList = [
    {
        name: "Lax Nigiri",
        price: 42,
        extra: 25
    },
    {
        name: "Tonfisk Nigiri",
        price: 48,
        extra: 25
    },
    {
        name: "Räka Nigiri",
        price: 38,
        extra: 25
    },
    {
        name: "Ål Nigiri",
        price: 52,
        extra: 30
    }
];

const sashimiMenuList = [
    {
        name: "Lax Sashimi",
        price: 98,
        extra: 25
    },
    {
        name: "Tonfisk Sashimi",
        price: 110,
        extra: 25
    },
    {
        name: "Hamachi Sashimi",
        price: 115,
        extra: 25
    },
    {
        name: "Hälleflundra Sashimi",
        price: 105,
        extra: 25
    }
];

const sushiMenu = [
    {
        name: "Maki Sushi",
        description: "Maki sushi består av en kombination av sushi-ris (klibbigt ris kryddat med risvinäger, socker och salt) och olika fyllningar. Den är ofta enkel men mångsidig, och fyllningarna kan variera beroende på smak och regionala preferenser. Maki är populär för sin kompakta form och balanserade smaker",
        sides: "8 bitar serveras med sojasås, wasabi, inlagd ingefära och miso-soppa",
        image: "/src/assets/maki_sushi.jpg"
    },
    {
        name: "Nigiri Sushi",
        description: "Nigiri sushi är en elegant och traditionell form av sushi, bestående av en skiva färsk rå eller lätt behandlad fisk eller skaldjur, som lax, tonfisk eller räka, placerad ovanpå en liten boll av kryddat sushi-ris. Den framhäver råvarornas naturliga smaker och texturer",
        sides: "2 bitar serveras med sojasås, wasabi, inlagd ingefära och miso-soppa",
        image: "/src/assets/nigiri_sushi.jpg"
    },
    {
        name: "Sashimi",
        description: "Sashimi är tunna skivor av färsk rå fisk eller skaldjur, såsom lax, tonfisk eller hälleflundra, serverade utan ris. Det är en ren och minimalistisk rätt som fokuserar på råvarornas kvalitet och smak, ofta presenterad med vacker estetik",
        sides: "5 bitar serveras med sojasås, wasabi, daikon och miso-soppa",
        image: "/src/assets/sashimi.jpg"
    }
];

export { makiMenuList, nigiriMenuList, sashimiMenuList, sushiMenu };