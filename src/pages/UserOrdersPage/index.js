import React from 'react'
import "./UserOrdersPage.scss"
import OrderList from '../../components/OrderList'
import { useUser } from '../../contexts/UserProvider'

export default function UserOrdersPage() {
    const {orders} = useUser()
  return (
    <div className='user-orders-page'>
      <OrderList orders={orders}/>
    </div>
    )
}
