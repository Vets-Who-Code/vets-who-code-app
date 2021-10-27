import { StaticImage } from 'gatsby-plugin-image'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'

function Donate() {
  return (
    <>
      <SEO title="Donate" />
      <PageHeader />
      <section id="cause_single" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Donate to #VetsWhoCode</h1>
              <p>
                <i>
                  Thank you for choosing to support #VetsWhoCode. Here we have a few ways to support
                  our organization.
                </i>
              </p>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="story col-md-12">
                <h2>Individual Contributions</h2>
                <div className="iframe-container embed-responsive">
                  <iframe
                    title="#VWC Donorbox"
                    src="https://donorbox.org/embed/vetswhocode-donation?show_content=true"
                    seamless="seamless"
                    name="donorbox"
                    scrolling="yes"
                    allowpaymentrequest="true"
                    frameBorder={0}
                    tabIndex={0}
                  />
                </div>
              </div>
              <div className="story col-sm-4">
                <h3>Corporate Giving</h3>
                <StaticImage
                  src="../images/corporate-giving.jpeg"
                  alt="Corporate Giving"
                  width={1000}
                  height={500}
                />
                <p>
                  To ensure ease for those interested in supporting on the corporate level, we have
                  created accounts on{' '}
                  <a href="https://causes.benevity.org/causes/840-862122804">Benevity</a> and{' '}
                  <a href="https://www.brightfunds.org/organizations/vets-who-code-inc">
                    Brightfunds
                  </a>{' '}
                  to make it easy for your employees and company to donate to our cause.
                </p>
              </div>
              <div className="story col-sm-4">
                <h3>Github Sponsors</h3>
                <StaticImage
                  src="../images/github-sponsors.jpeg"
                  alt="Github Sponsors"
                  width={1000}
                  height={500}
                />
                <p>
                  We are an open source project and are a part of the Github Sponsors program. If
                  you would like to sponsor us, please visit our{' '}
                  <a href="https://github.com/sponsors/Vets-Who-Code">Github Sponsors page</a> to
                  learn more.
                </p>
              </div>
              <div className="story col-sm-4">
                <h3>Amazon Smile</h3>
                <StaticImage
                  src="../images/amazon-smile.jpeg"
                  alt="Amazon Smile"
                  width={1000}
                  height={500}
                />
                <p>
                  Looking to give while shopping? We have a{' '}
                  <a href="https://smile.amazon.com/ch/86-2122804">Smile</a> account to make it easy
                  for you to give while shopping to your hearts content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="cause_single section bg-default single pad-regular"
        style={{ paddingTop: '0px' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="cause_section_content">
                <div className="testimonial-row">
                  <StaticImage
                    src="../images/john-garcia.png"
                    alt="John Garcia"
                    style={{ height: 200, width: 200 }}
                  />
                  <blockquote className="testimonial-text">
                    <p>
                      &quot;VWC helped me gain the technical knowledge I needed in order to get the
                      attention of employers. The guidance, support and experience I had going
                      through the program continues to help me in my role as a full time web
                      developer.&quot;
                      <br /> - John Garcia, USAF | Web Developer, Hearst Media
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Donate
