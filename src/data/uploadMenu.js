import { drinksMenuList, makiMenuList, nigiriMenuList, sashimiMenuList } from "../data/produktLists";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi_menu_2025_menu";

const fetchCurrentMenu = async () => {
  try {
    const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } else {
      console.error("Misslyckades med att hämta nuvarande meny");
      return [];
    }
  } catch (err) {
    console.error("Nätverksfel vid hämtning av meny:", err);
    return [];
  }
};

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
      console.log("✅ Menyn sparades framgångsrikt!");
      return true;
    } else {
      console.error("❌ Misslyckades med att spara menyn.");
      return false;
    }
  } catch (err) {
    console.error("❌ Nätverksfel vid sparande av meny:", err);
    return false;
  }
};

export const uploadAllMenus = async () => {
  try {
    const currentMenu = await fetchCurrentMenu();

    const allMenuItems = [
      ...drinksMenuList.map((item) => ({ ...item, category: "drinks" })),
      ...makiMenuList.map((item) => ({ ...item, category: "maki" })),
      ...nigiriMenuList.map((item) => ({ ...item, category: "nigiri" })),
      ...sashimiMenuList.map((item) => ({ ...item, category: "sashimi" })),
    ];

    const uniqueMenuItems = allMenuItems.reduce((acc, item) => {
      const exists = acc.some(
        (existing) => existing.name === item.name && existing.category === item.category
      );
      if (!exists) acc.push(item);
      return acc;
    }, []);

    const newItems = uniqueMenuItems.filter(
      (newItem) =>
        !currentMenu.some(
          (existingItem) =>
            existingItem.name === newItem.name &&
            existingItem.category === newItem.category
        )
    );

    const updatedMenu = [...currentMenu, ...newItems];

    const finalMenu = updatedMenu.reduce((acc, item) => {
      const exists = acc.some(
        (existing) => existing.name === item.name && existing.category === item.category
      );
      if (!exists) acc.push(item);
      return acc;
    }, []);

    const success = await saveMenuToApi(finalMenu);
    if (!success) console.error("Misslyckades med att spara menyn.");
    return success;
  } catch (err) {
    console.error("Fel i uploadAllMenus:", err);
    return false;
  }
};

export const editMenuItem = async (originalItem, updatedItem) => {
  try {
    const currentMenu = await fetchCurrentMenu();
    const itemIndex = currentMenu.findIndex(
      (item) => item.name === originalItem.name && item.category === originalItem.category
    );

    if (itemIndex === -1) {
      console.error("Objektet hittades inte i nuvarande meny:", originalItem);
      return false;
    }

    currentMenu[itemIndex] = { ...updatedItem, category: originalItem.category };
    const success = await saveMenuToApi(currentMenu);
    if (success) {
      console.log("✅ Menyobjekt uppdaterat:", updatedItem);
      return true;
    } else {
      console.error("❌ Misslyckades med att spara uppdaterad meny.");
      return false;
    }
  } catch (err) {
    console.error("❌ Fel i editMenuItem:", err);
    return false;
  }
};

export const deleteMenuItem = async (itemToDelete) => {
  try {
    const currentMenu = await fetchCurrentMenu();
    const updatedMenu = currentMenu.filter(
      (item) => !(item.name === itemToDelete.name && item.category === itemToDelete.category)
    );
    const success = await saveMenuToApi(updatedMenu);
    if (success) {
      console.log("✅ Menyobjekt raderat:", itemToDelete);
      return true;
    } else {
      console.error("❌ Misslyckades med att spara uppdaterad meny.");
      return false;
    }
  } catch (err) {
    console.error("❌ Fel i deleteMenuItem:", err);
    return false;
  }
};

export const clearAndResetMenu = async () => {
  try {
    const allMenuItems = [
      ...drinksMenuList.map((item) => ({ ...item, category: "drinks" })),
      ...makiMenuList.map((item) => ({ ...item, category: "maki" })),
      ...nigiriMenuList.map((item) => ({ ...item, category: "nigiri" })),
      ...sashimiMenuList.map((item) => ({ ...item, category: "sashimi" })),
    ];

    const uniqueMenuItems = allMenuItems.reduce((acc, item) => {
      const exists = acc.some(
        (existing) => existing.name === item.name && existing.category === item.category
      );
      if (!exists) acc.push(item);
      return acc;
    }, []);

    const success = await saveMenuToApi(uniqueMenuItems);
    if (success) {
      console.log("✅ Menyn återställd till standardmenyn!");
      return true;
    } else {
      console.error("❌ Misslyckades med att spara standardmenyn.");
      return false;
    }
  } catch (err) {
    console.error("❌ Fel i clearAndResetMenu:", err);
    return false;
  }
};

export const getCurrentMenu = async () => {
  return await fetchCurrentMenu();
};