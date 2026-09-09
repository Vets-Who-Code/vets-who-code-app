import { getStartOfDay } from "@utils/date";
import { IEvent } from "@utils/types";
import { parseISO } from "date-fns";
import fs from "fs";
import path from "path";
import { getSlugs } from "./util";

const directory = path.join(process.cwd(), "src/data/events");

export function getEventeBySlug(slug: string, fields: Array<keyof IEvent> | "all"): IEvent {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(directory, `${realSlug}.json`);
    const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8")) as IEvent;
    let event: IEvent;
    if (fields === "all") {
        event = fileContents;
    } else {
        event = fields.reduce(
            (acc: IEvent, field: keyof IEvent) => {
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
            },
            <IEvent>{}
        );
    }

    return { ...event, path: `/events/${realSlug}` };
}

// Event dates are "YYYY-MM-DD" strings. `new Date` reads those as UTC midnight, which is
// the previous day west of UTC; parseISO reads them as local dates like the rest of the day math.
const dayStart = (date: string) => getStartOfDay(parseISO(date)).getTime();

const byStartDate = (a: IEvent, b: IEvent) => dayStart(a.start_date) - dayStart(b.start_date);

export function isUpcomingEvent(
    event: Pick<IEvent, "start_date" | "end_date">,
    now: Date = new Date()
): boolean {
    return dayStart(event.end_date || event.start_date) >= getStartOfDay(now).getTime();
}

// Always read the date fields so filtering and sorting work whatever the caller asked for.
function readEvents(fields: Array<keyof IEvent> | "all") {
    const readFields: Array<keyof IEvent> | "all" =
        fields === "all" ? "all" : [...fields, "start_date", "end_date"];
    return getSlugs(directory).map((slug) => getEventeBySlug(slug, readFields));
}

export function getallEvents(fields: Array<keyof IEvent> | "all", skip = 0, limit?: number) {
    let events = readEvents(fields).sort((a, b) => byStartDate(b, a));
    if (limit) events = events.slice(skip, limit);
    return events;
}

export function getUpcomingEvents(fields: Array<keyof IEvent> | "all", now: Date = new Date()) {
    return readEvents(fields)
        .filter((event) => isUpcomingEvent(event, now))
        .sort(byStartDate);
}

export function getEventMeta() {
    const slugs = getSlugs(directory);
    return { count: slugs.length };
}
