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
          role="switch"
          title="Switch to Dark Mode"
          name="mode"
          type="checkbox"
          id="toggle"
          checked={colorMode === 'dark'}
          className="btn-toggle"
          onChange={event => {
            setColorMode(event.target.checked ? 'dark' : 'light')
          }}
        />
        {colorMode === 'light' ? (
          <FaMoon
            tabIndex="0"
            role="switch"
            aria-checked="false"
            title="light mode"
            aria-label="dark mode"
            size={size}
          />
        ) : (
          <FaSun
            tabIndex="0"
            role="switch"
            aria-checked="true"
            title="dark mode"
            aria-label="light mode"
            size={size}
          />
        )}
      </label>
    </div>
  )
}

Toggle.propTypes = {
  size: PropTypes.number,
}

export default Toggle
