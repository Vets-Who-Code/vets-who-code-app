/* eslint-disable react/display-name */
import PropTypes from 'prop-types'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

function Bold({ children }) {
  return <span style={{ fontWeight: 'bold', color: 'inherit' }}>{children}</span>
}

Bold.propTypes = {
  children: PropTypes.node,
}

function Text({ children }) {
  return <p>{children}</p>
}

Text.propTypes = {
  children: PropTypes.node,
}

function renderCodepenEmbed(uri) {
  const pathSplit = uri.split('/')
  // eslint-disable-next-line no-unused-vars
  const [protocol, emptyString, codePen, name] = pathSplit

  const slugHash = pathSplit.pop()
  return (
    <div
      className="codepen"
      data-height="600"
      data-theme-id="light"
      data-default-tab="css,result"
      data-user={name}
      data-slug-hash={slugHash}
      style={{
        height: '600px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid',
        margin: '1em 0',
        padding: '1em',
      }}
      data-pen-title="Heart Flag"
    >
      <span>
        <a href={uri}>View on CodePen</a>
        <a href="https://codepen.io">CodePen</a>.
      </span>
    </div>
  )
}

function renderIframeEmbed({
  uri,
  sandbox = '',
  allow = '',
  height = 400,
  width = 100,
  scrolling = 'no',
  allowtransparency = false,
  frameBorder = 'no',
}) {
  return (
    <iframe
      height={`${height}px`}
      width={`${width}%`}
      src={uri}
      scrolling={scrolling}
      frameBorder={frameBorder}
      allowtransparency={`"${allowtransparency}"`}
      allowFullScreen
      sandbox={sandbox}
      allow={allow}
    />
  )
}

export const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <Text>{children}</Text>
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const alt = node?.data?.target?.fields?.title['en-US']
      const url = node?.data?.target?.fields?.file['en-US'].url
      return <img alt={alt} src={url} className="img-responsive" />
    },
    [INLINES.HYPERLINK]: (node, children) => {
      if (node?.nodeType === 'hyperlink') {
        if (
          node?.data?.uri.indexOf('codepen') > -1 &&
          node?.data?.uri !== 'https://codepen.io/vetswhocode'
        ) {
          return renderCodepenEmbed(node.data.uri)
        }
        if (node?.data?.uri.indexOf('repl') > -1 && node?.data?.uri !== 'https://repl.com') {
          return renderIframeEmbed({
            uri: node.data.uri,
            sandbox:
              'allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals',
          })
        }
        if (node?.data?.uri.indexOf('spotify') > -1 && node?.data?.uri.includes('embed')) {
          return renderIframeEmbed({
            uri: node.data.uri,
            height: 232,
            frameBorder: 0,
            allow: 'encrypted-media',
            allowtransparency: 'true',
            sandbox:
              'allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals',
          })
        }
      }

      return (
        <a href={node.data.uri} className="blog-span" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
  },
}

/**
 * findDescription
 * finds the first child of a blog post body
 * that is of Type String and is not ""
 *
 * @param post body in the form of JSON
 * @param content Array
 * @param data Object
 * @param nodType String
 * @param data
 *
 * @return String
 */
export function findDescription(data) {
  let description = null

  for (let child of data.content) {
    if (child?.content[0]?.value) {
      description = child.content[0].value
      return description
    }
  }

  return description
}
