/* eslint-disable prettier/prettier */
import Accordion, { Panel } from '../components/Accordion'
import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'

const BLOCKS = [
  {
    title: 'Block 1: The Big Three',
    id: 1,
    body: 'Block 1 is the foundation of our curriculum. We start out teaching how the internet works and how it impacts web development. We then get into HTML5 and CSS3 to start the development process. By incorporating web accessibility and UX design, we give the students the complete story of web development and how it impacts the users directly. Finally this block closes with adding interaction to the sites using JavaScript along with APIs.',
  },
  {
    title: 'Block 2: Computer Science with JavaScript',
    id: 2,
    body: 'Block 2 is all about computer science. As real world trends prove to us that web apps are growing in complexity, we need to understand the tools to be able to create efficiencies and faster processes. This begins with the computer science elements learned through JavaScript. ',
  },
  {
    title: 'Block 3: React & JAMstack',
    id: 3,
    body: 'Block 3 introduces the JAMstack. Utilizing Gatsby, which relies upon the best technology, such as React and GraphQL, we can ensure our students are getting the best and most sought-after skills in our industry today.',
  },
  {
    title: 'Block 4: Official VWC Member: Interview Prep',
    id: 4,
    body: 'By block 4 our students are full VWC members and start the job transitioning process. Through top resources and interview preparation, we make sure VWC members have shown the interviewers they are set for the job before they even walk through the door. ',
  },
]

const Syllabus = () => {
  return (
    <>
      <SEO title="View our Syllabus" />
      <PageHeader />
      <section id="contact" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Syllabus</h1>
              <p>
                <i>
                  Our curriculum is designed to teach our veterans skills needed for today&apos;s
                  tech market.
                </i>
              </p>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="faq-short-brief container-fluid">
                  <p>
                    Our curriculum is designed using the Agile Methodology with four-day sprints
                    dedicated to the subject. We do it in this manner based on the practice of how
                    veterans &quot;Train How You Fight&quot; in the military, the practice of which
                    is now applied towards working in a software company. The primary language we
                    will focus on is JavaScript, due to its popularity in the job market, ease of
                    transition between computer science topics, practical real world applications,
                    and the scope of industries we can introduce our veterans to, all while keeping
                    language proficiency at the forefront of the program. This way we can introduce
                    Data Visualization, Data Science, Cyber Security, and Internet of Things (IoT)
                    to our veterans, while continuing to have our troops grow in the area of
                    JavaScript.
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <Accordion singlePanel accordionId="syllabus">
                  {BLOCKS.map(block => (
                    <Panel key={block.id} title={block.title} body={block.body} id={block.id} />
                  ))}
                </Accordion>
                <div className="col-md-12 text-center ">
                  <a
                    href="https://github.com/Vets-Who-Code/Curriculum"
                    type="button"
                    className="btn btn-charity-default"
                    aria-label="Curriculum Github"
                  >
                    Full Curriculum
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Syllabus
