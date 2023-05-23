import { getTestimonials } from '@/utilities/testimonials'
import TestimonialCard from './TestimonialCard'
import Carousel from 'nuka-carousel'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useContext } from 'react'
import { ThemeContext } from '@/store/ThemeProvider'

const baseSettings = {
  autoplay: true,
  autoplayInterval: 10000,
  pauseOnHover: true,
  speed: 500,
  wrapAround: true,
  heightMode: 'current',
  height: '100%',
}

function TestimonialCarousel() {
  const { colorMode } = useContext(ThemeContext)

  const previousSlide = ({ previousSlide }) => (
    <button className="close" onClick={previousSlide}>
      <BsArrowLeft size={30} fill={colorMode === 'dark' ? 'white' : 'black'} />
    </button>
  )

  const nextSlide = ({ nextSlide }) => (
    <button className="close" onClick={nextSlide}>
      <BsArrowRight size={30} fill={colorMode === 'dark' ? 'white' : 'black'} />
    </button>
  )

  return (
    <>
      <Carousel
        {...baseSettings}
        renderCenterLeftControls={previousSlide}
        renderCenterRightControls={nextSlide}
        defaultControlsConfig={{
          pagingDotsStyle: {
            fill: colorMode === 'dark' ? 'white' : 'black',
          },
        }}
      >
        {getTestimonials().map(testimonial => {
          return <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        })}
      </Carousel>
    </>
  )
}

export default TestimonialCarousel
