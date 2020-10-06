import * as React from 'react'
import PropTypes from 'prop-types'
function SvgContentful({ size, color, style }) {
  const computedSize = size || '1em'
  return (
    <svg
      viewBox="0 0 134 134"
      width={computedSize}
      height={computedSize}
      style={{ color: color || style }}
    >
      <circle fill="#fff" r={67} cy={67} cx={67} />
      <path
        d="M54.6 82.5c-4-4-6.4-9.4-6.4-15.5 0-6 2.5-11.5 6.4-15.5 3.4-3.4 3.4-8.8 0-12.2-3.4-3.4-8.8-3.4-12.2 0C35.4 46.4 31 56.2 31 67s4.4 20.6 11.5 27.6c3.4 3.4 8.8 3.4 12.2 0 3.3-3.3 3.3-8.7-.1-12.1z"
        fill={color || `currentColor`}
      />
      <path
        d="M54.6 51.5c4-4 9.4-6.4 15.5-6.4 6 0 11.5 2.5 15.5 6.4 3.4 3.4 8.8 3.4 12.2 0 3.4-3.4 3.4-8.8 0-12.2-7.1-7.1-16.8-11.5-27.6-11.5s-20.6 4.4-27.6 11.5c-3.4 3.4-3.4 8.8 0 12.2 3.2 3.4 8.6 3.4 12 0zM85.6 82.5c-4 4-9.4 6.4-15.5 6.4-6 0-11.5-2.5-15.5-6.4-3.4-3.4-8.8-3.4-12.2 0-3.4 3.4-3.4 8.8 0 12.2 7.1 7.1 16.8 11.5 27.6 11.5s20.6-4.4 27.6-11.5c3.4-3.4 3.4-8.8 0-12.2-3.2-3.4-8.7-3.4-12 0z"
        fill={color || `currentColor`}
      />
      <circle cy={45.5} cx={48.5} transform="rotate(-45.017 48.523 45.455)" r={8.6} />
      <circle cy={88.6} cx={48.5} transform="rotate(-45.017 48.521 88.576)" r={8.6} />
    </svg>
  )
}
SvgContentful.propTypes = {
  size: PropTypes.string || PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.string,
}

export default SvgContentful
