import PropTypes from 'prop-types'

function SvgVercel({ size, style }) {
  const computedSize = size || '1em'
  return (
    <svg viewBox="0 0 1155 1000" height={computedSize} width={computedSize} {...style}>
      <path fill="#FFF" d="M577.344 0L1154.69 1000H0L577.344 0Z" />
    </svg>
  )
}

SvgVercel.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  style: PropTypes.string,
}

export default SvgVercel
