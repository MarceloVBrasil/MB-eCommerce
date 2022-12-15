import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../../components/ProductList";
import axiosInstance from "../../utils/axiosInstance";
import "./HomePage.scss";
import { useUser } from "../../contexts/UserProvider"
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';

export default function HomePage() {
  const {token, user, getTotalQuantityInCart} = useUser()
  const [searchParams, setSearchParams] = useSearchParams()
  const sessionCheckoutId = searchParams.get("sessionId")
  const [paymentStatus, setPaymentStatus] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if(sessionCheckoutId)
    createNewPaymentOrder(sessionCheckoutId)
  }, [])

  document.title = "MB eCommerce | Home";
  return (
    <div className="homepage">
      {paymentStatus === "pending" && <div className="homepage-payment-success homepage-payment-pending">
        <PendingIcon className="homepage-payment-success__icon" />
        <p className="homepage-payment-success__text">Order Pending</p>
      </div>}
      {paymentStatus === "success" && <div className="homepage-payment-success">
        <p className="homepage-payment-success__close-button" onClick={() => setPaymentStatus("")}>&times;</p>
        <CheckCircleOutlineIcon className="homepage-payment-success__icon" />
        <p className="homepage-payment-success__text">Order Received</p>
      </div>}
      <ProductList />
    </div>
  );

  async function createNewPaymentOrder(sessionId) {
    try {
      setPaymentStatus("pending")
      const response = await axiosInstance.get(`/orders?sessionId=${sessionId}&userId=${user.id}`, { headers: { authorization: `Bearer ${token}` } })
      navigate("/")
      getTotalQuantityInCart(user.id)
      if (response.status === 400) alert(response.data)
      else setPaymentStatus("success")
    }
    catch (error) {
      alert(error.response.data)
    }
  }
}
