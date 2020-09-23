import React from 'react'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'gatsby'
import './boardCards.css'
import { data } from './boardData'
import FluidImage from '../FluidImage/FluidImage'

function BoardCards() {
  return (
    <div>
      {data.map((data, key) => {
        return (
          <div key={key} className="col-md-6 col-lg-3 col-sm-6">
            <div className="card-box text-center">
              <div className="upper">
                <div className="user-pic">
                  <FluidImage fileName={data.image} alt={data.name} className="img-fluid" />
                </div>
                <h5>{data.name}</h5>
                <h6>{data.work}</h6>
              </div>
              <hr />
              <p className="bio">{data.bio}</p>
              <hr />
              <div className="board-links">
                <a rel="noopener noreferrer" href={data.linkedin} target="_blank">
                  <FaLinkedinIn className="board-icons" size="40" />
                </a>
                <a rel="noopener noreferrer" href={data.twitter} target="_blank">
                  <FaTwitter className="board-icons" size="40" />
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default BoardCards
