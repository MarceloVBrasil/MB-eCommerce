import React from 'react'
import CartProductList from '../../components/CartProductList'
import "./CartPage.scss"
import { useUser } from '../../contexts/UserProvider'
import EmptyCart from '../../components/EmptyCart'
import TotalAmount from '../../components/TotalAmount'
import CircularProgress from '@mui/material/CircularProgress';

export default function CartPage() {
  document.title = "MB eCommerce | Cart"
  const { totalQuantityInCart } = useUser()
  if(totalQuantityInCart === undefined) return <div className='cart-page'><CircularProgress /></div>
  return (
    <div className='cart-page'>
      {totalQuantityInCart > 0 ? <CartProductList /> : <EmptyCart />}
      <TotalAmount />
    </div>
  )
}
