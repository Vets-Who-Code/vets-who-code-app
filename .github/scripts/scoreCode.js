const fs = require("fs");

function scoreReadability(eslintResults) {
    const totalIssues = eslintResults.reduce((acc, file) => acc + file.messages.length, 0);
    return Math.max(10 - Math.floor(totalIssues / 10), 2);
}

function scoreScalabilityFromESLint(eslintResults) {
    const complexityWarnings = eslintResults.flatMap((file) =>
        file.messages.filter((msg) => msg.ruleId === "complexity")
    ).length;

    if (complexityWarnings === 0) return 9;
    if (complexityWarnings <= 2) return 7;
    return 5;
}

function scorePerformance(eslintResults) {
    const lines = eslintResults.reduce(
        (acc, file) => acc + (file.source?.split("\n").length || 0),
        0
    );
    return lines < 1000 ? 9 : lines < 3000 ? 7 : 5;
}

function scoreMaintainability() {
    return 8; // Static placeholder
}

try {
    const eslintResults = JSON.parse(fs.readFileSync("eslint-report.json", "utf8"));

    const readability = scoreReadability(eslintResults);
    const scalability = scoreScalabilityFromESLint(eslintResults);
    const performance = scorePerformance(eslintResults);
    const maintainability = scoreMaintainability();

    const overall = ((readability + scalability + performance + maintainability) / 4).toFixed(1);

    const advice = [];

    if (readability < 7) advice.push("🧹 Reduce ESLint warnings to improve readability.");
    if (scalability < 7) advice.push("📦 Break up complex functions or components.");
    if (performance < 7) advice.push("⚙️ Consider splitting large files or lazy-loading.");
    if (overall < 7) advice.push("🔁 Refactor to increase your overall score next cycle.");

    const report = `
🔍 Code Quality Score Breakdown:
- 📖 Readability: ${readability}/10
- 📈 Scalability: ${scalability}/10
- 🚀 Performance: ${performance}/10
- 🛠️ Maintainability: ${maintainability}/10
- ✅ Overall Score: ${overall}/10

💡 Recommendations:
${advice.length > 0 ? advice.map((a) => `- ${a}`).join("\n") : "- ✅ Keep up the good work!"}
`;

    console.log(report);

    // Optional: save for GitHub PR comment
    fs.writeFileSync("score-output.md", report.trim() + "\n");
} catch (err) {
    console.error("💥 Error scoring code:", err.message);
    process.exit(0); // Still don't fail the build
}
