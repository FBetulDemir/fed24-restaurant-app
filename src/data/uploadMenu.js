import { drinksMenuList, makiMenuList, nigiriMenuList, sashimiMenuList } from "../data/produktLists";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

const fetchCurrentMenu = async () => {
  try {
    console.log(`Fetching current menu with key: ${API_KEY}`);
    const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched current menu:", data);
      return Array.isArray(data) ? data : [];
    } else {
      console.error("Failed to fetch current menu, status:", response.status);
      return [];
    }
  } catch (err) {
    console.error("Network error fetching menu:", err);
    return [];
  }
};

const saveMenuToApi = async (menu) => {
  try {
    console.log(`Saving menu to API with key: ${API_KEY}, items:`, menu);
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
      console.log("✅ Menu saved successfully!");
      return true;
    } else {
      console.error("❌ Failed to save menu, status:", saveResponse.status);
      return false;
    }
  } catch (err) {
    console.error("❌ Network error saving menu:", err);
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
    if (!success) console.error("Failed to save menu in uploadAllMenus");
    return success;
  } catch (err) {
    console.error("Error in uploadAllMenus:", err);
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
      console.error("Item not found in current menu:", originalItem);
      return false;
    }

    currentMenu[itemIndex] = { ...updatedItem, category: originalItem.category };
    const success = await saveMenuToApi(currentMenu);
    if (success) {
      console.log("✅ Menu item updated:", updatedItem);
      return true;
    } else {
      console.error("❌ Failed to save updated menu.");
      return false;
    }
  } catch (err) {
    console.error("❌ Error in editMenuItem:", err);
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
      console.log("✅ Menu item deleted:", itemToDelete);
      return true;
    } else {
      console.error("❌ Failed to save updated menu.");
      return false;
    }
  } catch (err) {
    console.error("❌ Error in deleteMenuItem:", err);
    return false;
  }
};

export const clearAndResetMenu = async () => {
  try {
    console.log("Resetting menu to default...");
    const allMenuItems = [
      ...drinksMenuList.map((item) => ({ ...item, category: "drinks" })),
      ...makiMenuList.map((item) => ({ ...item, category: "maki" })),
      ...nigiriMenuList.map((item) => ({ ...item, category: "nigiri" })),
      ...sashimiMenuList.map((item) => ({ ...item, category: "sashimi" })),
    ];

    console.log("Default menu items to upload:", allMenuItems);
    const success = await saveMenuToApi(allMenuItems);
    if (success) {
      console.log("✅ Menu reset to default menu!");
      return true;
    } else {
      console.error("❌ Failed to save default menu.");
      return false;
    }
  } catch (err) {
    console.error("❌ Error in clearAndResetMenu:", err);
    return false;
  }
};

export const getCurrentMenu = async () => {
  return await fetchCurrentMenu();
};