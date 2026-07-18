import type { InteractiveLesson } from "@/lib/interactive-lessons/types";

/**
 * Module 4.7 — Flexbox. HTML is fixed (read-only); the learner writes the CSS.
 * Tests read getComputedStyle in the live iframe, so they run in a real browser.
 */
export const cssFlexboxNav: InteractiveLesson = {
    slug: "css-flexbox-nav",
    title: "Build a Navbar with Flexbox",
    module: 4,
    moduleTitle: "HTML & CSS Fundamentals",
    order: 2,
    hasPreview: true,
    runtime: "browser-web",
    instructions: `## Build a Navbar with Flexbox

Flexbox lays out items along one axis and controls the space between them. It's the standard way to build a navigation bar: brand on the left, links on the right.

The HTML is done for you (\`index.html\` is locked). Write the CSS.

### Your task — in \`index.css\`

1. Make \`.navbar\` a flex container: \`display: flex;\`
2. Push the brand and the links to opposite ends: \`justify-content: space-between;\`
3. Lay the \`.nav-links\` list out as a flex row too: \`display: flex;\`
4. Remove the bullet points from \`.nav-links\`: \`list-style-type: none;\`

Hit **RUN** to check the computed styles.`,
    files: [
        {
            name: "index.html",
            readOnly: true,
            contents: `<nav class="navbar">
  <span class="brand">Vets Who Code</span>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">Apply</a></li>
    <li><a href="#">Donate</a></li>
    <li><a href="#">Login</a></li>
  </ul>
</nav>
`,
        },
        {
            name: "index.css",
            contents: `body { font-family: system-ui, sans-serif; margin: 0; }

.navbar {
  background: #0f1b2d;
  color: #fff;
  padding: 16px 24px;
  /* 1. make this a flex container */
  /* 2. spread the brand and links apart */
}

.brand { font-weight: 700; }

.nav-links {
  margin: 0;
  padding: 0;
  gap: 20px;
  /* 3. lay these out as a flex row */
  /* 4. remove the bullets */
}

.nav-links a { color: #fff; text-decoration: none; }
`,
        },
    ],
    tests: [
        {
            name: ".navbar is a flex container",
            body: `assertEqual(getComputedStyle(document.querySelector(".navbar")).display, "flex", "Set .navbar to display: flex.");`,
        },
        {
            name: ".navbar spreads its items apart",
            body: `assertEqual(getComputedStyle(document.querySelector(".navbar")).justifyContent, "space-between", "Set .navbar justify-content to space-between.");`,
        },
        {
            name: ".nav-links is a flex row",
            body: `assertEqual(getComputedStyle(document.querySelector(".nav-links")).display, "flex", "Set .nav-links to display: flex.");`,
        },
        {
            name: ".nav-links has no bullet points",
            body: `assertEqual(getComputedStyle(document.querySelector(".nav-links")).listStyleType, "none", "Set .nav-links list-style-type to none.");`,
        },
    ],
    solutionFiles: [
        {
            name: "index.css",
            contents: `body { font-family: system-ui, sans-serif; margin: 0; }

.navbar {
  background: #0f1b2d;
  color: #fff;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand { font-weight: 700; }

.nav-links {
  margin: 0;
  padding: 0;
  gap: 20px;
  display: flex;
  list-style-type: none;
}

.nav-links a { color: #fff; text-decoration: none; }
`,
        },
    ],
};
