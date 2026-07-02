import { useClickOutside } from "@hooks";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

type TProps = {
    /** Tone of surrounding header — affects placeholder/avatar contrast on dark headers. */
    mode?: "light" | "dark";
    className?: string;
};

const UserMenu = ({ mode = "dark", className }: TProps) => {
    const { data: session, status } = useSession();
    const [open, setOpen] = useState(false);
    const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

    const handleLogout = async () => {
        setOpen(false);
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
            <div
                aria-hidden="true"
                className={clsx(
                    "tw-h-9 tw-w-9 tw-animate-pulse tw-rounded-full tw-border",
                    mode === "light"
                        ? "tw-border-white/20 tw-bg-white/10"
                        : "tw-border-navy/10 tw-bg-navy/5",
                    className
                )}
            />
        );
    }

    if (status !== "authenticated" || !session?.user) {
        return (
            <Link
                href="/login"
                className={clsx(
                    "tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-transition-colors",
                    mode === "light"
                        ? "tw-text-white hover:tw-text-gold"
                        : "tw-text-navy hover:tw-text-secondary",
                    className
                )}
            >
                Sign in
            </Link>
        );
    }

    const userId = session.user.id;
    const name = session.user.name || "Operator";
    const image = session.user.image || null;
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div ref={ref} className={clsx("tw-relative", className)}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Account menu for ${name}`}
                onClick={() => setOpen((prev) => !prev)}
                className="tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-full tw-border-2 tw-border-gold/40 tw-bg-navy/5 tw-text-xs tw-font-bold tw-text-navy tw-transition-all hover:tw-border-gold focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-gold focus-visible:tw-ring-offset-2"
            >
                {image ? (
                    <Image
                        src={image}
                        alt=""
                        width={36}
                        height={36}
                        className="tw-h-full tw-w-full tw-object-cover"
                    />
                ) : (
                    <span aria-hidden="true">{initials || "U"}</span>
                )}
            </button>

            {open && userId && (
                <div
                    role="menu"
                    aria-label="Account menu"
                    className="tw-absolute tw-right-0 tw-top-full tw-z-[60] tw-mt-2 tw-w-56 tw-overflow-hidden tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-shadow-xl tw-shadow-black/10"
                >
                    <div className="tw-border-b tw-border-navy/10 tw-px-4 tw-py-3">
                        <p className="tw-mb-0 tw-truncate tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60">
                            Signed in as
                        </p>
                        <p className="tw-mb-0 tw-truncate tw-text-sm tw-font-bold tw-text-navy">
                            {name}
                        </p>
                    </div>
                    <Link
                        href={`/profile/${userId}`}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="tw-block tw-px-4 tw-py-2.5 tw-font-mono tw-text-sm tw-text-navy tw-transition-colors hover:tw-bg-navy/5 hover:tw-text-secondary"
                    >
                        <i className="fas fa-user tw-mr-2 tw-text-navy/50" />
                        My Profile
                    </Link>
                    <Link
                        href={`/profile/${userId}?tab=settings`}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="tw-block tw-px-4 tw-py-2.5 tw-font-mono tw-text-sm tw-text-navy tw-transition-colors hover:tw-bg-navy/5 hover:tw-text-secondary"
                    >
                        <i className="fas fa-cog tw-mr-2 tw-text-navy/50" />
                        Settings
                    </Link>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="tw-block tw-w-full tw-border-t tw-border-navy/10 tw-px-4 tw-py-2.5 tw-text-left tw-font-mono tw-text-sm tw-text-red tw-transition-colors hover:tw-bg-red/5"
                    >
                        <i className="fas fa-sign-out-alt tw-mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
