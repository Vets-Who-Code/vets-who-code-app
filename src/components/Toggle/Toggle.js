import React, { useState, useEffect } from 'react'
import './toggle.css'
import { FaSun, FaMoon } from 'react-icons/fa'

function Toggle() {
  const [colorMode, rawSetColorMode] = useState(undefined)

  const closedStyle = {
    transition: `opacity 300ms linear`,
    opacity: '0',
  }
  const openStyle = {
    transition: `opacity 300ms linear`,
    opacity: '0',
  }

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
        {colorMode === 'light' ? <FaMoon size="40" /> : <FaSun size="40" />}
      </label>
    </div>
  )
}
export default Toggle
