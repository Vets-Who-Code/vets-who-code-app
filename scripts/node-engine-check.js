const result = process.versions

const CURRENT_NODE_VERSION = parseInt(result.node)

const colors = {
  error: '\x1b[30m\x1b[41m%s',
  info: '\x1b[30m\x1b[42m%s',
  warn: '\x1b[30m\x1b[43m%s',
  reset: '\x1b[0m',
}

if (result?.node) {
  if (CURRENT_NODE_VERSION >= 14 || CURRENT_NODE_VERSION <= 16) {
    console.log(
      colors.info,
      ' [INFO]',
      colors.reset,
      `******* Good to Go with your Node Version:  ${result.node}  *******  `,
      '\n\n'
    )
  } else {
    console.log(
      colors.error,
      ' [ERROR]',
      colors.reset,
      `******* Your current Node Version is: ${result.node} and must be >= 14.X.X or <= 16.X.X *******  `,
      '\n\n'
    )

    process.exit(1)
  }
}
