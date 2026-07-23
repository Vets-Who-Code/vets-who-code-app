import { filterMenuByAuth } from "@data/menu";
import { describe, expect, it } from "vitest";

describe("filterMenuByAuth — megamenu", () => {
    const menu = [
        {
            id: 1,
            label: "Community",
            path: "#!",
            megamenu: [
                {
                    id: 11,
                    title: "Public",
                    submenu: [{ id: 111, label: "Blog", path: "/blogs/blog" }],
                },
                {
                    id: 12,
                    title: "Members",
                    submenu: [{ id: 121, label: "Reps", path: "/reps", requiresAuth: true }],
                },
            ],
        },
        {
            id: 2,
            label: "Join",
            path: "#!",
            megamenu: [
                {
                    id: 21,
                    submenu: [{ id: 211, label: "Apply", path: "/apply", hideWhenAuth: true }],
                },
            ],
        },
    ];

    it("drops auth-only columns for signed-out visitors", () => {
        const [community, join] = filterMenuByAuth(menu, false);
        expect(community.megamenu).toHaveLength(1);
        expect(community.megamenu?.[0].title).toBe("Public");
        expect(join).toBeDefined();
    });

    it("drops the whole parent when every column empties out", () => {
        const result = filterMenuByAuth(menu, true);
        expect(result.map((i) => i.label)).toEqual(["Community"]);
        expect(result[0].megamenu?.map((c) => c.title)).toEqual(["Public", "Members"]);
    });
});
