import fs from "fs";
import path from "path";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// read json file from directory
export const readFiles = <T>(dirPath: string) => {
    const dir = path.join(process.cwd(), dirPath);
    const dirContents = fs.readdirSync(dir);
    const files: Array<T> = [];
    dirContents.forEach((val) => {
        const file: T = JSON.parse(fs.readFileSync(path.join(dir, val), "utf8")) as T;
        files.push(file);
    });
    return files;
};

// Get Slugs

export function getSlugs(dirPath: string) {
    return fs.readdirSync(dirPath);
}

export function getSlugsAsync(dirPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
