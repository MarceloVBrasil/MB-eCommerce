import React, { useRef, useState } from "react";
import Button from "../Button";
import DropDownMenu from "../DropDownMenu";
import Input from "../Input";
import "./RegisterForm.scss";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePostalCode } from "../../utils/validate";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../Modal";

export default function RegisterForm() {
  const [error, setError] = useState({});
  const formRef = useRef()
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [navigateValue, setNavigateValue] = useState()
  const navigate = useNavigate()
  return (
    <>
      <Modal show={showModal} message={response} setShowModal={setShowModal} navigateValue={navigateValue} />
    <form className="register-form" onSubmit={handleSubmit} onKeyDown={handleEnterPress} ref={formRef}>
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
  </>
  );

  function handleCancelButton(e) {
    e.preventDefault();
    navigate(-1);
  }

  function handleEnterPress(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit(formRef)
    }
  }

  async function handleSubmit(e) {
    const errors = {};
    e.preventDefault?.();
    if (!formRef.current.name.value) errors.name = "This field is required";
    if (!formRef.current.password.value) errors.password = "This field is required";
    if (!validateEmail(formRef.current.email.value))
      errors.email = "This field is required";
    if (!formRef.current.street.value) errors.street = "This field is required";
    if (!formRef.current.province.value) errors.province = "This field is required";
    if (!formRef.current.city.value) errors.city = "This field is required";
    if (!validatePostalCode(formRef.current.postalCode.value))
      errors.postalCode = "This field is required";

    if (Object.values(errors).some((value) => value !== undefined))
      return setError(errors);
    setError({});

    // register user
    const newUser = {
      name: formRef.current.name.value,
      password: formRef.current.password.value,
      email: formRef.current.email.value,
      street: formRef.current.street.value,
      city: formRef.current.city.value,
      province: formRef.current.province.value,
      postalCode: formRef.current.postalCode.value,
      complement: formRef.current.complement.value,
    };

    try {
      const response = await axiosInstance.post("/register", newUser);
      setNavigateValue(-1)
      setResponse("User Added Successfully :)")
      setShowModal(true)
    } catch (error) {
       setResponse(error.response.data);
       setShowModal(true)
    }
  }
}
