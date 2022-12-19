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
    const [isLoggedIn, setIsLoggedIn] = useState(token !== "")
    const [totalQuantityInCart, setTotalQuantityInCart] = useState()
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        getTotalAmount(user.id)
    }, [])
    
    function logIn(data) {
        const {token, ...user} = data
        setToken(token)
        setUser(user)
        setIsLoggedIn(true)
    }

    function logOut() {
        setToken("")
        setUser({})
        setIsLoggedIn(false)
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

    const userContextValue = {
        token,
        logIn,
        logOut,
        isLoggedIn,
        user,
        getTotalQuantityInCart,
        totalQuantityInCart,
        totalAmount,
        getTotalAmount,
        setTotalQuantityInCart,
        setTotalAmount
    }

    return (
        <userContext.Provider value={userContextValue}>
            {children}
        </userContext.Provider>
    )
}