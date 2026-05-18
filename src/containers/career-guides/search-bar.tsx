import clsx from "clsx";
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { BRANCH_META } from "./branch-meta";
import type { GuideEntry } from "./types";

interface Props {
    guides: GuideEntry[];
    query: string;
    onQuery: (q: string) => void;
    onPick?: (g: GuideEntry) => void;
}

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const SearchBar = ({ guides, query, onQuery, onPick }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [mod, setMod] = useState("Ctrl");

    useEffect(() => {
        setMod(isMac() ? "⌘" : "Ctrl");
    }, []);

    // ⌘K / Ctrl-K global focus
    useEffect(() => {
        const handler = (e: globalThis.KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === "Escape") {
                inputRef.current?.blur();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const matches = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        const prefix = guides.filter((g) => g.code.toLowerCase().startsWith(q));
        const sub = guides.filter(
            (g) =>
                !g.code.toLowerCase().startsWith(q) &&
                (g.title.toLowerCase().includes(q) || g.civilian.toLowerCase().includes(q))
        );
        return [...prefix, ...sub].slice(0, 8);
    }, [guides, query]);

    useEffect(() => {
        setActiveIdx(0);
    }, [query]);

    const open = focused && query.trim().length > 0 && matches.length > 0;

    const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!open) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx((i) => Math.min(i + 1, matches.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            const pick = matches[activeIdx];
            if (pick) {
                onQuery(pick.code);
                onPick?.(pick);
                inputRef.current?.blur();
            }
        }
    };

    return (
        <div className="tw-relative">
            <div
                className={clsx(
                    "tw-flex tw-items-center tw-gap-3 tw-border tw-bg-[#003559] tw-px-5 tw-py-4 tw-transition-all tw-duration-150",
                    focused
                        ? "tw-border-accent tw-shadow-[0_0_0_4px_rgba(253,179,48,0.14)]"
                        : "tw-border-cream/[0.18]"
                )}
            >
                <span className="tw-font-mono tw-text-[14px] tw-text-accent">$ find ~/</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => onQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    onKeyDown={onKey}
                    placeholder={'try "cyber", "11B", "intel", "pilot"…'}
                    aria-label="Search career guides"
                    className="tw-flex-1 tw-bg-transparent tw-font-body tw-text-[19px] tw-text-cream tw-outline-none placeholder:tw-text-[#495057]"
                />
                <span className="tw-flex tw-items-center tw-gap-2 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#6C757D]">
                    <kbd className="tw-border tw-border-cream/20 tw-bg-secondary tw-px-2 tw-py-1 tw-text-[10px] tw-text-cream">
                        {mod}K
                    </kbd>
                    Search
                </span>
            </div>

            {open && (
                <div
                    className="tw-absolute tw-left-0 tw-right-0 tw-top-full tw-z-30 tw-mt-1 tw-border tw-border-cream/[0.18] tw-bg-[#003559] tw-shadow-lg"
                    role="listbox"
                >
                    {matches.map((m, i) => (
                        <button
                            key={m.code}
                            type="button"
                            role="option"
                            aria-selected={i === activeIdx}
                            onMouseEnter={() => setActiveIdx(i)}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                onQuery(m.code);
                                onPick?.(m);
                            }}
                            className={clsx(
                                "tw-flex tw-w-full tw-items-center tw-gap-4 tw-px-5 tw-py-3 tw-text-left tw-transition-colors",
                                i === activeIdx ? "tw-bg-[#003559]" : "tw-bg-transparent"
                            )}
                        >
                            <span className="tw-w-20 tw-shrink-0 tw-font-mono tw-text-[13px] tw-text-cream">
                                {m.code}
                            </span>
                            <span className="tw-flex tw-flex-1 tw-flex-col">
                                <span className="tw-font-body tw-text-[14px] tw-text-cream">
                                    {m.title}
                                </span>
                                <span className="tw-font-body tw-text-[12.5px] tw-text-[#6C757D]">
                                    → {m.civilian}
                                </span>
                            </span>
                            <span className="tw-flex tw-shrink-0 tw-items-center tw-gap-2 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#DEE2E6]">
                                <span
                                    aria-hidden={true}
                                    className="tw-inline-block tw-h-2 tw-w-2"
                                    style={{ backgroundColor: BRANCH_META[m.branch].color }}
                                />
                                {BRANCH_META[m.branch].short}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
