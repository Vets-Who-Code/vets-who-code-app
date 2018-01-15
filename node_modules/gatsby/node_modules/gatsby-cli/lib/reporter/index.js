"use strict";

var _require = require(`yurnalist`),
    createReporter = _require.createReporter;

var _require2 = require(`common-tags`),
    stripIndent = _require2.stripIndent;

var convertHrtime = require(`convert-hrtime`);

var _require3 = require(`./errors`),
    getErrorFormatter = _require3.getErrorFormatter;

var VERBOSE = process.env.gatsby_log_level === `verbose`;

var errorFormatter = getErrorFormatter();
var reporter = createReporter({ emoji: true, verbose: VERBOSE });
var base = Object.getPrototypeOf(reporter);

module.exports = Object.assign(reporter, {
  stripIndent,

  setVerbose() {
    var isVerbose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.isVerbose = !!isVerbose;
  },

  panic() {
    this.error.apply(this, arguments);
    process.exit(1);
  },

  error(message, error) {
    if (arguments.length === 1 && typeof message !== `string`) {
      error = message;
      message = error.message;
    }
    base.error.call(this, message);
    if (error) console.log(errorFormatter.render(error));
  },

  uptime(prefix) {
    this.verbose(`${prefix}: ${(process.uptime() * 1000).toFixed(3)}ms`);
  },

  activityTimer(name) {
    var spinner = reporter.activity();
    var start = process.hrtime();

    var elapsedTime = function elapsedTime() {
      var elapsed = process.hrtime(start);
      return `${convertHrtime(elapsed)[`seconds`].toFixed(3)} s`;
    };

    return {
      start: function start() {
        spinner.tick(name);
      },
      end: function end() {
        reporter.success(`${name} — ${elapsedTime()}`);
        spinner.end();
      }
    };
  }
});