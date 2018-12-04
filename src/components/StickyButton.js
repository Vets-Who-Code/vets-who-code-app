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
  fontSize: 35
}

const StickyButton = () => (
  <Link to="/donate">
    <button className="btn btn-charity-default" style={styles}>
      <i className="fa fa-heart"></i>
    </button>
  </Link>
)

export default StickyButton
