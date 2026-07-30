import type { InteractiveLesson } from "@/lib/interactive-lessons/types";

/**
 * Module 4.2 — HTML Elements: tables (table/thead/tbody/tr/th/td).
 * Learner writes the table markup by hand; CSS is provided so it looks sharp.
 */
export const htmlTables: InteractiveLesson = {
    slug: "html-tables",
    title: "Structure Data with an HTML Table",
    module: 4,
    moduleTitle: "HTML & CSS Fundamentals",
    order: 1,
    hasPreview: true,
    runtime: "browser-web",
    instructions: `## Structure Data with an HTML Table

Tables are how you present rows of structured data — a squad roster, a pay chart, a set of results. Every data table has the same bones:

- \`<table>\` — the container
- \`<thead>\` with one \`<tr>\` of \`<th>\` **header** cells
- \`<tbody>\` with one \`<tr>\` per record, each holding \`<td>\` **data** cells

### Your task

Inside the \`<table>\`, build a roster with:

1. A \`<thead>\` row of **three** \`<th>\` headers: **Name**, **Role**, **Branch**.
2. A \`<tbody>\` with **at least two** \`<tr>\` rows, each with **three** \`<td>\` cells.

The styling is already written — focus on the structure. Hit **RUN** to check your work.`,
    files: [
        {
            name: "index.html",
            contents: `<h1>Squad Roster</h1>

<table>
  <!-- Add a <thead> with a header row: Name, Role, Branch -->

  <!-- Add a <tbody> with at least two data rows -->

</table>
`,
        },
        {
            name: "index.css",
            readOnly: true,
            contents: `body { font-family: system-ui, sans-serif; margin: 24px; color: #0f1b2d; }
h1 { font-size: 1.5rem; margin-bottom: 16px; }
table { border-collapse: collapse; width: 100%; }
th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #d9dee6; }
thead th { background: #0f1b2d; color: #fff; }
tbody tr:nth-child(even) { background: #f4f6f9; }
`,
        },
    ],
    tests: [
        {
            name: "The page has a <table>",
            body: `assert(document.querySelector("table"), "No <table> found on the page.");`,
        },
        {
            name: "The table has a <thead> with three column headers",
            body: `assertEqual(document.querySelectorAll("thead th").length, 3, "Expected exactly three <th> cells inside <thead>.");`,
        },
        {
            name: "The table body has at least two rows",
            body: `assert(document.querySelectorAll("tbody tr").length >= 2, "Expected at least two <tr> rows inside <tbody>.");`,
        },
        {
            name: "Each body row has three cells",
            body: `var first = document.querySelector("tbody tr");
assert(first, "No rows found in <tbody>.");
assertEqual(first.querySelectorAll("td").length, 3, "The first body row should have three <td> cells.");`,
        },
    ],
    solutionFiles: [
        {
            name: "index.html",
            contents: `<h1>Squad Roster</h1>

<table>
  <thead>
    <tr><th>Name</th><th>Role</th><th>Branch</th></tr>
  </thead>
  <tbody>
    <tr><td>Ramirez</td><td>Software Engineer</td><td>Army</td></tr>
    <tr><td>Chen</td><td>Product Designer</td><td>Navy</td></tr>
    <tr><td>Okafor</td><td>Data Engineer</td><td>Air Force</td></tr>
  </tbody>
</table>
`,
        },
    ],
};
