import { hasRole, isAdmin, isInstructorOrAdmin, canManageCourses, canGradeAssignments } from "@/lib/rbac";

describe("rbac", () => {
    describe("hasRole", () => {
        it("should return true when user has the required role", () => {
            expect(hasRole("ADMIN", "ADMIN")).toBe(true);
        });

        it("should return true when user has one of the required roles", () => {
            expect(hasRole("INSTRUCTOR", ["INSTRUCTOR", "ADMIN"])).toBe(true);
        });

        it("should return false when user lacks the required role", () => {
            expect(hasRole("STUDENT", "ADMIN")).toBe(false);
            expect(hasRole("STUDENT", ["INSTRUCTOR", "ADMIN"])).toBe(false);
        });
    });

    describe("isAdmin", () => {
        it("should return true for ADMIN role", () => {
            expect(isAdmin("ADMIN")).toBe(true);
        });

        it("should return false for non-ADMIN roles", () => {
            expect(isAdmin("STUDENT")).toBe(false);
            expect(isAdmin("INSTRUCTOR")).toBe(false);
            expect(isAdmin("MENTOR")).toBe(false);
        });
    });

    describe("isInstructorOrAdmin", () => {
        it("should return true for INSTRUCTOR", () => {
            expect(isInstructorOrAdmin("INSTRUCTOR")).toBe(true);
        });

        it("should return true for ADMIN", () => {
            expect(isInstructorOrAdmin("ADMIN")).toBe(true);
        });

        it("should return false for STUDENT and MENTOR", () => {
            expect(isInstructorOrAdmin("STUDENT")).toBe(false);
            expect(isInstructorOrAdmin("MENTOR")).toBe(false);
        });
    });

    describe("canManageCourses", () => {
        it("should allow INSTRUCTOR and ADMIN", () => {
            expect(canManageCourses("INSTRUCTOR")).toBe(true);
            expect(canManageCourses("ADMIN")).toBe(true);
        });

        it("should deny STUDENT and MENTOR", () => {
            expect(canManageCourses("STUDENT")).toBe(false);
            expect(canManageCourses("MENTOR")).toBe(false);
        });
    });

    describe("canGradeAssignments", () => {
        it("should allow INSTRUCTOR, ADMIN, and MENTOR", () => {
            expect(canGradeAssignments("INSTRUCTOR")).toBe(true);
            expect(canGradeAssignments("ADMIN")).toBe(true);
            expect(canGradeAssignments("MENTOR")).toBe(true);
        });

        it("should deny STUDENT", () => {
            expect(canGradeAssignments("STUDENT")).toBe(false);
        });
    });
});
