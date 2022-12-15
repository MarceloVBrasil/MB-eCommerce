import React from 'react'
import "./LoginPage.scss"
import LoginForm from "../../components/LoginForm"

export default function LoginPage() {
  document.title = "MB eCommerce | Login"
  return (
    <div className='login-page'>
      <LoginForm />
    </div>
  )
}
