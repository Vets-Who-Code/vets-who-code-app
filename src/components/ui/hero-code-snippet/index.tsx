import SectionTitle from "@components/section-title";
import { useRouter } from "next/router";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./HeroCodeSnippet.module.css";

const monoLabel = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const codeBody = {
    fontFamily: "var(--font-mono)",
    fontSize: "13.5px",
    lineHeight: "1.75",
};

const COMMENT = "rgba(185, 214, 242, 0.55)";
const KEYWORD = "#FDB330";
const TYPE = "#FFE169";
const METHOD = "#84C1FF";
const PUNCT = "rgba(248, 249, 250, 0.7)";
const IDENT = "#F8F9FA";
const PROMPT = "#FDB330";
const HINT = "rgba(185, 214, 242, 0.55)";

type HistoryEntry = {
    cmd: string;
    output: string[];
};

type CommandResult = {
    output: string[];
    navigateTo?: string;
    clear?: boolean;
};

const HELP_LINES = [
    "available commands:",
    "  apply      start your application",
    "  donate     support the mission",
    "  about      our story",
    "  contact    reach the team",
    "  train      run the function above",
    "  whoami     identify yourself",
    "  clear      reset terminal",
];

const TRAIN_LINES = [
    "deploying veteran...",
    "shipping production code...",
    "hiring at FAANG, fintech, defense  ✓",
    "",
    "result: 1 engineer.",
];

const runCommand = (raw: string): CommandResult => {
    const cmd = raw.trim().toLowerCase();
    if (cmd === "") return { output: [] };
    switch (cmd) {
        case "help":
            return { output: HELP_LINES };
        case "apply":
            return {
                output: ["→ redirecting to /apply ..."],
                navigateTo: "/apply",
            };
        case "donate":
            return {
                output: ["→ redirecting to /donate ..."],
                navigateTo: "/donate",
            };
        case "about":
            return {
                output: ["→ redirecting to /about-us ..."],
                navigateTo: "/about-us",
            };
        case "contact":
            return {
                output: ["→ redirecting to /contact-us ..."],
                navigateTo: "/contact-us",
            };
        case "train":
            return { output: TRAIN_LINES };
        case "whoami":
            return { output: ["guest · welcome to vetswhocode.io"] };
        case "clear":
            return { output: [], clear: true };
        default:
            return {
                output: [`unknown command: ${cmd}. type 'help' for commands.`],
            };
    }
};

