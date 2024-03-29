import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import CommentsForm from '../../components/CommentsForm'
import ProductDetailsForm from '../../components/ProductDetailsForm'
import "./ProductPage.scss"
import CommentList from '../../components/CommentList'
import Modal from '../../components/Modal'
import { useUser } from '../../contexts/UserProvider'
import { useNavigate } from 'react-router-dom'

export default function ProductPage() {
  document.title = "MB eCommerce | Product"
  const { productId } = useParams()
  const [productDetails, setProductDetails] = useState({})
  const [comments, setComments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [response, setResponse] = useState("")
  const { logsOutIfTokenHasExpired, token } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    getProductDetails(productId)
    getComments(productId)
    logsOutIfTokenHasExpired()
  }, [productId])

  return (
    <div className='product-page'>
      <Modal show={showModal} message={response} setShowModal={setShowModal} />
      <ProductDetailsForm product={productDetails} />
      <CommentsForm productId={productId} setComments={setComments} getComments={getComments} />
      <CommentList productId={productId} comments={comments} />
    </div>
  )

  async function getProductDetails(id) {
    try {
      const response = await axiosInstance.get(`/products/${id}`, { headers: { authorization: `Bearer ${token}` } })
      setProductDetails(response.data)
    } catch (error) {
      setResponse(error.response.data)
      setShowModal(true)
    }
  }

  async function getComments(id) {
    try {
      const response = await axiosInstance.get(`/comments/${id}`, { headers: { authorization: `Bearer ${token}` } })
      console.log(response.data)
      setComments(response.data)
    } catch (error) {
      setResponse(error.response.data)
      setShowModal(true)
    }
  }
}
