import React from "react";
import "./Input.scss";

export default function Input({ label, placeholder, type, name, error, value }) {
  return (
    <div className="input">
      <label className="input__label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="input__input"
        name={name || label}
        defaultValue={ value }
      />
      {error && (
        <p className="input__error">
          <span>!</span> {error}
        </p>
      )}
    </div>
  );
}
