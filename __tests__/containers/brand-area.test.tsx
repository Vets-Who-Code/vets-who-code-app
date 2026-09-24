import { existsSync } from "node:fs";
import { join } from "node:path";
import BrandArea from "@containers/brand/layout-01";
import homepage from "@data/homepages/index.json";
import { render, screen } from "@testing-library/react";
import type { ItemType } from "@utils/types";

const brandArea = homepage.content.find(
    (section) => (section as { section?: string }).section === "brand-area"
) as unknown as { items: ItemType[] };

describe("Technology partners", () => {
    it("shows every partner at once, without a carousel", () => {
        render(<BrandArea data={brandArea} />);
        expect(screen.getAllByRole("listitem")).toHaveLength(brandArea.items.length);
        for (const name of [
            "Cloudflare",
            "Atlassian",
            "ElevenLabs",
            "Splunk",
            "Vercel",
            "monday dev",
            "New Relic",
        ]) {
            expect(screen.getByRole("img", { name })).toBeInTheDocument();
        }
    });

    it("points every local logo at a file in public/", () => {
        const local = brandArea.items
            .map((item) => item.images?.[0]?.src ?? "")
            .filter((src) => src.startsWith("/"));
        expect(local.length).toBeGreaterThan(0);
        for (const src of local) {
            expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
        }
    });
});
