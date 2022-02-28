import Card from '../../components/Card'

export default {
  component: Card,
  title: 'Components/Card',
}

const Template = args => <Card {...args} />

export const Example = Template.bind({})

Example.args = {
  jobData: {
    created: '2020-04-01T00:00:00.000Z',
    title: '<h1>Hello World</h1>',
    company: {
      // eslint-disable-next-line camelcase
      display_name: 'Company',
    },
    location: {
      // eslint-disable-next-line camelcase
      display_name: 'Location',
    },
    description: 'Hi 👋',
    // eslint-disable-next-line camelcase
    redirect_url: 'https://google.com',
  },
}
