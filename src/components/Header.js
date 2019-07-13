import React from 'react'
import { Link } from 'gatsby'
import Carousel from 'nuka-carousel'
import BackgroundSection from '../components/BackgroundSection'
import Icon from './Icon'

const settings = {
  autoplay: true,
  enableKeyboardControls: true,
  pauseOnHover: true,
  speed: 500,
  transitionMode: 'fade',
}

function Header() {
  return (
    <BackgroundSection fileName="code.jpg">
      <section className="site-header flexslider classic overlay main-overlay grey">
        <div className="header-classic wrapper-table">
          <div className="valign-center">
            <div className="container">
              <div className="col-md-10 col-md-offset-1">
                <div className="intro text-left" style={{ color: '#fff' }}>
                  <h1>Learn</h1>
                  <p className="subtitle">How To Code With Other Veterans.</p>
                  <div className="btn-cal-group">
                    <Link to="/apply" className="btn btn-charity-default">
                      Apply
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BackgroundSection>
    // <div
    //   id="site-header"
    //   className="site-header flexslider classic"
    //   style={{
    //     minHeight: '80vh',
    //     // backgroundColor: '#0f356d',
    //     backgroundImage: `url("../images/code.jpg")`,
    //   }}
    //   fileName="code.jpg"
    //   critical
    // >
    //    <Carousel
    //     {...settings}
    //     wrapAround
    //     renderCenterLeftControls={({ previousSlide }) => (
    //       <button
    //         className="slider-control prev"
    //         tabIndex="0"
    //         onClick={previousSlide}
    //         onKeyDown={previousSlide}
    //       >
    //         <Icon
    //           className="nav-previous"
    //           height={48}
    //           iconName="caretLeft"
    //           tabIndex="0"
    //           width={48}
    //         />
    //       </button>
    //     )}
    //     renderCenterRightControls={({ nextSlide }) => (
    //       <button
    //         className="slider-control next"
    //         tabIndex="0"
    //         onClick={nextSlide}
    //         onKeyDown={nextSlide}
    //       >
    //         <Icon height={48} iconName="caretRight" width={48} />
    //       </button>
    //     )}
    //     renderBottomCenterControls={null}
    //   >
    //     <BackgroundSection fileName="code.jpg">
    //       <div className="header-classic wrapper-table overlay-01">
    //         <div className="valign-center">
    //           <div className="container">
    //             <div className="col-md-10 col-md-offset-1">
    //               <div className="intro text-left">
    //                 <h1>Learn</h1>
    //                 <p className="subtitle">How To Code With Other Veterans.</p>
    //                 <div className="btn-cal-group">
    //                   <Link to="/apply" className="btn btn-charity-default">
    //                     Apply
    //                   </Link>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </BackgroundSection>
    //     <BackgroundSection fileName="speaking.jpg">
    //       <div className="header-classic  wrapper-table overlay-01">
    //         <div className="valign-center">
    //           <div className="container">
    //             <div className="col-md-10 col-md-offset-1">
    //               <div className="intro text-left">
    //                 <h1>Sign Up</h1>
    //                 <p className="subtitle">As A Mentor.</p>
    //                 <div className="btn-cal-group">
    //                   <Link to="/mentor" className="btn btn-charity-default">
    //                     Sign Up
    //                   </Link>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </BackgroundSection>
    //     <BackgroundSection fileName="this_is_us.jpg">
    //       <div className="header-classic wrapper-table overlay-01">
    //         <div className="valign-center">
    //           <div className="container">
    //             <div className="col-md-10 col-md-offset-1">
    //               <div className="intro text-right">
    //                 <h1 className="red">
    //                   <span className="red">Help Us</span>
    //                 </h1>
    //                 <p className="subtitle red">Teach More Veterans How To Code.</p>
    //                 <div className="btn-cal-group">
    //                   <Link to="/donate" className="btn btn-charity-default">
    //                     Please Donate
    //                   </Link>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </BackgroundSection>
    //   </Carousel>
    // </div >
  )
}
export default Header
