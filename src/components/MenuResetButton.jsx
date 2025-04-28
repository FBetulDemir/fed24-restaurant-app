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
    console.log("Initiating menu reset...");
    try {
      const success = await clearAndResetMenu();
      if (success) {
        console.log("Menu reset successful, refreshing UI...");
        setMessage("Menyn återställd framgångsrikt!");
        await refreshMenu(); // Ensure UI refreshes after reset
      } else {
        console.error("Menu reset failed");
        setMessage("Misslyckades med att återställa menyn.");
      }
    } catch (err) {
      console.error("Error during menu reset:", err);
      setMessage("Fel vid återställning av meny: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        id="reset-menu-btn"
        onClick={handleResetMenu}
        disabled={isLoading}
      >
        {isLoading ? "Återställer..." : "Återställ standardmeny"}
      </button>
      {message && (
        <p style={{ color: message.includes("framgångsrikt") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default MenuResetButton;