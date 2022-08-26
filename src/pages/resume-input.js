import Link  from 'next/link'
import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'


const ResumeInput = () => {
  return (
    <>
    <NextSeo title='Resume Information'/>
    <PageHeader />
    <div className='container'>
      <h1>Contact</h1>
      <Link href="/confirmation" passHref>
        <button className="btn-className">Next</button>
</Link>
    </div>
    </>
  )
}

export default ResumeInput
