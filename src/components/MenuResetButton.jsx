import { useState, useContext } from "react";
import { clearAndResetMenu } from "../data/uploadMenu";
import "../styles/AdminStart.css";
import MenuContext from "../components/MenuContext";

const MenuResetButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { refreshMenu } = useContext(MenuContext);

  const handleResetMenu = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      console.log("🔄 Startar återställning av meny...");
      const success = await clearAndResetMenu();
      if (success) {
        setMessage("Menyn återställd framgångsrikt!");
        console.log("✅ Meny återställd, väntar 1 sekund innan refreshMenu...");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Vänta 1 sekund
        refreshMenu(); // Uppdatera menyn i gränssnittet
      } else {
        setMessage("Misslyckades med att återställa menyn.");
        console.error("❌ Misslyckades med att återställa menyn.");
      }
    } catch (err) {
      setMessage("Fel vid återställning av meny: " + err.message);
      console.error("❌ Fel vid återställning:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="form-btn reset"
        onClick={handleResetMenu}
        disabled={isLoading}
      >
        {isLoading ? "Återställer..." : "Återställ standardmeny"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MenuResetButton;