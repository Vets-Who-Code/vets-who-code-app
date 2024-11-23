import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "read:org",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ account }) {
            if (account?.provider === "github") {
                try {
                    const res = await fetch(
                        "https://api.github.com/user/orgs",
                        {
                            headers: {
                                Authorization: `Bearer ${account.access_token}`,
                            },
                        }
                    );

                    if (!res.ok) {
                        console.error(
                            `GitHub API returned an error: ${res.status} ${res.statusText}`
                        );
                        return false;
                    }

                    const orgs = await res.json();

                    if (!Array.isArray(orgs)) {
                        console.error("Unexpected GitHub API response:", orgs);
                        return false;
                    }

                    const isMember = orgs.some(
                        (org) => org.login === process.env.GITHUB_ORG
                    );

                    if (!isMember) {
                        console.log(
                            `Access denied: Not a member of the organization ${process.env.GITHUB_ORG}`
                        );
                        return false;
                    }
                } catch (error) {
                    console.error(
                        "Error fetching GitHub organizations:",
                        error
                    );
                    return false;
                }
            }

            return true;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (account && user) {
                token.id = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export default NextAuth(authOptions);
