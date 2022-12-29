import React, { useEffect } from 'react'
import "./UserPage.scss"
import OrderMenu from '../../components/OrderMenu'
import Modal from '../../components/Modal'
import { useUser } from '../../contexts/UserProvider'
import { CircularProgress } from '@mui/material'
import EditUserMenu from '../../components/EditUserMenu'
import { useNavigate } from 'react-router-dom'

export default function UserPage() {
    const { orders, showModal, setShowModal, response, getOrders, user, logsOutIfTokenHasExpired } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        getOrders(user.id)
        logsOutIfTokenHasExpired(navigate)
    }, [])
    
    if(orders === undefined) return <div className='cart-page'><CircularProgress /></div>
  return (
      <div className='user-page'>
          <Modal show={showModal} message={response} setShowModal={setShowModal} />
          <OrderMenu orders={orders} />
          <EditUserMenu />
    </div>
    )
}
