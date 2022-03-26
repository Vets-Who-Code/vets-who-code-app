import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import ThemeProvider from '../store/ThemeProvider'
import Nav from './Nav'
import Footer from './Footer'

const TemplateWrapper = ({ children }) => (
  <div>
    <ThemeProvider>
      <main className="main_container">
        <ToastContainer />
        <Nav />
        {children}
        <Footer />
      </main>
    </ThemeProvider>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.node,
}

export default TemplateWrapper
