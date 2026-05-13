import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = "vwc-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Returns the OS-level preference. Safe to call on the server (returns
 * `"light"` since `window` isn't available — the pre-paint inline script
 * in _document.tsx resolves the *real* value before first paint, so this
 * SSR default never reaches the screen).
 */
function getSystemPreference(): ResolvedTheme {
    if (typeof window === "undefined") return "light";
    return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function readStoredTheme(): Theme {
    if (typeof window === "undefined") return "system";
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === "light" || raw === "dark" || raw === "system") return raw;
    } catch {
        // Storage can throw under privacy modes / disabled cookies — fall through.
    }
    return "system";
}

function applyResolved(resolved: ResolvedTheme): void {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (resolved === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    // For native UI like form controls + scrollbars.
    root.style.colorScheme = resolved;
}

interface ThemeProviderProps {
    children: ReactNode;
    /** Default theme when nothing has been stored yet. Defaults to `"system"`. */
    defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = "system" }: ThemeProviderProps) {
    // SSR-safe initial values — the inline pre-paint script in _document.tsx
    // applies the *real* resolved theme to <html> before React hydrates, so
    // we don't need to compute it during render and risk a hydration mismatch.
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

    // Read stored preference on mount and reconcile with what the inline
    // script already applied.
    useEffect(() => {
        const stored = readStoredTheme();
        setThemeState(stored);
    }, []);

    // Resolve `theme` → `resolvedTheme`, write to <html>, and subscribe to
    // OS theme changes when in "system" mode.
    useEffect(() => {
        if (typeof window === "undefined") return undefined;

        const apply = () => {
            const next = theme === "system" ? getSystemPreference() : theme;
            setResolvedTheme(next);
            applyResolved(next);
        };

        apply();

        if (theme !== "system") return undefined;

        const mql = window.matchMedia(DARK_QUERY);
        const onChange = () => apply();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [theme]);

    const setTheme = useCallback((next: Theme) => {
        setThemeState(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Same reasoning as readStoredTheme — fall through silently.
        }
    }, []);

    const value = useMemo(
        () => ({ theme, resolvedTheme, setTheme }),
        [theme, resolvedTheme, setTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Read and update the active theme.
 *
 *   const { theme, resolvedTheme, setTheme } = useTheme();
 *
 * - `theme` is the user's stored preference (may be `"system"`).
 * - `resolvedTheme` is what's currently applied (`"light"` or `"dark"`).
 */
export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used within a <ThemeProvider>");
    }
    return ctx;
}

/**
 * IIFE injected into _document.tsx so the resolved theme is applied to
 * <html> before first paint. Without this, a dark-mode user sees a flash
 * of light content while React hydrates. Kept as a string so it can be
 * fed to `dangerouslySetInnerHTML`.
 *
 * The script is intentionally compact and side-effect-only — no
 * dependencies, no React, runs before anything else.
 */
export const THEME_PREPAINT_SCRIPT = `
(function () {
    try {
        var stored = localStorage.getItem('${STORAGE_KEY}');
        var theme = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'system';
        var resolved = theme === 'system'
            ? (window.matchMedia('${DARK_QUERY}').matches ? 'dark' : 'light')
            : theme;
        var root = document.documentElement;
        if (resolved === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
        root.style.colorScheme = resolved;
    } catch (e) {}
})();
`;
