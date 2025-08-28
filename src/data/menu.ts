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
        ],
    },
    {
        id: 2,
        label: "Apply",
        path: "/apply",
    },
    {
        id: 3,
        label: "Mentor",
        path: "/mentor",
        status: "hot",
    },
    {
        id: 4,
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
                id: 705, // Existing Shop, ID adjusted (was 704)
                label: "Shop",
                path: "https://hashflag.shop/",
                external: true,
            },
        ],
    },
    {
        id: 5,
        label: "Contact",
        path: "/contact-us",
    },
    {
        id: 6,
        label: "Donate",
        path: "/donate",
    },
];

export default navigation;
