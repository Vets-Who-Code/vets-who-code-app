import React from 'react'
import { MentorForm } from '../../../src/components/Forms'
import { render, fireEvent, waitFor } from '@testing-library/react'

describe('<MentorForm />', () => {
  test('should update inputs, submit and clear inputs', async () => {
    const { container } = render(<MentorForm />)
    const nameInput = container.querySelector('#name')
    const emailInput = container.querySelector('#email')
    const branchOfService = container.querySelector('#branch-of-service')
    const techExpertise = container.querySelector('#technical-expertise')
    const shareYourWorkUrl = container.querySelector('#github-portfolio-or-linkedin')
    const location = container.querySelector('#location')
    const employerRestrictions = container.querySelector('#employer-restrictions')
    const applyForm = container.querySelector('form')

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )

    fireEvent.input(nameInput, { target: { value: 'New Mentor' } })
    fireEvent.input(emailInput, { target: { value: 'newmentor@mail.com' } })
    fireEvent.input(branchOfService, { target: { value: 'Army' } })
    fireEvent.input(techExpertise, { target: { value: 'Cobol' } })
    fireEvent.input(shareYourWorkUrl, { target: { value: 'http://github.com/' } })
    fireEvent.input(location, { target: { value: "You Know Jodie's Location" } })
    fireEvent.input(employerRestrictions, { target: { value: 'Nope' } })

    expect(nameInput.value).toBe('New Mentor')
    expect(emailInput.value).toBe('newmentor@mail.com')

    await waitFor(() => fireEvent.submit(applyForm))

    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('should handle errors when fetch fails', async () => {
    const { container } = render(<MentorForm />)
    const nameInput = container.querySelector('#name')
    const emailInput = container.querySelector('#email')
    const branchOfService = container.querySelector('#branch-of-service')
    const techExpertise = container.querySelector('#technical-expertise')
    const shareYourWorkUrl = container.querySelector('#github-portfolio-or-linkedin')
    const location = container.querySelector('#location')
    const employerRestrictions = container.querySelector('#employer-restrictions')
    const applyForm = container.querySelector('form')
    const mockFetch = jest.fn().mockImplementation(() => Promise.reject())
    window.fetch = mockFetch

    fireEvent.input(nameInput, { target: { value: 'New Mentor' } })
    fireEvent.input(emailInput, { target: { value: 'newmentor@mail.com' } })
    fireEvent.input(branchOfService, { target: { value: 'Army' } })
    fireEvent.input(techExpertise, { target: { value: 'Cobol' } })
    fireEvent.input(shareYourWorkUrl, { target: { value: 'http://github.com/' } })
    fireEvent.input(location, { target: { value: "You Know Jodie's Location" } })
    fireEvent.input(employerRestrictions, { target: { value: 'Nope' } })

    await waitFor(() => fireEvent.submit(applyForm))
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('should show generic error message for empty fields on submit', async () => {
    const { container } = render(<MentorForm />)
    const nameInput = container.querySelector('#name')
    const emailInput = container.querySelector('#email')
    const branchOfService = container.querySelector('#branch-of-service')
    const techExpertise = container.querySelector('#technical-expertise')
    const shareYourWorkUrl = container.querySelector('#github-portfolio-or-linkedin')
    const location = container.querySelector('#location')
    const employerRestrictions = container.querySelector('#employer-restrictions')
    const applyForm = container.querySelector('form')

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )

    await waitFor(() => fireEvent.submit(applyForm))

    await waitFor(() => {
      fireEvent.input(nameInput, { target: { value: '' } })
      fireEvent.input(emailInput, { target: { value: '' } })
      fireEvent.input(branchOfService, { target: { value: '' } })
      fireEvent.input(techExpertise, { target: { value: '' } })
      fireEvent.input(shareYourWorkUrl, { target: { value: '' } })
      fireEvent.input(location, { target: { value: '' } })
      fireEvent.input(employerRestrictions, { target: { value: '' } })
    })

    const errorMessages = container.querySelectorAll('.alert-danger')

    expect(errorMessages.length).toBe(7)

    expect(window.fetch).toHaveBeenCalledTimes(0)

    await waitFor(() => {
      fireEvent.input(nameInput, { target: { value: 'New Mentor' } })
      fireEvent.input(emailInput, { target: { value: 'newmentor@mail.com' } })
      fireEvent.input(branchOfService, { target: { value: 'Army' } })
      fireEvent.input(techExpertise, { target: { value: 'Cobol' } })
      fireEvent.input(shareYourWorkUrl, { target: { value: 'http://github.com/' } })
      fireEvent.input(location, { target: { value: "You Know Jodie's Location" } })
      fireEvent.input(employerRestrictions, { target: { value: 'Nope' } })
    })

    await waitFor(() => fireEvent.submit(applyForm))
    const updatedErrorMessages = container.querySelectorAll('.alert-danger')

    expect(updatedErrorMessages.length).toBe(0)
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test.only('should show custom error message for empty fields with validation', async () => {
    const { container } = render(<MentorForm />)
    const nameInput = container.querySelector('#name')
    const emailInput = container.querySelector('#email')
    const branchOfService = container.querySelector('#branch-of-service')
    const techExpertise = container.querySelector('#technical-expertise')
    const shareYourWorkUrl = container.querySelector('#github-portfolio-or-linkedin')
    const location = container.querySelector('#location')
    const employerRestrictions = container.querySelector('#employer-restrictions')
    const applyForm = container.querySelector('form')

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )

    await waitFor(() => fireEvent.submit(applyForm))

    await waitFor(() => {
      fireEvent.input(nameInput, { target: { value: 'Jody' } })
      fireEvent.input(emailInput, { target: { value: 'mail@mail' } })
      fireEvent.input(branchOfService, { target: { value: 'Army' } })
      fireEvent.input(techExpertise, { target: { value: 'All of it' } })
      fireEvent.input(shareYourWorkUrl, { target: { value: 'htt p://url.com' } })
      fireEvent.input(location, { target: { value: "Jodie's favorite place" } })
      fireEvent.input(employerRestrictions, { target: { value: 'Nope' } })
    })

    const errorMessages = container.querySelectorAll('.alert-danger')

    expect(errorMessages.length).toBe(2)

    expect(window.fetch).toHaveBeenCalledTimes(0)

    await waitFor(() => {
      fireEvent.input(nameInput, { target: { value: 'Jody' } })
      fireEvent.input(emailInput, { target: { value: 'mail@mail.com' } })
      fireEvent.input(branchOfService, { target: { value: 'Army' } })
      fireEvent.input(techExpertise, { target: { value: 'All of it' } })
      fireEvent.input(shareYourWorkUrl, { target: { value: 'http://url.com' } })
      fireEvent.input(location, { target: { value: "Jodie's favorite place" } })
      fireEvent.input(employerRestrictions, { target: { value: 'Nope' } })
    })

    await waitFor(() => fireEvent.submit(applyForm))
    const updatedErrorMessages = container.querySelectorAll('.alert-danger')

    expect(updatedErrorMessages.length).toBe(0)
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })
})
