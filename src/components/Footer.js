import React from "react";
import Link from "gatsby-link";

const Footer = () => (
  <div>
    <section className="footer-widgets pad-extra">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="widgets-content footer-widget-wrap">
              <h3 className="widgets-title">About #VetsWhoCode</h3>
              <p>
                FRAGO, doing business as #VetsWhoCode, is an exempt organization
                as described in Section 501(c)(3) of the Internal Revenue Code.
                Our EIN is 47-3555231.
              </p>
              <div className="footer-social">
                <a href="http://bit.ly/vetswhocode-fb">
                  <i className="fa fa-facebook-f" />
                </a>
                <a href="http://bit.ly/vets-who-code-twitter">
                  <i className="fa fa-twitter" />
                </a>
                <a href="http://bit.ly/2omsjdX">
                  <i className="fa fa-codepen" />
                </a>
                <a href="https://bit.ly/2sJ6W9f">
                  <i className="fa fa-instagram" />
                </a>
                <a href="https://bit.ly/2sFKi1u">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="https://open.spotify.com/user/eflxajj8zjvqh6u2nwd1ocnsd/playlist/4uAXMY3yCzKU8gl4Qf9XXF?si=ODJFYH7gSpqCv2kMY4msFQ">
                  <i className="fa fa-spotify" />
                </a>
                <a href="https://github.com/Vets-Who-Code">
                  <i className="fa fa-github" />
                </a>
              </div>
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
                        <Link to="/syllabus">Syllabus</Link>
                      </li>
                      <li>
                        <Link to="/mentor">Mentor</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="widgets-content">
                    <ul className="widgets-list">
                      <li>
                        <Link to="/apply">Apply</Link>
                      </li>
                      <li>
                        <Link to="/donate">Donate</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <a
                          href="https://medium.com/vets-who-code"
                          target="_blank"
                        >
                          <span>Blog</span>
                        </a>
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
                <p>
                  <span>
                    Hi, if you have any questions, please drop us a line.
                  </span>
                  <br />Email: hello@vetswhocode.io
                  <br />Phone: (917) 960-3806
                </p>
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
            <p className="copyright">&copy; #VetsWhoCode</p>
          </div>
          <div className="col-md-6 col-sm-6">
            <ul className="footer-menu">
              <li>
                Made with <span className="fa fa-heart red" /> By #VetsWhoCode.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
