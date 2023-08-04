import { readFiles } from "./util";

interface IData {
    name: string;
    content: Array<{ [x: string]: unknown }>;
}
type PageType = "home" | "inner";

export function getPageData(page: PageType, pageName: string) {
    const dirPath =
        page === "home" ? "src/data/homepages" : "src/data/innerpages";
    const allPages = readFiles<IData>(dirPath);
    return allPages.find((p) => p.name === pageName);
}
