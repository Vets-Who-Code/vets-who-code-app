import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function checkGroupMembership(userAccessToken, userId) {
  try {
    const orgs = await octokit.request("GET /user/orgs", {
      headers: {
        authorization: `token ${userAccessToken}`,
      },
    });

    const vetsWhoCodeOrg = orgs.data.find(org => org.login === "Vets-Who-Code");

    if (!vetsWhoCodeOrg) {
      return false; // User is not part of the Vets Who Code organization
    }

    const teams = await octokit.request("GET /orgs/{org}/teams", {
      org: vetsWhoCodeOrg.login,
      headers: {
        authorization: `token ${userAccessToken}`,
      },
    });

    const studentsTeam = teams.data.find(team => team.name === "students");

    if (!studentsTeam) {
      return false; // "students" team does not exist within the organization
    }

    const membership = await octokit.request("GET /orgs/{org}/teams/{team_slug}/memberships/{username}", {
      org: vetsWhoCodeOrg.login,
      team_slug: studentsTeam.slug,
      username: userId,
      headers: {
        authorization: `token ${userAccessToken}`,
      },
    });

    return membership.data.state === "active";
  } catch (error) {
    console.error("Error checking group membership:", error);
    return false;
  }
}
