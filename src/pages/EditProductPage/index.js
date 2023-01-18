import { useEffect, useState } from "react"
import EditProductForm from "../../components/EditProductForm"
import "./EditProductPage.scss"
import { useParams } from "react-router-dom"
import Modal from "../../components/Modal"
import axiosInstance from "../../utils/axiosInstance"
import CircularProgress from '@mui/material/CircularProgress';

export default function EditProductPage() {
    const [productDetails, setProductDetails] = useState()
    const [response, setResponse] = useState('')
    const [showModal, setShowModal] = useState(false)

    const { productId } = useParams()

    useEffect(() => {
        getProductDetails(productId)
    }, [productId])

    if (!productDetails?.name) return <div className='cart-page'><CircularProgress /></div>
    
  return (
      <div className='edit-product-page'>
          <Modal message={response} showModal={showModal} />
          <EditProductForm product={ productDetails } />
    </div>
    )
    
    async function getProductDetails(id) {
        try {
            const response = await axiosInstance.get(`/products/${id}`)
            setProductDetails(response.data)
        } catch (error) {
        setResponse(error.response.data)
        setShowModal(true)
        }
    }
}
