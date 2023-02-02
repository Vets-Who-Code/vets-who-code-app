import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'
import Link from 'next/link'

export default function Apply() {
  return (
    <>
      <NextSeo title="Apply" />
      <PageHeader />
      <section id="contact" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Apply</h1>
              <p>
                <i>Submit an application to be considered for the next cohort.</i>
              </p>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <div className="contactus-brief">
                  <div className="container-fluid">
                    <p className="section-description">
                      Thank you for choosing to apply to Vets Who Code. This application is our
                      flaship web development course. Here&apos;s a link to the{' '}
                      <Link href="/syllabus">syllabus</Link>. To apply to the course fill out the
                      Google form linked below. If you&apos;re already registered to the VetsWhoCode
                      Slack channel we&apos;ll just ask you for your pre-work url and Slack name.
                    </p>

                    <p>
                      If you have any questions about the pre-work, please reach out to us either in
                      Slack or via the <Link href="/contact">Contact</Link> form.
                    </p>

                    <p className="section-description">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://dev.to/vetswhocode/vets-who-code-pre-work-1gld"
                      >
                        Pre-work instructions
                      </a>
                    </p>
                  </div>
                  <div className="container-fluid">
                    <div className="text-center">
                      <a
                        className="btn btn-charity-default"
                        href="https://forms.gle/YJ4c42QBaKo4fWXH9"
                        role="button"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Prework Form
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
