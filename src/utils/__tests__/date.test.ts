import {
    formatDate,
    formatDateTime,
    formatDuration,
    getDaysSince,
    getDaysUntil,
    getEndOfDay,
    getRelativeTime,
    getSmartDate,
    getStartOfDay,
    isDateFuture,
    isDatePast,
} from "../date";

describe("date utilities", () => {
    it("should format date correctly", () => {
        const date = new Date("2024-01-26T10:30:00");
        expect(formatDate(date)).toBe("Jan 26, 2024");
    });

    it("should format date and time correctly", () => {
        const date = new Date("2024-01-26T10:30:00");
        expect(formatDateTime(date)).toBe("Jan 26, 2024 at 10:30 AM");
    });

    it("should get relative time correctly", () => {
        const pastDate = new Date();
        pastDate.setHours(pastDate.getHours() - 2);
        const result = getRelativeTime(pastDate);

        expect(result).toContain("hour");
        expect(result).toContain("ago");
    });

    it("should detect today correctly", () => {
        expect(getSmartDate(new Date())).toContain("Today");
    });

    it("should detect yesterday correctly", () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        expect(getSmartDate(yesterday)).toContain("Yesterday");
    });

    it("should detect past date", () => {
        const past = new Date(Date.now() - 1000);
        expect(isDatePast(past)).toBe(true);
    });

    it("should detect future date", () => {
        const future = new Date(Date.now() + 1000);
        expect(isDateFuture(future)).toBe(true);
    });

    it("should claculate days until a future date", () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        expect(getDaysUntil(futureDate)).toBe(5);
    });

    it("should calculate days since a past date", () => {
        const past = new Date();
        past.setDate(past.getDate() - 3);
        expect(getDaysSince(past)).toBe(3);
    });

    it("should format duration correctly", () => {
        expect(formatDuration(3665)).toBe("1h 1m 5s");
        expect(formatDuration(90)).toBe("1m 30s");
        expect(formatDuration(45)).toBe("45s");
    });

    it("should get start of day", () => {
        const d = new Date("2024-01-01T15:30:00");
        expect(getStartOfDay(d).getHours()).toBe(0);
    });

    it("should get end of day", () => {
        const d = new Date("2024-01-01T15:30:00");
        const end = getEndOfDay(d);

        expect(end.getHours()).toBe(23);
        expect(end.getMinutes()).toBe(59);
        expect(end.getSeconds()).toBe(59);
    });
});
