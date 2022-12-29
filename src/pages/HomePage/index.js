import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../../components/ProductList";
import axiosInstance from "../../utils/axiosInstance";
import "./HomePage.scss";
import { useUser } from "../../contexts/UserProvider"
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from "../../components/Modal";

export default function HomePage() {
  const {token, user, getTotalQuantityInCart, getOrders, logsOutIfTokenHasExpired} = useUser()
  const [searchParams, setSearchParams] = useSearchParams()
  const sessionCheckoutId = searchParams.get("sessionId")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if(sessionCheckoutId)
    createNewPaymentOrder(sessionCheckoutId)
    getAllProducts()
    logsOutIfTokenHasExpired(navigate)
  }, [])
  if(!products[0]) return <div className='cart-page'><CircularProgress /></div>
  document.title = "MB eCommerce | Home";
  return (
    <div className="homepage">
    <Modal show={showModal} message={response} setShowModal={setShowModal}/>
      {paymentStatus === "pending" && <div className="homepage-payment-success homepage-payment-pending">
        <PendingIcon className="homepage-payment-success__icon" />
        <p className="homepage-payment-success__text">Order Pending</p>
      </div>}
      {paymentStatus === "success" && <div className="homepage-payment-success">
        <p className="homepage-payment-success__close-button" onClick={() => setPaymentStatus("")}>&times;</p>
        <CheckCircleOutlineIcon className="homepage-payment-success__icon" />
        <p className="homepage-payment-success__text">Order Received</p>
      </div>}
      <ProductList products={products}/>
    </div>
  );

  async function createNewPaymentOrder(sessionId) {
    try {
      setPaymentStatus("pending")
      const response = await axiosInstance.get(`/orders?sessionId=${sessionId}&userId=${user.id}`, { headers: { authorization: `Bearer ${token}` } })
      navigate("/")
      getTotalQuantityInCart(user.id)
      getOrders(user.id)
      if (response.status === 400) {
        setResponse(response.data)
        setShowModal(true)
      }
      else setPaymentStatus("success")
    }
    catch (error) {
      setResponse(response.response.data)
      setShowModal(true)
    }
  }

  async function getAllProducts() {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (error) {
      setResponse(error.response.data)
      setShowModal(true)
    }
  }
}