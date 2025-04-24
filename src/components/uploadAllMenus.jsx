import { useEffect } from "react";
import uploadAllMenus from "../data/uploadMenu";

const UploadAllMenus = () => {
  useEffect(() => {
    uploadAllMenus();
  }, []);

  return (
    <div>
      {/* <h2>Uploading all menus...</h2>
      <p>Check the console for status.</p> */}
    </div>
  );
};

export default UploadAllMenus;