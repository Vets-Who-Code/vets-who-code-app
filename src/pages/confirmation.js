import CheckCircle from '../images/check-circle.png'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'

function Confirmation() {
  return (
    <>
      <NextSeo title="Confirmation" />
      <PageHeader />
      <div className="resume-container">
        <div className="rc-response">
          <Image src={CheckCircle} alt="Green Check" />
          <h1>Here's Your Resume!</h1>
          <h3>Now that you have an awesome resume, time to go get that dream job!</h3>
          <div className="rc-response__action">
            <Link href="/resume-builder" passHref>
              <button className="btn btn-cr">Create New Resume</button>
            </Link>
            <Link href="/" passHref>
              <a id="rtrn-vwc">Back to VWC</a>
            </Link>
          </div>
        </div>

        <div className="dwnld-error">
          <p>
            If your resume did not automatically download,{' '}
            <a href=" " id="dwnld-error__link">
              click here
            </a>{' '}
            to download it.
          </p>
        </div>
      </div>
    </>
  )
}

export default Confirmation
