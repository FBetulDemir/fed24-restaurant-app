import { useState } from "react";
import { uploadAllMenus } from "../data/uploadMenu";
import "../styles/AdminStart.css"

const UploadAllMenusButton = () => {
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    setStatus("Laddar upp menyer...");
    try {
      await uploadAllMenus();
      setStatus("Menyer uppladdade!");
    } catch (err) {
      setStatus("Misslyckades med att ladda upp menyer.");
      if (process.env.NODE_ENV === "development") {
        console.error("Error uploading menus:", err);
      }
    }
  };

  return (
    <div>
      <button className="form-btn upload" onClick={handleUpload}>Ladda upp nya rätter</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default UploadAllMenusButton;