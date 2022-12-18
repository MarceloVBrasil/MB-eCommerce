import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import "./CartProduct.scss"
import { useUser } from '../../contexts/UserProvider'
import Button from '../Button'
import Modal from '../Modal'

export default function CartProduct({ productId, quantity }) {
    const [product, setProduct] = useState()
    const [response, setResponse] = useState("")
    const [showModal, setShowModal] = useState(true)
    const [totalQuantityOfProductInCart, setTotalQuantityOfProductInCart] = useState(quantity)
    const {token, getTotalQuantityInCart, user} = useUser()
    
    useEffect(() => {
        getProduct(productId)
    }, [])

    if(!product) return
    return (
        <>
    <Modal show={showModal} message={response} setShowModal={setShowModal}/>
    <div className='cart-product'>
        <section className='cart-product-section'>
              <p className='cart-product-section__title'>{product.name}</p>
              <img src={product.image} alt={product.name}  className="cart-product-section__image"/>
      </section>
          <section className='cart-product-section'>
            <p className='cart-product-section__title'>quantity</p>
            <p className='cart-product-section__description'>{ totalQuantityOfProductInCart }</p>
          </section>
        <div className="cart-product-buttons">
              <Button text={"remove"} type={"cancel"} onClick={() => handleUpdateCart(-1)} />
              <Button text={"+ Add to Cart"} type={"submit"} onClick={() => handleUpdateCart(1)} />
        </div>
    </div>
  </>
    )
    
    async function getProduct(productId) {
        try {
            const response = await axiosInstance.get(`/products/${productId}`, { headers: { authorization: `Bearer ${token}` } })
            setProduct(response.data)
        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }

    async function handleUpdateCart(variation) {
        const increment = variation === 1
        try {
            let response = await axiosInstance.get(`/carts/${user.id}`, { headers: { authorization: `Bearer ${token}` } })
            const cartId = response.data.id
            response = await axiosInstance.put(`/purchase/${product.id}`, { cartId, increment }, { headers: { authorization: `Bearer ${token}` } })
            getTotalQuantityInCart(user.id)
            getTotalQuantityInCartByProductId(cartId, productId)
        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }

    async function getTotalQuantityInCartByProductId(cartId, productId) {
        try {
            const response = await axiosInstance.get(`purchase/${cartId}/${productId}`, { headers: { authorization: `Bearer ${token}` } })
            setTotalQuantityOfProductInCart(response.data.quantity)

        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }
}
