import { useState } from 'react'

import Form from './Form'

export default function SignupCard() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: ""
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState()

  const handleSumbit = async () => {
    setLoading(true)
  
    const options = {
      method: 'POST',
      body: JSON.stringify(formData)
    }

    const request = await fetch('http://localhost:8000/users/create', options)
    const response = await request.json()

    setResult(response)
    setLoading(false)
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