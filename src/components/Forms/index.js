import { toast } from 'react-toastify'

export const onSubmitSuccess = message => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export const onSubmitError = message => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export { default as ApplyForm } from './ApplyForm'
export { default as ContactForm } from './ContactForm'
export { default as MentorForm } from './MentorForm'
export { default as SubscribeForm } from './SubscribeForm'
export { default as FormAlert } from './FormAlert'
