// Types for menu structure
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

interface MegaMenuGroup {
    id: number;
    title: string;
    submenu: MenuItem[];
}

interface BannerSection {
    path: string;
    image: {
        src: string;
        alt?: string;
    };
}

interface MegaMenuItem extends MenuItem {
    megamenu?: (MegaMenuGroup | { id: number; title: string; banner: BannerSection })[];
}

type NavigationItem = SubMenuItem | MegaMenuItem;

const navigation: NavigationItem[] = [
    {
        id: 1,
        label: "Train",
        path: "#!",
        submenu: [
            {
                id: 11,
                label: "Start Your Mission",
                path: "/apply",
            },
            {
                id: 13,
                label: "FAQ",
                path: "/faq",
            },
        ],
    },
    {
        id: 2,
        label: "Build",
        path: "#!",
        submenu: [
            {
                id: 14,
                label: "Open Source Projects",
                path: "/projects",
            },
            {
                id: 15,
                label: "Subjects & Skills",
                path: "/subjects/all",
            },
        ],
    },
    {
        id: 3,
        label: "Lead",
        path: "#!",
        submenu: [
            {
                id: 16,
                label: "Become a Mentor",
                path: "/mentor",
            },
            {
                id: 17,
                label: "Donate",
                path: "/donate",
            },
            {
                id: 18,
                label: "Events",
                path: "/events",
            },
            {
                id: 19,
                label: "Stories",
                path: "/blogs/blog",
            },
            {
                id: 20,
                label: "Contact",
                path: "/contact-us",
            },
            {
                id: 21,
                label: "Shop",
                path: "https://hashflag.shop/",
                external: true,
            },
        ],
    },
];

export default navigation;
