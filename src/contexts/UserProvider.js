import React, {useContext, useEffect, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axiosInstance from "../utils/axiosInstance";

const userContext = React.createContext()

export function useUser() {
    return useContext(userContext)
}

export function UserProvider({ children }) {
    const [token, setToken] = useLocalStorage("token", "")
    const [user, setUser] = useLocalStorage("user", {})
    const [orders, setOrders] = useLocalStorage("myOrders", [])
    const [tokenExpiresIn, setTokenExpiresIn] = useLocalStorage("tokenExpiresIn", 0)
    const [isLoggedIn, setIsLoggedIn] = useState(token !== "")
    const [totalQuantityInCart, setTotalQuantityInCart] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [response, setResponse] = useState("")
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getTotalAmount(user.id)
    }, [])

    function logsOutIfTokenHasExpired(redirectTo) {
        if (Date.now() > tokenExpiresIn) {
            logOut()
            redirectTo("/login")
        }
    }
    
    function logIn(data) {
        const {token, ...user} = data
        setToken(token)
        setUser(user)
        setIsLoggedIn(true)
        setTokenExpiresIn(Date.now() + 24 * 60 * 60 * 1000) // 24h
    }

    function logOut() {
        setIsLoggedIn(false)
        localStorage.removeItem("MBeCommerce-token")
        localStorage.removeItem("MBeCommerce-user")
        localStorage.removeItem("MBeCommerce-myOrders")
        localStorage.removeItem("MBeCommerce-tokenExpiresIn")
    }

    async function getTotalQuantityInCart(userId) {
        let response = await axiosInstance.get(`/carts/${userId}`, { headers: { authorization: `Bearer ${token}` } }); 
        const cartId = response.data.id

        if (!cartId) return setTotalQuantityInCart(0)
        response = await axiosInstance.get(`/purchase/totalQuantity/${cartId}`, { headers: { authorization: `Bearer ${token}` } })
        if(!response.data) return setTotalQuantityInCart(0)
        return setTotalQuantityInCart(response.data)
    }

    async function getTotalAmount(userId) {
        let response = await axiosInstance.get(`/carts/${userId}`, { headers: { authorization: `Bearer ${token}` } }); 
        const cartId = response.data.id

        if (!cartId) return setTotalAmount(0)
        response = await axiosInstance.get(`/purchase/get/amount/${cartId}`, { headers: { authorization: `Bearer ${token}` } })
        return setTotalAmount(response.data)
    }

    async function getOrders(userId) {
        try {
            const response = await axiosInstance.get(`orders/${userId}`, { headers: { authorization: `Bearer ${token}` } })
            setOrders(response.data)
        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }

    const userContextValue = {
        token,
        logIn,
        logOut,
        isLoggedIn,
        user,
        setUser,
        getTotalQuantityInCart,
        totalQuantityInCart,
        totalAmount,
        getTotalAmount,
        setTotalQuantityInCart,
        setTotalAmount,
        orders,
        setOrders,
        response,
        setResponse,
        showModal,
        setShowModal,
        getOrders,
        logsOutIfTokenHasExpired
    }

    return (
        <userContext.Provider value={userContextValue}>
            {children}
        </userContext.Provider>
    )
}