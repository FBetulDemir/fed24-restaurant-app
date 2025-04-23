const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";

export async function saveData(key, value) {
  try {
    const response = await fetch(`${API_URL}?method=save`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key: key,
        value: JSON.stringify(value)
      })
    });

    return response.ok;
  } catch (error) {
    console.error("Save error:", error);
    return false;
  }
}

export async function loadData(key) {
  try {
    const response = await fetch(`${API_URL}?method=load&key=${key}`);
    const data = await response.json();
    console.log(data)
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Load error:", error);
    return null;
  }
}
