const fs = require("fs");

function scoreReadability(eslintResults) {
    const issues = eslintResults.reduce((acc, f) => acc + f.messages.length, 0);
    return Math.max(10 - Math.floor(issues / 10), 2); // max 10, min 2
}

function scoreScalability(complexityReport) {
    let maxFunctions = 0;
    complexityReport.reports.forEach((file) => {
        file.functions.forEach((fn) => {
            if (fn.complexity.cyclomatic > maxFunctions) {
                maxFunctions = fn.complexity.cyclomatic;
            }
        });
    });
    return maxFunctions < 10 ? 9 : maxFunctions < 15 ? 7 : 5;
}

function scorePerformance(complexityReport) {
    const maintainabilityScores = complexityReport.reports.map((r) => r.maintainability);
    const avg = maintainabilityScores.reduce((a, b) => a + b, 0) / maintainabilityScores.length;
    return avg > 75 ? 9 : avg > 60 ? 7 : 5;
}

function scoreMaintainability(platoSummary) {
    const average = platoSummary.summary.average.maintainability;
    return average > 75 ? 10 : average > 60 ? 8 : average > 50 ? 6 : 4;
}

const eslintResults = JSON.parse(fs.readFileSync("eslint-report.json", "utf8"));
const complexityReport = JSON.parse(fs.readFileSync("complexity-report.json", "utf8"));
const platoSummary = JSON.parse(fs.readFileSync("plato-report/report.json", "utf8"));

const readability = scoreReadability(eslintResults);
const scalability = scoreScalability(complexityReport);
const performance = scorePerformance(complexityReport);
const maintainability = scoreMaintainability(platoSummary);

console.log("🔎 Code Quality Score Breakdown:");
console.log(`📖 Readability: ${readability}/10`);
console.log(`📈 Scalability: ${scalability}/10`);
console.log(`🚀 Performance: ${performance}/10`);
console.log(`🧰 Maintainability: ${maintainability}/10`);

const overall = ((readability + scalability + performance + maintainability) / 4).toFixed(1);
console.log(`\n✅ Overall Score: ${overall}/10`);
