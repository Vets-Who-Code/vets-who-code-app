import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function checkOrganizationMembership(userAccessToken) {
  try {
    const response = await octokit.request("GET /user/memberships/orgs", {
      headers: {
        authorization: `token ${userAccessToken}`,
      },
    });

    const isMember = response.data.some(
      (membership) =>
        membership.organization.login.toLowerCase() ===
        "vets-who-code".toLowerCase() &&
        membership.state === "active"
    );

    return isMember;
  } catch (error) {
    console.error("Error checking organization membership:", error);
    return false;
  }
}
