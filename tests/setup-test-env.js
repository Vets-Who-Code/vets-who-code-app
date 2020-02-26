import 'jest-dom/extend-expect'

// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each'

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
