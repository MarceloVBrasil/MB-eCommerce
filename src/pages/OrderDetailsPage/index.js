import React, { useState, useEffect } from 'react'
import "./OrderDetailsPage.scss"
import OrderDetails from '../../components/OrderDetails'
import { useParams } from 'react-router-dom'
import { useUser } from '../../contexts/UserProvider'
import { CircularProgress } from '@mui/material'
import axiosInstance from '../../utils/axiosInstance'
import Modal from '../../components/Modal'

export default function OrderDetailsPage() {
  const { orderId } = useParams()
  const { user, token } = useUser()
  const [order, setOrder] = useState(undefined)
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
      getOrderDetails(orderId)
  }, [])
  
  if (!order?.[0].id) return <div className='cart-page'><CircularProgress /></div>

  return (
    <div className='order-details-page'>
      <Modal show={showModal} message={response} setShowModal={setShowModal}/>
      <OrderDetails order={order} />
    </div>
  )

  async function getOrderDetails(orderId) {
      try {
          const response = await axiosInstance.get(`carts/${user.id}/${orderId}`, { headers: { authorization: `Bearer ${token}` } })
          setOrder(response.data)
      } catch (error) {
          setResponse(error.response.data)
          setShowModal(true)
      }
  }
}
