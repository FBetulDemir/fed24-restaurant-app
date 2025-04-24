const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";

export async function saveData(key, value, signal) {
  const uniqueKey = `isushi_menu_2025_${key}`;
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
      }),
      signal, // เพิ่ม signal เพื่อให้สามารถยกเลิกคำขอได้
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
    if (error.name === 'AbortError') {
      console.log(`saveData request for key ${uniqueKey} was aborted`);
      return false;
    }
    console.error(`Save error for key ${uniqueKey}:`, error);
    return false;
  }
}

export async function loadData(key, signal) {
  const uniqueKey = `isushi_menu_2025_${key}`;
  try {
    const response = await fetch(`${API_URL}?method=load&key=${uniqueKey}`, {
      signal, // เพิ่ม signal เพื่อให้สามารถยกเลิกคำขอได้
    });
    const data = await response.json();
    console.log(`loadData response for key ${uniqueKey}:`, data);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log(`loadData request for key ${uniqueKey} was aborted`);
      return null;
    }
    console.error(`Load error for key ${uniqueKey}:`, error);
    return null;
  }
}
