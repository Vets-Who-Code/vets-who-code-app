import React from 'react'
import PageHeader from '../components/PageHeader'
import '../assets/css/custom.css'
import BoardCards from '../components/Board'

function Board() {
  return (
    <>
      <PageHeader title="Board of Directors" />
      <section
        className="cause_single section bg-default single pad-regular"
        style={{ paddingTop: '0px' }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Board of Directors</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <BoardCards />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Board
