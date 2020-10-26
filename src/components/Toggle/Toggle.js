import { useContext } from 'react'
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
          name="mode"
          type="checkbox"
          id="toggle"
          className="btn-toggle sr-only"
          checked={colorMode === 'dark'}
          onChange={event => {
            setColorMode(event.target.checked ? 'dark' : 'light')
          }}
        />
        {colorMode === 'light' ? (
          <FaMoon
            role="checkbox"
            aria-checked="false"
            className="moon"
            name="dark mode"
            aria-label="dark mode"
            title="dark mode"
            size={size}
          />
        ) : (
          <FaSun
            role="checkbox"
            aria-checked="true"
            className="sun"
            name="light mode"
            aria-label="light mode"
            title="light mode"
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
