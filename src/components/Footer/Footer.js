import Link from 'gatsby-link'
import { StaticImage } from 'gatsby-plugin-image'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaRegCopyright,
  FaCoffee,
  FaCode,
  FaFlagUsa,
} from 'react-icons/fa'

function Footer() {
  return (
    <div>
      <section id="call-to-action-small" className="call-to-action-small">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2>Help Us Teach More Veterans How To Code &nbsp;</h2>
              <Link to="/donate" className="btn btn-charity-default">
                donate
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-widgets pad-extra">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="widgets-content footer-widget-wrap">
                <h3 className="widgets-title">About #VetsWhoCode</h3>
                <p>
                  Vets Who Code Inc. is an exempt organization as described in Section 501(c)(3) of
                  the Internal Revenue Code. Our EIN is 86-2122804.
                </p>
                <div className="footer-social">
                  <a href="http://bit.ly/vetswhocode-facebook-link" aria-label="Facebook">
                    <i className="fa">
                      <FaFacebookF />
                    </i>
                  </a>
                  <a href="http://bit.ly/vets-who-code-twitter" aria-label="Twitter">
                    <i className="fa">
                      <FaTwitter />
                    </i>
                  </a>
                  <a href="https://bit.ly/2sJ6W9f" aria-label="Instagram">
                    <i className="fa">
                      <FaInstagram />
                    </i>
                  </a>
                  <a href="https://bit.ly/2sFKi1u" aria-label="Linkedin">
                    <i className="fa">
                      <FaLinkedinIn />
                    </i>
                  </a>
                  <a href="https://bit.ly/2HSojjv" aria-label="Github">
                    <i className="fa">
                      <FaGithub />
                    </i>
                  </a>
                </div>
                <a href="https://www.guidestar.org/profile/86-2122804" aria-label="Guidestar">
                  <StaticImage
                    className="footer-guidestar"
                    src="../../images/guidestar.svg"
                    alt="guidestar seal"
                    placeholder="tracedSVG"
                    layout="constrained"
                    width="96"
                  />
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="footer-widget-wrap">
                <div className="row">
                  <div className="col-md-11 col-md-offset-1">
                    <h3 className="widgets-title">Site Map</h3>
                  </div>
                  <div className="col-md-5 col-md-offset-1">
                    <div className="widgets-content">
                      <ul className="widgets-list">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/about">About</Link>
                        </li>
                        <li>
                          <Link to="/board">Board</Link>
                        </li>
                        <li>
                          <Link to="/syllabus">Syllabus</Link>
                        </li>
                        <li>
                          <Link to="/code-of-conduct">Conduct</Link>
                        </li>
                        <li>
                          <Link to="/jobs">Job Search</Link>
                        </li>
                        <li>
                          <Link to="/testimonials">Testimonials</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="widgets-content">
                      <ul className="widgets-list">
                        <li>
                          <Link to="/blog">
                            <span>Blog</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/apply">Apply</Link>
                        </li>
                        <li>
                          <Link to="/donate">Donate</Link>
                        </li>
                        <li>
                          <Link to="/mentor">Mentor</Link>
                        </li>
                        <li>
                          <Link to="/podcast">Podcasts</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="widgets-content">
                <h3 className="widgets-title">Contact Us</h3>
                <div className="office map">
                  <p>Hi, if you have any questions, please drop us a line.</p>
                  <span>
                    <a
                      className="footer-span"
                      aria-label="Email hello@vetswhocode.io"
                      title="Email Contact"
                      href="hello@vetswhocode.io"
                    >
                      hello@vetswhocode.io
                    </a>
                  </span>
                  <p> Phone: (404) 383-4414</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer" className="section footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <p className="copyright">
                <FaRegCopyright color="#fff" />
                {new Date().getFullYear()}
                <span>
                  <a
                    className="footer-span"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Link to Copyright License"
                    title="Copyright"
                    href="https://github.com/Vets-Who-Code/vets-who-code-app/blob/master/LICENSE"
                  >
                    #VetsWhoCode
                  </a>
                </span>
              </p>
            </div>
            <div className="col-md-6 col-sm-6">
              <ul className="footer-menu">
                <li>
                  Made with <FaCoffee color="#C5203E" />, <FaCode color="#C5203E" />, and{' '}
                  <FaFlagUsa /> by the veterans of #VetsWhoCode.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
