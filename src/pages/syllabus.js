import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'
import Accordion, { Panel } from '@/components/Accordion'

const BLOCKS = [
  {
    title: 'Block 1: Onboarding and fundamentals',
    id: 1,
    body: ' This phase we start to build out professional workflows using the terminal, git, Github, Netlify, and design. At the end of this block students should be able to build and iterate on HTML/CSS web pages and their designs.',
  },
  {
    title: 'Block 2: Product Development with JavaScript',
    id: 2,
    body: 'The best way to learn is to do, so in this phase we are going to be writing a lot of Javascript. Students will learn to leverage Javascript in the browser, on the server, and connect with third party APIs.',
  },
  {
    title: 'Block 3: Javascript at Scale',
    id: 3,
    body: 'Modern web apps have complexity based on layers of tooling working together to ensure it works at scale. In this phase we use industry standard tooling and frameworks to build Javascript apps like React, Typescript, and Next.js.',
  },
]

const Syllabus = () => {
  return (
    <>
      <NextSeo title="Syllabus" />
      <PageHeader />
      <section id="contact" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Syllabus</h1>
              <p>
                <i>
                  Our flagship curriculum is designed for two things: to give our veterans skills
                  needed for today&apos;s tech market, and to be a contributing member of
                  VetsWhoCode.
                </i>
              </p>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="faq-short-brief container-fluid">
                  <p>
                    Our curriculum is designed using a blend of Kanban and Scrum. We use the Kanban
                    methodology to treat each subject like a ticket to be completed. We do this in a
                    collaborative manner because programming is a team sport. The primary language
                    we will focus on is JavaScript, due to its popularity in the job market, ease of
                    transition through out the stack, practical real world applications, and the
                    scope of tools and resources we can introduce our veterans to, all while keeping
                    language proficiency at the forefront of the program. This way we can introduce
                    front end, back end, DevOps and Cloud Computing skills to our veterans, while
                    continuing to have our troops grow in JavaScript.
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
