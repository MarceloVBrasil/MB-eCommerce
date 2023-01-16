import React, {useEffect} from 'react'
import { useUser } from '../../contexts/UserProvider'
import AdminOrderArray from '../../components/AdminOrderArray'
import "./AdminOrdersPage.scss"

export default function AdminOrdersPage() {
    const { allOrders, getAllOrders } = useUser()
        useEffect(() => {
            getAllOrders()
        }, [])
  return (
    <div className='admin-orders-page'>
          <AdminOrderArray orders={allOrders} />
    </div>
  )
}
