import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../../contexts/AuthContext'
import Form from './Form'

const Login = () => {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(Context)

  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)

    try {
      const login = await signIn(fields)
      if (login) {
        navigate('/dashboard')
      }
    } catch (err) {
      setResult(err?.response?.data)
      setLoading(false)
    }
  }

  const [fields, setFields] = useState({
    email: "",
    password: ""
  })

  const updatedFields = (event) => {
    setFields(old => {
      return {
        ...old,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <Form
      fields={fields}
      updatedFields={updatedFields}
      handleLogin={handleLogin}
      result={result}
      loading={loading}
    />
  )
}

export default Login