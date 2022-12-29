import React, { useEffect } from 'react'
import "./LoginPage.scss"
import LoginForm from "../../components/LoginForm"
import { useUser } from '../../contexts/UserProvider'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { logsOutIfTokenHasExpired } = useUser()
  const navigate = useNavigate()
  document.title = "MB eCommerce | Login"

  useEffect(() => {
    logsOutIfTokenHasExpired(navigate)
  }, [])
  return (
    <div className='login-page'>
      <LoginForm />
    </div>
  )
}