const HeroCodeSnippet = () => {
    const router = useRouter();
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll terminal to bottom when history grows
    useEffect(() => {
        const el = scrollerRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [history.length]);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const submitCommand = () => {
        const result = runCommand(inputValue);
        if (result.clear) {
            setHistory([]);
        } else {
            setHistory((prev) => [
                ...prev,
                { cmd: inputValue, output: result.output },
            ]);
        }
        setInputValue("");
        setHistoryIdx(-1);
        if (result.navigateTo) {
            window.setTimeout(() => {
                router.push(result.navigateTo as string);
            }, 700);
        }
    };

    const navigateHistory = (direction: "up" | "down") => {
        const commands = history.map((h) => h.cmd).filter((c) => c.length > 0);
        if (direction === "up") {
            if (commands.length === 0) return;
            const next = Math.min(historyIdx + 1, commands.length - 1);
            setHistoryIdx(next);
            setInputValue(commands[commands.length - 1 - next] ?? "");
            return;
        }
        if (historyIdx <= 0) {
            setHistoryIdx(-1);
            setInputValue("");
            return;
        }
        const next = historyIdx - 1;
        setHistoryIdx(next);
        setInputValue(commands[commands.length - 1 - next] ?? "");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitCommand();
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            navigateHistory("up");
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            navigateHistory("down");
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
            e.preventDefault();
            setHistory([]);
            return;
        }
        if (e.key === "Escape") {
            inputRef.current?.blur();
        }
    };

    return (
        <section className="dark-section tw-bg-navy tw-py-20 md:tw-py-[120px]">
            <div className="tw-container">
                <SectionTitle
                    color="C"
                    align="center"
                    subtitle="What you'll ship"
                    title="Real code, real engineers."
                    titleSize="large"
                    className="tw-mb-12 md:tw-mb-16"
                />

                <div className="tw-mx-auto tw-max-w-[860px]">
                    <div className="tw-overflow-hidden tw-border tw-border-[rgba(185,214,242,0.08)] tw-shadow-2xl">
                        {/* Terminal title bar */}
                        <div
                            className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2 tw-border-b tw-border-[rgba(185,214,242,0.08)] tw-bg-[#061a40] tw-px-5 tw-py-3"
                            style={{ ...monoLabel, color: "rgba(185, 214, 242, 0.65)" }}
                        >
                            <span>vwc-engineer — train.ts — zsh</span>
                            <span className="tw-flex tw-items-center tw-gap-2">
                                <span
                                    className="tw-inline-block tw-h-[6px] tw-w-[6px] tw-rounded-full tw-bg-gold"
                                    style={{
                                        animation:
                                            "pulse-soft 2.4s ease-in-out infinite",
                                    }}
                                />
                                <span>since 2014 · live</span>
                            </span>
                        </div>

                        {/* Clickable terminal body — focuses input on desktop */}
                        <div
                            ref={scrollerRef}
                            className="tw-max-h-[60vh] tw-overflow-y-auto tw-bg-[#0a1f40] md:tw-cursor-text"
                            onClick={focusInput}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    focusInput();
                                }
                            }}
                            role="button"
                            tabIndex={-1}
                            aria-label="Interactive terminal — desktop only"
                        >
                            <pre
                                className="tw-overflow-x-auto tw-px-6 tw-py-7 md:tw-px-9 md:tw-py-9"
                                style={{ ...codeBody, color: IDENT }}
                            >
                                <code>
                                    {/* Static demo: cat train.ts output */}
                                    <span style={{ color: PROMPT }}>❯</span>
                                    {` cat train.ts\n\n`}
                                    <span
                                        style={{ color: COMMENT }}
                                    >{`// vetswhocode.io\n// engineers, not students.\n\n`}</span>
                                    <span style={{ color: KEYWORD }}>const</span>
                                    {` train = (veteran: `}
                                    <span style={{ color: TYPE }}>Veteran</span>
                                    {`) =>\n  hashflagStack\n    `}
                                    <span style={{ color: PUNCT }}>.</span>
                                    <span style={{ color: METHOD }}>deploy</span>
                                    <span style={{ color: PUNCT }}>(</span>
                                    veteran
                                    <span style={{ color: PUNCT }}>)</span>
                                    {`\n    `}
                                    <span style={{ color: PUNCT }}>.</span>
                                    <span style={{ color: METHOD }}>ship</span>
                                    <span style={{ color: PUNCT }}>(</span>
                                    realProduct
                                    <span style={{ color: PUNCT }}>)</span>
                                    {`\n    `}
                                    <span style={{ color: PUNCT }}>.</span>
                                    <span style={{ color: METHOD }}>hire</span>
                                    <span style={{ color: PUNCT }}>();</span>
                                    {`\n\n`}
                                    <span
                                        style={{ color: COMMENT }}
                                    >{`// 300+ deployed · $20M+ collective earnings · <1% acceptance`}</span>

                                    {/* Command history */}
                                    {history.map((entry, i) => (
                                        <span
                                            // biome-ignore lint/suspicious/noArrayIndexKey: history is append-only and never reordered
                                            key={i}
                                        >
                                            {`\n\n`}
                                            <span style={{ color: PROMPT }}>
                                                ❯
                                            </span>
                                            {` ${entry.cmd}`}
                                            {entry.output.length > 0 &&
                                                `\n${entry.output.join("\n")}`}
                                        </span>
                                    ))}

                                    {/* Mobile: static prompt + cursor (read-only) */}
                                    <span className="md:tw-hidden">
                                        {`\n\n`}
                                        <span style={{ color: PROMPT }}>❯</span>
                                        {` `}
                                        <span
                                            className={styles.cursor}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    {/* Desktop: live input */}
                                    <span className="tw-hidden md:tw-inline">
                                        {`\n\n`}
                                        <span style={{ color: PROMPT }}>❯</span>
                                        {` `}
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) =>
                                                setInputValue(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            spellCheck={false}
                                            autoComplete="off"
                                            autoCapitalize="off"
                                            autoCorrect="off"
                                            aria-label="Terminal command input"
                                            className="tw-w-[60%] tw-border-0 tw-bg-transparent tw-p-0 tw-outline-none focus:tw-outline-none focus:tw-ring-0"
                                            style={{
                                                font: "inherit",
                                                color: "inherit",
                                                caretColor: IDENT,
                                            }}
                                        />
                                        {!isFocused && (
                                            <span
                                                className={styles.cursor}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </span>
                                </code>
                            </pre>
                        </div>

                        {/* Status bar — shifts hints when interactive */}
                        <div
                            className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2 tw-border-t tw-border-[rgba(185,214,242,0.08)] tw-bg-[#061a40] tw-px-5 tw-py-2.5"
                            style={{
                                ...monoLabel,
                                fontSize: "10px",
                                color: HINT,
                            }}
                        >
                            <span>Ln 12 · TypeScript</span>
                            <span className="tw-hidden md:tw-inline">
                                {isFocused
                                    ? "↑↓ history · esc to defocus · ⌘L clear"
                                    : "click to type · try 'help'"}
                            </span>
                            <span className="md:tw-hidden">
                                LF · UTF-8 · spaces:2
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroCodeSnippet;
