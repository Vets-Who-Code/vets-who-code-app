type MenuStatus = "hot" | "coming soon" | "new";

interface MenuItem {
    id: number;
    label: string;
    path: string;
    external?: boolean;
    status?: MenuStatus;
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
                id: 102,
                label: "Subjects & Skills",
                path: "/subjects/all",
            },
            {
                id: 103,
                label: "FAQ",
                path: "/faq",
            },
            {
                id: 104,
                label: "Open Source Projects",
                path: "/projects",
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
                id: 107,
                label: "Military-Civilian Translator",
                path: "/resume-translator",
                status: "new",
            },
        ],
    },
    {
        id: 2,
        label: "Apply",
        path: "/apply",
    },
    {
        id: 3,
        label: "Jobs",
        path: "/jobs",
        status: "new",
    },
    {
        id: 4,
        label: "Mentor",
        path: "/mentor",
        status: "hot",
    },
    {
        id: 5,
        label: "Engage",
        path: "#!",
        submenu: [
            {
                id: 701,
                label: "Game",
                path: "/game",
            },
            {
                id: 702,
                label: "Events",
                path: "/events",
            },
            {
                id: 703,
                label: "Blog",
                path: "/blogs/blog",
            },
            {
                id: 704, // New ID for Media
                label: "Media",
                path: "/media",
            },
            {
                id: 705,
                label: "Portfolio Checklist",
                path: "/portfolio-checklist",
                status: "new",
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

export default navigation;
