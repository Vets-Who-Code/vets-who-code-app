import React, { useContext } from 'react'
import { ThemeContext } from '../../store/ThemeProvider'
import { FaSun, FaMoon } from 'react-icons/fa'
import PropTypes from 'prop-types'

import './toggle.css'

function Toggle({ size }) {
  const { colorMode, setColorMode } = useContext(ThemeContext)

  if (!colorMode) return null

  return (
    <div className="toggle-container">
      <label htmlFor="toggle" className="switch">
        <input
          type="checkbox"
          id="toggle"
          checked={colorMode === 'dark'}
          className="btn-toggle"
          onChange={event => {
            setColorMode(event.target.checked ? 'dark' : 'light')
          }}
        />
        {colorMode === 'light' ? <FaMoon size={size} /> : <FaSun size={size} />}
      </label>
    </div>
  )
}
Toggle.propTypes = {
  size: PropTypes.number,
}
export default Toggle
