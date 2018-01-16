"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require(`path`);
var resolveCwd = require(`resolve-cwd`);
var yargs = require(`yargs`);
var report = require(`./reporter`);
var fs = require(`fs`);

var DEFAULT_BROWSERS = [`> 1%`, `last 2 versions`, `IE >= 9`];

var handlerP = function handlerP(fn) {
  return function () {
    Promise.resolve(fn.apply(undefined, arguments)).then(function () {
      return process.exit(0);
    }, function (err) {
      return report.panic(err);
    });
  };
};

function buildLocalCommands(cli, isLocalSite) {
  var defaultHost = `localhost`;
  var directory = path.resolve(`.`);

  var siteInfo = { directory, browserslist: DEFAULT_BROWSERS };
  var useYarn = fs.existsSync(path.join(directory, `yarn.lock`));
  if (isLocalSite) {
    var json = require(path.join(directory, `package.json`));
    siteInfo.sitePackageJson = json;
    siteInfo.browserslist = json.browserslist || siteInfo.browserslist;
  }

  function resolveLocalCommand(command) {
    if (!isLocalSite) {
      cli.showHelp();
      report.verbose(`current directory: ${directory}`);
      return report.panic(`gatsby <${command}> can only be run for a gatsby site. \n` + `Either the current working directory does not contain a package.json or ` + `'gatsby' is not specified as a dependency`);
    }

    try {
      var cmdPath = resolveCwd.silent(`gatsby/dist/commands/${command}`) ||
      // Old location of commands
      resolveCwd.silent(`gatsby/dist/utils/${command}`);
      if (!cmdPath) return report.panic(`There was a problem loading the local ${command} command. Gatsby may not be installed. Perhaps you need to run "npm install"?`);

      report.verbose(`loading local command from: ${cmdPath}`);
      return require(cmdPath);
    } catch (err) {
      cli.showHelp();
      return report.panic(`There was a problem loading the local ${command} command. Gatsby may not be installed. Perhaps you need to run "npm install"?`, err);
    }
  }

  function getCommandHandler(command, handler) {
    return function (argv) {
      report.setVerbose(!!argv.verbose);

      process.env.gatsby_log_level = argv.verbose ? `verbose` : `normal`;
      report.verbose(`set gatsby_log_level: "${process.env.gatsby_log_level}"`);

      process.env.gatsby_executing_command = command;
      report.verbose(`set gatsby_executing_command: "${command}"`);

      var localCmd = resolveLocalCommand(command);
      var args = (0, _extends3.default)({}, argv, siteInfo, { useYarn });

      report.verbose(`running command: ${command}`);
      return handler ? handler(args, localCmd) : localCmd(args);
    };
  }

  cli.command({
    command: `develop`,
    desc: `Start development server. Watches files, rebuilds, and hot reloads ` + `if something changes`,
    builder: function builder(_) {
      return _.option(`H`, {
        alias: `host`,
        type: `string`,
        default: defaultHost,
        describe: `Set host. Defaults to ${defaultHost}`
      }).option(`p`, {
        alias: `port`,
        type: `string`,
        default: `8000`,
        describe: `Set port. Defaults to 8000`
      }).option(`o`, {
        alias: `open`,
        type: `boolean`,
        describe: `Open the site in your browser for you.`
      });
    },
    handler: getCommandHandler(`develop`)
  });

  cli.command({
    command: `build`,
    desc: `Build a Gatsby project.`,
    builder: function builder(_) {
      return _.option(`prefix-paths`, {
        type: `boolean`,
        default: false,
        describe: `Build site with link paths prefixed (set prefix in your config).`
      });
    },
    handler: handlerP(getCommandHandler(`build`, function (args, cmd) {
      process.env.NODE_ENV = `production`;
      return cmd(args);
    }))
  });

  cli.command({
    command: `serve`,
    desc: `Serve previously built Gatsby site.`,
    builder: function builder(_) {
      return _.option(`H`, {
        alias: `host`,
        type: `string`,
        default: defaultHost,
        describe: `Set host. Defaults to ${defaultHost}`
      }).option(`p`, {
        alias: `port`,
        type: `string`,
        default: `9000`,
        describe: `Set port. Defaults to 9000`
      }).option(`o`, {
        alias: `open`,
        type: `boolean`,
        describe: `Open the site in your browser for you.`
      });
    },

    handler: getCommandHandler(`serve`)
  });
}

function isLocalGatsbySite() {
  var inGatsbySite = false;
  try {
    var _require = require(path.resolve(`./package.json`)),
        dependencies = _require.dependencies,
        devDependencies = _require.devDependencies;

    inGatsbySite = dependencies && dependencies.gatsby || devDependencies && devDependencies.gatsby;
  } catch (err) {
    /* ignore */
  }
  return inGatsbySite;
}

module.exports = function (argv, handlers) {
  var cli = yargs();
  var isLocalSite = isLocalGatsbySite();

  cli.usage(`Usage: $0 <command> [options]`).help(`h`).alias(`h`, `help`).version().alias(`v`, `version`).option(`verbose`, {
    default: false,
    type: `boolean`,
    describe: `Turn on verbose output`,
    global: true
  });

  buildLocalCommands(cli, isLocalSite);

  return cli.command({
    command: `new [rootPath] [starter]`,
    desc: `Create new Gatsby project.`,
    handler: handlerP(function (_ref) {
      var rootPath = _ref.rootPath,
          _ref$starter = _ref.starter,
          starter = _ref$starter === undefined ? `gatsbyjs/gatsby-starter-default` : _ref$starter;

      var initStarter = require(`./init-starter`);
      return initStarter(starter, { rootPath });
    })
  }).wrap(cli.terminalWidth()).demandCommand(1, `Pass --help to see all available commands and options.`).showHelpOnFail(true, `A command is required.`).parse(argv.slice(2));
};