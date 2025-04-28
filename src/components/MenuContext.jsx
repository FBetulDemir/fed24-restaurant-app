import React, { createContext, useState, useEffect } from "react";

const MenuContext = createContext();

const API_URL = "https://forverkliga.se/JavaScript/api/jsonStore.php";
const API_KEY = "isushi-menu";

export const MenuProvider = ({ children }) => {
  const [menuData, setMenuData] = useState({
    drinks: [],
    maki: [],
    nigiri: [],
    sashimi: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      console.log(`📥 Hämtar meny från API med nyckel: ${API_KEY}`);
      const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
      const data = await response.json();
      console.log("📥 Rådata från API:", data);

      if (Array.isArray(data)) {
        const drinks = data.filter((item) => item.category === "drinks" || item.category === "drink");
        const maki = data.filter((item) => item.category === "maki");
        const nigiri = data.filter((item) => item.category === "nigiri");
        const sashimi = data.filter((item) => item.category === "sashimi");

        console.log("📥 Filtrerade menydata:", { drinks, maki, nigiri, sashimi });
        setMenuData({ drinks, maki, nigiri, sashimi });

        if (data.length === 0) {
          setError("Inga menyobjekt hittades i API-svaret.");
        }
      } else {
        setError("API-svaret är inte en lista över menyobjekt.");
      }
    } catch (err) {
      setError("Kunde inte ladda menyn.");
      console.error("❌ Fel vid hämtning av meny:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Funktion för att tvinga omhämtning av menyn
  const refreshMenu = () => {
    console.log("🔄 Anropar refreshMenu...");
    fetchMenu();
  };

  return (
    <MenuContext.Provider value={{ menuData, error, loading, refreshMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;