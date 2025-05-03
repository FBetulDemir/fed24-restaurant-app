import { saveMenuToApi, fetchCurrentMenu } from '../data/uploadMenu';

export const saveData = async (key, value, signal) => {
  try {
    console.log('Saving data with key:', key, 'value:', value); // ดีบักข้อมูล
    if (key === 'menu') {
      return await saveMenuToApi(value, signal);
    } else if (key === 'temporary-test-cart') {
      // บันทึกตะกร้าสินค้าด้วยวิธีเดียวกับเมนู
      const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
      const saveResponse = await fetch(`${API_URL}?method=save`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: key,
          value: value,
        }),
        signal,
      });
      if (saveResponse.ok) {
        console.log("✅ Data saved successfully for key:", key);
        return true;
      } else {
        console.error("❌ Failed to save data, status:", saveResponse.status);
        throw new Error(`Failed to save data, status: ${saveResponse.status}`);
      }
    } else {
      throw new Error('Invalid key for saving data');
    }
  } catch (err) {
    console.error('Error in saveData:', err);
    return false;
  }
};

export const loadData = async (key, signal) => {
  try {
    if (key === 'menu') {
      return await fetchCurrentMenu(signal);
    } else if (key === 'temporary-test-cart') {
      const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
      const response = await fetch(`${API_URL}?method=load&key=${key}`, { signal });
      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      } else {
        console.error("Failed to fetch data, status:", response.status);
        throw new Error(`Failed to fetch data, status: ${response.status}`);
      }
    } else {
      throw new Error('Invalid key for loading data');
    }
  } catch (err) {
    console.error('Error in loadData:', err);
    return [];
  }
};