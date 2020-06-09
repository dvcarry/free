import Axios from "axios"

Axios.defaults.baseURL = 'http://localhost:3000/';


export const addNewUser = async (user) => {
    try {
        return await Axios.post('registration', user)                
    } catch (error) {
        console.log(error.message)
    }
}

export const login = async (user) => {
    try {
        // const data = await Axios.post('login', user)
        // console.log(data)
        return await Axios.post('login', user)                
    } catch (error) {
        console.log(error.message)
    }
}