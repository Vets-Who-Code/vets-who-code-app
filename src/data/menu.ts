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
        path: "/about-us",
    },
    {
        id: 2,
        label: "Train",
        path: "#!",
        submenu: [
            {
                id: 101,
                label: "Apply to Join",
                path: "/apply",
            },
            {
                id: 102,
                label: "FAQ",
                path: "/faq",
            },
        ],
    },
    {
        id: 3,
        label: "Build",
        path: "#!",
        submenu: [
            {
                id: 301,
                label: "Open Source Projects",
                path: "/projects",
            },
            {
                id: 302,
                label: "Subjects & Skills",
                path: "/subjects/all",
            },
        ],
    },
    {
        id: 4,
        label: "Lead",
        path: "#!",
        submenu: [
            {
                id: 401,
                label: "Become a Mentor",
                path: "/mentor",
                status: "hot",
            },
            {
                id: 402,
                label: "Events",
                path: "/events",
            },
            {
                id: 403,
                label: "Stories",
                path: "/blogs/blog",
            },
            {
                id: 404,
                label: "Contact",
                path: "/contact-us",
            },
            {
                id: 405,
                label: "Shop",
                path: "https://hashflag.shop/",
                external: true,
            },
        ],
    },
    {
        id: 5,
        label: "Donate",
        path: "/donate",
    },
];

export default navigation;
