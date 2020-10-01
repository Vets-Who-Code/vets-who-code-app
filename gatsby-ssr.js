const React = require('react')
const Layout = require('./src/components/Layout').default

exports.onRenderBody = ({ setPostBodyComponents, setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />)
  setPostBodyComponents([
    <script key="https://linked.chat/web/a9LB63" src="https://linked.chat/web/a9LB63" defer />,
  ])
}

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

const MagicScriptTag = () => {
  let codeToRunOnClient = `
  (function(){
    const root = document.documentElement;
    root.setAttribute("color-mode", "dark")
  })()`
  // eslint-disable-next-line react/no-danger
  return <script key="magic-script-tag" dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}
