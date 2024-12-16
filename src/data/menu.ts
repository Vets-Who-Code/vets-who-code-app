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
        label: "Home",
        path: "/",
    },
    {
        id: 2,
        label: "About",
        path: "#!",
        submenu: [
            {
                id: 21,
                label: "About Us",
                path: "/about-us",
            },
            {
                id: 22,
                label: "Subjects",
                path: "/subjects/all",
            },
            {
                id: 23,
                label: "FAQ",
                path: "/faq",
            },
        ],
    },
    {
        id: 3,
        label: "Apply",
        path: "#!",
        submenu: [
            {
                id: 31,
                label: "Become a Mentor",
                path: "/mentor",
            },
            {
                id: 32,
                label: "Apply to be a Student",
                path: "/apply",
                status: "new",
            },
        ],
    },
    {
        id: 4,
        label: "Blog",
        path: "/blogs/blog",
    },
    {
        id: 5,
        label: "Contact Us",
        path: "/contact-us",
    },
    {
        id: 6,
        label: "Support",
        path: "#!",
        submenu: [
            {
                id: 61,
                label: "Events",
                path: "/events",
            },
            {
                id: 62,
                label: "Shop",
                path: "https://hashflag.shop/",
                external: true,
            },
            {
                id: 63,
                label: "Donate",
                path: "/donate",
                status: "hot",
            },
        ],
    },
];

export default navigation;
