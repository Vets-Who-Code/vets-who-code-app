import { useState } from 'react'

const useNormalizePhone = initialValue => {
  const [phone, setPhone] = useState(initialValue)
  return {
    phone,
    setPhone,
    onChange: event => {
      const { value } = event.target
      if (value) {
        setPhone(previousValue => normalizePhone(value, previousValue))
      }
    },
  }
}
export default useNormalizePhone

const normalizePhone = (value, previousValue) => {
  if (!value) return value

  const onlyNums = value.replace(/[^\d]/g, '') // only allows 0-9

  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 3) return `${onlyNums}`
    if (onlyNums.length === 6) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}-`

    if (onlyNums.length <= 3) return onlyNums
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`

    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
  }
}
