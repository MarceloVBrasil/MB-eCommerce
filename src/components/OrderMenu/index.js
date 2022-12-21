import React from 'react'
import "./OrderMenu.scss"
import shoppingBag from "../../assets/images/shoppingBag.png"
import Button from '../Button'
import { Link } from 'react-router-dom'

export default function OrderMenu({ orders }) {
  return (
    <div className='order-menu'>
        <section className='order-menu-section'>
              <p className='order-menu-section__title'>Orders</p>
              <img src={shoppingBag} alt="orders"  className="order-menu-section__image"/>
      </section>
          <section className='order-menu-section'>
            <p className='order-menu-section__title'>quantity</p>
              <p className='order-menu-section__description'>{orders.length}</p>
          </section>
        <div className="order-menu-buttons">
              <Link to={'./orders'}><Button text={"My Orders"} type={"submit"} disable={!orders.length} /></Link>
        </div>
    </div>
  )
}
