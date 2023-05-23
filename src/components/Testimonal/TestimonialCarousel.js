import { getTestimonials } from '@/utilities/testimonials'
import TestimonialCard from './TestimonialCard'
import Carousel from 'nuka-carousel'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const baseSettings = {
  autoplay: true,
  autoplayInterval: 10000,
  pauseOnHover: true,
  speed: 500,
  wrapAround: true,
  adaptiveHeight: true,
  height: '100%',
}

const previousSlide = ({ previousSlide }) => (
  <button className="close" onClick={previousSlide}>
    <BsArrowLeft size={30} />
  </button>
)

const nextSlide = ({ nextSlide }) => (
  <button className="close" onClick={nextSlide}>
    <BsArrowRight size={30} />
  </button>
)

function TestimonialCarousel() {
  return (
    <>
      <Carousel
        {...baseSettings}
        renderCenterLeftControls={previousSlide}
        renderCenterRightControls={nextSlide}
      >
        {getTestimonials().map(testimonial => {
          return <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        })}
      </Carousel>
    </>
  )
}

export default TestimonialCarousel
