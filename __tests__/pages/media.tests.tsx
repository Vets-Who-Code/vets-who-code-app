import { fireEvent, render, screen } from "@testing-library/react";
import { IMedia } from "@utils/types"; // Adjust path if needed
import MediaPage from "@/pages/media";

// Mock dependencies
vi.mock("@components/seo/page-seo", () => ({
    default: () => <div data-testid="seo" />,
}));

vi.mock("@layout/layout-01", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="layout">{children}</div>
    ),
}));

vi.mock("@components/media-card", () => ({
    default: ({ title, mediaType, date }: IMedia) => (
        <div data-testid="media-card">
            <h3>{title}</h3>
            <p>{mediaType}</p>
            <p>{new Date(date).getFullYear()}</p>
        </div>
    ),
}));

// Mock getallPosts from mdx-pages
// The actual getStaticProps will call the real one, but we pass props directly in tests
const mockGetAllPosts = vi.fn();
vi.mock("@/lib/mdx-pages", () => ({
    getAllMediaPosts: () => mockGetAllPosts(),
}));

const mockMediaItems: IMedia[] = [
    {
        slug: "podcast-1",
        title: "Podcast Episode Alpha",
        mediaType: "Podcast",
        url: "https://example.com/podcast1",
        publication: "Tech Talks",
        date: "2023-01-15",
        description: "Discussion about new tech.",
        image: { src: "" },
    },
    {
        slug: "article-1",
        title: "Article on VWC",
        mediaType: "Article",
        url: "https://example.com/article1",
        publication: "Code News",
        date: "2023-05-20",
        description: "Vets Who Code success stories.",
        image: { src: "" },
    },
    {
        slug: "video-1",
        title: "VWC Demo Video",
        mediaType: "Video",
        url: "https://example.com/video1",
        publication: "YouTube",
        date: "2022-11-10",
        description: "A cool demo of our projects.",
        image: { src: "" },
    },
    {
        slug: "podcast-2",
        title: "Another Podcast Chat",
        mediaType: "Podcast",
        url: "https://example.com/podcast2",
        publication: "Dev Life",
        date: "2022-07-01",
        description: "Chatting about development.",
        image: { src: "" },
    },
];

const pageProps = {
    allMediaItems: mockMediaItems,
    page: {
        title: "Media & Features",
    },
    // layout prop is not directly used by MediaPage component itself in this setup
};

describe("MediaPage Filtering and Searching", () => {
    beforeEach(() => {
        // Reset mocks if necessary, or provide fresh mock data for getallPosts if it were called by the component
        // For this component, we pass data via props, so direct mocking of getallPosts for the component render isn't critical
    });

    it("renders all media items initially", () => {
        render(<MediaPage {...pageProps} />);
        const cards = screen.getAllByTestId("media-card");
        expect(cards).toHaveLength(mockMediaItems.length);
        expect(screen.getByText("Podcast Episode Alpha")).toBeInTheDocument();
        expect(screen.getByText("Article on VWC")).toBeInTheDocument();
    });

    it("filters by Media Type (Podcast)", () => {
        render(<MediaPage {...pageProps} />);
        const typeSelect = screen.getByLabelText("Filter by Type");
        fireEvent.change(typeSelect, { target: { value: "Podcast" } });

        const cards = screen.getAllByTestId("media-card");
        expect(cards).toHaveLength(2);
        cards.forEach((card) => {
            expect(card).toHaveTextContent("Podcast");
        });
        expect(screen.getByText("Podcast Episode Alpha")).toBeInTheDocument();
        expect(screen.getByText("Another Podcast Chat")).toBeInTheDocument();
        expect(screen.queryByText("Article on VWC")).not.toBeInTheDocument();
    });

    it("filters by Year (2023)", () => {
        render(<MediaPage {...pageProps} />);
        const yearSelect = screen.getByLabelText("Filter by Year");
        fireEvent.change(yearSelect, { target: { value: "2023" } });

        const cards = screen.getAllByTestId("media-card");
        expect(cards).toHaveLength(2);
        cards.forEach((card) => {
            expect(card).toHaveTextContent("2023");
        });
        expect(screen.getByText("Podcast Episode Alpha")).toBeInTheDocument(); // Date 2023-01-15
        expect(screen.getByText("Article on VWC")).toBeInTheDocument(); // Date 2023-05-20
        expect(screen.queryByText("VWC Demo Video")).not.toBeInTheDocument(); // Date 2022-11-10
    });

    it("filters by search term (VWC)", () => {
        render(<MediaPage {...pageProps} />);
        const searchInput = screen.getByLabelText("Search");
        fireEvent.change(searchInput, { target: { value: "VWC" } });

        const cards = screen.getAllByTestId("media-card");
        expect(cards).toHaveLength(2); // "Article on VWC", "VWC Demo Video"
        expect(screen.getByText("Article on VWC")).toBeInTheDocument();
        expect(screen.getByText("VWC Demo Video")).toBeInTheDocument();
        expect(screen.queryByText("Podcast Episode Alpha")).not.toBeInTheDocument();
    });

    it("filters by Media Type and Year", () => {
        render(<MediaPage {...pageProps} />);
        const typeSelect = screen.getByLabelText("Filter by Type");
        fireEvent.change(typeSelect, { target: { value: "Podcast" } });
        const yearSelect = screen.getByLabelText("Filter by Year");
        fireEvent.change(yearSelect, { target: { value: "2023" } });

        const cards = screen.getAllByTestId("media-card");
        expect(cards).toHaveLength(1);
        expect(screen.getByText("Podcast Episode Alpha")).toBeInTheDocument();
        expect(cards[0]).toHaveTextContent("Podcast");
        expect(cards[0]).toHaveTextContent("2023");
    });

    it("shows no results message when filters match nothing", () => {
        render(<MediaPage {...pageProps} />);
        const typeSelect = screen.getByLabelText("Filter by Type");
        fireEvent.change(typeSelect, { target: { value: "Video" } });
        const yearSelect = screen.getByLabelText("Filter by Year");
        fireEvent.change(yearSelect, { target: { value: "2023" } }); // No videos in 2023

        expect(screen.queryAllByTestId("media-card")).toHaveLength(0);
        expect(
            screen.getByText(
                "No media items found matching your criteria. Try adjusting your filters or search term."
            )
        ).toBeInTheDocument();
    });

    it("resets filters when Reset button is clicked", () => {
        render(<MediaPage {...pageProps} />);
        // Apply some filters
        fireEvent.change(screen.getByLabelText("Filter by Type"), { target: { value: "Podcast" } });
        fireEvent.change(screen.getByLabelText("Search"), { target: { value: "Alpha" } });

        // Check that filters are applied
        let cards = screen.getAllByTestId("media-card");
        expect(cards).toHaveLength(1);
        expect(screen.getByText("Podcast Episode Alpha")).toBeInTheDocument();

        // Click reset
        const resetButton = screen.getByRole("button", { name: /Reset/i });
        fireEvent.click(resetButton);

        // Check that all items are displayed again
        cards = screen.getAllByTestId("media-card");
        expect(cards).toHaveLength(mockMediaItems.length);
        expect(screen.getByText("Podcast Episode Alpha")).toBeInTheDocument();
        expect(screen.getByText("Article on VWC")).toBeInTheDocument();

        // Check filter inputs are reset
        expect((screen.getByLabelText("Filter by Type") as HTMLSelectElement).value).toBe("");
        expect((screen.getByLabelText("Filter by Year") as HTMLSelectElement).value).toBe("");
        expect((screen.getByLabelText("Search") as HTMLInputElement).value).toBe("");
    });
});
