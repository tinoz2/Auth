import axios from './axios.js'

const registerRequest = (data) => {
    return axios.post('/auth/register', data)
}

const loginRequest = (data) => {
    return axios.post('/auth/login', data)
}

const profileRequest = () => {
    return axios.get('/auth/profile')
}

const logoutRequest = () => {
    return axios.post('/auth/logout')
}

const usersRequest = () => {
    return axios.get('/auth/users')
}

const verifyEmail = (code) => {
    return axios.post('/auth/verify-email', code)
}

const forgotPassword = (email) => {
    return axios.post('/auth/forgot-password', email)
}

const resetPassword = (token, password) => {{
    return axios.post(`/auth/reset-password/${token}`, password)
}}

export {
    registerRequest,
    loginRequest,
    profileRequest,
    usersRequest,
    logoutRequest,
    verifyEmail,
    forgotPassword,
    resetPassword
}