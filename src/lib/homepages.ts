import * as fs from "fs";
import * as path from "path";

interface IData {
    name: string;
    content: Array<{ [x: string]: unknown }>;
}

export function readFile() {
    const dir = path.join(process.cwd(), "src/data/homepages");
    const dirContents = fs.readdirSync(dir);
    const files: Array<IData> = [];
    dirContents.forEach((val) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const file: IData = JSON.parse(
            fs.readFileSync(path.join(dir, val), "utf8")
        );
        files.push(file);
    });
    return files;
}
