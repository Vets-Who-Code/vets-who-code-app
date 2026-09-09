import { EngagementModal } from "@components/ui/engagement-modal/EngagementModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SafeLocalStorage } from "@utils/safe-storage";

vi.mock("motion/react", () => ({
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    motion: {
        div: ({ children, ...rest }: React.ComponentProps<"div">) => (
            <div {...rest}>{children}</div>
        ),
    },
}));

const PROPS = {
    headline: "Your Next Mission Starts Here.",
    body: "Support Vets Who Code.",
    cta1: { label: "Donate Now", href: "/donate" },
    cta2: { label: "Join the Mission", href: "#newsletter" },
};

/** Put the document at a given fraction of scroll depth and fire the listener. */
const scrollTo = (fraction: number) => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
        value: 2000,
        configurable: true,
    });
    Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
    Object.defineProperty(window, "scrollY", {
        value: fraction * (2000 - 1000),
        configurable: true,
    });
    fireEvent.scroll(window);
};

const modal = () => screen.queryByRole("dialog");

describe("EngagementModal", () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.matchMedia = vi.fn().mockReturnValue({
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }) as unknown as typeof window.matchMedia;
    });

    it("never interrupts a first-time visitor, even at full scroll depth", () => {
        render(<EngagementModal {...PROPS} />);
        scrollTo(1);
        expect(modal()).not.toBeInTheDocument();
    });

    it("stays hidden for a returning visitor who has not read far enough", () => {
        SafeLocalStorage.setItem("vwc_visit_count", 3);
        render(<EngagementModal {...PROPS} />);
        scrollTo(0.5);
        expect(modal()).not.toBeInTheDocument();
    });

    it("shows for a returning visitor past the scroll threshold", async () => {
        SafeLocalStorage.setItem("vwc_visit_count", 3);
        render(<EngagementModal {...PROPS} />);
        scrollTo(0.75);
        await waitFor(() => expect(modal()).toBeInTheDocument());
    });

    it("shows on exit intent for a returning visitor on a fine pointer", async () => {
        SafeLocalStorage.setItem("vwc_visit_count", 3);
        render(<EngagementModal {...PROPS} />);
        fireEvent.mouseOut(document, { clientY: 0, relatedTarget: null });
        await waitFor(() => expect(modal()).toBeInTheDocument());
    });

    it("never fires exit intent on a touch device", () => {
        SafeLocalStorage.setItem("vwc_visit_count", 3);
        (window.matchMedia as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        });
        render(<EngagementModal {...PROPS} />);
        fireEvent.mouseOut(document, { clientY: 0, relatedTarget: null });
        expect(modal()).not.toBeInTheDocument();
    });

    it("stays dismissed across later visits", () => {
        SafeLocalStorage.setItem("vwc_visit_count", 3);
        SafeLocalStorage.setItem("vwc_engagement_modal_dismissed", true);
        render(<EngagementModal {...PROPS} />);
        scrollTo(1);
        expect(modal()).not.toBeInTheDocument();
    });

    it("counts a visit once per session, not once per page view", () => {
        const { unmount } = render(<EngagementModal {...PROPS} />);
        unmount();
        render(<EngagementModal {...PROPS} />);
        expect(SafeLocalStorage.getItem<number>("vwc_visit_count", 0)).toBe(1);
    });
});
