import React, { useEffect, useState } from 'react'

const PREFIX = 'MBeCommerce-'
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)

        if(!jsonValue) return initialValue

        return JSON.parse(jsonValue)
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}
