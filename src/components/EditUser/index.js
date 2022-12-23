import React, { useRef, useState } from "react";
import Button from "../Button";
import DropDownMenu from "../DropDownMenu";
import Input from "../Input";
import "./EditUser.scss";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePostalCode } from "../../utils/validate";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../Modal";
import { useUser } from "../../contexts/UserProvider";

export default function EditUser() {
  const [error, setError] = useState({});
  const formRef = useRef()
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [navigateValue, setNavigateValue] = useState()
    const navigate = useNavigate()
    const {user, setUser, token} = useUser()
  return (
    <>
      <Modal show={showModal} message={response} setShowModal={setShowModal} navigateValue={navigateValue} />
    <form className="edit-user" onSubmit={handleSubmit} onKeyDown={handleEnterPress} ref={formRef}>
      <section className="edit-user-section">
        <p className="edit-user-section__title">user information</p>
        <Input
        label={"name"}
        placeholder={"name"}
        type={"text"}
        error={error.name}
        value={user.name}
        />
        <Input
          label={"password"}
          placeholder={"new password"}
          type={"password"}
          error={error.password}
          />
        <Input
          label={"email"}
          placeholder={"email"}
          type={"text"}
          error={error.email}
          value={user.email}
          />
      </section>
      <section className="edit-user-section">
        <p className="edit-user-section__title">address information</p>
        <Input
          label={"street"}
          placeholder={"street"}
          type={"text"}
          error={error.street}
          value={user.street}
          />
        <Input
          label={"city"}
          placeholder={"city"}
          type={"text"}
          error={error.city}
          value={user.city}
          />
          <DropDownMenu error={error.province} selected={user.province} />
          <Input label={"complement"} placeholder={"complement"} type={"text"} value={user.complement} />
        <Input
          label={"postal code"}
          placeholder={"A0B 1C2"}
          type={"text"}
          name="postalCode"
          error={error.postalCode}
          value={user.postalCode}
          />
      </section>
      <div className="edit-user-buttons">
        <Button type={"cancel"} text={"cancel"} onClick={handleCancelButton} />
        <Button text={"Edit"} type={"submit"} />
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

    // edit user
    const editedUser = {
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
      const response = await axiosInstance.put(`/users/${user.id}`, editedUser, { headers: { authorization: `Bearer ${token}` } });
      if (response.status === 400) {
         setResponse(response.data)
         setShowModal(true)
      }
      setUser(response.data)
      setNavigateValue(`/user/${user.id}`)
      setResponse("User Edited Successfully :)")
      setShowModal(true)
    } catch (error) {
       setResponse(error.response.data);
       setShowModal(true)
    }
  }
}
