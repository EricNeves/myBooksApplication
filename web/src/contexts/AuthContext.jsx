import { useEffect } from 'react'
import {
  createContext, useState
} from 'react'

const Context = createContext()

const AuthProvider = ({ children }) => {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [authorization, setAuthorization] = useState("")
  const [authenticated, setAuthenticated] = useState()

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      setAuthenticated({
        auth: true
      })
      setAuthorization(`Bearer ${JSON.parse(token)}`)
    } 
  },[])

  const handleLogin = async (data) => {
    setLoading(true)

    const options = {
      method: 'POST',
      body: JSON.stringify(data)
    }

    const request = await fetch('http://localhost:8000/users/auth', options)
    const response = await request.json()

    const { jwt } = response 

    localStorage.setItem('jwt', JSON.stringify(jwt))
    
    setResult(response)
    setLoading(false)

    setAuthenticated({
      auth: true
    })
  
    response?.error ? null : window.location.href = '/dashboard' 
  }

  const handleLogout = () => {
    setAuthenticated(false)

    localStorage.setItem('jwt', null)
    window.location.href = '/'
  }

  return (
    <Context.Provider value={{ 
      handleLogin, result, loading, authorization,
      authenticated, handleLogout
     }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }