import { useState } from 'react'

export const useFormData = initialState => {
  const [formData, setFormData] = useState(initialState)
  return [
    formData,
    e => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  ]
}
