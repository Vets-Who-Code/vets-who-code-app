import Link from 'next/link'
import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'

const ResumeInput = () => {
  return (
    <>
      <NextSeo title="Resume Information" />
      <PageHeader />
      <div className="container">
        <div class="resume-wrapper">
          <h1>Contact</h1>
          <Link href="/confirmation" passHref>
            <button className="btn btn-gr">Next</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ResumeInput