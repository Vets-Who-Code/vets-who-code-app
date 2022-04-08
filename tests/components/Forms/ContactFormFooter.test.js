import { render, fireEvent, waitFor } from '@testing-library/react'
import { ContactFormFooter } from '@/components/Forms'

describe('<ContactFromFooter />', () => {
  test('should submit subscription form', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )
    const { container } = render(<ContactFormFooter />)
    const applicationForm = container.querySelector('#s2do-form')
    const emailInput = container.querySelector('#InputEmail')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: 'Please Let me Join, I want to be a dev!!!' },
    })

    expect(emailInput.value).toBe('jodi@mail.com')
    expect(messageTextArea.value).toBe('Please Let me Join, I want to be a dev!!!')

    await waitFor(() => fireEvent.submit(applicationForm))

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(emailInput.value).toBe('')
    expect(messageTextArea.value).toBe('')
  })

  test('should handle errors when submission fails', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 200,
      })
    )
    const { container } = render(<ContactFormFooter />)
    const applicationForm = container.querySelector('#s2do-form')
    const emailInput = container.querySelector('#InputEmail')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: 'Please Let me Join, I want to be a dev!!!' },
    })

    try {
      await waitFor(() => fireEvent.submit(applicationForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('should render error message when inputs submitted empty', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 200,
      })
    )

    const { container } = render(<ContactFormFooter />)
    const applicationForm = container.querySelector('#s2do-form')
    const emailInput = container.querySelector('#InputEmail')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(emailInput, {
      target: { value: '' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: '' },
    })

    try {
      await waitFor(() => fireEvent.submit(applicationForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }

    const errorMessages = container.querySelectorAll('.alert-danger')
    expect(errorMessages.length).toBe(2)

    await waitFor(() => {
      fireEvent.input(emailInput, {
        target: { value: 'jodi@mail.com' },
      })

      fireEvent.input(messageTextArea, {
        target: { value: 'Please Let me Join, I want to be a dev!!!' },
      })
    })

    const errorMessageAfterEdit = container.querySelectorAll('.alert-danger')
    expect(errorMessageAfterEdit.length).toBe(0)
  })

  test('should render custom error message when inputs submitted with incorrect values', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 200,
      })
    )

    const { container } = render(<ContactFormFooter />)
    const applicationForm = container.querySelector('#s2do-form')
    const emailInput = container.querySelector('#InputEmail')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(emailInput, {
      target: { value: 'mail@' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: 'hello' },
    })

    try {
      await waitFor(() => fireEvent.submit(applicationForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }

    const errorMessages = container.querySelectorAll('.alert-danger')
    expect(errorMessages.length).toBe(1)
    expect(errorMessages[0].textContent).toContain(
      'Please enter a valid email address jody@example.com'
    )

    await waitFor(() => {
      fireEvent.input(emailInput, {
        target: { value: 'jodi@mail.com' },
      })

      fireEvent.input(messageTextArea, {
        target: { value: 'Please Let me Join, I want to be a dev!!!' },
      })
    })

    const errorMessageAfterEdit = container.querySelectorAll('.alert-danger')
    expect(errorMessageAfterEdit.length).toBe(0)
  })
})
