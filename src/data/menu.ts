type MenuStatus = "hot" | "coming soon" | "new";

interface MenuItem {
    id: number;
    label: string;
    path: string;
    external?: boolean;
    status?: MenuStatus;
    requiresAuth?: boolean;
    hideWhenAuth?: boolean;
}

interface SubMenuItem extends MenuItem {
    submenu?: MenuItem[];
}

type NavigationItem = SubMenuItem | MenuItem;

const navigation: NavigationItem[] = [
    {
        id: 1,
        label: "About",
        path: "#!",
        submenu: [
            {
                id: 101,
                label: "About Us",
                path: "/about-us",
            },
            {
                id: 105,
                label: "Theory of Change",
                path: "/theory-of-change",
            },
            {
                id: 106,
                label: "Team",
                path: "/team",
            },
            {
                id: 104,
                label: "Open Source Projects",
                path: "/projects",
            },
            {
                id: 103,
                label: "FAQ",
                path: "/faq",
            },
        ],
    },
    {
        id: 9,
        label: "Programs",
        path: "#!",
        submenu: [
            {
                id: 901,
                label: "Overview",
                path: "/programs",
            },
            {
                id: 902,
                label: "Core Curriculum",
                path: "/programs/core-curriculum",
            },
            {
                id: 903,
                label: "Mission-Ready",
                path: "/programs/mission-ready",
            },
            {
                id: 904,
                label: "Mentorship",
                path: "/programs/mentorship",
            },
            {
                id: 905,
                label: "Software Factory",
                path: "/programs/software-factory",
            },
        ],
    },
    {
        id: 12,
        label: "Join",
        path: "#!",
        submenu: [
            {
                id: 1201,
                label: "Apply",
                path: "/apply",
                hideWhenAuth: true,
            },
            {
                id: 1202,
                label: "Mentor",
                path: "/mentor",
                status: "hot",
            },
        ],
    },
    {
        id: 10,
        label: "My Cohort",
        path: "#!",
        requiresAuth: true,
        submenu: [
            {
                id: 1001,
                label: "Profile",
                path: "/profile",
            },
        ],
    },
    {
        id: 11,
        label: "Train",
        path: "#!",
        requiresAuth: true,
        submenu: [
            {
                id: 1101,
                label: "Reps",
                path: "/challenges",
                status: "new",
            },
            {
                id: 1102,
                label: "Assessment",
                path: "/assessment",
            },
            {
                id: 1103,
                label: "Subjects & Skills",
                path: "/subjects/all",
            },
            {
                id: 1104,
                label: "J0d!e",
                path: "/jodie",
            },
            {
                id: 1105,
                label: "Portfolio Checklist",
                path: "/portfolio-checklist",
            },
        ],
    },
    {
        id: 3,
        label: "Hire",
        path: "#!",
        submenu: [
            {
                id: 301,
                label: "Job Board",
                path: "/jobs",
                status: "new",
            },
            {
                id: 302,
                label: "Career Guides",
                path: "/career-guides",
            },
        ],
    },
    {
        id: 5,
        label: "Community",
        path: "#!",
        submenu: [
            {
                id: 701,
                label: "Events",
                path: "/events",
            },
            {
                id: 702,
                label: "Blog",
                path: "/blogs/blog",
            },
            {
                id: 703,
                label: "Media",
                path: "/media",
            },
            {
                id: 704,
                label: "Game",
                path: "/game",
            },
        ],
    },
    {
        id: 6,
        label: "Shop",
        path: "/store",
    },
    {
        id: 7,
        label: "Contact",
        path: "/contact-us",
    },
];

export function filterMenuByAuth(items: NavigationItem[], isAuthed: boolean): NavigationItem[] {
    const visible = (item: MenuItem) => {
        if (item.requiresAuth && !isAuthed) return false;
        if (item.hideWhenAuth && isAuthed) return false;
        return true;
    };

    return items
        .filter(visible)
        .map((item) => {
            if ("submenu" in item && item.submenu) {
                return { ...item, submenu: item.submenu.filter(visible) };
            }
            return item;
        })
        // Drop parents whose submenu became empty after filtering — a parent
        // that hovers but reveals nothing is worse than a hidden parent.
        .filter((item) => {
            if ("submenu" in item && item.submenu && item.submenu.length === 0) return false;
            return true;
        });
}

export default navigation;
