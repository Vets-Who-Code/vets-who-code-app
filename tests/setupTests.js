import enzyme from 'enzyme'

import Adapter from 'enzyme-adapter-react-15'
/**
* React 15 Enzyme adapter
*/
enzyme.configure({ adapter: new Adapter(), ignoreLifeCycleMethods: true })

/**
* Make Enzyme functions available in all test files without importing
*/
global.shallow = enzyme.shallow
global.render = enzyme.render
global.mount = enzyme.mount