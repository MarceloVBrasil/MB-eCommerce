import React from "react";
import "./Button.scss";

export default function Button({ type, text, onClick, disable }) {
  return (
    <button
      className={`button ${type === "cancel" ? "button__cancel" : "button__action"
        }`}
      onClick={onClick}
      disabled={disable}
    >
      {text}
    </button>
  );
}
