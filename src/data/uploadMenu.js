import { drinksMenuList, makiMenuList, nigiriMenuList, sashimiMenuList } from "../data/produktLists";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

// Hjälpfunktion för att hämta nuvarande meny
const fetchCurrentMenu = async () => {
  try {
    const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } else {
      if (process.env.NODE_ENV === "development") {
        console.error("Misslyckades med att hämta nuvarande meny");
      }
      return [];
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Nätverksfel vid hämtning av meny:", err);
    }
    return [];
  }
};

// Hjälpfunktion för att spara meny till API
const saveMenuToApi = async (menu) => {
  try {
    const saveResponse = await fetch(`${API_URL}?method=save`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: API_KEY,
        value: menu,
      }),
    });
    if (saveResponse.ok) {
      if (process.env.NODE_ENV === "development") {
        console.log("Menyn sparades framgångsrikt!");
      }
      return true;
    } else {
      if (process.env.NODE_ENV === "development") {
        console.error("Misslyckades med att spara menyn.");
      }
      return false;
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Nätverksfel vid sparande av meny:", err);
    }
    return false;
  }
};

// Ladda upp alla menyer
export const uploadAllMenus = async () => {
  try {
    const currentMenu = await fetchCurrentMenu();
    if (process.env.NODE_ENV === "development") {
      console.log("Nuvarande meny från API:", currentMenu);
    }

    // Kombinera alla menylistor med explicit kategori
    const allMenuItems = [
      ...drinksMenuList.map((item) => ({ ...item, category: "drink" })),
      ...makiMenuList.map((item) => ({ ...item, category: "maki" })),
      ...nigiriMenuList.map((item) => ({ ...item, category: "nigiri" })),
      ...sashimiMenuList.map((item) => ({ ...item, category: "sashimi" })),
    ];

    // Deduplicera allMenuItems
    const uniqueMenuItems = allMenuItems.reduce((acc, item) => {
      const exists = acc.some(
        (existing) =>
          existing.name === item.name && existing.category === item.category
      );
      if (!exists) {
        acc.push(item);
      }
      return acc;
    }, []);

    if (process.env.NODE_ENV === "development") {
      console.log("Unika menyobjekt att bearbeta:", uniqueMenuItems);
    }

    // Filtrera bort objekt som redan finns i currentMenu
    const newItems = uniqueMenuItems.filter(
      (newItem) =>
        !currentMenu.some(
          (existingItem) =>
            existingItem.name === newItem.name &&
            existingItem.category === newItem.category
        )
    );

    if (process.env.NODE_ENV === "development") {
      console.log("Nya objekt att lägga till:", newItems);
    }

    // Skapa uppdaterad meny
    const updatedMenu = [...currentMenu, ...newItems];

    // Deduplicera updatedMenu
    const finalMenu = updatedMenu.reduce((acc, item) => {
      const exists = acc.some(
        (existing) =>
          existing.name === item.name && existing.category === item.category
      );
      if (!exists) {
        acc.push(item);
      }
      return acc;
    }, []);

    if (process.env.NODE_ENV === "development") {
      console.log("Slutlig meny att ladda upp:", finalMenu);
    }

    // Spara till API
    const success = await saveMenuToApi(finalMenu);
    if (success) {
      if (process.env.NODE_ENV === "development") {
        console.log("Alla menyobjekt har laddats upp till API!");
      }
    } else {
      console.error("Misslyckades med att spara menyn.");
    }
  } catch (err) {
    console.error("Fel i uploadAllMenus:", err);
  }
};

// Redigera ett befintligt menyobjekt
export const editMenuItem = async (originalItem, updatedItem) => {
  try {
    const currentMenu = await fetchCurrentMenu();
    const itemIndex = currentMenu.findIndex(
      (item) =>
        item.name === originalItem.name && item.category === originalItem.category
    );

    if (itemIndex === -1) {
      if (process.env.NODE_ENV === "development") {
        console.error("Objektet hittades inte i nuvarande meny:", originalItem);
      }
      return false;
    }

    // Uppdatera objektet
    currentMenu[itemIndex] = { ...updatedItem, category: originalItem.category };
    if (process.env.NODE_ENV === "development") {
      console.log("Uppdaterat menyobjekt:", currentMenu[itemIndex]);
    }

    // Spara uppdaterad meny
    const success = await saveMenuToApi(currentMenu);
    if (success) {
      if (process.env.NODE_ENV === "development") {
        console.log("Menyobjekt uppdaterades framgångsrikt!");
      }
      return true;
    } else {
      if (process.env.NODE_ENV === "development") {
        console.error("Misslyckades med att spara uppdaterad meny.");
      }
      return false;
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Fel i editMenuItem:", err);
    }
    return false;
  }
};

// Ta bort ett menyobjekt
export const deleteMenuItem = async (itemToDelete) => {
  try {
    const currentMenu = await fetchCurrentMenu();
    const updatedMenu = currentMenu.filter(
      (item) =>
        !(item.name === itemToDelete.name && item.category === itemToDelete.category)
    );

    if (process.env.NODE_ENV === "development") {
      console.log("Meny efter borttagning:", updatedMenu);
    }

    // Spara uppdaterad meny
    const success = await saveMenuToApi(updatedMenu);
    if (success) {
      if (process.env.NODE_ENV === "development") {
        console.log("Menyobjekt togs bort framgångsrikt!");
      }
      return true;
    } else {
      if (process.env.NODE_ENV === "development") {
        console.error("Misslyckades med att spara uppdaterad meny.");
      }
      return false;
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("Fel i deleteMenuItem:", err);
    }
    return false;
  }
};

// Rensa menyn och ladda upp endast objekt från produktLists.js
export const clearAndResetMenu = async () => {
  try {
    // Kombinera alla menylistor med explicit kategori
    const allMenuItems = [
      ...drinksMenuList.map((item) => ({ ...item, category: "drink" })),
      ...makiMenuList.map((item) => ({ ...item, category: "maki" })),
      ...nigiriMenuList.map((item) => ({ ...item, category: "nigiri" })),
      ...sashimiMenuList.map((item) => ({ ...item, category: "sashimi" })),
    ];

    // Deduplicera allMenuItems
    const uniqueMenuItems = allMenuItems.reduce((acc, item) => {
      const exists = acc.some(
        (existing) =>
          existing.name === item.name && existing.category === item.category
      );
      if (!exists) {
        acc.push(item);
      }
      return acc;
    }, []);

    if (process.env.NODE_ENV === "development") {
      console.log("Menyobjekt att ladda upp:", uniqueMenuItems);
    }

    // Spara den nya menyn till API (ersätter allt tidigare)
    const success = await saveMenuToApi(uniqueMenuItems);
    if (success) {
      if (process.env.NODE_ENV === "development") {
        console.log("Menyn rensades och uppdaterades framgångsrikt!");
      }
      return true;
    } else {
      console.error("Misslyckades med att rensa och uppdatera menyn.");
      return false;
    }
  } catch (err) {
    console.error("Fel i clearAndResetMenu:", err);
    return false;
  }
};

// Hämta nuvarande meny för visning
export const getCurrentMenu = async () => {
  return await fetchCurrentMenu();
};

export default uploadAllMenus;