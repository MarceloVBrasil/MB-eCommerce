import React, { useEffect, useState } from 'react'
import "./CartProductList.scss"
import { useUser } from '../../contexts/UserProvider'
import axiosInstance from '../../utils/axiosInstance'
import CartProduct from '../CartProduct'
import Modal from '../Modal'

export default function CartProductList() {
    const [products, setProducts] = useState()
    const [response, setResponse] = useState("")
    const [showModal, setShowModal] = useState(false)
    const { user, token, totalQuantityInCart } = useUser()

    useEffect(() => {
        getQuantityPerProductInCart()
    }, [totalQuantityInCart])

    return (
        <div className='cart-product-list'>
            <Modal show={showModal} message={response} setShowModal={setShowModal} />
            {products?.map(product => {
                if (product.quantity > 0)
                    return <CartProduct key={product.product_id} productId={product.product_id} quantity={product.quantity} />
            })}
        </div>
    )

    async function getQuantityPerProductInCart() {
        try {
            let response = await axiosInstance.get(`/carts/open`, { headers: { authorization: `Bearer ${token}` } });
            const cartId = response.data.id
            response = await axiosInstance.get(`/purchase/quantityPerProduct/${cartId}`, { headers: { authorization: `Bearer ${token}` } })
            console.log("Cart Product List: ", response.data)
            setProducts(response.data)
        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }
}
