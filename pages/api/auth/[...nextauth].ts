import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { checkOrganizationMembership, checkGroupMembership } from "./membership-utils";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        const isMember = await checkOrganizationMembership(account.accessToken);
        if (!isMember) {
          return false; // Not a member of the organization
        }

        const isInStudentsGroup = await checkGroupMembership(account.accessToken, user.id);
        if (!isInStudentsGroup) {
          return false; // Not in the "students" group
        }
      }
      return true; // Sign in successful
    },
  },
});
