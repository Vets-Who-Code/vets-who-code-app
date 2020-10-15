/* eslint-disable react/display-name */
import React, { Fragment } from 'react'
import Accordion, { Panel } from '../components/Accordion'
import PageHeader from '../components/PageHeader'
import { MentorForm } from '../components/Forms'

const mainGuidelines = [
  {
    title: () => (
      <Fragment>
        <b>Technical:</b> Mentors will assist students in understanding the technical aspects of
        software development and coding.
      </Fragment>
    ),
    body: () => (
      <ul>
        <li>Code reviews</li>
        <li>Best practices</li>
        <li>Finding resources and tutorials for learning</li>
      </ul>
    ),
    id: 'One',
  },
  {
    title: () => (
      <Fragment>
        <b>Professional:</b> Mentors will help mentees understand the professional aspects of
        working in the field of software development.
      </Fragment>
    ),
    body: () => (
      <ul>
        <li>What it means to be a member in a team of software developers</li>
        <li>
          Building your virtual resume (GitHub, personal website, social media) and professional
          networks
        </li>
        <li>Job application and interviewing</li>
      </ul>
    ),
    id: 'Two',
  },
  {
    title: () => (
      <Fragment>
        <b>Personal:</b> Get to know mentees on a personal level.
      </Fragment>
    ),
    body: () => (
      <ul>
        <li>
          It's not just about software and coding. Get to know the mentee and build a lifelong
          personal relationship
        </li>
        <li>Be sensitive to any personal needs a mentee may have</li>
        <li>
          We are not mental health professionals so be prepared to spot issues and involve
          #VetsWhoCode leadership if there are signs a person might be a danger to themselves or
          others
        </li>
      </ul>
    ),
    id: 'Three',
  },
]
const additionalGuidelines = [
  {
    title: () => (
      <Fragment>
        <b>Establishing goals: </b> As a mentor, you should understand your assigned mentee. Talk
        with them about how you can best help them accomplish those goals.
      </Fragment>
    ),
    body: () => (
      <ul>
        <li>
          Assist with finding resources such as people, books, articles, tools and web-based
          information
        </li>
        <li>
          Imparting knowledge and skills by explaining, giving useful examples, demonstrating
          processes and asking thought-provoking questions
        </li>
        <li>
          Helping them gain broader perspectives of the field of software development and what area
          they might like to work in or focus on (front end, back end, devops, etc.)
        </li>
        <li>Discussing actions you’ve taken in your career and explaining your rationale</li>
        <li>
          Introduce them to your colleagues who can be inspiring models and additions to their
          network
        </li>
      </ul>
    ),
    id: 'Four',
  },
  {
    title: () => (
      <Fragment>
        <b>Your Role: </b> You will not be the expert on all your mentee’s needs. Many mentors may
        find it difficult when they do not have all the answers.
      </Fragment>
    ),
    body: () => (
      <ul>
        <li>Your role is that of a learning facilitator early in your relationship</li>
        <li>
          Tell your mentee that you will not have all the answers, but you are looking forward to
          learning together and seeking help from others who have expertise on different topics
        </li>
      </ul>
    ),
    id: 'Five',
  },
]

function Mentor() {
  return (
    <>
      <PageHeader />
      <section id="contact" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Become a Mentor</h1>
              <p>
                <i>
                  #VWC mentors are tasked with addressing students&apos; technical, professional and
                  personal needs.
                </i>
              </p>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="contactus-brief">
                  <p className="section-description">
                    Thank you for your interest in mentoring with #VetsWhoCode. This document is
                    intended to share our philosophy on mentoring. We ask mentors to address the
                    technical, professional, and personal needs of students. Here is more detail on
                    each of these areas:
                  </p>
                  <div className="container">
                    <h1 className="small-top-pad">Our Philosophy</h1>
                    <p>
                      We ask mentors to address the technical, professional, and personal needs of
                      students. Here is more detail on each of these areas:
                    </p>
                    <Accordion accordionId="mainGuidelines">
                      {mainGuidelines.map((guideline, index) => (
                        <Panel
                          key={guideline.id}
                          id={index}
                          title={guideline.title}
                          body={guideline.body}
                        />
                      ))}
                    </Accordion>
                    <p>
                      In addition to the three areas addressed above here are a few other items to
                      consider.
                    </p>
                    <Accordion accordionId="additionalGuidelines">
                      {additionalGuidelines.map((guideline, index) => (
                        <Panel
                          key={guideline.id}
                          title={guideline.title}
                          id={guideline.id}
                          body={guideline.body}
                        />
                      ))}
                    </Accordion>
                    <h1 className="small-top-pad">Time Commitment</h1>
                    <p>
                      After being formally assigned a mentee, we ask mentors to set up an initial
                      chat with their mentee to discuss their needs and to get to know one another.
                      After this initial meeting, we ask that our mentors check in with their mentee
                      at least once a week to inquire about their progress and if the mentees have
                      any issues.
                    </p>
                    #VetsWhoCode is a virtual organization where Slack is the primary vehicle for
                    communication and activity. We ask mentors to be available on Slack to students
                    and to use Slack as a way to check in with mentees on a weekly basis. Mentors
                    and mentees may also use email or video chat to communicate with one another.
                    Please work with your mentee to establish the best frequency and method of
                    communication for you both.
                    <p />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="mentor-form" className="section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="contactus-brief">
                <h2 className="mentor-heading">Mentor Application</h2>
                <MentorForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Mentor
