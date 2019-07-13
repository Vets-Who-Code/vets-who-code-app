import React from 'react'
import { Link } from 'gatsby'

const styles = {
  position: 'fixed',
  zIndex: 20000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 5px 40px rgba(0,0,0,0.16)',
  height: 60,
  width: 60,
  left: 20,
  bottom: 20,
  borderRadius: '50%',
  fontSize: 35,
}

function StickyButton() {
  return (
    <Link to="/donate">
      <button className="btn btn-charity-default" aria-label="Donate" style={styles}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="heart"
          className="fa-heart"
          role="img"
          height="35"
          width="35"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="#FFF"
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
          ></path>
        </svg>
      </button>
    </Link>
  )
}

export default StickyButton
