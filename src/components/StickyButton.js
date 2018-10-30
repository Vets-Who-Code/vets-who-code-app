import React from 'react'
import { Link } from 'gatsby'

const styles = {
  position: 'fixed',
  bottom: 28,
  zIndex: 20000,
  left: '12px',
  padding: '1rem 1.5rem'
}

const StickyButton = () => (
  <Link to="/donate">
    <button className="btn btn-sm btn-charity-default" style={styles}>Donate</button>
  </Link>
)

export default StickyButton

