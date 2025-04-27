import React, { useState } from "react";
import { clearAndResetMenu } from "../data/uploadMenu";
import "../styles/AdminStart.css"

const MenuResetButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetMenu = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const success = await clearAndResetMenu();
      if (success) {
        setMessage("Menu reset successfully!");
      } else {
        setMessage("Failed to reset menu.");
      }
    } catch (err) {
      setMessage("Error resetting menu: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className="form-btn reset" onClick={handleResetMenu} disabled={isLoading}>
        {isLoading ? "Resetting..." : "Återställ standardmeny"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MenuResetButton;