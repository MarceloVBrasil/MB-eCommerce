import React, {useEffect} from 'react'
import { useUser } from '../../contexts/UserProvider'
import AdminOrderArray from '../../components/AdminOrderArray'
import "./AdminOrdersPage.scss"
import EmptyCart from '../../components/EmptyCart'

export default function AdminOrdersPage() {
    const { allOrders, getAllOrders } = useUser()
        useEffect(() => {
            getAllOrders()
        }, [])
  return (
    <div className='admin-orders-page'>
      {allOrders.length > 0 ? <AdminOrderArray orders={allOrders}/> : <EmptyCart />}
    </div>
  )
}
