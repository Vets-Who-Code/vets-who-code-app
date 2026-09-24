import { render, screen, within } from "@testing-library/react";
import type { GetStaticPropsResult } from "next";
import type { ComponentProps } from "react";
import { facetHref, facetSeo, parseFacetSegments } from "@/lib/career-guide-facets";
import { loadCareerGuides } from "@/lib/career-guides";
import FacetPage, { getStaticPaths, getStaticProps } from "@/pages/career-guides/[...facet]";
import { getStaticProps as getIndexProps } from "@/pages/career-guides/index";

vi.mock("next/router", () => ({
    useRouter: () => ({ isReady: false, asPath: "/career-guides/branch/army", query: {} }),
}));

vi.mock("@components/seo/page-seo", () => ({
    default: ({ title }: { title: string }) => <div data-testid="seo" data-title={title} />,
}));

type FacetProps = ComponentProps<typeof FacetPage>;

const MAX_PAGE_DATA = 150 * 1024;

const propsFor = (facet: string[]) => {
    const result = getStaticProps({ params: { facet } }) as GetStaticPropsResult<FacetProps>;
    if (!("props" in result)) throw new Error(`no props for ${facet.join("/")}`);
    return result.props;
};

describe("career-guides/[...facet]", () => {
    const guides = loadCareerGuides();

    it("prerenders every facet page and nothing else", async () => {
        const { paths, fallback } = await getStaticPaths({});
        expect(fallback).toBe(false);

        const segments = paths.map((p) =>
            typeof p === "string" ? [] : (p.params.facet as string[])
        );
        // 70 full-list pages (2..71), 72 branch pages, 76 family pages at 60 per page
        expect(segments).toHaveLength(218);
        expect(segments.filter((s) => s[0] === "page")).toHaveLength(70);
        expect(segments.filter((s) => s[0] === "branch" && s.length === 2)).toHaveLength(5);
        expect(segments.filter((s) => s[0] === "family" && s.length === 2)).toHaveLength(11);
        for (const s of segments) {
            expect(s.at(-1), s.join("/")).not.toBe("1");
            const parsed = parseFacetSegments(s);
            expect(parsed, s.join("/")).not.toBeNull();
            if (parsed)
                expect(facetHref(parsed.facet, parsed.page)).toBe(`/career-guides/${s.join("/")}`);
        }
    });

    it("links every guide once per listing, keeps page data small and titles unique", async () => {
        const { paths } = await getStaticPaths({});
        const index = getIndexProps({}) as GetStaticPropsResult<{ rows: { slug: string }[] }>;
        if (!("props" in index)) throw new Error("no index props");
        expect(index.props.rows).toHaveLength(60);
        expect(JSON.stringify(index.props).length).toBeLessThan(MAX_PAGE_DATA);

        const seen = {
            all: [...index.props.rows.map((g) => g.slug)],
            branch: [],
            family: [],
        } as Record<string, string[]>;
        const titles = new Set(["Career Guides — Military Job Code Translator"]);
        const descriptions = new Set<string>();

        for (const p of paths) {
            if (typeof p === "string") continue;
            const props = propsFor(p.params.facet as string[]);
            expect(props.rows.length).toBeGreaterThan(0);
            expect(props.rows.length).toBeLessThanOrEqual(60);
            expect(JSON.stringify(props).length).toBeLessThan(MAX_PAGE_DATA);
            seen[props.facet.kind].push(...props.rows.map((g) => g.slug));

            const seo = facetSeo(props.facet, props.page, props.count, props.totalPages);
            titles.add(seo.title);
            descriptions.add(seo.description);
        }

        const slugs = guides.map((g) => g.slug).sort();
        // Each listing (full list, by branch, by family) links every guide exactly once.
        for (const kind of ["all", "branch", "family"]) {
            expect([...seen[kind]].sort(), kind).toEqual(slugs);
        }
        expect(titles.size).toBe(paths.length + 1);
        expect(descriptions.size).toBe(paths.length);
    }, 60_000);

    it("404s unknown facets and pages past the end", () => {
        expect(getStaticProps({ params: { facet: ["branch", "space-force"] } })).toEqual({
            notFound: true,
        });
        expect(getStaticProps({ params: { facet: ["branch", "army", "page", "1"] } })).toEqual({
            notFound: true,
        });
        expect(getStaticProps({ params: { facet: ["branch", "army", "page", "99"] } })).toEqual({
            notFound: true,
        });
    });

    it("renders the facet's guides, facet chips and page numbers as plain links", () => {
        const props = propsFor(["branch", "army"]);
        render(<FacetPage {...props} />);

        expect(screen.getByTestId("seo")).toHaveAttribute(
            "data-title",
            "Army MOS to Civilian Tech Careers"
        );
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/From Army MOS/);

        const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
        for (const g of props.rows) expect(hrefs).toContain(`/career-guides/${g.slug}`);
        for (let n = 2; n <= props.totalPages; n += 1) {
            expect(hrefs).toContain(`/career-guides/branch/army/page/${n}#database`);
        }
        expect(hrefs).toContain("/career-guides/branch/navy#database");
        expect(hrefs).toContain("/career-guides/family/it-comms#database");
        expect(hrefs).not.toContain("/career-guides/branch/army/page/1#database");
        const pagination = screen.getByRole("navigation", { name: "Pagination" });
        expect(within(pagination).getByText("1")).toHaveAttribute("aria-current", "page");
    });
});
