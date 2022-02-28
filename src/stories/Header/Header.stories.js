import Header from '../../../src/components/Header'

export default {
  component: Header,
  title: 'Components/Header',
}

const Template = args => <Header {...args} />

export const Example = Template.bind({})

Example.args = {}
