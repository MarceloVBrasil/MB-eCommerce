import React from 'react'
import "./OrderDetails.scss"
import shoppingBag from "../../assets/images/shoppingBag.png"
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

export default function OrderDetails({order}) {
  const navigate = useNavigate()
  console.log(order)
  return (
    <div className='order-details'>
    <div className='order-details-info'>
        <section className='order-details-info-section'>
              <p className='order-details-info-section__title'>{`Order #${order.id} Details`}</p>
              <img src={shoppingBag} alt={`Order #${order.id}`} />
      </section>
          <section className='order-details-info-section'>
            <p className='order-details-info-section__title'>products</p>
          {order.products.map((o, index) => <p className='order-details-info-section__description' key={index}>{`${o.name} x${o.quantity}`}</p>)}
      </section>
        <div className="order-details-info-buttons">
          <Button text={'OK'} type={"submit"} onClick={handleClick} />
        </div>
      </div>
    </div>
  )
  
  function handleClick() {
    navigate(-1)
  }
}
