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

interface MegaMenuColumn {
    id: number;
    title?: string;
    submenu?: MenuItem[];
}

interface SubMenuItem extends MenuItem {
    submenu?: MenuItem[];
    megamenu?: MegaMenuColumn[];
}

// Not a union with MenuItem — submenu/megamenu are already optional, so the
// union only hid those fields from callers.
type NavigationItem = SubMenuItem;

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
    // Signed-in destinations (Learn, Reps, Assessment, J0d!e, Profile) live in the
    // user/avatar menu (see src/components/user-menu), not the global top nav —
    // keeps the public nav lean and on one line.
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
        megamenu: [
            {
                id: 51,
                title: "Stay Current",
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
                ],
            },
            {
                id: 52,
                title: "Sharpen Skills",
                submenu: [
                    {
                        id: 705,
                        label: "Portfolio Checklist",
                        path: "/portfolio-checklist",
                    },
                    {
                        id: 706,
                        label: "Engineering Playbooks",
                        path: "https://vets-who-code.github.io/",
                        external: true,
                    },
                ],
            },
            {
                id: 53,
                title: "R&R",
                submenu: [
                    {
                        id: 704,
                        label: "Game",
                        path: "/game",
                    },
                ],
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

    return (
        items
            .filter(visible)
            .map((item) => {
                if ("submenu" in item && item.submenu) {
                    return { ...item, submenu: item.submenu.filter(visible) };
                }
                if ("megamenu" in item && item.megamenu) {
                    return {
                        ...item,
                        megamenu: item.megamenu
                            .map((col) => ({
                                ...col,
                                submenu: col.submenu?.filter(visible),
                            }))
                            // An empty column leaves a hole in the grid — drop it.
                            .filter((col) => col.submenu?.length),
                    };
                }
                return item;
            })
            // Drop parents whose submenu became empty after filtering — a parent
            // that hovers but reveals nothing is worse than a hidden parent.
            .filter((item) => {
                if ("submenu" in item && item.submenu && item.submenu.length === 0) return false;
                if ("megamenu" in item && item.megamenu && item.megamenu.length === 0) return false;
                return true;
            })
    );
}

export default navigation;
