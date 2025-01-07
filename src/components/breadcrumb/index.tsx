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
                "page-title-area tw-relative",
                showTitle &&
                    "tw-pb-10 tw-pt-15 md:tw-pb-15 md:tw-pt-20 lg:tw-pb-20 lg:tw-pt-[100px]",
                !showTitle && "tw-pb-10 md:tw-pb-15 lg:tw-pb-20",
                className
            )}
        >
            {showTitle && (
                <div className="tw-container">
                    <h1 className="title tw-mb-0 tw-mt-5 tw-text-center tw-text-3xl tw-capitalize md:tw-text-4xl lg:tw-text-5xl">
                        {title || currentPage}
                    </h1>
                </div>
            )}
            {!showTitle && <h1 className="tw-sr-only">{title || currentPage}</h1>}

            <div
                className={clsx(
                    "page-breadcrumb tw-left-0 tw-top-0 tw-w-full",
                    showTitle && "tw-absolute"
                )}
            >
                <nav className="tw-container" aria-label="breadcrumbs">
                    <ul className="breadcrumb tw-flex tw-flex-wrap tw-py-3">
                        {pages.map(({ path, label }) => (
                            <li
                                key={label}
                                className="before:tw-color-body tw-text-md before:tw-mx-3.8 before:tw-content-['/'] first:before:tw-hidden"
                            >
                                <Anchor
                                    path={path}
                                    className="tw-relative tw-capitalize tw-text-body before:tw-absolute before:-tw-bottom-1.5 before:tw-right-0 before:tw-h-px before:tw-w-0 before:tw-bg-heading before:tw-transition-all before:tw-content-[''] hover:tw-text-heading hover:before:tw-left-0 hover:before:tw-w-full"
                                >
                                    {label}
                                </Anchor>
                            </li>
                        ))}

                        <li
                            className="before:tw-color-body tw-text-md tw-capitalize tw-text-heading before:tw-mx-3.8 before:tw-content-['/'] first:before:tw-hidden"
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
