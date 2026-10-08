import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signOut, useSession } from "next-auth/react";
import UserMenu from "@/components/user-menu";

vi.mock("next-auth/react", () => ({
    useSession: vi.fn(),
    signOut: vi.fn(),
}));

vi.mock("next/image", () => ({
    default: ({
        alt,
        src,
        width,
        height,
        className,
    }: {
        alt: string;
        src: string;
        width: number;
        height: number;
        className?: string;
    }) => <img alt={alt} src={src} width={width} height={height} className={className} />,
}));

const mockUseSession = vi.mocked(useSession);
const mockSignOut = vi.mocked(signOut);

const authenticatedSession = {
    data: {
        user: {
            id: "user-123",
            name: "Jody Vet",
            email: "jody@example.com",
            image: "https://avatars.githubusercontent.com/u/1?v=4",
        },
        expires: "2099-01-01T00:00:00.000Z",
    },
    status: "authenticated",
    update: vi.fn(),
} as unknown as ReturnType<typeof useSession>;

describe("UserMenu", () => {
    beforeEach(() => {
        mockUseSession.mockReset();
        mockSignOut.mockReset();
    });

    it("shows a skeleton while the session is loading, without a sign-in link", () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: "loading",
            update: vi.fn(),
        } as unknown as ReturnType<typeof useSession>);

        render(<UserMenu />);

        expect(screen.getByTestId("user-menu-skeleton")).toBeInTheDocument();
        expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
    });

    it("shows a sign-in link to /login when unauthenticated", () => {
        mockUseSession.mockReturnValue({
            data: null,
            status: "unauthenticated",
            update: vi.fn(),
        } as unknown as ReturnType<typeof useSession>);

        render(<UserMenu />);

        const link = screen.getByRole("link", { name: "Sign in" });
        expect(link).toHaveAttribute("href", "/login");
        expect(screen.queryByTestId("user-menu-skeleton")).not.toBeInTheDocument();
    });

    it("shows the avatar and opens a dropdown with profile link and logout", () => {
        mockUseSession.mockReturnValue(authenticatedSession);

        render(<UserMenu />);

        expect(screen.getByAltText("Jody Vet avatar")).toBeInTheDocument();
        expect(screen.queryByText("Logout")).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /open user menu/i }));

        expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
            "href",
            "/profile/user-123"
        );
        expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
    });

    it("calls signOut with /login callback when logout is clicked", async () => {
        mockUseSession.mockReturnValue(authenticatedSession);
        mockSignOut.mockResolvedValue(undefined as never);

        render(<UserMenu />);

        fireEvent.click(screen.getByRole("button", { name: /open user menu/i }));
        fireEvent.click(screen.getByRole("button", { name: "Logout" }));

        await waitFor(() => {
            expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: "/login" });
        });
    });

    it("alerts the user when signOut fails", async () => {
        mockUseSession.mockReturnValue(authenticatedSession);
        mockSignOut.mockRejectedValue(new Error("network down"));
        const alertMock = vi.fn();
        vi.stubGlobal("alert", alertMock);
        const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        render(<UserMenu />);

        fireEvent.click(screen.getByRole("button", { name: /open user menu/i }));
        fireEvent.click(screen.getByRole("button", { name: "Logout" }));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(expect.stringContaining("Logout failed"));
        });

        vi.unstubAllGlobals();
        errorSpy.mockRestore();
    });
});
