import Anchor from "@ui/anchor";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

// Signed-in destinations live here (behind the avatar), not in the public top nav.
const USER_NAV_LINKS = [
    { label: "Learn", path: "/learn" },
    { label: "Reps", path: "/challenges" },
    { label: "Assessment", path: "/assessment" },
    { label: "J0d!e", path: "/jodie" },
];

const UserMenu = () => {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return undefined;
        const handleMouseDown = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const handleLogout = async () => {
        try {
            await signOut({ callbackUrl: "/login" });
        } catch (error) {
            console.error("[UserMenu] signOut failed:", error);
            window.alert(
                "Logout failed. Please try again, or clear your browser cookies for this site."
            );
        }
    };

    if (status === "loading") {
        return (
            <span
                data-testid="user-menu-skeleton"
                aria-hidden="true"
                className="tw-block tw-h-9 tw-w-9 tw-animate-pulse tw-rounded-full tw-bg-gray-200"
            />
        );
    }

    if (!session?.user) {
        return (
            <Anchor
                path="/login"
                className="tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-secondary hover:tw-text-primary"
            >
                Sign in
            </Anchor>
        );
    }

    const { user } = session;
    const displayName = user.name || user.email || "Account";

    return (
        <div ref={containerRef} className="tw-relative">
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Open user menu"
                onClick={() => setOpen((prev) => !prev)}
                className="tw-flex tw-items-center tw-gap-2"
            >
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={`${displayName} avatar`}
                        width={36}
                        height={36}
                        className="tw-rounded-full tw-border tw-border-gray-200"
                    />
                ) : (
                    <span className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-rounded-full tw-bg-navy tw-text-sm tw-font-semibold tw-text-white">
                        {displayName.charAt(0).toUpperCase()}
                    </span>
                )}
                <span className="tw-hidden tw-max-w-[120px] tw-truncate tw-text-sm tw-font-medium tw-text-secondary lg:tw-block">
                    {displayName}
                </span>
            </button>
            {open && (
                <div className="tw-absolute tw-right-0 tw-top-full tw-z-[60] tw-mt-2 tw-w-44 tw-rounded-md tw-border tw-border-gray-200 tw-bg-white tw-py-1 tw-shadow-lg">
                    {USER_NAV_LINKS.map((link) => (
                        <Anchor
                            key={link.path}
                            path={link.path}
                            className="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-secondary hover:tw-bg-gray-50"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Anchor>
                    ))}
                    <Anchor
                        path={`/profile/${user.id}`}
                        className="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-secondary hover:tw-bg-gray-50"
                        onClick={() => setOpen(false)}
                    >
                        Profile
                    </Anchor>
                    <div className="tw-my-1 tw-border-t tw-border-gray-100" />
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="tw-block tw-w-full tw-px-4 tw-py-2 tw-text-left tw-text-sm tw-text-red hover:tw-bg-gray-50"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
