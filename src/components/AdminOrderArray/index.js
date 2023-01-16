import "./AdminOrderArray.scss"
import { CircularProgress } from '@mui/material'
import AdminOrder from '../AdminOrder'

export default function AdminOrderArray({ orders }) {
    if(!orders) return <div className='order-list'><CircularProgress /></div>
  return (
    <div className='order-list'>
      {orders.map((order) => (
          <AdminOrder order={order} key={order.id} />
      ))}
    </div>
  )
}
