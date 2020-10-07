import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const ThemeContext = createContext({})

function ThemeProvider({ children }) {
  const [colorMode, rawSetColorMode] = useState(undefined)

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.getAttribute('color-mode')
    rawSetColorMode(initialColorValue)
  }, [])

  function setColorMode(value) {
    console.log('value:', value)
    // const root = window.document.documentElement
    rawSetColorMode(value)
    // localStorage.setItem('color-mode', value)
    // root.setAttribute('color-mode', value === 'light' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>{children}</ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.any,
}

export default ThemeProvider
