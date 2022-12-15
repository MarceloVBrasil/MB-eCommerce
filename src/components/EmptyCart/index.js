import React from 'react'
import "./EmptyCart.scss"
import Button from '../Button'
import empty from "../../assets/images/empty.png"

export default function EmptyCart() {
  return (
    <div className='empty-cart'>
        <section className='empty-cart-section'>
              <p className='empty-cart-section__title'>Empty cart</p>
              <img src={empty} alt="empty cart"  className="empty-cart-section__image"/>
      </section>
          <section className='empty-cart-section'>
            <p className='empty-cart-section__title'>quantity</p>
            <p className='empty-cart-section__description'>0</p>
          </section>
        <div className="empty-cart-buttons">
              <Button text={"remove"} type={"cancel"} disable={true} />
              <Button text={"+ Add to Cart"} type={"submit"} disable={true} />
        </div>
    </div>
  )
}
