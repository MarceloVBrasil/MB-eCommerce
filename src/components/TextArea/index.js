import React from 'react'
import "./TextArea.scss"

export default function TextArea({label, placeholder, name, error, value, setMessage}) {
  return (
    <div className="textarea">
      <label className="textarea__label">{label}</label>
      <textarea
        placeholder={placeholder}
        className="textarea__input"
        name={name || label}
        value={value}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && (
        <p className="textarea__error">
          <span>!</span> {error}
        </p>
      )}
    </div>
  )
}
