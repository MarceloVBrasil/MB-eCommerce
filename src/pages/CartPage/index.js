import React from 'react'
import CartProductList from '../../components/CartProductList'
import "./CartPage.scss"
import { useUser } from '../../contexts/UserProvider'
import EmptyCart from '../../components/EmptyCart'
import TotalAmount from '../../components/TotalAmount'

export default function CartPage() {
  document.title = "MB eCommerce | Cart"
  const { totalQuantityInCart } = useUser()
  if(totalQuantityInCart === undefined) return 
  return (
    <div className='cart-page'>
      {totalQuantityInCart > 0 ? <CartProductList /> : <EmptyCart />}
      <TotalAmount />
    </div>
  )
}
