// src/utils/uploadMenu.js
import { drinksMenuList, makiMenuList, nigiriMenuList, sashimiMenuList } from "../data/produktLists";

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

export const uploadAllMenus = async () => {
  try {
    // Fetch current menu from API
    const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
    let currentMenu = [];
    if (response.ok) {
      const data = await response.json();
      currentMenu = Array.isArray(data) ? data : [];
      console.log("Current menu from API:", currentMenu);
    } else {
      console.error("Failed to fetch current menu");
    }

    // Combine all menu lists with explicit category
    const allMenuItems = [
      ...drinksMenuList.map((item) => ({ ...item, category: "drink" })),
      ...makiMenuList.map((item) => ({ ...item, category: "maki" })),
      ...nigiriMenuList.map((item) => ({ ...item, category: "nigiri" })),
      ...sashimiMenuList.map((item) => ({ ...item, category: "sashimi" })),
    ];

    // Deduplicate allMenuItems to ensure no duplicates within the input
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

    // Create updated menu by combining currentMenu with newItems
    const updatedMenu = [...currentMenu, ...newItems];

    // Deduplicate updatedMenu to be extra safe
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

    // Save the updated menu to the API
    const saveResponse = await fetch(`${API_URL}?method=save`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: API_KEY,
        value: finalMenu,
      }),
    });

    if (saveResponse.ok) {
      console.log("All menu items have been uploaded to the API!");
    } else {
      console.error("Failed to save the menu.");
    }
  } catch (err) {
    console.error("Network error:", err);
  }
};

export default uploadAllMenus