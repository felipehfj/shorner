import axios from 'axios';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept': "*/*"
  },
})

export default api;