"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require(`lodash`);
var slash = require(`slash`);
var fs = require(`fs`);
var path = require(`path`);
var crypto = require(`crypto`);
var glob = require(`glob`);

var _require = require(`../redux`),
    store = _require.store;

var nodeAPIs = require(`../utils/api-node-docs`);
var testRequireError = require(`../utils/test-require-error`);
var report = require(`gatsby-cli/lib/reporter`);

function createFileContentHash(root, globPattern) {
  var hash = crypto.createHash(`md5`);
  var files = glob.sync(`${root}/${globPattern}`, { nodir: true });

  files.forEach(function (filepath) {
    hash.update(fs.readFileSync(filepath));
  });

  return hash.digest(`hex`);
}

/**
 * @typedef {Object} PluginInfo
 * @property {string} resolve The absolute path to the plugin
 * @property {string} name The plugin name
 * @property {string} version The plugin version (can be content hash)
 */

/**
 * resolvePlugin
 * @param {string} pluginName
 * This can be a name of a local plugin, the name of a plugin located in
 * node_modules, or a Gatsby internal plugin. In the last case the pluginName
 * will be an absolute path.
 * @return {PluginInfo}
 */
function resolvePlugin(pluginName) {
  // Only find plugins when we're not given an absolute path
  if (!fs.existsSync(pluginName)) {
    // Find the plugin in the local plugins folder
    var resolvedPath = slash(path.resolve(`./plugins/${pluginName}`));

    if (fs.existsSync(resolvedPath)) {
      if (fs.existsSync(`${resolvedPath}/package.json`)) {
        var packageJSON = JSON.parse(fs.readFileSync(`${resolvedPath}/package.json`, `utf-8`));

        return {
          resolve: resolvedPath,
          name: packageJSON.name || pluginName,
          id: `Plugin ${packageJSON.name || pluginName}`,
          version: packageJSON.version || createFileContentHash(resolvedPath, `**`)
        };
      } else {
        // Make package.json a requirement for local plugins too
        throw new Error(`Plugin ${pluginName} requires a package.json file`);
      }
    }
  }

  /**
   * Here we have an absolute path to an internal plugin, or a name of a module
   * which should be located in node_modules.
   */
  try {
    var _resolvedPath = slash(path.dirname(require.resolve(pluginName)));

    var _packageJSON = JSON.parse(fs.readFileSync(`${_resolvedPath}/package.json`, `utf-8`));

    return {
      resolve: _resolvedPath,
      id: `Plugin ${_packageJSON.name}`,
      name: _packageJSON.name,
      version: _packageJSON.version
    };
  } catch (err) {
    throw new Error(`Unable to find plugin "${pluginName}"`);
  }
}

