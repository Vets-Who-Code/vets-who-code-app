// GitHub API data types

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    updated_at: string;
    pushed_at: string;
    fork: boolean;
}

export interface GitHubEvent {
    id: string;
    type: string;
    repo: { name: string };
    created_at: string;
    payload: {
        action?: string;
        ref?: string;
        ref_type?: string;
        commits?: { message: string }[];
    };
}

export interface GitHubProfileData {
    login: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    html_url: string;
    avatar_url: string;
}

export interface LanguageBreakdownEntry {
    language: string;
    percentage: number;
    color: string;
}

export interface GitHubData {
    profile: GitHubProfileData;
    repos: GitHubRepo[];
    languages: LanguageBreakdownEntry[];
    events: GitHubEvent[];
    stats: {
        totalStars: number;
        totalForks: number;
        accountAgeDays: number;
        topLanguage: string | null;
    };
}

// Learning stats types

export interface EnrollmentData {
    id: string;
    courseTitle: string;
    courseCategory: string;
    progress: number;
    status: string;
    enrolledAt: string;
    lastActivity: string;
}

export interface CertificateData {
    id: string;
    courseTitle: string;
    certificateNumber: string | null;
    issuedAt: string;
}

export interface RecentLessonActivity {
    lessonTitle: string;
    moduleTitle: string;
    courseTitle: string;
    completedAt: string | null;
    timeSpent: number;
}

export interface LearningStatsData {
    enrollments: EnrollmentData[];
    completedLessons: number;
    totalTimeSpent: number;
    certificates: CertificateData[];
    recentActivity: RecentLessonActivity[];
}

// Profile form types

export interface ProfileFormData {
    name: string;
    bio: string;
    title: string;
    location: string;
    githubUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
    branch: string;
    rank: string;
    yearsServed: string;
    mos: string;
}

// Component prop types

export interface ProfileUser {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
}

export type ProfileTab =
    | "command-center"
    | "arsenal"
    | "ops-log"
    | "service-record"
    | "training"
    | "settings";

export interface ProfileTabDef {
    id: ProfileTab;
    label: string;
    icon: string;
}

export const PROFILE_TABS: ProfileTabDef[] = [
    { id: "command-center", label: "Command Center", icon: "fas fa-tachometer-alt" },
    { id: "arsenal", label: "Arsenal", icon: "fas fa-tools" },
    { id: "ops-log", label: "Ops Log", icon: "fas fa-clipboard-list" },
    { id: "service-record", label: "Service Record", icon: "fas fa-medal" },
    { id: "training", label: "Training", icon: "fas fa-graduation-cap" },
    { id: "settings", label: "Settings", icon: "fas fa-cog" },
];

// GitHub language colors (subset of common languages)
export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    PHP: "#4F5D95",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#178600",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    Vue: "#41b883",
    Svelte: "#ff3e00",
    SCSS: "#c6538c",
};
