import React from 'react'
import Order from '../Order'
import "./OrderList.scss"
import { CircularProgress } from '@mui/material'

export default function OrderList({ orders }) {
    if(!orders) return <div className='order-list'><CircularProgress /></div>
  return (
    <div className='order-list'>
      {orders.map((order) => (
          <Order order={order} key={order.id} />
      ))}
    </div>
  )
}
