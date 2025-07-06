import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs";
import { branch, personnelcategory, Prisma } from "@prisma/client";
import semver from "semver";

interface CoolMOSData {
    moc_codetype: string;
    moc_description: string;
    moc_code: string;
    moc_title: string;
    moc_personnelcategory: string;
}

interface AFCoolMOSData {
    id: number;
    code: string;
    description: string;
    remarks: string;
}

const IMPORTED_TYPES = new Set(["MOS", "WO", "AOC", "RATE", "CWO", "DESIGNATOR", "OSC"]);
const DATA_DIR = path.join(process.cwd(), "src/data/mos");
const MOS_DATA_TABLE_NAME = "military_occupation";

const branchEnumFromStringAbbreviation = (abbr: string) => {
    switch (abbr.toLowerCase()) {
        case "usmc":
            return branch.MARINE_CORPS;
        case "usn":
            return branch.NAVY;
        case "usaf":
            return branch.AIR_FORCE;
        case "army":
            return branch.ARMY;
        case "uscg":
            return branch.COAST_GUARD;
        default:
            return null;
    }
};

const pcEnumFromStringAbbreviation = (abbr: string) => {
    switch (abbr) {
        case "E":
            return personnelcategory.ENLISTED;
        case "O":
            return personnelcategory.OFFICER;
        case "W":
            return personnelcategory.WARRANT_OFFICER;
        default:
            return null;
    }
};

const getJSONFromFile = (filename: string) => {
    const fullPath = path.join(DATA_DIR, filename);
    return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
};

const isCoolMOSData = (item: any): item is CoolMOSData => {
    return "moc_id" in item;
};

const isAFCoolMOSData = (item: any): item is AFCoolMOSData => {
    return "code" in item;
};

const extractDataFromJSON = (file: string, mos_branch: branch) => {
    const data = getJSONFromFile(file) as any[];
    return data
        .map((item) => {
            if (isCoolMOSData(item)) {
                const personnelCategory = pcEnumFromStringAbbreviation(item.moc_personnelcategory);
                if (IMPORTED_TYPES.has(item.moc_codetype) && !!personnelCategory) {
                    return {
                        branch: mos_branch,
                        code: item.moc_code,
                        title: item.moc_title,
                        description: item.moc_description,
                        personnel_category: personnelCategory,
                    };
                }
                return null;
            }
            if (isAFCoolMOSData(item)) {
                return {
                    branch: mos_branch,
                    code: item.code,
                    title: item.description,
                    description: item.remarks,
                    personnel_category: personnelcategory.ENLISTED,
                };
            }
            return null;
        })
        .filter((x) => !!x);
};

const getLocalDataVersion = (): string => {
    const versionFilePath = path.join(DATA_DIR, "version.txt");
    const version = fs.readFileSync(versionFilePath, "utf-8");
    return version;
};

const loadMOSDataFromJSON = async () => {
    console.log("Seeding");
    const files = fs.readdirSync(DATA_DIR);
    const data = files
        .map((file) => {
            const fileBranch = branchEnumFromStringAbbreviation(file.split(".")[0]);
            if (fileBranch !== null) {
                return extractDataFromJSON(file, fileBranch);
            }
            return null;
        })
        .filter((x) => !!x)
        .flat();

    const localVersion = getLocalDataVersion();
    await prisma.$transaction([
        prisma.military_occupation.deleteMany({}),
        prisma.military_occupation.createMany({
            data,
        }),
        prisma.data_version.upsert({
            where: {
                table: MOS_DATA_TABLE_NAME,
            },
            update: {
                version: localVersion,
            },
            create: {
                table: MOS_DATA_TABLE_NAME,
                version: localVersion,
            },
        }),
    ]);
};

const shouldSeedDatabase = async () => {
    const dbMOSDataVersion = await prisma.data_version.findUnique({
        where: {
            table: MOS_DATA_TABLE_NAME,
        },
    });
    if (dbMOSDataVersion === null) {
        return true;
    }
    const localDataVersion = getLocalDataVersion();
    const shouldSeed = semver.gt(localDataVersion, dbMOSDataVersion.version);
    console.log(
        `Local version: ${localDataVersion}, Remote version: ${dbMOSDataVersion.version}`,
        `Should seed: ${shouldSeed}`
    );
    return shouldSeed;
};

shouldSeedDatabase().then((shouldSeed) => {
    if (shouldSeed) {
        loadMOSDataFromJSON();
    } else {
        console.log("Not seeding MOS Data");
    }
});
