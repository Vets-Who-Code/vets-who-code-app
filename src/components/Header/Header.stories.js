import React from 'react'
import ThemeProvider from '../../store/ThemeProvider'
import Header from './Header'

export default {
  component: Header,
  title: 'Components/Header',
}

const Template = args => <Header {...args} />

export const Default = Template.bind({})

Default.args = {}
