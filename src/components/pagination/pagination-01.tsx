import Anchor from "@ui/anchor";
import clsx from "clsx";

type TProps = {
    currentPage: number;
    numberOfPages: number;
    rootPage?: string;
    className?: string;
};

const Pagination = ({
    currentPage,
    numberOfPages,
    rootPage = "blog",
    className,
}: TProps) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numberOfPages;
    const previousPage =
        currentPage - 1 === 1
            ? `/${rootPage}`
            : `/${rootPage}/page/${(currentPage - 1).toString()}`;
    const nextPage = `/${rootPage}/page/${(currentPage + 1).toString()}`;

    let showPagi: (string | number)[] = [];
    Array.from({ length: numberOfPages }, () => {
        const prev = currentPage - 1;
        const next = currentPage + 1;
        switch (true) {
            case numberOfPages === 1:
                break;
            case numberOfPages <= 4:
                showPagi = [
                    ...Array.from({ length: numberOfPages }, (_, i) => i + 1),
                ];
                break;
            case currentPage === 1:
                showPagi = [1, next, "dots", numberOfPages];
                break;
            case currentPage === numberOfPages:
                showPagi = [1, "dots", prev, numberOfPages];
                break;
            case prev === 1:
                showPagi = [1, currentPage, next, "dots", numberOfPages];
                break;
            case next === numberOfPages:
                showPagi = [1, "dots", currentPage, numberOfPages];
                break;
            case currentPage === 3:
                showPagi = [1, prev, currentPage, next, "dots", numberOfPages];
                break;
            case currentPage === numberOfPages - 1:
                showPagi = [1, "dots", prev, numberOfPages - 1, numberOfPages];
                break;
            default:
                showPagi = [
                    1,
                    "dots",
                    prev,
                    currentPage,
                    next,
                    "dots",
                    numberOfPages,
                ];
        }
        return null;
    });
    return (
        <nav aria-label="Page navigation">
            <ul
                className={clsx(
                    "pagination tw-font-extrabold tw-uppercase tw-text-[16px] tw-text-center",
                    className
                )}
            >
                {!isFirst && (
                    <li className="tw-inline-block tw-px-[5px]">
                        <Anchor
                            className="tw-block tw-text-center tw-w-12 tw-h-12 tw-leading-[48px] tw-rounded-full tw-text-gray-400 -tw-tracking-tightest hover:tw-text-heading"
                            path={previousPage}
                        >
                            Prev
                        </Anchor>
                    </li>
                )}

                {showPagi.map((pagi) => (
                    <li
                        className="tw-inline-block tw-px-[5px]"
                        key={`page-number-${pagi}`}
                    >
                        {pagi === "dots" && <span>...</span>}
                        {pagi !== "dots" && (
                            <Anchor
                                className={clsx(
                                    "tw-block tw-text-center tw-w-12 tw-h-12 tw-leading-[48px] tw-rounded-full -tw-tracking-tightest hover:tw-text-heading",
                                    currentPage !== pagi && "tw-text-gray-400",
                                    currentPage === pagi &&
                                        "tw-pointer-events-none tw-bg-gray-500 tw-text-heading"
                                )}
                                path={`${
                                    pagi === 1
                                        ? `/${rootPage}`
                                        : `/${rootPage}/page/${pagi}`
                                }`}
                            >
                                {pagi}{" "}
                                {pagi === currentPage && (
                                    <span className="tw-sr-only">Current</span>
                                )}
                            </Anchor>
                        )}
                    </li>
                ))}
                {!isLast && (
                    <li className="tw-inline-block tw-px-[5px]">
                        <Anchor
                            className="tw-block tw-text-center tw-w-12 tw-h-12 tw-leading-[48px] tw-rounded-full tw-text-gray-400 -tw-tracking-tightest hover:tw-text-heading"
                            path={nextPage}
                        >
                            Next
                        </Anchor>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
