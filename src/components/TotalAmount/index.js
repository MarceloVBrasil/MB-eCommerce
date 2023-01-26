import React, { useState } from 'react'
import Button from '../Button'
import "./TotalAmount.scss"
import {useUser} from "../../contexts/UserProvider";
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../Modal';
import { priceTag } from '../../utils/priceTag';

export default function TotalAmount() {
  const [error, setError] = useState("")
  const { totalAmount, totalQuantityInCart, token, user } = useUser()
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='amount'>
        <Modal show={showModal} message={response} setShowModal={setShowModal}/>
        {error && <p className='amount__error'><span>! </span> {error}</p>}
        <div className='total-amount'>
          <p className='total-amount__cost'>Total: {priceTag(totalAmount)}</p>
          <Button text={'place your order'} onClick={handlePayment} />
        </div>        
    </div>
    </>
  )

  async function handlePayment() {
    if(totalAmount === 0) return setError("Cart is empty")
    try {
    //   const response = await axiosInstance.post(`/purchase`, {
    //     amount: totalAmount,
    //     quantity: totalQuantityInCart,
    //     name: `${user.name}'s cart`,
    //     userId: user.id
    // }, { headers: { authorization: `Bearer ${token}` } })
    const response = await axiosInstance.post(`/purchase/${user.id}`, {amount: totalAmount})
  
      window.location.href = response.data.url
    } catch (error) {
      console.log(error)
      setResponse(error.response.data)
      setShowModal(true)
    }
  }
}
