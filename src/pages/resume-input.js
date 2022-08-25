import React from 'react'
import { useRouter } from 'next/router'
import PageHeader from '@/components/PageHeader'
import { NextSeo } from 'next-seo'


const ResumeInput = () => {
  const router = useRouter()
  return (
    <>
    <NextSeo title='Resume Information'/>
    <PageHeader />
    <div>
      <h1>Contact</h1>
      <button type="button" onClick={() => router.push('./Confirmation.js')}></button>
    </div>
    </>
  )
}

export default ResumeInput
