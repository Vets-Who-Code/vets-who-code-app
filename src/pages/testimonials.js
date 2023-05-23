import Image from 'next/image'
import { NextSeo } from 'next-seo'
import PageHeader from '../components/PageHeader'
import { getTestimonials } from '@/utilities/testimonials'

const imageLoader = ({ src, width }) => {
  return `${src}?w=${width}`
}

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
              <div className="cause_section_content">
                {getTestimonials().map((testimonial, i) => {
                  return (
                    <div key={'testimonial' + i} className="testimonial-row">
                      <Image
                        src={'/../images/' + testimonial.image}
                        loader={imageLoader}
                        alt={testimonial.name}
                        height={200}
                        width={200}
                        placeholder="blur"
                        blurDataURL={'/../images/' + testimonial.image}
                      />
                      <blockquote className="testimonial-text">
                        <p>
                          &quot;{testimonial.text}&quot;
                          <br /> - {testimonial.signature}
                        </p>
                      </blockquote>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonial
