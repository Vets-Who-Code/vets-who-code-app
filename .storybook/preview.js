// import all css files from the assets folder
import './../src/assets/lib/bootstrap/dist/css/bootstrap.min.css'
import './../src/assets/css/main.css'
import './../src/assets/css/custom.css'
import './../src/assets/css/apply-form.css'
import './../src/assets/css/board.css'
import './../src/assets/css/card.css'
import './../src/assets/css/code-of-conduct.css'
import './../src/assets/css/job-form.css'
import './../src/assets/css/loader.css'
import './../src/assets/css/nav.css'
import './../src/assets/css/pagination.css'
import './../src/assets/css/toggle.css'
import './../src/assets/css/video.css'


import React, { createContext, useState, useEffect } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import * as NextImage from "next/image";

// Override the default next image
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

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
      <ThemeProvider mode={mode} style={{ margin: '3rem', paddin: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  }
]
