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

window.HTMLMediaElement.prototype.play = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.pause = () => {
  /* do nothing */
}
window.HTMLMediaElement.prototype.addTextTrack = () => {
  /* do nothing */
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
    // clear test console from warning coming from gatsby-plugin-image tyring to
    // load a file based on a path
    if (args.indexOf('Image not loaded') > -1) return
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})
