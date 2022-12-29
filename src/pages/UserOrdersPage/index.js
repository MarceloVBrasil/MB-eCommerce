import React, { useEffect } from 'react'
import "./UserOrdersPage.scss"
import OrderList from '../../components/OrderList'
import { useUser } from '../../contexts/UserProvider'
import { useNavigate } from 'react-router-dom'

export default function UserOrdersPage() {
  const { orders, logsOutIfTokenHasExpired } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    logsOutIfTokenHasExpired(navigate)
  }, [])
  return (
    <div className='user-orders-page'>
      <OrderList orders={orders}/>
    </div>
    )
}
