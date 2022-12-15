import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import CommentsForm from '../../components/CommentsForm'
import ProductDetailsForm from '../../components/ProductDetailsForm'
import "./ProductPage.scss"
import CommentList from '../../components/CommentList'

export default function ProductPage() {
  document.title = "MB eCommerce | Product"
    const { productId } = useParams()
  const [productDetails, setProductDetails] = useState({})
  const [comments, setComments] = useState([])

    useEffect(() => {
      getProductDetails(productId)
      getComments(productId)
    }, [productId])
  
  return (
    <div className='product-page'>
      <ProductDetailsForm product={productDetails} />
      <CommentsForm productId={productId} setComments={setComments} getComments={getComments} />
      <CommentList productId={productId} comments={comments} />
    </div>
  )

  async function getProductDetails(id) {
    try {
        const response = await axiosInstance.get(`/products/${id}`)
        setProductDetails(response.data)
    } catch (error) {
        alert(error)
    }
  }

  async function getComments(id) {
      try {
          const response = await axiosInstance.get(`/comments/${id}`)
          setComments(response.data)
      } catch (error) {
          alert(error)
      }
  }
}
