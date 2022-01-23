import React from 'react'
import ThemeProvider from '../../store/ThemeProvider'
import Card from './'

export default {
  component: Card,
  title: 'Components/Card',
}

const Template = args => <Card {...args} />

export const Default = Template.bind({})

Default.args = {
  jobData: {
    created: '2020-04-01T00:00:00.000Z',
    title: '<h1>Hello World</h1>',
    company: {
      display_name: 'Company',
    },
    location: {
      display_name: 'Location',
    },
    description: 'Hi 👋',
    // eslint-disable-next-line camelcase
    redirect_url: 'https://google.com',
  },
}
