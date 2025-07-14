import clsx from "clsx";
import Anchor from "@ui/anchor";

type TProps = {
    className?: string;
    pages: Array<{
        path: string;
        label: string;
    }>;
    currentPage: string;
    showTitle?: boolean;
    title?: string;
};

const Breadcrumb = ({ className, pages, currentPage, showTitle, title }: TProps) => {
    return (
        <div
            className={clsx(
                "page-title-area tw:relative",
                showTitle &&
                    "tw:pb-10 tw:pt-15 tw:md:pb-15 tw:md:pt-20 tw:lg:pb-20 tw:lg:pt-[100px]",
                !showTitle && "tw:pb-10 tw:md:pb-15 tw:lg:pb-20",
                className
            )}
        >
            {showTitle && (
                <div className="tw:container">
                    <h1 className="title tw:mb-0 tw:mt-5 tw:text-center tw:text-3xl tw:capitalize tw:md:text-4xl tw:lg:text-5xl">
                        {title || currentPage}
                    </h1>
                </div>
            )}
            {!showTitle && <h1 className="tw:sr-only">{title || currentPage}</h1>}

            <div
                className={clsx(
                    "page-breadcrumb tw:left-0 tw:top-0 tw:w-full",
                    showTitle && "tw:absolute"
                )}
            >
                <nav className="tw:container" aria-label="breadcrumbs">
                    <ul className="breadcrumb tw:flex tw:flex-wrap tw:py-3">
                        {pages.map(({ path, label }) => (
                            <li
                                key={label}
                                className="tw:before:color-body tw:text-md tw:before:mx-3.8 tw:before:content-['/'] tw:first:before:hidden"
                            >
                                <Anchor
                                    path={path}
                                    className="tw:relative tw:capitalize tw:text-body tw:before:absolute tw:before:-bottom-1.5 tw:before:right-0 tw:before:h-px tw:before:w-0 tw:before:bg-heading tw:before:transition-all tw:before:content-[''] tw:hover:text-heading tw:hover:before:left-0 tw:hover:before:w-full"
                                >
                                    {label}
                                </Anchor>
                            </li>
                        ))}

                        <li
                            className="tw:before:color-body tw:text-md tw:capitalize tw:text-heading tw:before:mx-3.8 tw:before:content-['/'] tw:first:before:hidden"
                            aria-current="page"
                        >
                            {currentPage}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

Breadcrumb.defaultProps = {
    showTitle: true,
};

export default Breadcrumb;
