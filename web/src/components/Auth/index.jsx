import { useContext, useState } from 'react'

import { Context } from '../../contexts/AuthContext'
import Form from './Form'


const Login = () => {
  const {
    handleLogin, result, loading,
  } = useContext(Context)

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