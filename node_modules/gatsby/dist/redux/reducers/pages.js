"use strict";

var _ = require(`lodash`);
var normalize = require(`normalize-path`);

module.exports = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case `DELETE_CACHE`:
      return [];
    case `CREATE_PAGE`:
      {
        action.payload.component = normalize(action.payload.component);
        if (!action.plugin && !action.plugin.name) {
          console.log(``);
          console.error(JSON.stringify(action, null, 4));
          console.log(``);
          throw new Error(`Pages can only be created by plugins. There wasn't a plugin set
        when creating this page.`);
        }
        // Link page to its plugin.
        action.payload.pluginCreator___NODE = action.plugin.id;
        action.payload.pluginCreatorId = action.plugin.id;
        var index = _.findIndex(state, function (p) {
          return p.path === action.payload.path;
        });
        // If the path already exists, overwrite it.
        // Otherwise, add it to the end.
        if (index !== -1) {
          return [].concat(state.slice(0, index).concat(action.payload).concat(state.slice(index + 1)));
        } else {
          return [].concat(state.concat(action.payload));
        }
      }
    case `DELETE_PAGE`:
      return state.filter(function (p) {
        return p.path !== action.payload.path;
      });
    default:
      return state;
  }
};
//# sourceMappingURL=pages.js.map