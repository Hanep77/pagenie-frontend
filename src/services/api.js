import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const clearStoredAuth = () => {
  localStorage.removeItem('pagecraft-auth')
}

api.interceptors.request.use((config) => {
  const persistedAuth = localStorage.getItem('pagecraft-auth')

  if (persistedAuth) {
    try {
      const { state } = JSON.parse(persistedAuth)
      const token = state?.token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch {
      clearStoredAuth()
    }
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredAuth()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default api
