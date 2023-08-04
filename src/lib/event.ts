import fs from "fs";
import path from "path";
import { IEvent } from "@utils/types";
import { getSlugs } from "./util";

const directory = path.join(process.cwd(), "src/data/events");

export function getEventeBySlug(
    slug: string,
    fields: Array<keyof IEvent> | "all"
): IEvent {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(directory, `${realSlug}.json`);
    const fileContents = JSON.parse(
        fs.readFileSync(fullPath, "utf8")
    ) as IEvent;
    let event: IEvent;
    if (fields === "all") {
        event = fileContents;
    } else {
        event = fields.reduce((acc: IEvent, field: keyof IEvent) => {
            if (field === "slug") {
                return { ...acc, [field]: realSlug };
            }
            if (typeof fileContents[field] !== "undefined") {
                return {
                    ...acc,
                    [field]: fileContents[field],
                };
            }
            return acc;
        }, <IEvent>{});
    }

    return { ...event, path: `/events/${realSlug}` };
}

export function getallEvents(
    fields: Array<keyof IEvent> | "all",
    skip = 0,
    limit?: number
) {
    const slugs = getSlugs(directory);
    let events = slugs.map((slug) => getEventeBySlug(slug, fields));
    if (limit) events = events.slice(skip, limit);
    return events;
}

export function getEventMeta() {
    const slugs = getSlugs(directory);
    return { count: slugs.length };
}
