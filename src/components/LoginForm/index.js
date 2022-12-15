import React, { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import "./Login.scss"
import { useNavigate } from 'react-router-dom'
import {validateEmail} from "../../utils/validate"
import axiosInstance from '../../utils/axiosInstance'
import { useUser } from '../../contexts/UserProvider'

export default function LoginForm() {
    const [errors, setErrors] = useState({})
    const {logIn} = useUser()
    const navigate = useNavigate()
  return (
    <form className='login-form' onSubmit={handleSubmit}>
          <section className='login-form-section'>
            <p className='login-form__title'>Login</p>
              <Input label={'email'} type={'text'} placeholder={'email'} error={errors.email} />
            <Input label={'password'} type={'password'} placeholder={'password'} error={errors.password}/>
         </section>
          <div className="login-form-buttons">
              <Button type={'cancel'} text={'cancel'} onClick={handleCancelButton} />
            <Button text={'log in'} type='submit'/>
        </div>
    </form>
    )
    
    function handleCancelButton(e) {
        e.preventDefault();
        navigate(-1);
    }

    async function handleSubmit(e) {
        const errors = {}
        e.preventDefault();
        if(!validateEmail(e.target.email.value)) errors.email = "this field is required"
        if (!e.target.password.value) errors.password = "this field is required"
        
        if (Object.values(errors).some((value) => value !== undefined)) return setErrors(errors)
        const user = {email: e.target.email.value, password: e.target.password.value}
        try {
            const response = await axiosInstance.post("/login", user)
            logIn(response.data)            
            navigate("/")

        } catch (error) {
            alert(error.response.data)
        }
    }
}
