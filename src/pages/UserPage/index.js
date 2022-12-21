import React, { useEffect, useState } from 'react'
import "./UserPage.scss"
import { useParams } from 'react-router-dom'
import OrderMenu from '../../components/OrderMenu'
import Modal from '../../components/Modal'
import axiosInstance from '../../utils/axiosInstance'
import { useUser } from '../../contexts/UserProvider'
import { CircularProgress } from '@mui/material'

export default function UserPage() {
    const { userId } = useParams()
    const [response, setResponse] = useState("")
    const [showModal, setShowModal] = useState(false)
    const { token, orders, setOrders } = useUser()
    
    useEffect(() => {
        getOrders(userId)
    }, [])
    if(orders === undefined) return <div className='cart-page'><CircularProgress /></div>
  return (
      <div className='user-page'>
          <Modal show={showModal} message={response} setShowModal={setShowModal} />
          <OrderMenu orders={orders}/>
    </div>
    )
    
    async function getOrders(userId) {
        try {
            const response = await axiosInstance.get(`orders/${userId}`, { headers: { authorization: `Bearer ${token}` } })
            setOrders(response.data)
        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }
}
