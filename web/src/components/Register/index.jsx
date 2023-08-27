import { useState } from 'react'

import Form from './Form'
import { api } from '../../api'

export default function SignupCard() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: ""
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState()

  const handleSumbit = async () => {
    setLoading(true)

    try {
      const request = await api.post('/users/create', formData)
      const response = await request.data

      setResult(response)
      setLoading(false)
    } catch (err) {
      setResult(err?.response?.data)
      setLoading(false)
    }
  }

  const updatedField = event => {
    setFormData(old => {
      return {
        ...old,
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <Form
      updatedField={updatedField}
      loading={loading}
      handleSumbit={handleSumbit}
      result={result}
    />
  )
}