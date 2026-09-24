import DefaultSEO from "@components/seo/deafult-seo";
import PageSeo from "@components/seo/page-seo";
import { render } from "@testing-library/react";
import { HeadManagerContext } from "next/dist/shared/lib/head-manager-context.shared-runtime";
import type { ReactElement } from "react";

vi.mock("next/router", () => ({
    useRouter: () => ({ asPath: "/blogs/foo?utm=x#frag" }),
}));

// next/head only emits through a head manager; with the default context its side
// effect no-ops and document.head stays empty. Capture what it would have written.
function captureHead(node: ReactElement): ReactElement[] {
    const updates: ReactElement[][] = [];
    render(
        <HeadManagerContext.Provider
            value={
                {
                    mountedInstances: new Set(),
                    updateHead: (state: ReactElement[]) => updates.push(state),
                } as never
            }
        >
            {node}
        </HeadManagerContext.Provider>
    );
    return updates.at(-1) ?? [];
}

const canonicals = (tags: ReactElement[]) =>
    tags.filter((tag) => tag.type === "link" && tag.props.rel === "canonical");

const metaContent = (tags: ReactElement[], attr: "property" | "name", value: string) =>
    tags
        .filter((tag) => tag.type === "meta" && tag.props[attr] === value)
        .map((tag) => tag.props.content as string);

const titles = (tags: ReactElement[]) =>
    tags.filter((tag) => tag.type === "title").map((tag) => tag.props.children as string);

const jsonLd = (tags: ReactElement[]) =>
    tags
        .filter((tag) => tag.type === "script" && tag.props.type === "application/ld+json")
        .map((tag) => tag.props.dangerouslySetInnerHTML.__html as string);

describe("SEO metadata", () => {
    it("gives a route without its own PageSeo a canonical for that route", () => {
        const tags = captureHead(<DefaultSEO />);

        expect(canonicals(tags).map((tag) => tag.props.href)).toEqual([
            "https://vetswhocode.io/blogs/foo",
        ]);
        expect(metaContent(tags, "property", "og:url")).toEqual([
            "https://vetswhocode.io/blogs/foo",
        ]);
    });

    it("emits exactly one canonical when a page declares its own", () => {
        const tags = captureHead(
            <>
                <DefaultSEO />
                <PageSeo title="Foo Post" description="A post about foo." />
            </>
        );

        expect(canonicals(tags).map((tag) => tag.props.href)).toEqual([
            "https://vetswhocode.io/blogs/foo",
        ]);
    });

    it("does not repeat the brand in the default title", () => {
        const title = titles(captureHead(<DefaultSEO />));

        expect(title).toEqual(["Vets Who Code"]);
        expect(title[0].split("Vets Who Code")).toHaveLength(2);
    });

    it("suffixes a page title with the brand exactly once", () => {
        const tags = captureHead(
            <>
                <DefaultSEO />
                <PageSeo title="Foo Post" description="A post about foo." />
            </>
        );

        expect(titles(tags)).toEqual(["Foo Post - Vets Who Code"]);
    });

    it("ships no placeholder social metadata", () => {
        const tags = captureHead(<DefaultSEO />);

        expect(metaContent(tags, "property", "og:locale")).toEqual(["en_US"]);
        expect(metaContent(tags, "name", "twitter:site")).toEqual([]);
        expect(metaContent(tags, "name", "twitter:creator")).toEqual([]);
        expect(metaContent(tags, "property", "fb:app_id")).toEqual([]);
        expect(metaContent(tags, "property", "og:image:alt")).toEqual([
            "Vets Who Code — free software engineering training for veterans and military spouses",
        ]);
    });

    it("emits JSON-LD only for articles, built from the page's own description", () => {
        expect(jsonLd(captureHead(<PageSeo title="Foo" description="Bar" />))).toEqual([]);

        const scripts = jsonLd(
            captureHead(
                <PageSeo
                    title="Foo"
                    description="Bar"
                    jsonLdType="article"
                    article={{
                        publishedTime: "2026-01-01T00:00:00.000Z",
                        modifiedTime: "2026-01-01T00:00:00.000Z",
                        tags: [],
                    }}
                />
            )
        );

        expect(scripts).toHaveLength(1);
        expect(JSON.parse(scripts[0]).description).toBe("Bar");
        expect(scripts[0]).not.toContain("Introductory CS course");
    });
});
