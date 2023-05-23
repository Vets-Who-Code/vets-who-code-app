import PropTypes from 'prop-types'
import Image from 'next/image'

const imageLoader = ({ src, width }) => {
  return `${src}?w=${width}`
}

function TestimonialCard({ testimonial }) {
  return (
    <>
      <div className="cause_section_content">
        <div className="testimonial-row">
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
      </div>
    </>
  )
}

TestimonialCard.propTypes = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
  signature: PropTypes.string,
})

export default TestimonialCard
