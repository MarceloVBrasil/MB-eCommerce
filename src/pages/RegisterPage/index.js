import React from "react";
import RegisterForm from "../../components/RegisterForm";
import "./RegisterPage.scss";

export default function RegisterPage() {
  document.title = "MB eCommerce | Register"
  return (
    <div className="register-page">
      <RegisterForm />
    </div>
  );
}
