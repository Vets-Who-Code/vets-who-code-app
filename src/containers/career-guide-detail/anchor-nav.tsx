import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

interface AnchorItem {
    id: string;
    label: string;
}

interface Props {
    items: AnchorItem[];
}

const SCROLL_OFFSET = 80;

const AnchorNav = ({ items }: Props) => {
    const [active, setActive] = useState(items[0]?.id ?? "");

    useEffect(() => {
        const onScroll = () => {
            const threshold = window.scrollY + window.innerHeight * 0.35;
            let current = items[0]?.id ?? "";
            for (const item of items) {
                const el = document.getElementById(item.id);
                if (el && el.offsetTop <= threshold) current = item.id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [items]);

    const jump = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
    }, []);

    return (
        <nav
            aria-label="Section navigation"
            className="tw-fixed tw-right-6 tw-top-1/2 tw-z-20 tw--translate-y-1/2 tw-hidden xl:tw-block"
        >
            <ul className="tw-flex tw-flex-col tw-gap-3">
                {items.map((item) => {
                    const isActive = item.id === active;
                    return (
                        <li key={item.id}>
                            <button
                                type="button"
                                onClick={() => jump(item.id)}
                                className="tw-group tw-flex tw-items-center tw-gap-3"
                            >
                                <span
                                    className={clsx(
                                        "tw-h-[1px] tw-transition-all tw-duration-200",
                                        isActive
                                            ? "tw-w-8 tw-bg-accent"
                                            : "tw-w-[18px] tw-bg-cream/30 group-hover:tw-w-8 group-hover:tw-bg-accent"
                                    )}
                                />
                                <span
                                    className={clsx(
                                        "tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.14em] tw-transition-opacity",
                                        isActive
                                            ? "tw-text-cream tw-opacity-100"
                                            : "tw-text-[#6C757D] tw-opacity-0 group-hover:tw-opacity-100"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default AnchorNav;
