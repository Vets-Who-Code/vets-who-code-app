import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'

function CodeOfConduct() {
  return (
    <>
      <NextSeo title="Code Of Conduct" />
      <PageHeader />
      <section id="about" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in success-story">
              <h1 className="story-title">Code Of Conduct</h1>
              <h2>Our Pledge</h2>
              &nbsp;
              <p>
                In the interest of fostering an open and welcoming environment, we as contributors
                and maintainers pledge to making participation in our project and our community a
                harassment-free experience for everyone, regardless of age, body size, disability,
                ethnicity, gender identity and expression, level of experience, education,
                socio-economic status, nationality, personal appearance, race, religion, or sexual
                identity and orientation.
              </p>
            </div>
            <div className="col-md-12">
              <div className="success-story">
                <h2>Our Standards</h2>
                &nbsp;
                <p className="story">
                  Examples of behavior that contributes to creating a positive environment include:
                  <ul>
                    <li>Using welcoming and inclusive language.</li>
                    <li>Being respectful of differing viewpoints and experiences.</li>
                    <li>Gracefully accepting constructive criticism.</li>
                    <li>Focusing on what is best for the community.</li>
                    <li>Showing empathy towards other community members.</li>
                  </ul>
                  Examples of unacceptable behavior by participants include:
                  <ul>
                    <li>
                      The use of sexualized language or imagery and unwelcome sexual attention or
                      advances.
                    </li>
                    <li>
                      Trolling, insulting/derogatory comments, and personal or political attacks.
                    </li>
                    <li>Public or private harassment.</li>
                    <li>Deliberate intimidation, stalking, or following.</li>
                    <li>Harassing photography or recording.</li>
                    <li>Sustained disruption of talks or other events.</li>
                    <li>Inappropriate physical contact.</li>
                    <li>Unwelcome sexual attention or advances.</li>
                    <li>Advocating for, or encouraging, any of the above behaviors.</li>
                    <li>
                      Publishing others&apos; private information, such as a physical or electronic
                      address, without explicit permission.
                    </li>
                    <li>
                      Other conduct that is inappropriate for a professional or shared professional
                      environment.
                    </li>
                  </ul>
                </p>

                <h2>Our Responsibilities</h2>
                &nbsp;
                <p className="story">
                  Project maintainers are responsible for clarifying the standards of acceptable
                  behavior and are expected to take appropriate and fair corrective action in
                  response to any instances of unacceptable behavior.
                </p>

                <p className="story">
                  Project maintainers have the right and responsibility to remove, edit, or reject
                  comments, commits, code, wiki edits, issues, and other contributions that are not
                  aligned to this Code of Conduct, or to ban temporarily or permanently any
                  contributor for other behaviors that they deem inappropriate, threatening,
                  offensive, or harmful.
                </p>

                <h2>Scope</h2>
                &nbsp;
                <p className="story">
                  This Code of Conduct applies both within project spaces and in public spaces when
                  an individual is representing the project or its community. Examples of
                  representing a project or community include using an official project e-mail
                  address, posting via an official social media account, or acting as an appointed
                  representative at an online or offline event. Representation of a project may be
                  further defined and clarified by project maintainers.
                </p>

                <h2>Enforcement</h2>
                <p className="story">
                  Instances of abusive, harassing, or otherwise unacceptable behavior may be
                  reported by contacting the project team at [INSERT EMAIL ADDRESS]. All complaints
                  will be reviewed and investigated and will result in a response that is deemed
                  necessary and appropriate to the circumstances. The project team is obligated to
                  maintain confidentiality with regard to the reporter of an incident. Further
                  details of specific enforcement policies may be posted separately.
                </p>

                <p className="story">
                  Project maintainers who do not follow or enforce the Code of Conduct in good faith
                  may face temporary or permanent repercussions as determined by other members of
                  the project&apos;s leadership.
                </p>

                <h2>Attribution</h2>
                &nbsp;
                <p className="story">
                  This Code of Conduct is adapted from the &nbsp;
                  <a href="https://www.contributor-covenant.org/version/1/4/code-of-conduct">
                    Contributor Covenant
                  </a>
                  , version 1.4, code of conduct.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CodeOfConduct
