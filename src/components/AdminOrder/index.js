import React from 'react'
import shoppingBag from "../../assets/images/shoppingBag.png"
import "./AdminOrder.scss"
import { priceTag } from '../../utils/priceTag';
import Button from '../Button';
import axiosInstance from "../../utils/axiosInstance"
import { useUser } from "../../contexts/UserProvider"
import { useNavigate } from "react-router-dom"

export default function AdminOrder({ order }) {
  const { user, setTotalQuantityUndeliveredOrders } = useUser()
  const navigate = useNavigate()
  return (
    <div className='order'>
        <section className='order-section'>
        <p className='order-section__title'>{`Order #${order.orderId}`}</p>
              <img src={shoppingBag} alt="orders"  className="order-section__image"/>
      </section>
      <section className='order-section'>
        <div className='order-section-group'>
          <p className='order-section__title'>total</p>
          <p className='order-section__description'>{priceTag(order.total)}</p>
        </div>
        <div className='order-section-group-flex'>
          <div className='order-section-group'>
            <p className='order-section__title'>Date</p>
            <p className='order-section__description'>{convertTimeStampToDate(order.orderDate)}</p>
          </div>
          <div className='order-section-group'>
            <p className='order-section__title'>Status</p>
            <p className={`order-section__status 
            ${order.orderSent ? 'order-section__status--sent' : 'order-section__status--not-sent'}`}>
              {order.orderSent ? 'sent' : 'not sent' }
            </p>
          </div>            
          </div>            
          </section>
        <div className="order-buttons">
       <Button text={"Send"} type={"submit"} onClick={() => sendOrder(order.orderId)}/>
        </div>
    </div>
  )

    function convertTimeStampToDate(timestamp) {
      const date = new Date(timestamp)
      const day = date.getDate()
      const month = date.getMonth() + 1 // 0 index base
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    }

    async function sendOrder(id) {
      try {
        const response = await axiosInstance.post('/orders/admin/send', { orderId: id })
        if (response.status === 200) {
          setTotalQuantityUndeliveredOrders(prev => prev > 1 ? prev -1 : prev)
        }
        navigate("/admin")
      } catch (error) {
        
      }
  }

}

