import ErrorBoundary from "@components/error-boundary";
import { render, screen } from "@testing-library/react";

const Boom = () => {
    throw new Error("boom");
};

describe("ErrorBoundary", () => {
    beforeEach(() => {
        // React re-logs a caught render error, and happy-dom re-dispatches it
        // as a window error event. Silence both for these tests.
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders its children when nothing throws", () => {
        render(
            <ErrorBoundary>
                <p>All good</p>
            </ErrorBoundary>
        );

        expect(screen.getByText("All good")).toBeInTheDocument();
    });

    it("renders the fallback when a child throws", () => {
        render(
            <ErrorBoundary>
                <Boom />
                <p>All good</p>
            </ErrorBoundary>
        );

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
        expect(screen.queryByText("All good")).not.toBeInTheDocument();
    });

    it("clears the fallback when resetKey changes", () => {
        const { rerender } = render(
            <ErrorBoundary resetKey="/crashed">
                <Boom />
            </ErrorBoundary>
        );

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();

        rerender(
            <ErrorBoundary resetKey="/next-page">
                <p>All good</p>
            </ErrorBoundary>
        );

        expect(screen.getByText("All good")).toBeInTheDocument();
        expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
    });
});
