const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";

export async function saveData(key, value) {
  const uniqueKey = `isushi_menu_2025_${key}`;
  try {
    const response = await fetch(`${API_URL}?method=save`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: uniqueKey,
        value: JSON.stringify(value),
      }),
    });

    const contentType = response.headers.get("content-type");
    let result;
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
      console.log(`saveData response for key ${uniqueKey}:`, result);
    } else {
      result = await response.text();
      console.log(`saveData response (text) for key ${uniqueKey}:`, result);
    }

    return response.ok;
  } catch (error) {
    console.error(`Save error for key ${uniqueKey}:`, error);
    return false;
  }
}

export async function loadData(key) {
  const uniqueKey = `isushi_menu_2025_${key}`;
  try {
    const response = await fetch(`${API_URL}?method=load&key=${uniqueKey}`);
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      console.log(`loadData response for key ${uniqueKey}:`, data);
      return data ? JSON.parse(data) : [];
    } else {
      const text = await response.text();
      console.log(`loadData response (text) for key ${uniqueKey}:`, text);
      // กรณีที่ API คืนค่า [] หรือข้อความว่าง ให้คืนค่า array ว่าง
      if (text === '[]' || text.trim() === '') {
        return [];
      }
      // หากไม่ใช่ JSON ที่ถูกต้อง ให้คืนค่า array ว่าง
      return [];
    }
  } catch (error) {
    console.error(`Load error for key ${uniqueKey}:`, error);
    return [];
  }
}
