import Link from 'next/link'
import Image from 'next/image'
import Typed from 'react-typed'

function Header() {
  return (
    <section className="site-header flexslider classic overlay main-overlay">
      <Image
        layout="fill"
        blurDataURL="https://res.cloudinary.com/vetswhocode/image/upload/v1678667459/website-images/vetswhocode-background.jpg"
        placeholder="blur"
        src="https://res.cloudinary.com/vetswhocode/image/upload/v1678667459/website-images/vetswhocode-background.jpg"
        alt="image of code on a computer screen"
      />
      <div className="header-classic wrapper-table">
        <div className="valign-center">
          <div className="container">
            <div className="col-md-10 col-md-offset-1">
              <div className="intro text-left" style={{ color: '#fff' }}>
                <h1 className="subtitle">Vets Who Code</h1>
                <h2>
                  <Typed
                    style={{ fontFamily: 'Gotham, sans-serif' }}
                    className="typedString"
                    strings={[
                      'RESULTS DRIVEN',
                      '100% ONLINE',
                      'LEARN PRAGMATICALLY',
                      'PREPARED FOR THE INDUSTRY',
                    ]}
                    typeSpeed={70}
                    backSpeed={80}
                    smartBackspace
                    loop
                  />
                </h2>
                <div className="btn-cal-group">
                  <Link href="/apply" className="btn btn-charity-default">
                    <a className="btn btn-charity-default">Apply</a>
                  </Link>
                  &nbsp;
                  <Link href="/donate">
                    <a className="btn btn-charity-default">Donate</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
