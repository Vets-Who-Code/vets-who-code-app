import { formatDate, getStartOfDay, isDatePast } from "../date";

// Force a zone west of UTC so a date-only string read as UTC midnight lands on the previous day.
const originalTz = process.env.TZ;

beforeAll(() => {
    process.env.TZ = "America/Los_Angeles";
});

afterAll(() => {
    if (originalTz === undefined) {
        delete process.env.TZ;
    } else {
        process.env.TZ = originalTz;
    }
});

describe("date utilities", () => {
    it("should format date correctly", () => {
        const date = new Date("2024-01-26T10:30:00");
        expect(formatDate(date)).toBe("Jan 26, 2024");
    });

    it("should detect past date", () => {
        const past = new Date(Date.now() - 1000);
        expect(isDatePast(past)).toBe(true);
    });

    it("should get start of day", () => {
        const d = new Date("2024-01-01T15:30:00");
        expect(getStartOfDay(d).getHours()).toBe(0);
    });

    it("should read a date-only string as local midnight", () => {
        expect(getStartOfDay("2026-09-09").getTime()).toBe(new Date(2026, 8, 9).getTime());
    });

    it("should read a date-time string without an offset as local time", () => {
        expect(getStartOfDay("2026-09-09T15:30:00").getTime()).toBe(new Date(2026, 8, 9).getTime());
    });
});
