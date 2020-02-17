import 'jest-dom/extend-expect'

// this is basically: afterEach(cleanup)
import '@testing-library/react/cleanup-after-each'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

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
