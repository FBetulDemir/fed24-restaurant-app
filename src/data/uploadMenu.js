import { drinksMenuList, makiMenuList, nigiriMenuList, sashimiMenuList } from "../data/produktLists";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

// Helper function to fetch current menu
const fetchCurrentMenu = async () => {
  try {
    const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } else {
      console.error("Failed to fetch current menu");
      return [];
    }
  } catch (err) {
    console.error("Network error fetching menu:", err);
    return [];
  }
};

// Helper function to save menu to API
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
      console.log("Menu saved successfully!");
      return true;
    } else {
      console.error("Failed to save the menu.");
      return false;
    }
  } catch (err) {
    console.error("Network error saving menu:", err);
    return false;
  }
};

// Upload all menus (refactored to reuse saveMenuToApi)
export const uploadAllMenus = async () => {
  try {
    const currentMenu = await fetchCurrentMenu();
    console.log("Current menu from API:", currentMenu);

    // Combine all menu lists with explicit category
    const allMenuItems = [
      ...drinksMenuList.map((item) => ({ ...item, category: "drink" })),
      ...makiMenuList.map((item) => ({ ...item, category: "maki" })),
      ...nigiriMenuList.map((item) => ({ ...item, category: "nigiri" })),
      ...sashimiMenuList.map((item) => ({ ...item, category: "sashimi" })),
    ];

    // Deduplicate allMenuItems
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

    console.log("Unique menu items to process:", uniqueMenuItems);

    // Filter out items that already exist in currentMenu
    const newItems = uniqueMenuItems.filter(
      (newItem) =>
        !currentMenu.some(
          (existingItem) =>
            existingItem.name === newItem.name &&
            existingItem.category === newItem.category
        )
    );

    console.log("New items to add:", newItems);

    // Create updated menu
    const updatedMenu = [...currentMenu, ...newItems];

    // Deduplicate updatedMenu
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

    console.log("Final menu to upload:", finalMenu);

    // Save to API
    const success = await saveMenuToApi(finalMenu);
    if (success) {
      console.log("All menu items have been uploaded to the API!");
    } else {
      console.error("Failed to save the menu.");
    }
  } catch (err) {
    console.error("Error in uploadAllMenus:", err);
  }
};

// Edit an existing menu item
export const editMenuItem = async (originalItem, updatedItem) => {
  try {
    const currentMenu = await fetchCurrentMenu();
    const itemIndex = currentMenu.findIndex(
      (item) =>
        item.name === originalItem.name && item.category === originalItem.category
    );

    if (itemIndex === -1) {
      console.error("Item not found in current menu:", originalItem);
      return false;
    }

    // Update the item
    currentMenu[itemIndex] = { ...updatedItem, category: originalItem.category };
    console.log("Updated menu item:", currentMenu[itemIndex]);

    // Save updated menu
    const success = await saveMenuToApi(currentMenu);
    if (success) {
      console.log("Menu item updated successfully!");
      return true;
    } else {
      console.error("Failed to save updated menu.");
      return false;
    }
  } catch (err) {
    console.error("Error in editMenuItem:", err);
    return false;
  }
};

// Delete a menu item
export const deleteMenuItem = async (itemToDelete) => {
  try {
    const currentMenu = await fetchCurrentMenu();
    const updatedMenu = currentMenu.filter(
      (item) =>
        !(item.name === itemToDelete.name && item.category === itemToDelete.category)
    );

    console.log("Menu after deletion:", updatedMenu);

    // Save updated menu
    const success = await saveMenuToApi(updatedMenu);
    if (success) {
      console.log("Menu item deleted successfully!");
      return true;
    } else {
      console.error("Failed to save updated menu.");
      return false;
    }
  } catch (err) {
    console.error("Error in deleteMenuItem:", err);
    return false;
  }
};

// Fetch current menu for display
export const getCurrentMenu = async () => {
  return await fetchCurrentMenu();
};

export default uploadAllMenus;