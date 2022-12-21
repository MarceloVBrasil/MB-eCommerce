import React, { useState } from 'react'
import "./OrderDetails.scss"
import { useParams } from 'react-router-dom'
import { useUser } from '../../contexts/UserProvider'
import { CircularProgress } from '@mui/material'
import axiosInstance from '../../utils/axiosInstance'

export default function OrderDetails() {
    const { orderId } = useParams()
    const { user, token } = useUser()
    const [order, setOrder] = useState(undefined)
    const [response, setResponse] = useState("")
    const [showModal, setShowModal] = useState(false)

    useState(() => {
        getOrderDetails(orderId)
    }, [])

    if(!order) return <div className='order-details'><CircularProgress /></div>
  return (
    <div className='order-details'>
      <Modal show={showModal} message={response} setShowModal={setShowModal}/>
    <div className='order-details-info' onSubmit={handleSubmit}>
        <section className='order-details-info-section'>
              <p className='order-details-info-section__title'>{product.name}</p>
              <img src={product.image} alt={product.name} />
      </section>
          <section className='order-details-info-section'>
            <p className='order-details-info-section__title'>description</p>
        <p className='order-details-info-section__description'>{product.description}</p>
        
        <div className="order-details-info-section-container">
          <div className="order-details-info-section-container-group">
            <label className="order-details-info-section-container-group__title">Brand</label>
            <p className='order-details-info-section-container-group__description'>{product.brandName}</p>
          </div>
          <div className="order-details-info-section-container-group">
            <label className="order-details-info-section-container-group__title">Category</label>
            <p className='order-details-info-section-container-group__description'>{product.categoryName}</p>
          </div>
        </div>
      </section>
        <div className="order-details-info-buttons">
            <Button text={"+ Add to Cart"} type={"submit"} />
        </div>
      </div>
    </div>
    )
    
    async function getOrderDetails(orderId) {
        try {
            const response = await axiosInstance.get(`carts/${user.id}/${orderId}`, { headers: { authorization: `Bearer ${token}` } })
            setOrder(response.data)
        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }
}
