"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require(`child_process`),
    execSync = _require.execSync;

var execa = require(`execa`);
var hostedGitInfo = require(`hosted-git-info`);
var fs = require(`fs-extra`);
var sysPath = require(`path`);
var report = require(`./reporter`);

var spawn = function spawn(cmd) {
  var _cmd$split = cmd.split(/\s+/),
      file = _cmd$split[0],
      args = _cmd$split.slice(1);

  return execa(file, args, { stdio: `inherit` });
};

// Checks the existence of yarn package
// We use yarnpkg instead of yarn to avoid conflict with Hadoop yarn
// Refer to https://github.com/yarnpkg/yarn/issues/673
//
// Returns true if yarn exists, false otherwise
var shouldUseYarn = function shouldUseYarn() {
  try {
    execSync(`yarnpkg --version`, { stdio: `ignore` });
    return true;
  } catch (e) {
    return false;
  }
};

// Executes `npm install` or `yarn install` in rootPath.
var install = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(rootPath) {
    var prevDir, cmd;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            prevDir = process.cwd();


            report.info(`Installing packages...`);
            process.chdir(rootPath);

            _context.prev = 3;
            cmd = shouldUseYarn() ? spawn(`yarnpkg`) : spawn(`npm install`);
            _context.next = 7;
            return cmd;

          case 7:
            _context.prev = 7;

            process.chdir(prevDir);
            return _context.finish(7);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3,, 7, 10]]);
  }));

  return function install(_x) {
    return _ref.apply(this, arguments);
  };
}();

var ignored = function ignored(path) {
  return !/^\.(git|hg)$/.test(sysPath.basename(path));
};

// Copy starter from file system.
var copy = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(starterPath, rootPath) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fs.mkdirp(rootPath, { mode: 493 });

          case 2:
            if (fs.existsSync(starterPath)) {
              _context2.next = 4;
              break;
            }

            throw new Error(`starter ${starterPath} doesn't exist`);

          case 4:
            report.info(`Creating new site from local starter: ${starterPath}`);

            report.log(`Copying local starter to ${rootPath} ...`);

            _context2.next = 8;
            return fs.copy(starterPath, rootPath, { filter: ignored });

          case 8:

            report.success(`Created starter directory layout`);

            _context2.next = 11;
            return install(rootPath);

          case 11:
            return _context2.abrupt("return", true);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function copy(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// Clones starter from URI.
var clone = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(hostInfo, rootPath) {
    var url, branch;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = hostInfo.git({ noCommittish: true });
            branch = hostInfo.committish ? `-b ${hostInfo.committish}` : ``;


            report.info(`Creating new site from git: ${url}`);

            _context3.next = 5;
            return spawn(`git clone ${branch} ${url} ${rootPath} --single-branch`);

          case 5:

            report.success(`Created starter directory layout`);

            _context3.next = 8;
            return fs.remove(sysPath.join(rootPath, `.git`));

          case 8:
            _context3.next = 10;
            return install(rootPath);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function clone(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Main function that clones or copies the starter.
 */
module.exports = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(starter) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var rootPath, hostedInfo;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            rootPath = options.rootPath || process.cwd();

            if (!fs.existsSync(sysPath.join(rootPath, `package.json`))) {
              _context4.next = 4;
              break;
            }

            report.panic(`Directory ${rootPath} is already an npm project`);
            return _context4.abrupt("return");

          case 4:
            hostedInfo = hostedGitInfo.fromUrl(starter);

            if (!hostedInfo) {
              _context4.next = 10;
              break;
            }

            _context4.next = 8;
            return clone(hostedInfo, rootPath);

          case 8:
            _context4.next = 12;
            break;

          case 10:
            _context4.next = 12;
            return copy(starter, rootPath);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7) {
    return _ref4.apply(this, arguments);
  };
}();