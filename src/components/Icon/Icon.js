import React from 'react'
import PropTypes from 'prop-types'
import iconMap from './iconMap.json'

function Icon({ height = 14, width = 20, iconName, fill = '#FFF', className = '' }) {
  return (
    <i className="fa">
      <svg
        aria-hidden="true"
        className={className}
        focusable="false"
        data-prefix="fab"
        data-icon={iconName}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width}
        viewBox={iconMap[iconName].viewBox}
      >
        <path fill={fill} d={iconMap[iconName].path}></path>
      </svg>
    </i>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  iconName: PropTypes.string.isRequired,
  width: PropTypes.number,
}

export default Icon
