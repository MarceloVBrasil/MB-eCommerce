import React from "react";
import "./DropDownMenu.scss";

export default function DropDownMenu({ error }) {
  return (
    <div className="menu">
      <label className="menu__label">provinces</label>
      <select className="menu__options" name="province">
        <option value={""} hidden>
          Please Select
        </option>
        <option value={"AB"}>AB</option>
        <option value={"BC"}>BC</option>
        <option value={"MB"}>MB</option>
        <option value={"NB"}>NB</option>
        <option value={"NL"}>NL</option>
        <option value={"NS"}>NS</option>
        <option value={"NT"}>NT</option>
        <option value={"NU"}>NU</option>
        <option value={"PE"}>PE</option>
        <option value={"ON"}>ON</option>
        <option value={"QC"}>QC</option>
        <option value={"SK"}>SK</option>
        <option value={"YT"}>YT</option>
      </select>
      {error && (
        <p className="menu__error">
          <span>!</span> {error}
        </p>
      )}
    </div>
  );
}
