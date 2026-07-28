import { act, render, renderHook } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";

const STORAGE_KEY = "vwc-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

type MediaListener = (event: MediaQueryListEvent) => void;

interface MockMediaQueryList {
    matches: boolean;
    media: string;
    addEventListener: (type: "change", listener: MediaListener) => void;
    removeEventListener: (type: "change", listener: MediaListener) => void;
    dispatchOSChange: (matches: boolean) => void;
}

function installMatchMediaMock(initialMatches: boolean): MockMediaQueryList {
    const listeners = new Set<MediaListener>();

    const mql: MockMediaQueryList = {
        matches: initialMatches,
        media: DARK_QUERY,
        addEventListener: (_type, listener) => {
            listeners.add(listener);
        },
        removeEventListener: (_type, listener) => {
            listeners.delete(listener);
        },
        dispatchOSChange: (matches: boolean) => {
            mql.matches = matches;
            for (const listener of listeners) {
                listener({ matches } as MediaQueryListEvent);
            }
        },
    };

    window.matchMedia = ((query: string) => {
        if (query !== DARK_QUERY) {
            return {
                matches: false,
                media: query,
                addEventListener: () => undefined,
                removeEventListener: () => undefined,
            } as unknown as MediaQueryList;
        }
        return mql as unknown as MediaQueryList;
    }) as typeof window.matchMedia;

    return mql;
}

beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
});

describe("ThemeProvider + useTheme", () => {
    it("defaults to system mode and resolves to OS preference", () => {
        installMatchMediaMock(true); // OS prefers dark

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        expect(result.current.theme).toBe("system");
        expect(result.current.resolvedTheme).toBe("dark");
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("reads stored preference on mount", () => {
        installMatchMediaMock(false);
        window.localStorage.setItem(STORAGE_KEY, "dark");

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        expect(result.current.theme).toBe("dark");
        expect(result.current.resolvedTheme).toBe("dark");
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("setTheme persists to localStorage and updates the html class", () => {
        installMatchMediaMock(false);

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        act(() => result.current.setTheme("dark"));

        expect(result.current.theme).toBe("dark");
        expect(result.current.resolvedTheme).toBe("dark");
        expect(window.localStorage.getItem(STORAGE_KEY)).toBe("dark");
        expect(document.documentElement.classList.contains("dark")).toBe(true);

        act(() => result.current.setTheme("light"));

        expect(result.current.resolvedTheme).toBe("light");
        expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("system mode flips live when OS theme changes", () => {
        const mql = installMatchMediaMock(false);

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        expect(result.current.resolvedTheme).toBe("light");

        act(() => mql.dispatchOSChange(true));

        expect(result.current.resolvedTheme).toBe("dark");
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("setTheme to explicit value stops live OS sync", () => {
        const mql = installMatchMediaMock(false);

        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });

        act(() => result.current.setTheme("light"));
        act(() => mql.dispatchOSChange(true));

        expect(result.current.theme).toBe("light");
        expect(result.current.resolvedTheme).toBe("light");
    });

    it("throws when useTheme is called outside the provider", () => {
        const Consumer = () => {
            useTheme();
            return null;
        };
        const original = console.error;
        console.error = () => undefined; // silence React's error boundary log
        try {
            expect(() => render(<Consumer />)).toThrow(
                /useTheme must be used within a <ThemeProvider>/
            );
        } finally {
            console.error = original;
        }
    });
});
