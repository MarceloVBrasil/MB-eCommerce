import React, { useState } from 'react'
import Button from '../Button'
import "./TotalAmount.scss"
import {useUser} from "../../contexts/UserProvider";
import axiosInstance from '../../utils/axiosInstance';

export default function TotalAmount() {
  const [error, setError] = useState("")
  const { totalAmount, totalQuantityInCart, token, user } = useUser()

  return (
    <>
    <div className='amount'>
        {error && <p className='amount__error'><span>! </span> {error}</p>}
        <div className='total-amount'>
          <p className='total-amount__cost'>Total: ${totalAmount}</p>
          <Button text={'place your order'} onClick={handlePayment} />
        </div>        
    </div>
    </>
  )

  async function handlePayment() {
    if(totalAmount === 0) return setError("Cart is empty")
    try {
      const response = await axiosInstance.post("/purchase/payment", {
        amount: totalAmount,
        quantity: totalQuantityInCart,
        name: `${user.name}'s cart`,
        userId: user.id
    }, { headers: { authorization: `Bearer ${token}` } })
  
      window.location.href = response.data.url
    } catch (error) {
      alert(error)
    }
  }
}
