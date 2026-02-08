import { formatDate } from "@utils/date";
import { FieldType, IZoomMeeting } from "@utils/types";
import fs from "fs";
import path from "path";
import { getSlugs } from "./util";

const directory = path.join(process.cwd(), "src/data/zoom-meetings");

export function getZoomMeetingBySlug(slug: string, fields: FieldType<IZoomMeeting>): IZoomMeeting {
    const realSlug = slug.replace(/\.json$/, "");
    const fullPath = path.join(directory, `${realSlug}.json`);
    const fileContents = JSON.parse(fs.readFileSync(fullPath, "utf8")) as IZoomMeeting;
    let event: IZoomMeeting;
    if (fields === "all") {
        event = {
            ...fileContents,
            start_date: fileContents.date,
            date: formatDate(fileContents.date, "MMMM d, yyyy"),
            time: formatDate(fileContents.date, "h:mm a"),
        };
    } else {
        event = fields.reduce(
            (acc: IZoomMeeting, field: keyof IZoomMeeting) => {
                if (field === "slug") {
                    return { ...acc, [field]: realSlug };
                }
                if (field === "date") {
                    return {
                        ...acc,
                        [field]: formatDate(fileContents[field], "MMMM d, yyyy"),
                    };
                }
                if (field === "time") {
                    return {
                        ...acc,
                        [field]: formatDate(fileContents[field], "h:mm a"),
                    };
                }
                if (typeof fileContents[field] !== "undefined") {
                    return {
                        ...acc,
                        [field]: fileContents[field],
                    };
                }
                return acc;
            },
            <IZoomMeeting>{}
        );
    }

    return { ...event, path: `/zoom-meetings/${realSlug}` };
}

export function getAllZoomMeetings(fields: FieldType<IZoomMeeting>, skip = 0, limit?: number) {
    const slugs = getSlugs(directory);
    let events = slugs.map((slug) => getZoomMeetingBySlug(slug, fields));
    if (limit) events = events.slice(skip, limit);
    return events;
}

export function getZoomMeetingMeta() {
    const slugs = getSlugs(directory);
    return { count: slugs.length };
}
