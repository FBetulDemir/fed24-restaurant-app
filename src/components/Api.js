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
      signal,
    });

    // const result = await response.json();
	const result = await response.text();
    console.log(`✅ saveData response for key ${uniqueKey}:`, result);
    return response.ok;
  } catch (error) {
    console.error(`❌ Save error for key ${uniqueKey}:`, error);
    return false;
  }
}

export async function loadData(key, signal) {
  const uniqueKey = `isushi_menu_2025_${key}`;
  try {
    const response = await fetch(`${API_URL}?method=load&key=${uniqueKey}`, {
      signal,
    });
    const raw = await response.json();
    console.log(`📥 raw loadData for key ${uniqueKey}:`, raw);
    
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    console.log(`📥 parsed loadData for key ${uniqueKey}:`, parsed);

    return parsed ?? null;
  } catch (error) {
    console.error(`❌ Load error for key ${uniqueKey}:`, error);
    return null;
  }
}
