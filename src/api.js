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
    const result = await response.json();
    console.log(`saveData response for key ${uniqueKey}:`, result); // ดีบั๊ก: ดูผลลัพธ์การบันทึก
    return response.ok;
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
    console.log(`loadData response for key ${uniqueKey}:`, data); // ดีบั๊ก: ดูข้อมูลที่โหลดมา
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Load error for key ${uniqueKey}:`, error);
    return null;
  }
}
