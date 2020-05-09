/* eslint-disable react/display-name */
import React from 'react'
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

function rendedReplEmbed(uri) {
  return (
    <iframe
      height="400px"
      width="100%"
      src={uri}
      scrolling="no"
      frameBorder="no"
      // allowtransparency="true"
      allowFullScreen
      sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"
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
        if (node?.data?.uri.indexOf('repl') > -1 && node?.data?.uri !== 'https://repl.it') {
          return rendedReplEmbed(node.data.uri)
        }
      }

      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    },
  },
}
