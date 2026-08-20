import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "next-auth";

const accountFindUnique = vi.fn();

vi.mock("@/lib/prisma", () => ({
    default: {
        account: {
            findUnique: (...args: unknown[]) => accountFindUnique(...args),
        },
        user: {
            findUnique: vi.fn(),
        },
    },
}));

vi.mock("@/lib/ensure-troop", () => ({
    ensureTroop: vi.fn(),
}));

const originalFetch = global.fetch;

describe("GitHub signIn callback", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        process.env.GITHUB_ORG = "Vets-Who-Code";
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("does not fetch GitHub profile data for an existing account", async () => {
        accountFindUnique.mockResolvedValue({
            userId: "user-1",
            provider: "github",
            providerAccountId: "123",
        });

        vi.mocked(global.fetch).mockResolvedValueOnce(
            new Response(null, { status: 204 })
        );

        const { options } = await import("@/pages/api/auth/options");

        const signIn = options.callbacks?.signIn;

        const user = {
            id: "user-1",
            name: "Existing User",
            email: "existing@example.com",
            image: null,
        };

        const result = await signIn?.({
            user,
            account: {
                provider: "github",
                type: "oauth",
                providerAccountId: "123",
                access_token: "token",
            },
            profile: {
                login: "existing-user",
            } as unknown as Profile,
            email: undefined,
            credentials: undefined,
        });

        expect(result).toBe(true);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("fetches and maps GitHub profile data on first sign-in", async () => {
        accountFindUnique.mockResolvedValue(null);

        vi.mocked(global.fetch)
            .mockResolvedValueOnce(new Response(null, { status: 204 }))
            .mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        name: "New Veteran",
                        email: "new@example.com",
                        avatar_url: "https://avatars.githubusercontent.com/u/123",
                        bio: "Software engineer",
                        location: "Atlanta, GA",
                        html_url: "https://github.com/new-veteran",
                    }),
                    {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
            );

        const { options } = await import("@/pages/api/auth/options");

        const signIn = options.callbacks?.signIn;

        const user = {
            id: "user-2",
            name: null,
            email: "fallback@example.com",
            image: null,
        };

        const result = await signIn?.({
            user,
            account: {
                provider: "github",
                type: "oauth",
                providerAccountId: "456",
                access_token: "token",
            },
            profile: {
                login: "new-veteran",
            } as unknown as Profile,
            email: undefined,
            credentials: undefined,
        });

        expect(result).toBe(true);
        expect(global.fetch).toHaveBeenCalledTimes(2);

        expect(user).toEqual(
            expect.objectContaining({
                name: "New Veteran",
                email: "new@example.com",
                image: "https://avatars.githubusercontent.com/u/123",
                bio: "Software engineer",
                location: "Atlanta, GA",
                githubUrl: "https://github.com/new-veteran",
            })
        );
    });

    it("preserves the existing email when GitHub email is null", async () => {
        accountFindUnique.mockResolvedValue(null);

        vi.mocked(global.fetch)
            .mockResolvedValueOnce(new Response(null, { status: 204 }))
            .mockResolvedValueOnce(
                new Response(
                    JSON.stringify({
                        name: "Private Email User",
                        email: null,
                        avatar_url: null,
                        bio: null,
                        location: null,
                        html_url: "https://github.com/private-user",
                    }),
                    {
                        status: 200,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
            );

        const { options } = await import("@/pages/api/auth/options");

        const signIn = options.callbacks?.signIn;

        const user = {
            id: "user-3",
            name: null,
            email: "resolved@example.com",
            image: null,
        };

        const result = await signIn?.({
            user,
            account: {
                provider: "github",
                type: "oauth",
                providerAccountId: "789",
                access_token: "token",
            },
            profile: {
                login: "private-user",
            } as unknown as Profile,
            email: undefined,
            credentials: undefined,
        });

        expect(result).toBe(true);
        expect(user.email).toBe("resolved@example.com");
    });

    it("allows sign-in when GitHub profile API returns an error", async () => {
        accountFindUnique.mockResolvedValue(null);

        vi.mocked(global.fetch)
            .mockResolvedValueOnce(new Response(null, { status: 204 }))
            .mockResolvedValueOnce(new Response(null, { status: 429 }));

        const { options } = await import("@/pages/api/auth/options");

        const result = await options.callbacks?.signIn?.({
            user: {
                id: "user-4",
                name: null,
                email: "user@example.com",
                image: null,
            },
            account: {
                provider: "github",
                type: "oauth",
                providerAccountId: "111",
                access_token: "token",
            },
            profile: {
                login: "rate-limited-user",
            } as unknown as Profile,
            email: undefined,
            credentials: undefined,
        });

        expect(result).toBe(true);
    });

    it("allows sign-in when GitHub profile request throws", async () => {
        accountFindUnique.mockResolvedValue(null);

        vi.mocked(global.fetch)
            .mockResolvedValueOnce(new Response(null, { status: 204 }))
            .mockRejectedValueOnce(new Error("GitHub unavailable"));

        const { options } = await import("@/pages/api/auth/options");

        const result = await options.callbacks?.signIn?.({
            user: {
                id: "user-5",
                name: null,
                email: "user@example.com",
                image: null,
            },
            account: {
                provider: "github",
                type: "oauth",
                providerAccountId: "222",
                access_token: "token",
            },
            profile: {
                login: "network-error-user",
            } as unknown as Profile,
            email: undefined,
            credentials: undefined,
        });

        expect(result).toBe(true);
    });

    it("denies sign-in and skips profile lookup when user is not an organization member", async () => {
        vi.mocked(global.fetch).mockResolvedValueOnce(
            new Response(null, { status: 404 })
        );
    
        const { options } = await import("@/pages/api/auth/options");
    
        const result = await options.callbacks?.signIn?.({
            user: {
                id: "user-6",
                name: null,
                email: "outsider@example.com",
                image: null,
            },
            account: {
                provider: "github",
                type: "oauth",
                providerAccountId: "333",
                access_token: "token",
            },
            profile: {
                login: "not-a-member",
            } as unknown as Profile,
            email: undefined,
            credentials: undefined,
        });
    
        expect(result).toBe(false);
        expect(accountFindUnique).not.toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});
