import React from "react";
import "../styles/Toast.css";

const Toast = ({ message, show }) => {
  return (
    <div className={`toast-container ${show ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Toast;
