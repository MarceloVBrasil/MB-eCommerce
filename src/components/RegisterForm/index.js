import React, { useState } from "react";
import Button from "../Button";
import DropDownMenu from "../DropDownMenu";
import Input from "../Input";
import "./RegisterForm.scss";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePostalCode } from "../../utils/validate";
import axiosInstance from "../../utils/axiosInstance";

export default function RegisterForm() {
  const [error, setError] = useState({});
  const navigate = useNavigate();
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <section className="register-form-section">
        <p className="register-form-section__title">user information</p>
        <Input
          label={"name"}
          placeholder={"name"}
          type={"text"}
          error={error.name}
        />
        <Input
          label={"password"}
          placeholder={"password"}
          type={"password"}
          error={error.password}
        />
        <Input
          label={"email"}
          placeholder={"email"}
          type={"text"}
          error={error.email}
        />
      </section>
      <section className="register-form-section">
        <p className="register-form-section__title">address information</p>
        <Input
          label={"street"}
          placeholder={"street"}
          type={"text"}
          error={error.street}
        />
        <Input
          label={"city"}
          placeholder={"city"}
          type={"text"}
          error={error.city}
        />
        <DropDownMenu error={error.province} />
        <Input label={"complement"} placeholder={"complement"} type={"text"} />
        <Input
          label={"postal code"}
          placeholder={"A0B 1C2"}
          type={"text"}
          name="postalCode"
          error={error.postalCode}
        />
      </section>
      <div className="register-form-buttons">
        <Button type={"cancel"} text={"cancel"} onClick={handleCancelButton} />
        <Button text={"register"} type={"submit"} />
      </div>
    </form>
  );

  function handleCancelButton(e) {
    e.preventDefault();
    navigate(-1);
  }

  async function handleSubmit(e) {
    const errors = {};
    e.preventDefault();
    if (!e.target.name.value) errors.name = "This field is required";
    if (!e.target.password.value) errors.password = "This field is required";
    if (!validateEmail(e.target.email.value))
      errors.email = "This field is required";
    if (!e.target.street.value) errors.street = "This field is required";
    if (!e.target.province.value) errors.province = "This field is required";
    if (!e.target.city.value) errors.city = "This field is required";
    if (!validatePostalCode(e.target.postalCode.value))
      errors.postalCode = "This field is required";

    if (Object.values(errors).some((value) => value !== undefined))
      return setError(errors);
    setError({});

    // register user
    const newUser = {
      name: e.target.name.value,
      password: e.target.password.value,
      email: e.target.email.value,
      street: e.target.street.value,
      city: e.target.city.value,
      province: e.target.province.value,
      postalCode: e.target.postalCode.value,
      complement: e.target.complement.value,
    };

    try {
      const response = await axiosInstance.post("/register", newUser);
      alert("User added successfully :)");
      navigate(-1)
    } catch (error) {
      alert(error);
    }
  }
}
