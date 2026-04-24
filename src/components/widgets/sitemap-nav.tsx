import Anchor from "@ui/anchor";
import clsx from "clsx";
import WidgetTitle from "./widget-title";

type Link = { label: string; path: string };
type Column = { heading: string; links: Link[] };

const columns: Column[] = [
    {
        heading: "Program",
        links: [
            { label: "About", path: "/about-us" },
            { label: "Theory of Change", path: "/theory-of-change" },
            { label: "Apply", path: "/apply" },
            { label: "FAQ", path: "/faq" },
        ],
    },
    {
        heading: "Get Involved",
        links: [
            { label: "Become a Mentor", path: "/mentor" },
            { label: "Donate", path: "/donate" },
            { label: "Hire Our Troops", path: "/jobs" },
            { label: "Sponsors", path: "/sponsors" },
        ],
    },
    {
        heading: "Learn",
        links: [
            { label: "Blog", path: "/blogs/blog" },
            { label: "Subjects", path: "/subjects/all" },
            { label: "Projects", path: "/projects" },
        ],
    },
    {
        heading: "Company",
        links: [
            { label: "Team", path: "/team" },
            { label: "Events", path: "/events" },
            { label: "Press", path: "/media" },
            { label: "Contact", path: "/contact-us" },
            { label: "Code of Conduct", path: "/code-of-conduct" },
        ],
    },
];

type TProps = {
    className?: string;
    mode?: "light" | "dark";
};

const SitemapNav = ({ className, mode }: TProps) => {
    return (
        <nav
            aria-label="Footer sitemap"
            className={clsx("tw-grid tw-grid-cols-2 tw-gap-8 md:tw-grid-cols-4", className)}
        >
            {columns.map((column) => (
                <div key={column.heading}>
                    <WidgetTitle mode={mode}>{column.heading}</WidgetTitle>
                    <ul
                        className={clsx(
                            "tw-text-md tw-font-medium",
                            mode === "dark" && "tw-text-gray-400"
                        )}
                    >
                        {column.links.map((link) => (
                            <li key={link.path} className="tw-mb-[11px]">
                                <Anchor path={link.path}>{link.label}</Anchor>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
};

export default SitemapNav;
