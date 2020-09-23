import React from 'react'
import Layout from '../components/Layout'
import FluidImage from '../components/FluidImage'
import PageHeader from '../components/PageHeader'
import '../assets/css/custom.css'
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'gatsby'

const boardInfo = [
  {
    name: 'Alex Reyes',
    image: 'alex_reyes.jpg',
    work: 'Facebook',
    bio:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    link: 'url.com',
  },
]

function Board() {
  return (
    <>
      <PageHeader title="Board of Directors" />
      <section
        className="cause_single section bg-default single pad-regular"
        style={{ paddingTop: '0px' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Board of Directors</h1>
            </div>
          </div>
          <div className="row">
            {/* card starts here */}
            <div className="col-md-4">
              <div className="card-box text-center">
                <div className="user-pic">
                  <FluidImage fileName="alex_reyes.jpg" alt="Alex Reyes" className="img-fluid" />
                </div>
                <h4>Alex Reyes</h4>
                <h6>Facebook</h6>
                <hr />
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s
                </p>
                <hr />
                <div className="board-links">
                  <Link to="#">
                    <FaLinkedinIn className="board-icons" size="40" />
                  </Link>
                  <Link to="#">
                    <FaTwitter className="board-icons" size="40" />
                  </Link>
                  <Link to="#">
                    <FaGithub className="board-icons" size="40" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Card ends here */}
          </div>
        </div>
      </section>
    </>
  )
}
export default Board
