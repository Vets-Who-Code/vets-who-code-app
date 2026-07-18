import type { InteractiveLesson } from "@/lib/interactive-lessons/types";

/**
 * Module 5.5 + 5.7 — Arrays + DOM manipulation. The Nutrition-table exercise:
 * loop an array of objects and build table rows with createElement/appendChild.
 */
export const jsRenderTableRows: InteractiveLesson = {
    slug: "js-render-table-rows",
    title: "Render Table Rows from an Array",
    module: 5,
    moduleTitle: "JavaScript Fundamentals",
    order: 1,
    hasPreview: true,
    runtime: "browser-web",
    instructions: `## Render Table Rows from an Array

Real apps don't hard-code HTML rows — they take **data** and generate the DOM. Here you'll turn an array of food objects into table rows with JavaScript.

The markup is done: an empty \`<tbody id="rows">\` is waiting. The \`foods\` array is given.

### Your task — in \`index.js\`

For **each** food in \`foods\`, create a \`<tr>\` containing **three** \`<td>\` cells — the food's \`name\`, \`calories\`, and \`protein\` — then append the row to \`<tbody id="rows">\`.

Reach for \`document.createElement\`, \`textContent\`, and \`appendChild\`. A \`for...of\` loop is the clean way to walk the array.

Hit **RUN** — the table should fill in, and all four tests should pass.`,
    files: [
        {
            name: "index.html",
            readOnly: true,
            contents: `<h1>Nutrition</h1>
<table>
  <thead>
    <tr><th>Food</th><th>Calories</th><th>Protein (g)</th></tr>
  </thead>
  <tbody id="rows"></tbody>
</table>
`,
        },
        {
            name: "index.css",
            readOnly: true,
            contents: `body { font-family: system-ui, sans-serif; margin: 24px; color: #0f1b2d; }
h1 { font-size: 1.5rem; }
table { border-collapse: collapse; width: 100%; }
th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #d9dee6; }
thead th { background: #0f1b2d; color: #fff; }
`,
        },
        {
            name: "index.js",
            contents: `const foods = [
  { name: "Eggs", calories: 155, protein: 13 },
  { name: "Chicken", calories: 165, protein: 31 },
  { name: "Rice", calories: 206, protein: 4 },
];

const tbody = document.getElementById("rows");

// TODO: for each food, create a <tr> with three <td> cells
// (name, calories, protein) and append it to tbody.
`,
        },
    ],
    tests: [
        {
            name: "Renders one row per food",
            body: `assertEqual(document.querySelectorAll("#rows tr").length, 3, "Expected one <tr> per food (3 total).");`,
        },
        {
            name: "The first row shows the first food's name",
            body: `var cell = document.querySelector("#rows tr td");
assert(cell, "No cells rendered yet.");
assertEqual(cell.textContent.trim(), "Eggs", "The first cell of the first row should be the first food's name.");`,
        },
        {
            name: "Each row has three cells",
            body: `var first = document.querySelector("#rows tr");
assert(first, "No rows rendered yet.");
assertEqual(first.querySelectorAll("td").length, 3, "Each row should have exactly three <td> cells.");`,
        },
        {
            name: "The calories cell shows the number",
            body: `var cells = document.querySelectorAll("#rows tr:first-child td");
assert(cells.length >= 2, "The first row needs a second cell for calories.");
assert(cells[1].textContent.indexOf("155") !== -1, "The second cell of the first row should show 155 calories.");`,
        },
    ],
    solutionFiles: [
        {
            name: "index.js",
            contents: `const foods = [
  { name: "Eggs", calories: 155, protein: 13 },
  { name: "Chicken", calories: 165, protein: 31 },
  { name: "Rice", calories: 206, protein: 4 },
];

const tbody = document.getElementById("rows");

for (const food of foods) {
  const tr = document.createElement("tr");
  for (const value of [food.name, food.calories, food.protein]) {
    const td = document.createElement("td");
    td.textContent = String(value);
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
`,
        },
    ],
};
