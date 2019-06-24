import React, { useState, useRef, useEffect } from 'react'
import Link from 'gatsby-link'
import FluidImage from '../components/FluidImage'

function Nav() {
  const navRef = useRef()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [opacity, setOpacity] = useState(0.9)

  useEffect(() => {
    let current = true
    if (current) {
      document.addEventListener('scroll', handleScroll)
    }
    return () => {
      current = false
      document.removeEventListener('scroll', handleScroll)
    }
  })

  function handleScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (winScroll === 0) {
      setOpacity(0.9)
    }
    if (winScroll > 0) {
      setOpacity(1)
    }
  }

  return (
    <nav
      ref={navRef}
      id="fixedTopNav"
      className="navbar navbar-fixed-top main-navigation navbar-solid"
      itemScope=""
      itemType="https://schema.org/SiteNavigationElement"
      role="navigation"
      style={{ opacity: opacity }}
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="navbar-toggle collapsed"
            aria-expanded={isNavOpen ? 'true' : 'false'}
          >
            {' '}
            <span className="sr-only">#VetsWhoCode</span> <span className="ion-drag" />
          </button>
          <div className="navbar-brand" itemScope="" itemType="https://schema.org/Organization">
            {' '}
            <span className="sr-only">#VetsWhoCode</span>
            <Link to="/">
              <FluidImage
                fileName="hashflag_white.jpg"
                alt="#VetsWhoCode Logo"
                className="logo_holder"
              />
            </Link>
          </div>
        </div>
        <div
          className={`navbar-collapse collapse ${isNavOpen ? 'in' : ''}`}
          id="main-nav-collapse"
          aria-expanded={isNavOpen ? 'true' : 'false'}
        >
          <ul className="nav navbar-nav navbar-right" role="menu">
            <li>
              {' '}
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            <li>
              {' '}
              <Link to="/about">
                <span>About</span>
              </Link>
            </li>
            <li>
              {' '}
              <Link to="/syllabus">
                <span>Syllabus</span>
              </Link>
            </li>
            <li>
              {' '}
              <Link to="/mentor">
                <span>Mentor</span>
              </Link>
            </li>
            <li>
              {' '}
              <Link to="/apply">
                <span>Apply</span>
              </Link>
            </li>
            <li>
              {' '}
              <Link to="/donate">
                <span>Donate</span>
              </Link>
            </li>
            <li>
              {' '}
              <Link to="/contact">
                <span>Contact Us</span>
              </Link>
            </li>
            <li>
              {' '}
              <a
                href="https://medium.com/vets-who-code"
                without="true"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
// class Nav extends Component {
//   state = {
//     isNavOpen: false,
//     opacity: 0.9,
//   }

//   navRef = React.createRef()

//   componentDidMount() {
//     document.addEventListener('scroll', this.handleScroll)
//   }

//   componentWillUnmount() {
//     document.removeEventListener('scroll', this.handleScroll)
//   }

//   handleScroll = () => {
//     const winScroll = document.body.scrollTop || document.documentElement.scrollTop
//     if (winScroll === 0) {
//       // this.navRef.current.classList.remove('navbar-solid')
//       this.setState({ opacity: 0.9 })
//     }
//     if (winScroll > 0) {
//       // this.navRef.current.classList.add('navbar-solid')
//       this.setState({ opacity: 1 })
//     }
//   }

//   setIsNavOpen = () => {
//     this.setState({
//       isNavOpen: !this.state.isNavOpen,
//     })
//   }

//   render() {
//     const { isNavOpen } = this.state
//     return (
//       <nav
//         ref={this.navRef}
//         id="fixedTopNav"
//         className="navbar navbar-fixed-top main-navigation navbar-solid"
//         itemScope=""
//         itemType="https://schema.org/SiteNavigationElement"
//         role="navigation"
//         style={{ opacity: this.state.opacity }}
//       >
//         <div className="container">
//           <div className="navbar-header">
//             <button
//               type="button"
//               onClick={this.setIsNavOpen}
//               className="navbar-toggle collapsed"
//               aria-expanded={isNavOpen ? 'true' : 'false'}
//             >
//               {' '}
//               <span className="sr-only">#VetsWhoCode</span> <span className="ion-drag" />
//             </button>
//             <div className="navbar-brand" itemScope="" itemType="https://schema.org/Organization">
//               {' '}
//               <span className="sr-only">#VetsWhoCode</span>
//               <Link to="/">
//                 <FluidImage
//                   fileName="hashflag_white.jpg"
//                   alt="#VetsWhoCode Logo"
//                   className="logo_holder"
//                 />
//               </Link>
//             </div>
//           </div>
//           <div
//             className={`navbar-collapse collapse ${isNavOpen ? 'in' : ''}`}
//             id="main-nav-collapse"
//             aria-expanded={isNavOpen ? 'true' : 'false'}
//           >
//             <ul className="nav navbar-nav navbar-right" role="menu">
//               <li>
//                 {' '}
//                 <Link to="/">
//                   <span>Home</span>
//                 </Link>
//               </li>
//               <li>
//                 {' '}
//                 <Link to="/about">
//                   <span>About</span>
//                 </Link>
//               </li>
//               <li>
//                 {' '}
//                 <Link to="/syllabus">
//                   <span>Syllabus</span>
//                 </Link>
//               </li>
//               <li>
//                 {' '}
//                 <Link to="/mentor">
//                   <span>Mentor</span>
//                 </Link>
//               </li>
//               <li>
//                 {' '}
//                 <Link to="/apply">
//                   <span>Apply</span>
//                 </Link>
//               </li>
//               <li>
//                 {' '}
//                 <Link to="/donate">
//                   <span>Donate</span>
//                 </Link>
//               </li>
//               <li>
//                 {' '}
//                 <Link to="/contact">
//                   <span>Contact Us</span>
//                 </Link>
//               </li>
//               <li>
//                 {' '}
//                 <a
//                   href="https://medium.com/vets-who-code"
//                   without="true"
//                   rel="noopener noreferrer"
//                   target="_blank"
//                 >
//                   <span>Blog</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     )
//   }
// }

export default Nav
