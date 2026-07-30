import { formatDate, getStartOfDay, isDatePast } from "../date";

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
});
