import { sitemapColumns } from "@data/sitemap-links";
import Anchor from "@ui/anchor";
import clsx from "clsx";
import WidgetTitle from "./widget-title";

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
            {sitemapColumns.map((column) => (
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
