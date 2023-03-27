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

const Breadcrumb = ({
    className,
    pages,
    currentPage,
    showTitle,
    title,
}: TProps) => {
    return (
        <div
            className={clsx(
                "page-title-area tw-relative",
                showTitle &&
                    "tw-pt-15 tw-pb-10 md:tw-pt-20 md:tw-pb-15 lg:tw-pt-[100px] lg:tw-pb-20",
                !showTitle && "tw-pb-10 md:tw-pb-15 lg:tw-pb-20",
                className
            )}
        >
            {showTitle && (
                <div className="tw-container">
                    <h1 className="title tw-capitalize tw-mt-5 tw-mb-0 tw-text-3xl md:tw-text-4xl lg:tw-text-5xl tw-text-center">
                        {title || currentPage}
                    </h1>
                </div>
            )}
            {!showTitle && (
                <h1 className="tw-sr-only">{title || currentPage}</h1>
            )}

            <div
                className={clsx(
                    "page-breadcrumb tw-top-0 tw-left-0 tw-w-full",
                    showTitle && "tw-absolute"
                )}
            >
                <nav className="tw-container" aria-label="breadcrumbs">
                    <ul className="breadcrumb tw-flex tw-flex-wrap tw-py-3">
                        {pages.map(({ path, label }) => (
                            <li
                                key={label}
                                className="tw-text-md first:before:tw-hidden before:tw-content-['/'] before:tw-mx-3.8 before:tw-color-body"
                            >
                                <Anchor
                                    path={path}
                                    className="tw-text-body tw-capitalize tw-relative before:tw-absolute before:tw-content-[''] before:-tw-bottom-1.5 before:tw-right-0 before:tw-w-0 before:tw-h-px before:tw-transition-all before:tw-bg-heading hover:tw-text-heading hover:before:tw-left-0 hover:before:tw-w-full"
                                >
                                    {label}
                                </Anchor>
                            </li>
                        ))}

                        <li
                            className="tw-text-md tw-capitalize tw-text-heading first:before:tw-hidden before:tw-content-['/'] before:tw-mx-3.8 before:tw-color-body"
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
