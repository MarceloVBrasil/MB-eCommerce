import "./AdminPage.scss"
import { useUser } from "../../contexts/UserProvider"
import { useEffect } from "react"
import AdminOrderMenu from "../../components/AdminOrderMenu"
import AddProductMenu from "../../components/AddProductMenu"

export default function AdminPage() {
    const { allOrders, getAllOrders } = useUser()
    useEffect(() => {
        getAllOrders()
    }, [])
  
  return (
    <div className='admin-page'>
      <AdminOrderMenu orders={allOrders} />
      <AddProductMenu />
    </div>
    )
}
