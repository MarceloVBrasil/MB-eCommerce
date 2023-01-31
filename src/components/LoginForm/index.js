import React, { useRef, useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import "./Login.scss"
import { useNavigate } from 'react-router-dom'
import {validateEmail} from "../../utils/validate"
import axiosInstance from '../../utils/axiosInstance'
import { useUser } from '../../contexts/UserProvider'
import Modal from '../Modal'

export default function LoginForm() {
    const [errors, setErrors] = useState({})
    const[response, setResponse] = useState("")
    const [showModal, setShowModal] = useState(false)
    const formRef = useRef(null)
    const {logIn} = useUser()
    const navigate = useNavigate()

    return (
        <>
        <Modal show={showModal} message={response} setShowModal={setShowModal}/>
      <form className='login-form' onSubmit={handleSubmit} onKeyDown={handleEnterPress} ref={formRef}>
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
    </>
    )
    
    function handleCancelButton(e) {
        e.preventDefault();
        navigate(-1);
    }

    async function handleSubmit(e) {
        const errors = {}
        e.preventDefault?.();
        if(!validateEmail(formRef.current.email.value)) errors.email = "this field is required"
        if (!formRef.current.password.value) errors.password = "this field is required"
        
        if (Object.values(errors).some((value) => value !== undefined)) return setErrors(errors)
        const user = {email: formRef.current.email.value, password: formRef.current.password.value}
        try {
            const response = await axiosInstance.post("/users/login", user)
            logIn(response.data)            
            navigate("/")

        } catch (error) {
            console.log(error)
            setResponse(error.response.data.message)
            setShowModal(true)
        }
    }

    function handleEnterPress(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSubmit(e)
        }
    }
}
