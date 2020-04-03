import '@testing-library/jest-dom'

global.google = {
  maps: {
    LatLng: jest.fn(),
    Map: class {},
    InfoWindow: jest.fn(),
    Marker: class {
      addListener() {}
    },
    MapTypeId: {
      ROADMAP: '',
    },
  },
}

global.MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
}

// https://github.com/testing-library/react-testing-library
// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    if (/Warning: componentWillMount has been renamed, ./.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

beforeAll(() => {
  console.warn = (...args) => {
    if (/Warning: componentWillMount has been renamed./.test(args[0])) {
      return
    }
    if (/Warning: componentWillReceiveProps has been renamed,/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})
