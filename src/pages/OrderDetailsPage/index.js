import React, { useState, useEffect } from 'react'
import "./OrderDetailsPage.scss"
import OrderDetails from '../../components/OrderDetails'
import { useParams } from 'react-router-dom'
import { useUser } from '../../contexts/UserProvider'
import { CircularProgress } from '@mui/material'
import axiosInstance from '../../utils/axiosInstance'
import Modal from '../../components/Modal'
import { useNavigate } from 'react-router-dom'

export default function OrderDetailsPage() {
  const { orderId } = useParams()
  const { user, token, logsOutIfTokenHasExpired } = useUser()
  const [order, setOrder] = useState(undefined)
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getOrderDetails(orderId)
    logsOutIfTokenHasExpired(navigate)
  }, [])
  
  if (!order?.id) return <div className='cart-page'><CircularProgress /></div>

  return (
    <div className='order-details-page'>
      <Modal show={showModal} message={response} setShowModal={setShowModal}/>
      <OrderDetails order={order} />
    </div>
  )

  async function getOrderDetails(orderId) {
      try {
        const response = await axiosInstance.get(`/orders/${user.id}/${orderId}`, { headers: { authorization: `Bearer ${token}` } })
        console.log(response.data)
          setOrder(response.data)
      } catch (error) {
          setResponse(error.response.data)
          setShowModal(true)
      }
  }
}
