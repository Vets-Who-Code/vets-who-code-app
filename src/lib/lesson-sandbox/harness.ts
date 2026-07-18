/**
 * The sandbox harness: JavaScript that runs INSIDE the lesson iframe, emitted
 * here as strings so `build-srcdoc.ts` can inline it into the document.
 *
 * Two pieces:
 *  - the console shim + error capture (runs first, in <head>, before learner code)
 *  - the test runner (runs last, after learner code, on window `load`)
 *
 * Both post structured messages to `parent` (see `messages.ts`). The iframe has
 * an opaque origin (sandbox without allow-same-origin), so it can only target
 * `"*"`; the parent authenticates messages by checking `event.source`.
 */

import type { LessonTest } from "@/lib/interactive-lessons/types";

/**
 * Neutralize a closing tag so learner/authored content embedded in a <script>
 * or <style> block cannot break out of it. `</script>` -> `<\/script>`.
 */
export function escapeForInlineTag(code: string): string {
    return code.replace(/<\/(script|style)/gi, "<\\/$1");
}

/**
 * Console shim + global error capture. Installed before any learner code so
 * every console call and uncaught error during the run is relayed to the parent.
 */
export function buildConsoleShim(runId: number): string {
    return `(function(){
  var RUN_ID = ${runId};
  function ser(a){
    try {
      if (typeof a === "string") return a;
      if (a instanceof Error) return a.name + ": " + a.message;
      if (typeof a === "undefined") return "undefined";
      if (typeof a === "function") return "[Function: " + (a.name || "anonymous") + "]";
      return JSON.stringify(a);
    } catch (e) { return String(a); }
  }
  function post(level, args){
    try { parent.postMessage({ source: "vwc-lesson", runId: RUN_ID, type: "console", level: level, args: args }, "*"); } catch (e) {}
  }
  ["log","info","warn","error"].forEach(function(level){
    var orig = (typeof console[level] === "function") ? console[level].bind(console) : function(){};
    console[level] = function(){
      post(level, Array.prototype.slice.call(arguments).map(ser));
      try { orig.apply(null, arguments); } catch (e) {}
    };
  });
  window.addEventListener("error", function(e){ post("error", [ e && e.message ? String(e.message) : "Script error" ]); });
  window.addEventListener("unhandledrejection", function(e){
    var r = e && e.reason;
    post("error", [ "Unhandled promise rejection: " + (r && r.message ? r.message : ser(r)) ]);
  });
})();`;
}

/**
 * Test runner. Defines `assert`/`assertEqual`, runs each test body in isolation
 * (so one failing test does not abort the rest), and posts one "tests" message.
 * Runs on window `load` + a macrotask tick so learner DOMContentLoaded handlers
 * and initial style/layout have settled (needed for getComputedStyle tests).
 */
export function buildTestRunner(tests: LessonTest[], runId: number): string {
    // Authored test bodies are first-party, but escape defensively: the JSON is
    // inlined into a <script>, so any literal "</script>" in a body must not break out.
    const testsJson = escapeForInlineTag(JSON.stringify(tests));
    return `(function(){
  var RUN_ID = ${runId};
  var TESTS = ${testsJson};
  function show(v){
    if (typeof v === "string") return JSON.stringify(v);
    try { return JSON.stringify(v); } catch (e) { return String(v); }
  }
  function assert(cond, msg){ if (!cond) throw new Error(msg || "Assertion failed"); }
  function assertEqual(actual, expected, msg){
    if (show(actual) !== show(expected)) {
      throw new Error((msg ? msg + " — " : "") + "expected " + show(expected) + " but got " + show(actual));
    }
  }
  function run(){
    var results = TESTS.map(function(t){
      try {
        (new Function("assert", "assertEqual", t.body))(assert, assertEqual);
        return { name: t.name, passed: true, error: null };
      } catch (err) {
        return { name: t.name, passed: false, error: (err && err.message) ? err.message : String(err) };
      }
    });
    var passed = 0;
    for (var i = 0; i < results.length; i++) { if (results[i].passed) passed++; }
    try { parent.postMessage({ source: "vwc-lesson", runId: RUN_ID, type: "tests", results: results, passed: passed, total: results.length }, "*"); } catch (e) {}
  }
  if (document.readyState === "complete") { setTimeout(run, 0); }
  else { window.addEventListener("load", function(){ setTimeout(run, 0); }); }
})();`;
}
