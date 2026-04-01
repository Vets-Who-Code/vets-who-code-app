import {
    translateJobTitle,
    translateDuty,
    fallbackTranslation,
    getSuggestions,
    formatForResume,
    translateDuties,
} from "@/lib/military-translator";

describe("military-translator", () => {
    describe("translateJobTitle", () => {
        it("should translate known military job titles", () => {
            expect(translateJobTitle("infantryman")).toBe("Operations Specialist");
            expect(translateJobTitle("combat medic")).toBe("Emergency Medical Technician");
            expect(translateJobTitle("intelligence analyst")).toBe("Data Analyst");
            expect(translateJobTitle("military police")).toBe("Law Enforcement Officer");
        });

        it("should handle case insensitivity", () => {
            expect(translateJobTitle("INFANTRYMAN")).toBe("Operations Specialist");
            expect(translateJobTitle("Combat Medic")).toBe("Emergency Medical Technician");
        });

        it("should translate MOS code patterns", () => {
            expect(translateJobTitle("11B")).toBe("Operations Manager");
            expect(translateJobTitle("68W")).toBe("Healthcare Specialist");
            expect(translateJobTitle("25B")).toBe("IT / Communications Specialist");
            expect(translateJobTitle("35F")).toBe("Intelligence Analyst");
        });

        it("should handle unknown alphanumeric codes with generic title", () => {
            expect(translateJobTitle("ZZ99")).toBe("Operations Professional");
        });

        it("should apply terminology replacement for unrecognized titles", () => {
            const result = translateJobTitle("squad leader for reconnaissance");
            expect(result).toContain("team supervisor");
        });
    });

    describe("translateDuty", () => {
        it("should translate military terminology in duties", async () => {
            const result = await translateDuty("Conducted reconnaissance missions with the platoon");
            expect(result.translated).toContain("research and analysis");
            expect(result.translated).toContain("projects");
            expect(result.confidence).toBe(0.95);
        });

        it("should return original text when no terms match", async () => {
            const result = await translateDuty("Managed office supplies");
            expect(result.original).toBe("Managed office supplies");
        });
    });

    describe("translateDuties", () => {
        it("should translate multiple duties", async () => {
            const results = await translateDuties([
                "Conducted tactical operations",
                "Briefed subordinates",
            ]);
            expect(results).toHaveLength(2);
            expect(results[0].translated).toContain("strategic operations");
            expect(results[1].translated).toContain("presented to");
        });

        it("should skip empty duties", async () => {
            const results = await translateDuties(["Valid duty", "", "  "]);
            expect(results).toHaveLength(1);
        });
    });

    describe("getSuggestions", () => {
        it("should suggest removing personal pronouns", () => {
            const suggestions = getSuggestions("I managed a team of soldiers");
            expect(suggestions.some((s) => s.includes("pronouns"))).toBe(true);
        });

        it("should suggest starting with action verb", () => {
            const suggestions = getSuggestions("The team was managed well");
            expect(suggestions.some((s) => s.includes("action verb"))).toBe(true);
        });

        it("should suggest quantification when no numbers present", () => {
            const suggestions = getSuggestions("Managed a team of soldiers");
            expect(suggestions.some((s) => s.includes("Quantify"))).toBe(true);
        });

        it("should not suggest quantification when numbers present", () => {
            const suggestions = getSuggestions("Managed a team of 15 soldiers");
            expect(suggestions.some((s) => s.includes("Quantify"))).toBe(false);
        });
    });

    describe("fallbackTranslation", () => {
        it("should translate a basic military profile", () => {
            const result = fallbackTranslation({
                jobTitle: "infantryman",
                rank: "Sergeant",
                branch: "U.S. Army",
                duties: "Conducted tactical operations with the platoon; Supervised subordinates during combat operations",
                achievements: "Improved unit readiness by 25%",
            });

            expect(result.jobTitle).toBe("Operations Specialist");
            expect(result.summary).toContain("Sergeant");
            expect(result.keyResponsibilities.length).toBeGreaterThan(0);
            expect(result.achievements.length).toBeGreaterThan(0);
        });

        it("should handle empty profile gracefully", () => {
            const result = fallbackTranslation({});
            expect(result.jobTitle).toBe("Operations Professional");
            expect(result.summary).toBeTruthy();
            expect(result.keyResponsibilities).toEqual([]);
            expect(result.achievements).toEqual([]);
        });

        it("should include security clearance in summary when present", () => {
            const result = fallbackTranslation({
                securityClearance: "Top Secret",
            });
            expect(result.summary).toContain("Top Secret");
        });

        it("should include years of service in summary", () => {
            const result = fallbackTranslation({
                yearsOfService: 10,
            });
            expect(result.summary).toContain("10+");
        });
    });

    describe("formatForResume", () => {
        it("should format a translated profile as resume text", () => {
            const profile = {
                jobTitle: "Operations Specialist",
                summary: "Results-driven professional",
                keyResponsibilities: ["Managed team of 15 direct reports"],
                achievements: ["Improved efficiency by 30%"],
            };

            const resume = formatForResume(profile);

            expect(resume).toContain("OPERATIONS SPECIALIST");
            expect(resume).toContain("Professional Summary");
            expect(resume).toContain("Professional Experience");
            expect(resume).toContain("Key Achievements");
            expect(resume).toContain("Managed team of 15 direct reports");
            expect(resume).toContain("Improved efficiency by 30%");
        });

        it("should include training section when present", () => {
            const profile = {
                jobTitle: "IT Specialist",
                summary: "Technical professional",
                keyResponsibilities: [],
                achievements: [],
                training: {
                    program: "Advanced IT Training",
                    hours: 500,
                    weeks: 20,
                    topics: ["networking"],
                    civilianCerts: ["CompTIA A+"],
                    aceCredits: "15 semester hours",
                },
            };

            const resume = formatForResume(profile);
            expect(resume).toContain("Training & Education");
            expect(resume).toContain("500");
            expect(resume).toContain("CompTIA A+");
        });
    });
});
