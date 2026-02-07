const fs = require("fs");

function scoreReadability(diagnostics) {
    const totalIssues = diagnostics.length;
    return Math.max(10 - Math.floor(totalIssues / 10), 2);
}

function scoreScalability(diagnostics) {
    const complexityWarnings = diagnostics.filter(
        (d) => d.category === "lint/complexity/noExcessiveCognitiveComplexity"
    ).length;

    if (complexityWarnings === 0) return 9;
    if (complexityWarnings <= 2) return 7;
    return 5;
}

function scorePerformance(summary) {
    const totalFiles = (summary.changed || 0) + (summary.unchanged || 0);
    return totalFiles < 100 ? 9 : totalFiles < 300 ? 7 : 5;
}

function scoreMaintainability() {
    return 8; // Static placeholder
}

try {
    const raw = fs.readFileSync("biome-report.json", "utf8");
    const report = JSON.parse(raw);

    const diagnostics = report.diagnostics || [];
    const summary = report.summary || {};

    const readability = scoreReadability(diagnostics);
    const scalability = scoreScalability(diagnostics);
    const performance = scorePerformance(summary);
    const maintainability = scoreMaintainability();

    const overall = ((readability + scalability + performance + maintainability) / 4).toFixed(1);

    const advice = [];

    if (readability < 7) advice.push("🧹 Reduce linting warnings to improve readability.");
    if (scalability < 7) advice.push("📦 Break up complex functions or components.");
    if (performance < 7) advice.push("⚙️ Consider splitting large files or lazy-loading.");
    if (overall < 7) advice.push("🔁 Refactor to increase your overall score next cycle.");

    const output = `
🔍 Code Quality Score Breakdown:
- 📖 Readability: ${readability}/10
- 📈 Scalability: ${scalability}/10
- 🚀 Performance: ${performance}/10
- 🛠️ Maintainability: ${maintainability}/10
- ✅ Overall Score: ${overall}/10

💡 Recommendations:
${advice.length > 0 ? advice.map((a) => `- ${a}`).join("\n") : "- ✅ Keep up the good work!"}
`;

    fs.writeFileSync("score-output.md", `${output.trim()}\n`);
} catch (err) {
    console.error("💥 Error scoring code:", err.message);
    process.exit(0); // Still don't fail the build
}
