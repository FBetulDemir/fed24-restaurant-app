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

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}?method=load&key=${API_KEY}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            const drinks = data.filter((item) => item.category === "drink" || item.category === "drinks");
          const maki = data.filter((item) => item.category === "maki");
          const nigiri = data.filter((item) => item.category === "nigiri");
          const sashimi = data.filter((item) => item.category === "sashimi");

          setMenuData({ drinks, maki, nigiri, sashimi });

          if (data.length === 0) {
            setError("Inga menyobjekt hittades i API-svaret.");
          }
        } else {
          setError("API-svaret är inte en lista över menyobjekt.");
        }
      } catch (err) {
        setError("Kunde inte ladda menyn.");
        // Log errors only in development
        if (process.env.NODE_ENV === "development") {
          console.error("Misslyckades med att ladda menyn", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ menuData, error, loading }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;