import React from 'react'
import Apply from '../../src/pages/apply'
import { render, fireEvent } from '@testing-library/react'

describe('<Apply />', () => {
  test('should submit form and clear fields', () => {
    const { container } = render(<Apply />)
    const firstName = container.querySelector('#firstName')
    const lastName = container.querySelector('#lastName')
    const email = container.querySelector('#email')
    const city = container.querySelector('#city')
    const state = container.querySelector('#state')
    const zipCode = container.querySelector('#zipCode')
    const country = container.querySelector('#country')
    const branchOfService = container.querySelector('#branchOfService')
    const yearJoined = container.querySelector('#yearJoined')
    const yearSeparated = container.querySelector('#yearSeparated')
    const twitterAccountName = container.querySelector('#twitterAccountName')
    const linkedinAccountName = container.querySelector('#linkedinAccountName')
    const githubAccountName = container.querySelector('#githubAccountName')
    const preworkLink = container.querySelector('#preworkLink')
    const preworkRepo = container.querySelector('#preworkRepo')
    const applyForm = container.querySelector('form')

    fireEvent.change(firstName, { target: { value: 'New' } })
    fireEvent.change(lastName, { target: { value: 'User' } })
    fireEvent.change(email, { target: { value: 'new@user.com' } })
    fireEvent.change(city, { target: { value: 'fakeCity' } })
    fireEvent.change(state, { target: { value: 'fakeState' } })
    fireEvent.change(zipCode, { target: { value: 'fakeZip' } })
    fireEvent.change(country, { target: { value: 'fakeCountry' } })
    fireEvent.change(branchOfService, { target: { value: 'USMC' } })
    fireEvent.change(yearJoined, { target: { value: 'fakeYearJoined' } })
    fireEvent.change(yearSeparated, { target: { value: 'fakeYearSeparated' } })
    fireEvent.change(twitterAccountName, { target: { value: 'fakeTwitterAccount' } })
    fireEvent.change(linkedinAccountName, { target: { value: 'fakeLinkedinAccount' } })
    fireEvent.change(githubAccountName, { target: { value: 'fakeGithubAccount' } })
    fireEvent.change(preworkLink, { target: { value: 'fakePreworkLink' } })
    fireEvent.change(preworkRepo, { target: { value: 'fakePreworkRepo' } })

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
    expect(firstName.value).toBe('New')
    expect(githubAccountName.value).toBe('fakeGithubAccount')

    try {
      fireEvent.submit(applyForm)
    } catch (error) {
      console.log(error)
      expect(error).toBe('')
    }

    expect(firstName.value).toBe('')
  })

  test('should handle errors when submission fails', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        ok: false,
      })
    )
    const { container } = render(<Apply />)
    container.validator = jest.fn().mockImplementation(() => { isValid: true })

    const firstName = container.querySelector('#firstName')
    const lastName = container.querySelector('#lastName')
    const email = container.querySelector('#email')
    const city = container.querySelector('#city')
    const state = container.querySelector('#state')
    const zipCode = container.querySelector('#zipCode')
    const country = container.querySelector('#country')
    const branchOfService = container.querySelector('#branchOfService')
    const yearJoined = container.querySelector('#yearJoined')
    const yearSeparated = container.querySelector('#yearSeparated')
    const twitterAccountName = container.querySelector('#twitterAccountName')
    const linkedinAccountName = container.querySelector('#linkedinAccountName')
    const githubAccountName = container.querySelector('#githubAccountName')
    const preworkLink = container.querySelector('#preworkLink')
    const preworkRepo = container.querySelector('#preworkRepo')
    const applyForm = container.querySelector('form')

    fireEvent.change(firstName, { target: { value: 'New' } })
    fireEvent.change(lastName, { target: { value: 'User' } })
    fireEvent.change(email, { target: { value: 'new@user.com' } })
    fireEvent.change(city, { target: { value: 'fakeCity' } })
    fireEvent.change(state, { target: { value: 'fakeState' } })
    fireEvent.change(zipCode, { target: { value: 'fakeZip' } })
    fireEvent.change(country, { target: { value: 'fakeCountry' } })
    fireEvent.change(branchOfService, { target: { value: 'USMC' } })
    fireEvent.change(yearJoined, { target: { value: 'fakeYearJoined' } })
    fireEvent.change(yearSeparated, { target: { value: 'fakeYearSeparated' } })
    fireEvent.change(twitterAccountName, { target: { value: 'fakeTwitterAccount' } })
    fireEvent.change(linkedinAccountName, { target: { value: 'fakeLinkedinAccount' } })
    fireEvent.change(githubAccountName, { target: { value: 'fakeGithubAccount' } })
    fireEvent.change(preworkLink, { target: { value: 'fakePreworkLink' } })
    fireEvent.change(preworkRepo, { target: { value: 'fakePreworkRepo' } })

    try {
      fireEvent.submit(applyForm)
    }
    catch(e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('should render correctly', () => {
    const { container } = render(<Apply />)
    expect(container).toMatchSnapshot()
  })
})
