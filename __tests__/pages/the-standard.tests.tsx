import { sitemapColumns } from "@data/sitemap-links";
import { DOMAIN_IDS } from "@lib/curriculum-domain";
import { MANIFEST } from "@lib/curriculum-graph";
import { TOPICS } from "@lib/curriculum-graph-data";
import type { StandardPage } from "@lib/the-standard";
import { render, screen } from "@testing-library/react";
import TheStandardPage, { getStaticProps } from "@/pages/the-standard";

vi.mock("@components/seo/page-seo", () => ({
    default: ({ title, description }: { title: string; description: string }) => (
        <div data-testid="seo" data-title={title} data-description={description} />
    ),
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

const loadPage = async () => {
    const result = (await getStaticProps({})) as { props: { page: StandardPage } };
    return result.props.page;
};

const renderPage = async () => {
    const page = await loadPage();
    const view = render(<TheStandardPage page={page} />);
    return { page, view };
};

describe("/the-standard", () => {
    it("computes the meta description and counts from the manifest", async () => {
        const page = await loadPage();
        expect(page.counts.topics).toBe(TOPICS.length);
        expect(page.counts.topics).toBe(MANIFEST.counts.topics);
        expect(page.description.startsWith(`${MANIFEST.counts.topics} topics,`)).toBe(true);
        render(<TheStandardPage page={page} />);
        expect(screen.getByTestId("seo")).toHaveAttribute("data-description", page.description);
    });

    it("renders the graph counts and the exit-depth split from the data", async () => {
        const { view } = await renderPage();
        const { topics, edges, subjects, domains } = MANIFEST.counts;
        const text = view.container.textContent ?? "";
        expect(text).toContain(
            `${topics} topics across ${domains} domains and ${subjects} subjects, joined by ${edges} prerequisite links`
        );
        for (const depth of ["guided", "scaffolded", "unassisted"] as const) {
            const n = TOPICS.filter((t) => t.exitDepth === depth).length;
            expect(screen.getByTestId(depth)).toHaveTextContent(`${n} of ${topics} topics`);
        }
    });

    it("links every domain to its /curriculum page", async () => {
        await renderPage();
        const hrefs = screen
            .getAllByRole("link", { hidden: true })
            .map((a) => a.getAttribute("href") ?? "");
        for (const id of DOMAIN_IDS) {
            expect(hrefs).toContain(`/curriculum/${id}`);
        }
        const domainLinks = new Set(hrefs.filter((h) => h.startsWith("/curriculum/")));
        expect(domainLinks).toEqual(new Set(DOMAIN_IDS.map((id) => `/curriculum/${id}`)));
    });

    it("prints every topic's evidence, grouped by subject", async () => {
        const { page, view } = await renderPage();
        expect(page.subjects).toHaveLength(MANIFEST.counts.subjects);
        const text = view.container.textContent ?? "";
        for (const t of TOPICS) expect(text).toContain(t.evidence);
    });

    it("renders no owner placeholders, exit framing or banned words", async () => {
        const { view } = await renderPage();
        const text = (view.container.textContent ?? "").toLowerCase();
        expect(text).not.toContain("[owner");
        expect(text).not.toContain("bootcamp");
        expect(text).not.toMatch(/graduat(e|ion) (requirement|threshold)/);
        expect(text).not.toMatch(/\d+%/);
    });

    it("ends with an Apply CTA to /apply", async () => {
        await renderPage();
        const applies = screen.getAllByRole("link", { name: "Apply" });
        expect(applies.at(-1)).toHaveAttribute("href", "/apply");
    });

    it("is linked from the footer next to Curriculum", () => {
        const company = sitemapColumns.find((c) => c.heading === "Company");
        const paths = company?.links.map((l) => l.path) ?? [];
        expect(paths.indexOf("/the-standard")).toBe(paths.indexOf("/curriculum") + 1);
    });
});
