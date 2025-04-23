import { useEffect } from "react";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

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

const uploadMakiMenuList = async () => {
  try {
   
    const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
    let currentMenu = [];
    if (response.ok) {
      const data = await response.json();
      currentMenu = data || [];
    }


    // const updatedMenu = [...currentMenu, ...makiMenuList]; lägga till men inte radera nuvarande meny
    const updatedMenu = [...makiMenuList] // - radera nuvarande meny och lägga till default meny


    const saveResponse = await fetch(`${API_URL}?method=save`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: API_KEY,
        value: updatedMenu,
      }),
    });

    if (saveResponse.ok) {
      console.log("Alla maki-rätter har lagts till i API:t!");
    } else {
      console.error("Misslyckades med att spara menyn.");
    }
  } catch (err) {
    console.error("Nätverksfel:", err);
  }
};

const UploadMakiMenu = () => {
  useEffect(() => {
    uploadMakiMenuList();
  }, []); 

  return (
    <div>
      <h2>Laddar upp maki-rätter...</h2>
      <p>Kontrollera konsolen för status.</p>
    </div>
  );
};

export default UploadMakiMenu;