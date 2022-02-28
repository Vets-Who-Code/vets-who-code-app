import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

const mswServer = setupServer(...handlers)

export { rest, mswServer }
