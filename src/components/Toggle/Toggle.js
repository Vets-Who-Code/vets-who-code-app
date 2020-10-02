import React, { useState, useEffect } from 'react'
import './toggle.css'
import { FaSun, FiMoon } from 'react-icons/fa'

function Toggle() {
  const [colorMode, rawSetColorMode] = useState(undefined)

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.getAttribute('color-mode')
    rawSetColorMode(initialColorValue)
  }, [])
  console.log(colorMode)

  const setColorMode = newValue => {
    const root = window.document.documentElement
    rawSetColorMode(newValue)
    localStorage.setItem('color-mode', newValue)

    root.setAttribute('color-mode', newValue === 'light' ? 'light' : 'dark')
  }
  if (!colorMode) return null

  return (
    <div className="toggle-container">
      <label htmlFor="toggle" className="switch">
        <input
          type="checkbox"
          id="toggle"
          checked={colorMode === 'dark'}
          className="btn-toggle"
          onClick={event => {
            setColorMode(event.target.checked ? 'dark' : 'light')
          }}
        />
        Dark Mode
      </label>
    </div>
  )
}
export default Toggle
