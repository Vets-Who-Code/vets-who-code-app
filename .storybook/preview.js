import './../src/assets/lib/bootstrap/dist/css/bootstrap.min.css'
import './../src/assets/css/main.css'
import './../src/assets/css/custom.css'
import 'react-toastify/dist/ReactToastify.css'
import 'typeface-roboto-slab'
import 'typeface-source-sans-pro'
import 'typeface-lato'
import React, { createContext, useState, useEffect } from 'react'
import { action } from "@storybook/addon-actions"
import { useDarkMode } from 'storybook-dark-mode'
// import ThemeProvider from '../src/store/ThemeProvider';

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {}, hovering: () => {},
}
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/"

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

// Custom ThemeProvider for Storybook dark mode toggle
const ThemeContext = createContext({})

function ThemeProvider({ children, mode, }) {
  const [colorMode] = useState(mode)

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('color-mode', mode === 'light' ? 'light' : 'dark')
  }, [mode])

  return (
    <ThemeContext.Provider value={{ colorMode }}>{children}</ThemeContext.Provider>
  )
}

export const decorators = [
  (Story) => {
    const mode = useDarkMode() ? 'dark' : 'light'
    return (
      <ThemeProvider mode={mode} style={{ margin: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  }
]
