// lib/whos-branch.ts
import fs from "fs";
import path from "path";

export const getAllBranches = () => {
    const jsonPath = path.join(process.cwd(), "src/data/whos-branch-is-it-anyway/whos-branch.json");
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    return jsonData.branches;
};

export const getBranchByName = (name: string) => {
    const branches = getAllBranches();
    return branches.find((branch: any) => branch.name.toLowerCase() === name.toLowerCase());
};