import FunFact from "@components/funfact/funfact-01";
import FunFact02 from "@components/funfact/funfact-02";
import FunfactLayout02 from "@containers/funfact/layout-02";
import FunfactLayout04 from "@containers/funfact/layout-04";
import { OUTCOME_FUNFACTS } from "@data/outcomes";
import { render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";

const text = (html: string) => html.replace(/<[^>]+>/g, "");

// renderToStaticMarkup runs no effects, so this is exactly what a crawler
// that never executes JS receives.
describe("funfact server markup", () => {
    it("ships the final number, not 0", () => {
        const html = renderToStaticMarkup(
            <FunFact counter={97} suffix="%" title="Job Placement Rate" />
        );
        expect(text(html)).toContain("97%");
        expect(html).not.toMatch(/>0<\/span>/);
    });

    it("keeps the prefix and suffix around the number", () => {
        const html = renderToStaticMarkup(
            <FunFact counter={20} prefix="$" suffix="M+" title="Alumni Earnings" />
        );
        expect(text(html)).toContain("$20M+");
    });

    it("funfact-02 renders its number rather than an empty span", () => {
        const html = renderToStaticMarkup(
            <FunFact02 counter={97} suffix="%" title="Job Placement Rate" />
        );
        expect(text(html)).toContain("97%");
        expect(html).not.toMatch(/<span><\/span>/);
    });

    it("both live layouts print every outcome display string", () => {
        const home = text(renderToStaticMarkup(<FunfactLayout04 data={{}} />));
        const inner = text(renderToStaticMarkup(<FunfactLayout02 />));
        for (const stat of OUTCOME_FUNFACTS) {
            expect(home).toContain(stat.display);
            expect(inner).toContain(stat.display);
        }
    });
});

describe("funfact count-up", () => {
    type Callback = (entries: IntersectionObserverEntry[]) => void;
    const stubObserver = (reports: boolean[]) => {
        vi.stubGlobal(
            "IntersectionObserver",
            class {
                constructor(private callback: Callback) {}
                observe() {
                    for (const isIntersecting of reports) {
                        this.callback([{ isIntersecting } as IntersectionObserverEntry]);
                    }
                }
                disconnect() {}
            }
        );
    };

    afterEach(() => vi.unstubAllGlobals());

    it("leaves the final number alone when the tile is already on screen", async () => {
        stubObserver([true]);
        const { getByText } = render(
            <FunFact counter={97} suffix="%" title="Job Placement Rate" />
        );
        await new Promise((resolve) => setTimeout(resolve, 60));
        expect(getByText("97")).toBeInTheDocument();
    });

    it("counts up once a tile scrolls into view later", async () => {
        stubObserver([false, true]);
        const { getByText } = render(
            <FunFact counter={97} suffix="%" title="Job Placement Rate" />
        );
        const node = getByText("97");
        await vi.waitFor(() => expect(node.textContent).not.toBe("97"), { timeout: 1500 });
    });
});
