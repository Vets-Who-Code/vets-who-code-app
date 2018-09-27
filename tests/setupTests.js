import enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
/**
* React 16 Enzyme adapter
*/
enzyme.configure({ adapter: new Adapter(), ignoreLifeCycleMethods: true });

/**
* Make Enzyme functions available in all test files without importing
*/
global.shallow = enzyme.shallow;
global.render = enzyme.render;
global.mount = enzyme.mount;
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
};
