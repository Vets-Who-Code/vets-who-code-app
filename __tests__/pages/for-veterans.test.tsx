import { PROGRAM_FACTS } from "@data/accelerator";
import { decisionGuideLinks, sitemapColumns } from "@data/sitemap-links";
import { render, screen } from "@testing-library/react";
import fs from "fs";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import type { LandingFrontmatter } from "@/lib/mdx-pages";
import DecisionLandingPage, { getStaticPaths, getStaticProps } from "@/pages/for-veterans/[slug]";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

const SLUGS = [
    "free-software-engineering-training",
    "become-a-software-engineer-after-the-military",
    "software-engineer-salary",
    "learn-to-code-without-a-degree",
];

type PageProps = { frontmatter: LandingFrontmatter; mdxSource: MDXRemoteSerializeResult };

const propsFor = async (slug: string) => {
    const result = (await getStaticProps({ params: { slug } })) as { props: PageProps };
    return result.props;
};

describe("for-veterans/[slug]", () => {
    it("emits exactly the four decision pages", async () => {
        const result = await getStaticPaths({});
        const slugs = result.paths.map((entry) =>
            typeof entry === "string" ? entry : String(entry.params.slug)
        );
        expect([...slugs].sort()).toEqual([...SLUGS].sort());
    });

    it("returns 404 for an unknown slug", async () => {
        expect(await getStaticProps({ params: { slug: "nope" } })).toEqual({ notFound: true });
    });

    it.each(SLUGS)("%s is written to its query with an FAQ", async (slug) => {
        const { frontmatter } = await propsFor(slug);
        expect(frontmatter.title).not.toBe("");
        expect(frontmatter.query).not.toBe("");
        // PageSeo appends the brand; a seoTitle carrying it would double up.
        expect(frontmatter.seoTitle).not.toContain("Vets Who Code");
        // The meta description is what the SERP shows; longer gets truncated.
        expect(frontmatter.description.length).toBeLessThanOrEqual(155);
        expect(frontmatter.faq.length).toBeGreaterThanOrEqual(3);
    });

    it.each(SLUGS)("%s links to /apply and /curriculum from its body", (slug) => {
        const raw = fs.readFileSync(
            path.join(process.cwd(), "src/data/mdx-pages/landing", `${slug}.mdx`),
            "utf8"
        );
        expect(raw).toContain("](/apply)");
        expect(raw).toContain("](/curriculum)");
    });

    it("renders the title, program facts, FAQ and Apply CTA", async () => {
        const props = await propsFor("free-software-engineering-training");
        render(<DecisionLandingPage {...props} />);

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            props.frontmatter.title
        );
        const facts = document.querySelector("dl")?.textContent ?? "";
        for (const [, value] of PROGRAM_FACTS) {
            expect(facts).toContain(value);
        }
        for (const item of props.frontmatter.faq) {
            expect(screen.getByRole("heading", { level: 3, name: item.question })).toBeVisible();
            expect(screen.getByText(item.answer)).toBeVisible();
        }
        const applyLinks = screen.getAllByRole("link", { name: "Apply" });
        expect(applyLinks.length).toBeGreaterThan(0);
        for (const link of applyLinks) {
            expect(link).toHaveAttribute("href", "/apply");
        }
    });

    it("keeps body links internal, with no new tab and no nofollow", async () => {
        const props = await propsFor("free-software-engineering-training");
        render(<DecisionLandingPage {...props} />);
        const curriculum = screen.getByRole("link", { name: "Read the curriculum" });
        expect(curriculum).toHaveAttribute("href", "/curriculum");
        expect(curriculum).not.toHaveAttribute("target");
        expect(curriculum).not.toHaveAttribute("rel");
    });

    it("is linked from the footer's Learn column", () => {
        const learn = sitemapColumns.find((column) => column.heading === "Learn");
        for (const link of decisionGuideLinks) {
            expect(learn?.links).toContainEqual(link);
        }
        expect(decisionGuideLinks.map((link) => link.path.replace("/for-veterans/", ""))).toEqual(
            SLUGS
        );
    });
});
