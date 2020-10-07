import React, { useContext } from 'react'
import { ThemeContext } from '../../store/ThemeProvider'
import { FaSun, FaMoon } from 'react-icons/fa'

import './toggle.css'

function Toggle() {
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
        {colorMode === 'light' ? <FaMoon size="40" /> : <FaSun size="40" />}
      </label>
    </div>
  )
}

export default Toggle

/*   const [colorMode, rawSetColorMode] = useState(undefined)
  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.getAttribute('color-mode')
    rawSetColorMode(initialColorValue)
  }, [])

  const setColorMode = newValue => {
    const root = window.document.documentElement
    rawSetColorMode(newValue)
    localStorage.setItem('color-mode', newValue)

    root.setAttribute('color-mode', newValue === 'light' ? 'light' : 'dark')
  }
  if (!colorMode) return null
 */
