import Link from 'next/link'
import Image from 'next/image'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCode,
  FaFlagUsa,
  FaCoffee,
  FaGithub,
  FaRegCopyright,
} from 'react-icons/fa'
import { ContactForm } from '@/components/Forms'

function Footer() {
  return (
    <div>
      <section id="call-to-action-small" className="call-to-action-small">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h2>Help Us Teach More Veterans How To Code &nbsp;</h2>
              <button className="donate">
                <Link href="/donate" className="btn btn-charity-default donate">
                  donate
                </Link>
              </button>
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
                <div className="footer-social" style={{ marginBottom: 10 }}>
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
                  <Image
                    className="footer-guidestar"
                    src="/images/guidestar.svg"
                    alt="guidestar seal"
                    width={96}
                    height={96}
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
                          <Link href="/">Home</Link>
                        </li>
                        <li>
                          <Link href="/about">About</Link>
                        </li>
                        <li>
                          <Link href="/board">Board</Link>
                        </li>
                        <li>
                          <Link href="/syllabus">Syllabus</Link>
                        </li>
                        <li>
                          <Link href="/code-of-conduct">Conduct</Link>
                        </li>
                        <li>
                          <Link href="/jobs">Job Search</Link>
                        </li>
                        <li>
                          <Link href="/testimonials">Testimonials</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="widgets-content">
                      <ul className="widgets-list">
                        <li>
                          <Link href="/blog">Blog</Link>
                        </li>
                        <li>
                          <Link href="/apply">Apply</Link>
                        </li>
                        <li>
                          <Link href="/donate">Donate</Link>
                        </li>
                        <li>
                          <Link href="/mentor">Mentor</Link>
                        </li>
                        <li>
                          <Link href="/podcast">Podcasts</Link>
                        </li>
                        <li>
                          <Link href="/contact">Contact Us</Link>
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
                <div>
                  <ContactForm disableNameAndPhone={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer id="footer" className="section footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <p className="copyright footer-menu">
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
            <div className="col-md-3 col-sm-6">
              <a
                className="footer-menu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vercel Link"
                href="https://vercel.com?utm_source=vetswhocode.io&utm_campaign=oss"
              >
                <Image
                  src="/images/powered-by-vercel.svg"
                  alt="vercel banner"
                  height={48}
                  width={196}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
