import { useState } from 'react'
import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'
import Loader from '@/components/Loader'
import Video from '@/components/Video'
import Pagination from '@/components/Pagination'
import { JobForm } from '@/components/Forms'
import Adzuna from '../icons/Adzuna'

function Jobs() {
  const [jobData, setJobData] = useState(null)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [pageContext, setPageContext] = useState({})
  const [apiError, setApiError] = useState(false)

  async function formData(formResponse, page = 1) {
    //Set zipCode for the center of the US
    if (formResponse.distance === '5000') {
      formResponse.zipCode = '57717'
    }
    setJobData(null)
    setIsFormSubmitted(true)
    setApiError(false)
    document.getElementById('scroll-to').scrollIntoView({ block: 'start' })

    const WHAT = 'javascript reactjs gatsby graphql nodejs node.js jquery bootstrap'
    const EXCLUDE = '0000 senior sr principal lead master'

    const URL = `/api/jobsearch?&page=${page}&results_per_page=15&what_or=${WHAT}&where=${
      formResponse.zipCode
    }&distance=${formResponse.distance}&what_exclude=${EXCLUDE}&sort_by=date&max_days_old=30${
      formResponse.remote === true ? '&what_and=remote' : ''
    }`

    try {
      const response = await fetch(URL)
      const data = await response.json()
      setJobData(data)
      setPageContext({
        currentPage: page,
        maxPage: Math.ceil(page / 10) * 10,
        minPage: Math.ceil(page / 10) * 10 - 10,
        totalPages: Math.floor(data.count / 15),
        formResponse: formResponse,
        formData: formData,
        setPageContext: setPageContext,
      })
    } catch {
      setJobData({ error: true })
      setIsFormSubmitted(false)
      setApiError(true)
    }
  }

  const maxPageFn = clicked => {
    if (clicked === 'More') {
      if (pageContext.maxPage + 10 > totalPages) {
        return totalPages
      } else {
        return pageContext.maxPage + 10
      }
    }
    return pageContext.maxPage + clicked
  }

  const handleUpageJobPagination = node => {
    setPageContext({
      currentPage: pageContext.currentPage,
      totalPages: pageContext.totalPages,
      minPage: pageContext.minPage + node,
      maxPage: maxPageFn(node),
      setPageContext: pageContext.setPageContext,
      formResponse: pageContext.formResponse,
      formData: pageContext.formData,
    })
  }

  const updatePaginationData = value => {
    if (value !== pageContext.currentPage) {
      return formData(pageContext.formResponse, value)
    }
  }

  return (
    <>
      <NextSeo title="Find a Developer Job" />
      <PageHeader />

      {/* Section Header */}
      <section id="jobs" className="small-top-pad section bg-default" style={{ paddingBottom: 35 }}>
        <div id="skip_to_content" className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Job Search</h1>
              <i>
                <p className="pt-0">
                  VetsWhoCode provides job placement assistance to veterans and spouses.
                </p>
              </i>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="faq-short-brief container-fluid">
                  <p>
                    VetsWhoCode serves veterans by providing job placement assistance to veterans
                    and spouses. The Vets Who Code Job Search is a tool for connecting veterans,
                    military, and military spouses to jobs that fit the skillset you will learn. Our
                    goal is to ensure that we can make it easy for our veterans to find gainful
                    employment by creating a starting point to search. We want to thank our API
                    sponsor{' '}
                    <a href="https://www.adzuna.com/" target="_blank" rel="noopener noreferrer">
                      Adzuna
                    </a>{' '}
                    for using their software as we serve our veterans and a special thank you to{' '}
                    <a
                      href="https://github.com/dtetreau251"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      David
                    </a>
                    ,
                    <a
                      href="https://github.com/stephanlamoureux"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      Stephan
                    </a>
                    , and{' '}
                    <a
                      href="https://github.com/joeromine"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Joe
                    </a>{' '}
                    for building this tool from scratch with what they learned at #VetsWhoCode.
                  </p>
                </div>
              </div>
            </div>
            {/*  End Header  */}

            {/*  Search Bar  */}
            <div id="scroll-to" className="scroll-to"></div>
            <div className="search">
              <div>
                <JobForm formData={formData} apiError={apiError} />
              </div>
            </div>
            {/*  Search End  */}

            {/*  No Results  */}
            <div className="no-results" style={{ marginTop: 75 }}>
              <p
                className={`text-center ${
                  isFormSubmitted && jobData?.results?.length === 0 ? '' : 'hidden'
                }`}
              >
                Sorry there were no results. Try again.
              </p>
            </div>
            {/* End No Results */}

            {/* Loader */}
            <Loader isSubmitted={isFormSubmitted} jobData={jobData} />
            {/* End Loader */}

            {/* Video */}
            <div className="container">
              <div className="col-md-12">
                <Video isSubmitted={isFormSubmitted} />
              </div>
            </div>
          </div>
          {/*  End Video  */}

          {/*  Cards */}
          <div className="jobgrid-container">
            {jobData?.results?.map((job, i) => (
              <Card isSubmitted={isFormSubmitted} jobData={job} key={`job data card-${i}`} />
            ))}
          </div>
        </div>
      </section>
      {/* End Cards */}

      {/* Pagination */}
      <div className="container">
        <div className="row">
          {jobData?.results && (
            <Pagination
              minPage={pageContext.minPage ?? 1}
              maxPage={pageContext.maxPage}
              totalPages={pageContext.totalPages}
              isFirstPage={pageContext.isFirstPage}
              isLastPage={pageContext.isLastPage}
              updatePaginationData={updatePaginationData}
              handleUpatePaginationValues={handleUpageJobPagination}
              type="api"
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: 'var(--element-3)',
              paddingBottom: '40px',
            }}
          >
            Powered By <br />
            <a href="https://www.adzuna.com/" target="_blank" rel="noopener noreferrer">
              <Adzuna />
            </a>
          </div>
        </div>
      </div>
      {/* End Pagination */}
    </>
  )
}

export default Jobs
