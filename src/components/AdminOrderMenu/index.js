import React from 'react'
import "./AdminOrderMenu.scss"
import shoppingBag from "../../assets/images/shoppingBag.png"
import Button from '../Button'
import { Link } from 'react-router-dom'
import { useUser } from '../../contexts/UserProvider'

export default function AdminOrderMenu({ orders }) {
  const { totalQuantityUndeliveredOrders } = useUser()
  return (
    <div className='admin-order-menu'>
        <section className='admin-order-menu-section'>
              <p className='admin-order-menu-section__title'>admin Orders</p>
              <img src={shoppingBag} alt="admin-orders"  className="admin-order-menu-section__image"/>
      </section>
          <section className='admin-order-menu-section'>
            <p className='admin-order-menu-section__title'>new orders</p>
              <p className='admin-order-menu-section__description'>{totalQuantityUndeliveredOrders}</p>
          </section>
        <div className="admin-order-menu-buttons">
        <Link to={'/admin/orders'} className="admin-order-menu-buttons__link">
          <Button text={"All Orders"} type={"submit"} disable={!orders.length} />
        </Link>
        </div>
    </div>
  )
}
