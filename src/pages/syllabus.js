import React, { Component } from 'react'
import Layout from '../components/Layout'
import Accordion from '../components/Accordion/Accordion'
import Panel from '../components/Accordion/Panel'
import PageHeader from '../components/PageHeader'

export default class Mentor extends Component {
  state = {
    weeks: [
      {
        title: 'Week 1: Set Up and Prep',
        body:
          'During this week we focus on ensuring that our troops have the needed technologies set up and to gain exposure to our tools.',
        id: 'One',
      },
      {
        title: 'Week 2: The Web, Git and HTML',
        body:
          'This is when we start diving in on the basics, ensuring that you are comfortable in the terminal, and using version control, while teaching how the web works.',
        id: 'Two',
      },
      {
        title: 'Week 3: Basics of CSS',
        body: 'Here we start learning CSS with the focus on learning web design.',
        id: 'Three',
      },
      {
        title: 'Week 4: Advanced CSS',
        body:
          'Here we focus on more advanced concepts such as Grid Layout as well as working with Foundation and Bootstrap.',
        id: 'Four',
      },
      {
        title: 'Week 5: JavaScript Basics',
        body:
          'This week we will start to learn the history and basics of Javascript and learn how to use it alone as well as in web design.',
        id: 'Five',
      },
      {
        title: 'Week 6: Computer Science With Javascript',
        body:
          'We continue our training in Javascript while also learning fundamentals in Computer Science. Recursion, Big O Notation, Sorting, Data Structures and Functional Programming.',
        id: 'Six',
      },
      {
        title: 'Week 7: Computer Science With Javascript II: Deeper Dive',
        body:
          'Here we continue to build Computer Science skills with javascript. Binary Trees and Breadth-First Search are just a few of the things we will dive into.',
        id: 'Seven',
      },
      {
        title: 'Week 8: Data Visualization',
        body: 'More JavaScript and even more math as we enter the world of Canvas, D3.js, WebGL',
        id: 'Eight',
      },
      {
        title: 'Week 9: Node.js Express and Socket.io',
        body: 'Entering the world of Node.js and writing Javascript on the server',
        id: 'Nine',
      },
      {
        title: 'Week 10: Node, Express and Socket.io II',
        body: 'Continuing to build with Node and learning Test Driven Development',
        id: 'Ten',
      },
      {
        title: 'Week 11: React',
        body: 'Start down the path or React, ES6 and Mongo DB',
        id: 'Eleven',
      },
      {
        title: 'Week 12: React II',
        body: 'Continuing to develop in React',
        id: 'Twelve',
      },
      {
        title: 'Week 13: Interview Prep I',
        body: 'Start resume preparations as well as how to indentify potential job opportunities',
        id: 'Thirteen',
      },
      {
        title: 'Week 14: Interview Prep II',
        body:
          'Starting the process of mock interviews and learning how to hack the technical interview.',
        id: 'Fourteen',
      },
    ],
  }

  render = () => {
    const { weeks } = this.state
    return (
      <Layout>
        <PageHeader title="syllabus" />
        <section id="faq" className="faq section pad-regular bg-default">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="faq-short-brief">
                  <h2>#VetsWhoCode Syllabus</h2>
                  <p>
                    Our curriculum is designed using the Agile Methodology with four-day sprints
                    dedicated to the subject. We do it in this manner based on the practice of how
                    veterans &quot;Train How You Fight&quot; in the military, so they should train
                    how they would work in a real software company. The primary language we will
                    focus on is JavaScript, due to its popularity in the job market, ease of
                    transition between Computer Science topics and real world application, and the
                    scope of industries we can introduce our veterans to, all while keeping language
                    proficiency at the forefront of the program. This way we can introduce Data
                    Visualization, Data Science, Cyber Security, and Internet of Things(IoT) to our
                    veterans, while continuing to have our troops grow in the area of JavaScript.
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <Accordion single accordionId={'syllabus'}>
                  {weeks.map((week, index) => (
                    <Panel key={week.id} title={week.title} body={week.body} id={index} />
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
