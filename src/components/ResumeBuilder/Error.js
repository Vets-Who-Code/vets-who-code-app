import React from 'react'
import { useRouter } from 'next/router'
import '../../assets/css/resumebuilder.css'


const Error = () => {
  const router = useRouter()
  return (
    <div>
      <h1>Error! Page Not Found!</h1>
      <button type="button" onClick={() => router.push('./Landing.js')}>
        Go Back
      </button>
    </div>
  )
}

export default Error
