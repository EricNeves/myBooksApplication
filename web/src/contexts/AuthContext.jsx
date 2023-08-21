import { useEffect } from 'react'
import {
  createContext, useState
} from 'react'

const Context = createContext()

const AuthProvider = ({ children }) => {
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [authorization, setAuthorization] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      setAuthorization({
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.vA2zHLz_t717ZlMyi5g1ePJGyOUbo8vx8fUPLwjwKUc`
      })
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
    
    response?.error ? null : window.location.href = '/dashboard' 
  }

  return (
    <Context.Provider value={{ 
      handleLogin, result, loading, authorization
     }}>
      {children}
    </Context.Provider>
  )
}

export { Context, AuthProvider }
