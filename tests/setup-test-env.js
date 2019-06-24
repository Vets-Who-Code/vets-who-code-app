import "jest-dom/extend-expect"

// this is basically: afterEach(cleanup)
import "@testing-library/react/cleanup-after-each"

global.google = {
  maps: {
    LatLng: jest.fn(),
    Map: jest.fn(),
    InfoWindow: jest.fn(),
    Marker: () => ({
      addListener: jest.fn()
    }),
    MapTypeId: {
      ROADMAP: ''
    }
  }
}
