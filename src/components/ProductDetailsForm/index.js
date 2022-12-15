import "./ProductDetailsInfo.scss"
import Button from '../Button'
import axiosInstance from "../../utils/axiosInstance"
import { useUser } from "../../contexts/UserProvider"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProductDetailsForm({ product }) {
  const { token, user, getTotalQuantityInCart, isLoggedIn } = useUser()
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  return (
    <>
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
            <Button text={"+ Add to Cart"} type={"submit"} />
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
    try {
      if (!isLoggedIn) return setError(true)
      setError(false)
      let response = await axiosInstance.get(`/carts/${user.id}`, { headers: { authorization: `Bearer ${token}` } })
      let cartId = response.data.id

      if (!cartId) {
           response = await axiosInstance.post("/carts", { userId: user.id }, {headers: {authorization: `Bearer ${token}`}})
           cartId = response.data
         await axiosInstance.post(`/purchase/${product.id}`, { cartId }, { headers: { authorization: `Bearer ${token}` } })
         navigate("/cart")
        return getTotalQuantityInCart(user.id)
      } 

      response = await axiosInstance.get(`/purchase/check/${cartId}/${product.id}`, { headers: { authorization: `Bearer ${token}` } })
      const isProductInThisCart = response.data

      if (isProductInThisCart) {
        await axiosInstance.put(`/purchase/${product.id}`, { cartId, increment: true }, { headers: { authorization: `Bearer ${token}` } })
         navigate("/cart")
        return getTotalQuantityInCart(user.id)
      }

      await axiosInstance.post(`/purchase/${product.id}`, { cartId }, { headers: { authorization: `Bearer ${token}` } })
      getTotalQuantityInCart(user.id)
      

      navigate("/cart")
    } catch (error) {
      alert(error)
    }
  }
}
