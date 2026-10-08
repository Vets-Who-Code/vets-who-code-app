import { render, screen } from "@testing-library/react";
import { forwardRef, type ReactElement } from "react";
import donate from "@/data/innerpages/donate.json";
import Donate from "@/pages/donate";

vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("next/router", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        isReady: true,
        query: { id: "item-1", code: "11B", module: "3" },
    }),
}));

// The real form embeds a Donorbox iframe, which happy-dom would fetch over the network.
vi.mock("@components/forms/donate-form", () => ({
    default: forwardRef<HTMLDivElement>((_props, ref) => <div ref={ref} />),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

const okJson = (body: unknown) => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

const h1Texts = () => screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent);

beforeEach(() => {
    mockFetch.mockImplementation(() => okJson([]));
});

describe("pages that render their own h1 alongside a hidden breadcrumb title", () => {
    const pages: Array<[string, () => ReactElement, string]> = [
        ["/donate", () => <Donate data={{ page: donate }} />, "Support Our Mission"],
    ];

    it.each(pages)("%s has exactly one h1", async (_route, page, title) => {
        render(page());
        await screen.findAllByRole("heading", { level: 1 });
        expect(h1Texts()).toEqual([title]);
    });
});
