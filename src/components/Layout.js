import PropTypes from 'prop-types'
import { ToastContainer } from 'react-toastify'
import ThemeProvider from '../store/ThemeProvider'
import Nav from './Nav'
import Footer from './Footer'
import 'react-toastify/dist/ReactToastify.css'

const TemplateWrapper = ({ children }) => (
  <>
    <ThemeProvider>
      <main className="main_container">
        <ToastContainer />
        <Nav />
        {children}
        <Footer />
      </main>
    </ThemeProvider>
  </>
)

TemplateWrapper.propTypes = {
  children: PropTypes.any,
}

export default TemplateWrapper
