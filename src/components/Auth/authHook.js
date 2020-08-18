import { useState, useCallback, useEffect } from "react"

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [user, setUser] = useState(null)

    const login = useCallback((jwtToken, id, user) => {
        setToken(jwtToken)
        setUserId(id)
        setUser(user)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken,
            timer: user.timer, symbols: user.symbols
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId, { timer: data.timer, symbols: data.symbols })
        }

    }, [login])

    return { login, logout, token, userId, user }

}