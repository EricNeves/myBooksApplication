import {
  createContext, useState, useEffect
} from 'react'

import { api } from '../api'

const Context = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if(token) {
      api.defaults.headers.Authorization = JSON.parse(token)
      setUser(token)
    } 
  }, [])

  const signIn = async ({ email, password }) => {
    const request = await api.post('/users/auth', { email, password })

    if (request.data && request.data.jwt) {
      setToken(request.data.jwt)
      setUser(true)
      return true
    }

    return false
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('jwt')
    api.defaults.headers.Authorization = undefined
    return true
  }

  const setToken = token => {
    localStorage.setItem('jwt', JSON.stringify(`Bearer ${token}`))
    api.defaults.headers.Authorization = `Bearer ${token}`
  }

  return (
    <Context.Provider value={{ signIn, signOut, user }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }
