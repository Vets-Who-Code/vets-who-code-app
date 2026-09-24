import { DOMAIN_IDS, type DomainPage, type domainJsonLd } from "@lib/curriculum-domain";
import { render, screen } from "@testing-library/react";
import { HeadManagerContext } from "next/dist/shared/lib/head-manager-context.shared-runtime";
import type { ReactElement } from "react";
import CurriculumDomainPage, { getStaticPaths, getStaticProps } from "@/pages/curriculum/[domain]";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

vi.mock("next/router", () => ({
    useRouter: () => ({ asPath: "/curriculum/js-core" }),
}));

type Props = { page: DomainPage; jsonLd: ReturnType<typeof domainJsonLd>; layout: unknown };

const propsFor = async (domain: string) => {
    const result = (await getStaticProps({ params: { domain } })) as { props: Props };
    return result.props;
};

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

describe("curriculum/[domain] page", () => {
    it("emits one static path per domain and 404s everything else", async () => {
        const result = await getStaticPaths({});
        const domains = result.paths.map((entry) =>
            typeof entry === "string" ? entry : String(entry.params.domain)
        );
        expect(domains).toHaveLength(DOMAIN_IDS.length);
        expect(new Set(domains)).toEqual(new Set(DOMAIN_IDS));
        expect(result.fallback).toBe(false);
    });

    it("shapes the page and layout props for a known domain", async () => {
        const props = await propsFor("js-core");
        expect(props.page.id).toBe("js-core");
        expect(props.jsonLd["@type"]).toBe("LearningResource");
        expect(props.layout).toEqual({
            headerShadow: true,
            headerFluid: false,
            footerMode: "light",
        });
    });

    it("returns notFound for an unknown domain", async () => {
        expect(await getStaticProps({ params: { domain: "missing" } })).toEqual({
            notFound: true,
        });
    });

    it("renders one h1, every topic, and the links back to the map and onward", async () => {
        const props = await propsFor("js-core");
        render(<CurriculumDomainPage {...props} />);

        const headings = screen.getAllByRole("heading", { level: 1 });
        expect(headings).toHaveLength(1);
        expect(headings[0]).toHaveTextContent(props.page.title);

        expect(screen.getAllByRole("article")).toHaveLength(props.page.topics.length);
        for (const topic of props.page.topics) {
            expect(
                screen.getByRole("heading", { level: 3, name: topic.label })
            ).toBeInTheDocument();
        }

        expect(screen.getByText("← Back to the skill map")).toHaveAttribute("href", "/curriculum");

        const downstream = props.page.unlocks[0].domain;
        const onward = screen
            .getAllByRole("link", { name: downstream.title })
            .map((a) => a.getAttribute("href"));
        expect(onward).toContain(`/curriculum/${downstream.id}`);
    });

    it("prints the entry-point and leaf empty states", async () => {
        const entry = await propsFor("filesystem");
        const { unmount } = render(<CurriculumDomainPage {...entry} />);
        expect(screen.getByText(/It is an entry point — you can start here/)).toBeInTheDocument();
        unmount();

        const leaf = await propsFor("harness");
        render(<CurriculumDomainPage {...leaf} />);
        expect(screen.getByText(/rests on this domain yet — it is a leaf/)).toBeInTheDocument();
    });

    it("writes the LearningResource JSON-LD into the head", async () => {
        const props = await propsFor("version-control");
        const head = captureHead(<CurriculumDomainPage {...props} />);
        const script = head.find(
            (tag) => tag.type === "script" && tag.props.type === "application/ld+json"
        );
        expect(script).toBeDefined();
        const json = JSON.parse(script?.props.dangerouslySetInnerHTML.__html as string);
        expect(json["@type"]).toBe("LearningResource");
        expect(json.teaches).toHaveLength(props.page.topics.length);
        expect(json.isPartOf).toMatchObject({
            "@type": "Course",
            url: "https://vetswhocode.io/curriculum",
        });
    });
});
