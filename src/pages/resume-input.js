import Link from 'next/link'
import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import PageHeader from '@/components/PageHeader'

const ResumeInput = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGitHub] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [other, setOther] = useState('')
  return (
    <>
      <NextSeo title="Resume Information" />
      <PageHeader />
      <div className="container">
        <div class="resume-wrapper">
          <h1 className="contact-heading">Contact</h1>
          <form>
            <div className="rb-section">
              <label>Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />

              <label>Email</label>
              <input type="text" required value={email} onChange={e => setEmail(e.target.value)} />
              <label>Phone</label>
              <input type="text" required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="rb-section">
              <label>Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
              />

              <label>LinkedIn Profile</label>
              <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
              <label>GitHub</label>
              <input type="text" value={github} onChange={e => setGitHub(e.target.value)} />
              <label>Portfolio</label>
              <input type="text" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
            </div>
            <div className="rb-section">
              <label>Other URL</label>
              <input type="text" value={other} onChange={e => setOther(e.target.value)} />
            </div>
          </form>
          <div className="rb-section">
            <div className="doc">
              <h3>{fullName}</h3>
              <p>
                {email} {phone} {location}
              </p>
              <p>
                {linkedin} {github} {portfolio} {other}
              </p>
              <Link href="/resume-builder" passHref>
                <button className="btn btn-gr">Back</button>
              </Link>
              <Link href="/confirmation" passHref>
                <button className="btn btn-gr">Next</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResumeInput
