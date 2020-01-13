import { useState } from 'react'

/**
 * Custom React hook that creates a formData state and a method
 * for handling value changes by form input.
 * @param {*} initialState
 * @returns {[any, function(Event): void]} The current formData and the update handler
 */
export const useFormData = initialState => {
  const [formData, setFormData] = useState(initialState)
  return [
    formData,
    e => {
      let value
      if (e.target.type === 'checkbox') {
        value = e.target.checked
      } else {
        value = e.target.value
      }
      setFormData({ ...formData, [e.target.name]: value })
    }
  ]
}
