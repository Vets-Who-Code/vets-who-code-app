import clsx from "clsx";
import Link from "next/link";
import { type Facet, facetHref } from "@/lib/career-guide-facets";

interface Props {
    facet: Facet;
    page: number;
    totalPages: number;
    /** Current ?q/?rank/?sort, carried onto the page links */
    search: string;
}

const ITEM =
    "tw-border tw-px-3.5 tw-py-2 tw-font-mono tw-text-[11.5px] tw-uppercase tw-tabular-nums tw-tracking-[0.08em] tw-transition-colors";
const LINK = "tw-border-cream/[0.18] tw-text-[#DEE2E6] hover:tw-border-accent hover:tw-text-accent";

// Every page number is a plain link, so each page of a facet is one hop from its first page
// for crawlers. Not components/pagination/pagination-01: that builds ?page=N URLs, and these
// pages are prerendered at /page/N paths.
const Pagination = ({ facet, page, totalPages, search }: Props) => {
    if (totalPages < 2) return null;
    const href = (n: number) => `${facetHref(facet, n)}${search}`;

    return (
        <nav aria-label="Pagination" className="tw-flex tw-flex-wrap tw-justify-center tw-gap-2">
            {page > 1 && (
                <Link href={href(page - 1)} prefetch={false} className={clsx(ITEM, LINK)}>
                    <span aria-hidden={true}>←</span> Prev
                </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
                n === page ? (
                    <span
                        key={n}
                        aria-current="page"
                        className={clsx(ITEM, "tw-border-accent tw-bg-accent tw-text-secondary")}
                    >
                        {n}
                    </span>
                ) : (
                    <Link key={n} href={href(n)} prefetch={false} className={clsx(ITEM, LINK)}>
                        {n}
                    </Link>
                )
            )}
            {page < totalPages && (
                <Link href={href(page + 1)} prefetch={false} className={clsx(ITEM, LINK)}>
                    Next <span aria-hidden={true}>→</span>
                </Link>
            )}
        </nav>
    );
};

export default Pagination;
