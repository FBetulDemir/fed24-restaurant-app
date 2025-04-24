import { useEffect } from "react";
import { drinksMenuList } from "../data/produktLists";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";


const uploadDrinkMenuList = async () => {
  try {
   
    const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
    let currentMenu = [];
    if (response.ok) {
      const data = await response.json();
      currentMenu = data || [];
    }


    const updatedMenu = [...currentMenu, ...drinksMenuList]; // lägga till men inte radera nuvarande meny
    // const updatedMenu = [...drinksMenuList] // - radera nuvarande meny och lägga till default meny


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
      console.log("Alla drycker har lagts till i API:t!");
    } else {
      console.error("Misslyckades med att spara menyn.");
    }
  } catch (err) {
    console.error("Nätverksfel:", err);
  }
};

const UploadDrinkMenu = () => {
  useEffect(() => {
    uploadDrinkMenuList();
  }, []); 

  return (
    <div>
      <h2 >Laddar upp drycker...</h2>
      <p>Kontrollera konsolen för status.</p>
    </div>
  );
};

export default UploadDrinkMenu;