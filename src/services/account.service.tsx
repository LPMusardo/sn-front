import Axios from './caller.service'

const login = (credentials: any) => {
    return Axios.post('/users/login', credentials)
}

const saveToken = (token: string) => {
    localStorage.setItem('token', token)
}

const logout = () => {
    localStorage.removeItem('token')
}

const isLogged = () => {
    const token = localStorage.getItem('token')
    return !!token
}

const getToken = () => {
    return localStorage.getItem('token')
}

export const accountService = {
    saveToken, logout, isLogged, getToken
, login}