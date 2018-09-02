import axios from 'axios'

const http = axios.create({
  baseURL: '/api',
  debug: process.env.NODE_ENV !== 'production',
})

export default http
