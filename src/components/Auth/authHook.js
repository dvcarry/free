import { useState, useCallback, useEffect } from "react"

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUderId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        console.log('login')
        setToken(jwtToken)
        setUderId(id)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    },[])

    const logout = useCallback(() => {
        setToken(null)
        setUderId(null)   
        localStorage.removeItem(storageName)     
    },[])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId)
        }

    }, [login])

    return {login, logout, token, userId}

}