import axios from 'axios'
import { BACKEND } from '@/config'

const instance = axios.create({
    baseURL: BACKEND,
    withCredentials: true
})

export default instance