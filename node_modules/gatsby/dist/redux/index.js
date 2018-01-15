"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Redux = require(`redux`);
var Promise = require(`bluebird`);
var _ = require(`lodash`);

var _require = require(`remote-redux-devtools`),
    composeWithDevTools = _require.composeWithDevTools;

var fs = require(`fs`);
var mitt = require(`mitt`);
var stringify = require(`json-stringify-safe`);

// Create event emitter for actions
var emitter = mitt();

// Reducers
var reducers = require(`./reducers`);

// Read from cache the old node data.
var initialState = {};
var rootNodeMap = new WeakMap();
try {
  initialState = JSON.parse(fs.readFileSync(`${process.cwd()}/.cache/redux-state.json`));

  _.each(initialState.nodes, function (id, node) {
    trackSubObjectsToRootNodeId(node);
  });
} catch (e) {
  // ignore errors.
}

var store = void 0;
// Only setup the Redux devtools if explicitly enabled.
if (process.env.REDUX_DEVTOOLS === `true`) {
  var sitePackageJSON = require(`${process.cwd()}/package.json`);
  var composeEnhancers = composeWithDevTools({
    realtime: true,
    port: 19999,
    name: sitePackageJSON.name
  });
  store = Redux.createStore(Redux.combineReducers((0, _extends3.default)({}, reducers)), initialState, composeEnhancers(Redux.applyMiddleware()));
} else {
  store = Redux.createStore(Redux.combineReducers((0, _extends3.default)({}, reducers)), initialState);
}

// Persist state.
var saveState = _.debounce(function (state) {
  var pickedState = _.pick(state, [`nodes`, `status`, `componentDataDependencies`]);
  fs.writeFile(`${process.cwd()}/.cache/redux-state.json`, stringify(pickedState, null, 2), function () {});
}, 1000);

store.subscribe(function () {
  var lastAction = store.getState().lastAction;
  emitter.emit(lastAction.type, lastAction);
});

emitter.on(`*`, function () {
  saveState(store.getState());
});

exports.emitter = emitter;
exports.store = store;
exports.getNodes = function () {
  var nodes = _.values(store.getState().nodes);
  return nodes ? nodes : [];
};
var getNode = function getNode(id) {
  return store.getState().nodes[id];
};
exports.getNode = getNode;
exports.hasNodeChanged = function (id, digest) {
  var node = store.getState().nodes[id];
  if (!node) {
    return true;
  } else {
    return node.internal.contentDigest !== digest;
  }
};

exports.loadNodeContent = function (node) {
  if (node.internal.content) {
    return Promise.resolve(node.internal.content);
  } else {
    return new Promise(function (resolve) {
      // Load plugin's loader function
      var plugin = store.getState().flattenedPlugins.find(function (plug) {
        return plug.name === node.internal.owner;
      });

      var _require2 = require(plugin.resolve),
          loadNodeContent = _require2.loadNodeContent;

      if (!loadNodeContent) {
        throw new Error(`Could not find function loadNodeContent for plugin ${plugin.name}`);
      }

      return loadNodeContent(node).then(function (content) {
        // TODO update node's content field here.
        resolve(content);
      });
    });
  }
};

exports.getNodeAndSavePathDependency = function (id, path) {
  var _require3 = require(`./actions/add-page-dependency`),
      createPageDependency = _require3.createPageDependency;

  var node = getNode(id);
  createPageDependency({ path, nodeId: id });
  return node;
};

exports.getRootNodeId = function (node) {
  return rootNodeMap.get(node);
};

var addParentToSubObjects = function addParentToSubObjects(data, parentId) {
  if (_.isPlainObject(data) || _.isArray(data)) {
    _.each(data, function (o) {
      return addParentToSubObjects(o, parentId);
    });
    rootNodeMap.set(data, parentId);
  }
};

var trackSubObjectsToRootNodeId = function trackSubObjectsToRootNodeId(node) {
  _.each(node, function (v, k) {
    // Ignore the node internal object.
    if (k === `internal`) {
      return;
    }
    addParentToSubObjects(v, node.parent);
  });
};
exports.trackSubObjectsToRootNodeId = trackSubObjectsToRootNodeId;

// Start plugin runner which listens to the store
// and invokes Gatsby API based on actions.
require(`./plugin-runner`);
//# sourceMappingURL=index.js.map