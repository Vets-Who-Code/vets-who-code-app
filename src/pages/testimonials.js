import { NextSeo } from 'next-seo'
import PageHeader from '../components/PageHeader'
import { getTestimonials } from '@/utilities/testimonials'
import TestimonialCard from '@/components/Testimonal/TestimonialCard'

function Testimonial() {
  return (
    <>
      <NextSeo title="Testimonials" />
      <PageHeader />
      <section id="about" className="small-top-pad section bg-default">
        <div className="container" href="main">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Testimonials</h1>
              <p>
                <i>
                  While we are proud of all the veterans we have helped at #VetsWhoCode, here are
                  just a few of our incredible success stories.
                </i>
              </p>
            </div>
            <div className="col-md-12">
              {getTestimonials().map(testimonial => {
                return <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonial
