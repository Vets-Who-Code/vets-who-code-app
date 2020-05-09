import React from 'react'
import { ApplyForm } from '../../../src/components/Forms'
import { render, fireEvent, waitFor } from '@testing-library/react'

describe('<ApplyForm />', () => {
  test('should submit form and clear fields', async () => {
    const { container } = render(<ApplyForm />)
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
    const linkedInAccountName = container.querySelector('#linkedInAccountName')
    const githubAccountName = container.querySelector('#githubAccountName')
    const preworkLink = container.querySelector('#preworkLink')
    const preworkRepo = container.querySelector('#preworkRepo')
    const applyForm = container.querySelector('form')

    fireEvent.input(firstName, { target: { value: 'New' } })
    fireEvent.input(lastName, { target: { value: 'User' } })
    fireEvent.input(email, { target: { value: 'new@user.com' } })
    fireEvent.input(city, { target: { value: 'fakeCity' } })
    fireEvent.input(state, { target: { value: 'fakeState' } })
    fireEvent.input(zipCode, { target: { value: 11111 } })
    fireEvent.input(country, { target: { value: 'USA' } })
    fireEvent.input(branchOfService, { target: { value: 'USMC' } })
    fireEvent.input(yearJoined, { target: { value: 2000 } })
    fireEvent.input(yearSeparated, { target: { value: 2004 } })
    fireEvent.input(twitterAccountName, { target: { value: 'https://twitter.com/fake-user' } })
    fireEvent.input(linkedInAccountName, {
      target: { value: 'https://linkedin.com/in/fake-user' },
    })
    fireEvent.input(githubAccountName, { target: { value: 'github-username' } })
    fireEvent.input(preworkLink, { target: { value: 'https://fake-url.com' } })
    fireEvent.input(preworkRepo, { target: { value: 'https://github.com/username/reponame' } })

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true }))
    expect(firstName.value).toBe('New')
    expect(githubAccountName.value).toBe('github-username')

    try {
      await waitFor(() => fireEvent.submit(applyForm))
    } catch (error) {
      console.log(error)
      expect(error).toBe('')
    }

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(firstName.value).toBe('')
  })

  test('should handle errors when submit form fails', async () => {
    const { container } = render(<ApplyForm />)
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
    const linkedInAccountName = container.querySelector('#linkedInAccountName')
    const githubAccountName = container.querySelector('#githubAccountName')
    const preworkLink = container.querySelector('#preworkLink')
    const preworkRepo = container.querySelector('#preworkRepo')
    const applyForm = container.querySelector('form')

    fireEvent.input(firstName, { target: { value: 'New' } })
    fireEvent.input(lastName, { target: { value: 'User' } })
    fireEvent.input(email, { target: { value: 'new@user.com' } })
    fireEvent.input(city, { target: { value: 'fakeCity' } })
    fireEvent.input(state, { target: { value: 'fakeState' } })
    fireEvent.input(zipCode, { target: { value: 11111 } })
    fireEvent.input(country, { target: { value: 'USA' } })
    fireEvent.input(branchOfService, { target: { value: 'USMC' } })
    fireEvent.input(yearJoined, { target: { value: 2000 } })
    fireEvent.input(yearSeparated, { target: { value: 2004 } })
    fireEvent.input(twitterAccountName, { target: { value: 'https://twitter.com/fake-user' } })
    fireEvent.input(linkedInAccountName, {
      target: { value: 'https://linkedin.com/in/fake-user' },
    })
    fireEvent.input(githubAccountName, { target: { value: 'github-username' } })
    fireEvent.input(preworkLink, { target: { value: 'https://fake-url.com' } })
    fireEvent.input(preworkRepo, { target: { value: 'https://github.com/username/reponame' } })

    window.fetch = jest.fn().mockImplementation(() => Promise.reject())
    expect(firstName.value).toBe('New')
    expect(githubAccountName.value).toBe('github-username')

    await waitFor(() => fireEvent.submit(applyForm))

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(firstName.value).toBe('New')
  })

  test('should add error when input is incorrect', async () => {
    const { container } = render(<ApplyForm />)

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
    const linkedInAccountName = container.querySelector('#linkedInAccountName')
    const githubAccountName = container.querySelector('#githubAccountName')
    const preworkLink = container.querySelector('#preworkLink')
    const preworkRepo = container.querySelector('#preworkRepo')
    const applyForm = container.querySelector('form')

    fireEvent.input(firstName, { target: { value: '' } })
    fireEvent.input(lastName, { target: { value: '' } })
    fireEvent.input(email, { target: { value: '' } })
    fireEvent.input(city, { target: { value: '' } })
    fireEvent.input(state, { target: { value: '' } })
    fireEvent.input(zipCode, { target: { value: '' } })
    fireEvent.input(country, { target: { value: '' } })
    fireEvent.input(branchOfService, { target: { value: '' } })
    fireEvent.input(yearJoined, { target: { value: '' } })
    fireEvent.input(yearSeparated, { target: { value: '' } })
    fireEvent.input(twitterAccountName, { target: { value: '' } })
    fireEvent.input(linkedInAccountName, {
      target: { value: '' },
    })
    fireEvent.input(githubAccountName, { target: { value: '' } })
    fireEvent.input(preworkLink, { target: { value: '' } })
    fireEvent.input(preworkRepo, { target: { value: '' } })

    await waitFor(() => fireEvent.submit(applyForm))

    const errorMessages = container.querySelectorAll('.alert-danger')

    expect(errorMessages.length).toBe(15)

    await waitFor(() => {
      fireEvent.input(firstName, { target: { value: 'New' } })
      fireEvent.input(lastName, { target: { value: 'User' } })
      fireEvent.input(email, { target: { value: 'new@user.com' } })
      fireEvent.input(city, { target: { value: 'fakeCity' } })
      fireEvent.input(state, { target: { value: 'fakeState' } })
      fireEvent.input(zipCode, { target: { value: 11111 } })
      fireEvent.input(country, { target: { value: 'USA' } })
      fireEvent.change(branchOfService, { target: { value: 'USMC' } })
      fireEvent.input(yearJoined, { target: { value: 2000 } })
      fireEvent.input(yearSeparated, { target: { value: 2004 } })
      fireEvent.input(twitterAccountName, { target: { value: 'https://twitter.com/fake-user' } })
      fireEvent.input(linkedInAccountName, {
        target: { value: 'https://linkedin.com/in/fake-user' },
      })
      fireEvent.input(githubAccountName, { target: { value: 'github-username' } })
      fireEvent.input(preworkLink, { target: { value: 'https://fake-url.com' } })
      fireEvent.input(preworkRepo, { target: { value: 'https://github.com/username/reponame' } })
    })

    const updatedErrorMessages = container.querySelectorAll('.alert-danger')
    expect(updatedErrorMessages.length).toBe(0)
  })

  test('should throw custom errors based on pattern and show unique message', async () => {
    const { container } = render(<ApplyForm />)

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
    const linkedInAccountName = container.querySelector('#linkedInAccountName')
    const githubAccountName = container.querySelector('#githubAccountName')
    const preworkLink = container.querySelector('#preworkLink')
    const preworkRepo = container.querySelector('#preworkRepo')
    const applyForm = container.querySelector('form')

    await waitFor(() => fireEvent.submit(applyForm))

    const errorMessages = container.querySelectorAll('.alert-danger')

    expect(errorMessages.length).toBe(15)

    await waitFor(() => {
      fireEvent.input(firstName, { target: { value: 'New' } })
      fireEvent.input(lastName, { target: { value: 'User' } })
      fireEvent.input(email, { target: { value: 'new user@user.com' } })
      fireEvent.input(city, { target: { value: 'fakeCity' } })
      fireEvent.input(state, { target: { value: 'fakeState' } })
      fireEvent.input(zipCode, { target: { value: 111 } })
      fireEvent.input(country, { target: { value: 'USA' } })
      fireEvent.change(branchOfService, { target: { value: 'USMC' } })
      fireEvent.input(yearJoined, { target: { value: 200 } })
      fireEvent.input(yearSeparated, { target: { value: 204 } })
      fireEvent.input(twitterAccountName, { target: { value: 'https ://twitter.com/fake-user' } })
      fireEvent.input(linkedInAccountName, {
        target: { value: 'https ://linkedin.com/in/fake-user' },
      })
      fireEvent.input(githubAccountName, { target: { value: 'github - username' } })
      fireEvent.input(preworkLink, { target: { value: 'https ://fake-url.com' } })
      fireEvent.input(preworkRepo, { target: { value: 'https ://github.com/username/reponame' } })
    })

    const errorsAfterSubmit = container.querySelectorAll('.alert-danger')
    expect(errorsAfterSubmit.length).toBe(9)
    // valid email
    expect(errorsAfterSubmit[0].textContent).toContain('Please enter a valid email address')
    // zip-code custom error
    expect(errorsAfterSubmit[1].textContent).toContain(
      'Please enter a valid zip code XXXXX or XXXXX-XXXX'
    )
    // year joined custom error
    expect(errorsAfterSubmit[2].textContent).toContain('Please enter year in YYYY format')
    // year separated custom error
    expect(errorsAfterSubmit[3].textContent).toContain('Please enter year in YYYY format')
    // valid twitter account url
    expect(errorsAfterSubmit[4].textContent).toContain('Please enter a valid twitter account url')
    // valid linkedin account url
    expect(errorsAfterSubmit[5].textContent).toContain(
      'Please enter a valid LinkedIn url https://linkedin.com/in/user-name'
    )
    // valid github username
    expect(errorsAfterSubmit[6].textContent).toContain('Please enter your github username')
    // valid prework url
    expect(errorsAfterSubmit[7].textContent).toContain('Please enter a valid url')
    // valid github url
    expect(errorsAfterSubmit[8].textContent).toContain(
      'Please enter a GitHub repository url https://github.com/user-name/repo-name'
    )

    await waitFor(() => {
      fireEvent.input(firstName, { target: { value: 'New' } })
      fireEvent.input(lastName, { target: { value: 'User' } })
      fireEvent.input(email, { target: { value: 'newuser@user.com' } })
      fireEvent.input(city, { target: { value: 'fakeCity' } })
      fireEvent.input(state, { target: { value: 'fakeState' } })
      fireEvent.input(zipCode, { target: { value: 11111 } })
      fireEvent.input(country, { target: { value: 'USA' } })
      fireEvent.input(branchOfService, { target: { value: 'USMC' } })
      fireEvent.input(yearJoined, { target: { value: 2000 } })
      fireEvent.input(yearSeparated, { target: { value: 2004 } })
      fireEvent.input(twitterAccountName, { target: { value: 'https://twitter.com/fake-user' } })
      fireEvent.input(linkedInAccountName, {
        target: { value: 'https://linkedin.com/in/fake-user' },
      })
      fireEvent.input(githubAccountName, { target: { value: 'githubusername' } })
      fireEvent.input(preworkLink, { target: { value: 'https://fake-url.com' } })
      fireEvent.input(preworkRepo, { target: { value: 'https://github.com/username/reponame' } })
    })
    const noErrorsAfterUpdatingInputs = container.querySelectorAll('.alert-danger')
    expect(noErrorsAfterUpdatingInputs.length).toBe(0)
  })
})
