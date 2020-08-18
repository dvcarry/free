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
        return await Axios.post('login', user)                
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchQuestions = async () => {
    try { 
        return await Axios.get('questions')                
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchTodayQuestions = async (user_id) => {
    try { 
        return await Axios.get('todayquestions/' + user_id)                
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchAddAnswers = async (user_id, question, text, date) => {
    try { 
        return await Axios.post('answers', {user_id, question, text, date})                
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchGetAnswers = async (user_id) => {
    try { 
        return await Axios.get('answers/' + user_id)                
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchGetAnswer = async (post_id) => {
    try { 
        return await Axios.get('posts/' + post_id)                
    } catch (error) {
        console.log(error.message)
    }
}