module.exports = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var plugins, processPlugin, flattenedPlugins, extractPlugins, apis, apiToPlugins, badExports, stringSimiliarity, _require2, stripIndent;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Instantiate plugins.
          plugins = [];

          // Create fake little site with a plugin for testing this
          // w/ snapshots. Move plugin processing to its own module.
          // Also test adding to redux store.

          processPlugin = function processPlugin(plugin) {
            if (_.isString(plugin)) {
              var info = resolvePlugin(plugin);

              return (0, _extends3.default)({}, info, {
                pluginOptions: {
                  plugins: []
                }
              });
            } else {
              // Plugins can have plugins.
              var subplugins = [];
              if (plugin.options && plugin.options.plugins) {
                plugin.options.plugins.forEach(function (p) {
                  subplugins.push(processPlugin(p));
                });

                plugin.options.plugins = subplugins;
              }

              // Add some default values for tests as we don't actually
              // want to try to load anything during tests.
              if (plugin.resolve === `___TEST___`) {
                return {
                  name: `TEST`,
                  pluginOptions: {
                    plugins: []
                  }
                };
              }

              var _info = resolvePlugin(plugin.resolve);

              return (0, _extends3.default)({}, _info, {
                pluginOptions: _.merge({ plugins: [] }, plugin.options)
              });
            }
          };

          // Add internal plugins


          plugins.push(processPlugin(path.join(__dirname, `../internal-plugins/component-page-creator`)));
          plugins.push(processPlugin(path.join(__dirname, `../internal-plugins/component-layout-creator`)));
          plugins.push(processPlugin(path.join(__dirname, `../internal-plugins/internal-data-bridge`)));
          plugins.push(processPlugin(path.join(__dirname, `../internal-plugins/dev-404-page`)));
          plugins.push(processPlugin(path.join(__dirname, `../internal-plugins/prod-404`)));
          plugins.push(processPlugin(path.join(__dirname, `../internal-plugins/query-runner`)));

          // Add plugins from the site config.
          if (config.plugins) {
            config.plugins.forEach(function (plugin) {
              plugins.push(processPlugin(plugin));
            });
          }

          // Add the site's default "plugin" i.e. gatsby-x files in root of site.
          plugins.push({
            resolve: slash(process.cwd()),
            id: `Plugin default-site-plugin`,
            name: `default-site-plugin`,
            version: createFileContentHash(process.cwd(), `gatsby-*`),
            pluginOptions: {
              plugins: []
            }
          });

          // Create a "flattened" array of plugins with all subplugins
          // brought to the top-level. This simplifies running gatsby-* files
          // for subplugins.
          flattenedPlugins = [];

          extractPlugins = function extractPlugins(plugin) {
            plugin.pluginOptions.plugins.forEach(function (subPlugin) {
              flattenedPlugins.push(subPlugin);
              extractPlugins(subPlugin);
            });
          };

          plugins.forEach(function (plugin) {
            flattenedPlugins.push(plugin);
            extractPlugins(plugin);
          });

          // Validate plugins before saving. Plugins can only export known APIs. The known
          // APIs that a plugin supports are saved along with the plugin in the store for
          // easier filtering later. If there are bad exports (either typos, outdated, or
          // plain incorrect), then we output a readable error & quit.
          apis = _.keys(nodeAPIs);
          apiToPlugins = apis.reduce(function (acc, value) {
            acc[value] = [];
            return acc;
          }, {});
          badExports = [];

          flattenedPlugins.forEach(function (plugin) {
            var gatsbyNode = void 0;
            plugin.nodeAPIs = [];
            try {
              gatsbyNode = require(`${plugin.resolve}/gatsby-node`);
            } catch (err) {
              if (!testRequireError(`gatsby-node`, err)) {
                // ignore
              } else {
                report.panic(`Error requiring ${plugin.resolve}/gatsby-node.js`, err);
              }
            }

            if (gatsbyNode) {
              var gatsbyNodeKeys = _.keys(gatsbyNode);
              // Discover which nodeAPIs this plugin implements and store
              // an array against the plugin node itself *and* in a node
              // API to plugins map for faster lookups later.
              plugin.nodeAPIs = _.intersection(gatsbyNodeKeys, apis);
              plugin.nodeAPIs.map(function (nodeAPI) {
                return apiToPlugins[nodeAPI].push(plugin.name);
              });
              // Discover any exports from plugins which are not "known"
              badExports = badExports.concat(_.difference(gatsbyNodeKeys, apis).map(function (e) {
                return {
                  exportName: e,
                  pluginName: plugin.name,
                  pluginVersion: plugin.version
                };
              }));
            }
          });

          if (badExports.length > 0) {
            stringSimiliarity = require(`string-similarity`);
            _require2 = require(`common-tags`), stripIndent = _require2.stripIndent;

            console.log(`\n`);
            console.log(stripIndent`
      Your plugins must export known APIs from their gatsby-node.js.
      The following exports aren't APIs. Perhaps you made a typo or
      your plugin is outdated?

      See https://www.gatsbyjs.org/docs/node-apis/ for the list of Gatsby Node APIs`);
            badExports.forEach(function (bady) {
              var similarities = stringSimiliarity.findBestMatch(bady.exportName, apis);
              var message = `\n — `;
              if (bady.pluginName == `default-site-plugin`) {
                message += `Your site's gatsby-node.js is exporting a variable named "${bady.exportName}" which isn't an API.`;
              } else {
                message += `The plugin "${bady.pluginName}@${bady.pluginVersion}" is exporting a variable named "${bady.exportName}" which isn't an API.`;
              }
              if (similarities.bestMatch.rating > 0.5) {
                message += ` Perhaps you meant to export "${similarities.bestMatch.target}"?`;
              }

              console.log(message);
            });
            process.exit();
          }

          store.dispatch({
            type: `SET_SITE_PLUGINS`,
            payload: plugins
          });

          store.dispatch({
            type: `SET_SITE_FLATTENED_PLUGINS`,
            payload: flattenedPlugins
          });

          store.dispatch({
            type: `SET_SITE_API_TO_PLUGINS`,
            payload: apiToPlugins
          });

          return _context.abrupt("return", flattenedPlugins);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));
//# sourceMappingURL=load-plugins.js.map