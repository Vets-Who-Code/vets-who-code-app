const React = require('react')
const Layout = require('./src/components/Layout').default

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="https://linked.chat/web/a9LB63" src="https://linked.chat/web/a9LB63" defer />,
  ])
}

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
