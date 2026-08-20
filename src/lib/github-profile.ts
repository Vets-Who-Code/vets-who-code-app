export type GitHubProfileData = {
    name: string | null;
    email: string | null;
    avatar_url: string | null;
    bio: string | null;
    location: string | null;
    html_url: string;
};

export const mapGitHubProfileToUser = (profile: GitHubProfileData) => ({
    name: profile.name,
    email: profile.email,
    image: profile.avatar_url,
    bio: profile.bio,
    location: profile.location,
    githubUrl: profile.html_url,
});
