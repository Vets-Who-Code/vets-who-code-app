import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'
import Accordion, { Panel } from '@/components/Accordion'

const BLOCKS = [
  {
    title: 'Block 1: The Core Basics',
    id: 1,
    body: ' This phase we start in the terminal, then move to git, Github and the Github CLI. We then move into Visual Studio Code, HTML, CSS and Javascript. During this we teach the importance of User Stories, Git Flow, Kanban, UX Basics and Web Accessibility.',
  },
  {
    title: 'Block 2: Product Development With JavaScript, React And Gatsby',
    id: 2,
    body: 'The best way to learn is to do, so in this phase we are going to be writing a lot of Javascript. Rather solving problems in our code challenges channel, or working on your team feature, here you will be focusing on learning how to build impactfully with Javascript, React, and Gatsby.',
  },
  {
    title: 'Block 3: Serverless DevOps and DivOps: Tooling to make your app work at scale',
    id: 3,
    body: 'Modern web apps have complexity based on layers of tooling working together to ensure it works at scale. In this phase we will dive into AWS Lambdas, Github Actions and Netlifly.',
  },
  {
    title:
      'Block 4: Becoming a Dev Advocate of You - Mentoring, Networking, Building Social Equity, Interview Prep.',
    id: 4,
    body: 'As the saying goes, "Getting a Job is a Job", especially the first job in tech. So now that you know how to code, we need to get you into a cycle of building, writing, sharing your work, connecting and networking with people. We have to make you a Dev Advocate Of You.',
  },
]

const Syllabus = () => {
  return (
    <>
      <NextSeo title="Syllabus" />
      <PageHeader />
      <section id="contact" className="small-top-pad section bg-default">
        <div id="skip_to_content" className="container">
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
