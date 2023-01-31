import React from 'react'
import shoppingBag from "../../assets/images/shoppingBag.png"
import "./Order.scss"
import { priceTag } from '../../utils/priceTag';
import Button from '../Button';
import { Link } from 'react-router-dom';

export default function Order({ order }) {
  console.log(order)
  return (
    <div className='order'>
        <section className='order-section'>
        <p className='order-section__title'>{`Order #${order.id}`}</p>
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
            <p className='order-section__description'>{convertTimeStampToDate(order.order_date)}</p>
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
        <Link to={`./${order.id}`} className="order-buttons__link"><Button text={"Details"} type={"submit"} /></Link>
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
}
