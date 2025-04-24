const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";

export async function saveData(key, value) {
  const uniqueKey = `isushi_menu_2025_${key}`; // ใช้ key ที่ไม่ซ้ำ
  try {
    const response = await fetch(`${API_URL}?method=save`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: uniqueKey,
        value: JSON.stringify(value)
      })
    });

    // ตรวจสอบว่า response เป็น JSON หรือไม่
    const contentType = response.headers.get("content-type");
    let result;
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
      console.log(`saveData response for key ${uniqueKey}:`, result);
    } else {
      result = await response.text();
      console.log(`saveData response (text) for key ${uniqueKey}:`, result);
    }

    return response.ok; // คืนค่า true หากการบันทึกสำเร็จ
  } catch (error) {
    console.error(`Save error for key ${uniqueKey}:`, error);
    return false;
  }
}

export async function loadData(key) {
  const uniqueKey = `isushi_menu_2025_${key}`; // ใช้ key ที่ไม่ซ้ำ
  try {
    const response = await fetch(`${API_URL}?method=load&key=${uniqueKey}`);
    const data = await response.json();
    console.log(`loadData response for key ${uniqueKey}:`, data);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Load error for key ${uniqueKey}:`, error);
    return null;
  }
}
