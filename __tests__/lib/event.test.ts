// @vitest-environment node
import { getallEvents, getEventMeta, getUpcomingEvents, isUpcomingEvent } from "@/lib/event";

// Local noon, so the "start of today" boundary is unambiguous in any timezone.
const today = new Date("2026-09-09T12:00:00");

describe("isUpcomingEvent", () => {
    it("excludes an event that already ended", () => {
        expect(isUpcomingEvent({ start_date: "2026-09-01", end_date: "2026-09-01" }, today)).toBe(
            false
        );
    });

    it("includes an event starting today", () => {
        expect(isUpcomingEvent({ start_date: "2026-09-09", end_date: "2026-09-09" }, today)).toBe(
            true
        );
    });

    it("includes a future event", () => {
        expect(isUpcomingEvent({ start_date: "2026-10-15", end_date: "2026-10-15" }, today)).toBe(
            true
        );
    });

    it("includes a multi-day event that started yesterday and ends tomorrow", () => {
        expect(isUpcomingEvent({ start_date: "2026-09-08", end_date: "2026-09-10" }, today)).toBe(
            true
        );
    });

    it("falls back to start_date when end_date is missing", () => {
        expect(isUpcomingEvent({ start_date: "2026-09-10", end_date: "" }, today)).toBe(true);
        expect(isUpcomingEvent({ start_date: "2026-09-08", end_date: "" }, today)).toBe(false);
    });
});

describe("getUpcomingEvents", () => {
    it("returns nothing when every event in src/data/events has passed", () => {
        expect(getUpcomingEvents("all", today)).toEqual([]);
    });

    it("returns every event ascending by start_date when they are all ahead", () => {
        const events = getUpcomingEvents(["title"], new Date("2020-01-01T12:00:00"));

        expect(events).toHaveLength(getEventMeta().count);
        expect(events.map((event) => event.start_date)).toEqual([
            "2023-01-26",
            "2023-02-23",
            "2023-03-30",
            "2023-06-29",
        ]);
    });
});

describe("getallEvents", () => {
    it("returns events newest first", () => {
        expect(getallEvents(["title"]).map((event) => event.start_date)).toEqual([
            "2023-06-29",
            "2023-03-30",
            "2023-02-23",
            "2023-01-26",
        ]);
    });
});
