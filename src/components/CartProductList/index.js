import React, { useEffect, useState } from 'react'
import "./CartProductList.scss"
import { useUser } from '../../contexts/UserProvider'
import axiosInstance from '../../utils/axiosInstance'
import CartProduct from '../CartProduct'

export default function CartProductList() {
    const [products, setProducts] = useState()
    const { user, token, totalQuantityInCart } = useUser()

    useEffect(() => {
        getQuantityPerProductInCart(user.id)
    }, [totalQuantityInCart])

  return (
    <div className='cart-product-list'>
          {products?.map(product => {
              if (product.quantity > 0) 
                  return <CartProduct key={product.product_id} productId={product.product_id} quantity={product.quantity} />
          })}
    </div>
    )
    
    async function getQuantityPerProductInCart(userId) {
        try {
            let response = await axiosInstance.get(`/carts/${userId}`, { headers: { authorization: `Bearer ${token}` } }); 
            const cartId = response.data.id
            response = await axiosInstance.get(`/purchase/quantityPerProduct/${cartId}`, { headers: { authorization: `Bearer ${token}` } })
            setProducts(response.data)
        } catch (error) {
            alert(error.response.data)
        }
    }
}
