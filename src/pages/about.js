import { useRef, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'
import facebookVideo from '../video/vwc-facebook-reel.mp4'
import { FaStar } from 'react-icons/fa'

function About() {
  const videoRef = useRef()

  function play() {
    videoRef.current.play()
    videoRef.current.onended = end
  }

  useEffect(() => {
    let current = true

    if (current) {
      play()
    }

    return () => (current = false)
  })

  function end() {
    document.querySelector('.success-video').style.display = 'none'
    document.querySelector('.vwc-animated-gif').style.display = 'block'
  }

  return (
    <>
      <NextSeo title="About Us" />
      <PageHeader />
      <section id="about" className="small-top-pad section bg-default">
        <div id="skip_to_content" className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">About Us</h1>
              <p>
                <i>
                  RETOOL &nbsp;
                  <FaStar height={20} width={20} aria-hidden="true" />
                  &nbsp; RETRAIN &nbsp;
                  <FaStar height={20} width={20} aria-hidden="true" />
                  &nbsp; RELAUNCH
                </i>
              </p>
            </div>
            <div className="col-md-12" style={{ marginBottom: 20 }}>
              <div className="success-video" style={{ position: 'relative' }}>
                <video
                  onPlay={play}
                  ref={videoRef}
                  type="video/mp4"
                  className="img-responsive"
                  muted
                  controls
                  style={{ minHeight: 400 }}
                >
                  <source src={facebookVideo} />
                </video>
              </div>
              <div
                className="vwc-animated-gif"
                style={{
                  backgroundImage: 'url("/images/vwc.gif")',
                  backgroundPosition: 'center center',
                  backgroundSize: 'auto',
                  display: 'none',
                }}
                role="presentation"
              />
            </div>
            <div className="col-md-12">
              <div className="success-story">
                <h2>Who We Are</h2>
                &nbsp;
                <p className="story-first">
                  Launched in 2014, #VetsWhoCode is a non- profit dedicated to filling the wide
                  chasm between technical expertise needed and available with America’s best.
                </p>
                <p className="story">
                  Vets Who Code is a reintegration solution for veterans who believe in the
                  principle of &quot;To Teach a Man To Fish&quot; to better prepare early-stage
                  transitioning veterans who are returning to the workforce. Many veterans are un-
                  and under-employed. Some have a deep desire to be independent business owners.
                  Their skill sets are desperately needed to enhance local economies and drive
                  innovation. Vets Who Code serves as a launch pad for our veterans and military
                  spouses.
                </p>
                <p className="story">
                  Our vision is to close the digital talent gap and ease career transition for
                  military veterans, through software development training. We believe that those
                  who serve in uniform can be the digital economy’s most productive and innovative
                  assets. #VetsWhoCode prepares them to enter society with new skills for exciting
                  careers.
                </p>
                <p className="story">
                  Post 9/11 veterans are considered a “vulnerable population.” This is due to the
                  fact that the majority of Veteran Services aren’t designed for us, but for Vets
                  from the Vietnam Era. Employment, education, and what we call “ ground zero
                  issues” are all vastly different from those who came before us
                </p>
                <p className="story">
                  Despite the difference in our generations, the same protocols and policies are
                  being used—and worse than that—they are being used reactively. Our goal is to
                  create a suite of digital applications and services that will empower veterans and
                  guide them through a successful integration back into civilian life. #VetsWhoCode
                  is a reintegration solution for veterans that believes in the principle of “To
                  Teach a Man To Fish” to revitalize early stage transitioning veterans. Many
                  veterans are not homeless, but are un- and under- employed. Some have a deep
                  desire to be independent business owners. Their skill sets are desperately needed
                  to enhance local economies and to drive innovation. #VetsWhoCode is a conversion
                  point and launch pad for these veterans.
                </p>
                <h2>What We Do</h2>
                &nbsp;
                <p className="story">
                  #VetsWhoCode is a streamlined, highly selective software development training
                  program intent on transitioning military veterans into the vacancies of the tech
                  sector.
                </p>
                <p className="story">
                  #VetsWhoCode was founded by vets who themselves faced the realties of
                  transitioning. We don’t focus our energy on marketing ploys, or on how many people
                  we can funnel through a pipeline. Instead, we choose quality over quantity, and
                  tangible results over lofty ideals.
                </p>
                <h2>How We Do This</h2>
                &nbsp;
                <p className="story">
                  How we accomplish this mission is through a process of <i>Crawl, Walk, Run</i>
                  &nbsp;where we build upon each lesson in deeper dives so that veterans become
                  better programmers through each iteration. Instructors leading the program are
                  also veterans, programmers, and alumni of the program. There are no excuses, the
                  instructor has been through every success and failure you will experience and has
                  ultimately succeeded on the path of becoming a paid programmer.
                </p>
                <p className="story">
                  We are solution-based and action-oriented. If our students can’t make money with
                  it, then we don’t bother teaching it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
