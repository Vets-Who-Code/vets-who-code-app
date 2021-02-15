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

const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  console.error = (...args) => {
    originalError.call(console, ...args)
  }
})

beforeAll(() => {
  console.warn = (...args) => {
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})
