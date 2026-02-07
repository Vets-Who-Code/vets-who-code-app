import clsx from "clsx";
import { useRouter } from "next/router";

type TProps = {
    numberOfPages: number;
    currentPage: number;
    className?: string;
};

const Pagination = ({ numberOfPages, currentPage, className }: TProps) => {
    const router = useRouter();
    const isFirst = currentPage === 1;
    const isLast = currentPage === numberOfPages;
    const previousPage = currentPage - 1 === 1 ? `` : `${(currentPage - 1).toString()}`;
    const nextPage = `${(currentPage + 1).toString()}`;

    const pagiHandler = (curPage: string) => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    page: curPage,
                },
            },
            undefined,
            { scroll: true }
        );
    };

    return (
        <nav aria-label="Page navigation">
            <ul className={clsx("pagination tw-text-center tw-text-[16px]", className)}>
                <li className="tw-inline-block tw-px-[5px]">
                    <button
                        type="button"
                        className={clsx(
                            "tw-block tw-h-12 tw-w-12 tw-rounded-full tw-text-center tw-font-extrabold tw-uppercase tw-leading-[48px] -tw-tracking-tightest tw-text-gray-400 hover:tw-text-heading",
                            isFirst && "tw-pointer-events-none tw-opacity-50"
                        )}
                        onClick={() => pagiHandler(previousPage)}
                    >
                        Prev
                    </button>
                </li>
                {Array.from({ length: numberOfPages }, (_, i) => (
                    <li className="tw-inline-block tw-px-[5px]" key={`page-number-${i + 1}`}>
                        <button
                            type="button"
                            className={clsx(
                                "tw-block tw-h-12 tw-w-12 tw-rounded-full tw-text-center tw-font-extrabold tw-uppercase tw-leading-[48px] -tw-tracking-tightest hover:tw-text-heading",
                                currentPage !== i + 1 && "tw-text-gray-400",
                                currentPage === i + 1 &&
                                    "tw-pointer-events-none tw-bg-gray-50 tw-text-heading"
                            )}
                            onClick={() => pagiHandler(`${i + 1}`)}
                        >
                            {i + 1}{" "}
                            {i + 1 === currentPage && <span className="tw-sr-only">Current</span>}
                        </button>
                    </li>
                ))}
                <li className="tw-inline-block tw-px-[5px]">
                    <button
                        type="button"
                        className={clsx(
                            "tw-block tw-h-12 tw-w-12 tw-rounded-full tw-text-center tw-font-extrabold tw-uppercase tw-leading-[48px] -tw-tracking-tightest tw-text-gray-400 hover:tw-text-heading",
                            isLast && "tw-pointer-events-none tw-opacity-50"
                        )}
                        onClick={() => pagiHandler(nextPage)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
