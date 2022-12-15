import React from "react";
import "./Input.scss";

export default function Input({ label, placeholder, type, name, error }) {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="input__input"
        name={name || label}
      />
      {error && (
        <p className="input__error">
          <span>!</span> {error}
        </p>
      )}
    </div>
  );
}
