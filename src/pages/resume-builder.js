/* NOTE: This file name was renamed to resume-builder to make the path name 
read better when linked from the Nav component */
import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'
import Link from 'next/link'

function ResumeBuilder() {
  return (
    <>
      <NextSeo title="Resume Builder" />
      <PageHeader />

      <div className="container">
        <div className="resume-wrapper">
          <div className="landing-text">
            <h1 id="page-title">
              <span>#VetsWhoCode</span> Resume Builder
            </h1>
            {/* <h3>Create a Winning Resume</h3> */}
            <p>
              Our resume builder is easy to use with a range of functions tailored to meet the needs
              of U.S. military personnel transitioning out of the military and veterans.
            </p>
            <p>
              Custom-tailor resumes for any job within minutes! Build an easily customizable and
              simple resume in a few clicks!
            </p>
            <div className="landing-btn">
              <Link href="/resume-input" passHref>
                <button className="btn btn-gr">Next</button>
              </Link>
            </div>
          </div>
          <div className="landing-image">
            <img
              src="https://media.istockphoto.com/vectors/human-resources-management-concept-vector-id849410148?k=20&m=849410148&s=612x612&w=0&h=fipoIc30-fwyXh7oWMttTEOH3zAi6a-ONU4p8ca_XL4="
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeBuilder
