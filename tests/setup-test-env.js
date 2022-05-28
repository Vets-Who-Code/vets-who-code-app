import '@testing-library/jest-dom/extend-expect'
import { mswServer } from '../mocks/msw-server'

global.MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
}

// mock next/image globally
jest.mock('next/image', () => ({
  // eslint-disable-next-line
  __esModule: true,
  default: props => {
    // eslint-disable-next-line
    const { blurDataURL, ...rest } = props // blurDataURL is not used in this mock
    // eslint-disable-next-line
    return <img {...rest} />
  },
}))

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())
