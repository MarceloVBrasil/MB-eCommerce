import React from 'react'
import shoppingBag from "../../assets/images/shoppingBag.png"
import "./Order.scss"
import { priceTag } from '../../utils/priceTag';
import Button from '../Button';
import { Link } from 'react-router-dom';

export default function Order({order}) {
  return (
    <div className='order'>
        <section className='order-section'>
        <p className='order-section__title'>{`Order #${order.orderId}`}</p>
              <img src={shoppingBag} alt="orders"  className="order-section__image"/>
      </section>
          <section className='order-section'>
            <p className='order-section__title'>total</p>
            <p className='order-section__description'>{priceTag(order.total)}</p>
          </section>
        <div className="order-buttons">
            <Link to="./:orderId"><Button text={"Details"} type={"submit"} /></Link>
        </div>
    </div>
  )
}
