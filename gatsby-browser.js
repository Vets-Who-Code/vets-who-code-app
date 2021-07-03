const React = require('react')
const Layout = require('./src/components/Layout').default

require('./src/assets/lib/bootstrap/dist/css/bootstrap.min.css')
require('./src/assets/css/main.css')
require('./src/assets/css/custom.css')

exports.onInitialClientRender = () => {
  require('typeface-roboto-slab')
  require('typeface-source-sans-pro')
  require('typeface-lato')
}

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
