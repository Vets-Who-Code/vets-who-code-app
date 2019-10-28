import React from 'react'
import { Link } from 'gatsby'
import Icon from '../Icon'
import './sticky-button.css'

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
        <Icon iconName="heart" className="fa-heart" height={36} width={36} />
      </button>
    </Link>
  )
}

export default StickyButton
