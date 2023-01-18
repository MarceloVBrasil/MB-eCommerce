import "./ProductDetailsInfo.scss"
import Button from '../Button'
import axiosInstance from "../../utils/axiosInstance"
import { useUser } from "../../contexts/UserProvider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import Modal from "../Modal"

export default function ProductDetailsForm({ product }) {
  const { token, user, isLoggedIn, setTotalQuantityInCart, setTotalAmount } = useUser()
  const [error, setError] = useState(false)
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  if (!product.categoryName) return <div className='cart-page'><CircularProgress /></div>
  return (
    <>
      <Modal show={showModal} message={response} setShowModal={setShowModal} />
      <form className='product-details-info' onSubmit={handleSubmit}>
        <section className='product-details-info-section'>
          <p className='product-details-info-section__title'>{product.name}</p>
          <img src={product.image} alt={product.name} />
        </section>
        <section className='product-details-info-section'>
          <p className='product-details-info-section__title'>description</p>
          <p className='product-details-info-section__description'>{product.description}</p>
        
          <div className="product-details-info-section-container">
            <div className="product-details-info-section-container-group">
              <label className="product-details-info-section-container-group__title">Brand</label>
              <p className='product-details-info-section-container-group__description'>{product.brandName}</p>
            </div>
            <div className="product-details-info-section-container-group">
              <label className="product-details-info-section-container-group__title">Category</label>
              <p className='product-details-info-section-container-group__description'>{product.categoryName}</p>
            </div>
          </div>
        </section>
        <div className="product-details-info-buttons">
          {user.admin ? <Button text={"Edit Product"} type={"submit"} /> : <Button text={"+ Add to Cart"} type={"submit"} />}
        </div>
        {error && (
          <p className="product-details-info__error">
            <span>!</span> must be logged in to purchase
          </p>
        )}
      </form>
      
    </>
  )
  
  async function handleSubmit(e) {
    e.preventDefault()
    if (user.admin) return handleAdminSubmit()
    else handleClientSubmit()
  }

  function handleAdminSubmit() {
    navigate(`/admin/editProduct/${product.id}`)
  }

  async function handleClientSubmit() {
    try {
      if (!isLoggedIn) return setError(true)
      setError(false)
      let response = await axiosInstance.get(`/carts/${user.id}`, { headers: { authorization: `Bearer ${token}` } })
      let cartId = response.data.id

      if (!cartId) {
        setTotalQuantityInCart(prev => prev + 1)
        setTotalAmount(prev => prev + product.price)
           response = await axiosInstance.post("/carts", { userId: user.id }, {headers: {authorization: `Bearer ${token}`}})
           cartId = response.data
         await axiosInstance.post(`/purchase/${product.id}`, { cartId }, { headers: { authorization: `Bearer ${token}` } })
         navigate("/cart")
        return
      } 

      response = await axiosInstance.get(`/purchase/check/${cartId}/${product.id}`, { headers: { authorization: `Bearer ${token}` } })
      const isProductInThisCart = response.data

      if (isProductInThisCart) {
        setTotalQuantityInCart(prev => prev + 1)
        setTotalAmount(prev => prev + product.price) 
        await axiosInstance.put(`/purchase/${product.id}`, { cartId, increment: true }, { headers: { authorization: `Bearer ${token}` } })
         navigate("/cart")
        return 
      }

      setTotalQuantityInCart(prev => prev + 1) 
      setTotalAmount(prev => prev + product.price) 
      await axiosInstance.post(`/purchase/${product.id}`, { cartId }, { headers: { authorization: `Bearer ${token}` } })
      
      navigate("/cart")
    } catch (error) {
      setTotalQuantityInCart(prev => prev - 1) 
      setTotalAmount(prev => prev - product.price) 
      setResponse(error.response.data)
      setShowModal(true)
    }
  }
}