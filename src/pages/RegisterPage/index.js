import React, { useEffect } from "react";
import RegisterForm from "../../components/RegisterForm";
import "./RegisterPage.scss";
import { useUser } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { logsOutIfTokenHasExpired } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    logsOutIfTokenHasExpired(navigate)
  }, [])
  document.title = "MB eCommerce | Register"
  return (
    <div className="register-page">
      <RegisterForm />
    </div>
  );
}
