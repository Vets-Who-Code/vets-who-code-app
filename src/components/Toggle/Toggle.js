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
          title="Switch to Dark Mode"
          name="mode"
          type="checkbox"
          id="toggle"
          className="btn-toggle sr-only"
          onChange={event => {
            setColorMode(event.target.checked ? 'dark' : 'light')
          }}
        />
        {colorMode === 'light' ? (
          <FaMoon className="moon" title="light mode" size={size} />
        ) : (
          <FaSun className="sun" title="dark mode" size={size} />
        )}
      </label>
    </div>
  )
}

Toggle.propTypes = {
  size: PropTypes.number,
}

export default Toggle
