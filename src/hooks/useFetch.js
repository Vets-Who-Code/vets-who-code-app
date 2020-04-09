import { useState, useEffect } from 'react'
const useFetch = (url, options) => {
  const [data, setData] = useState({ title: '' })
  const [loading, setLoading] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        const data = await response.json()
        if (isSubscribed) {
          setData(data)
          setLoading(false)
          console.log('Fetch Data: ', data)
        }
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    fetchData()
    return () => setIsSubscribed(false)
  }, [])
  return { data, loading, error }
}

export default useFetch
