import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "read:org",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ account }) {
            if (account.provider === "github") {
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

            return true; // Allow login
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user, account }) {
            if (account) {
                token.id = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
