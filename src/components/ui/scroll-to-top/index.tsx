import clsx from "clsx";
import { useScrollTop } from "@hooks";

const ScrollToTop = () => {
    const { stick, onClickHandler } = useScrollTop();
    if (stick) {
        return (
            <button
                aria-label="Scroll to top"
                type="button"
                className="tw-group tw-overflow-hidden tw-fixed tw-right-7.5 tw-bottom-15 tw-z-50 tw-shadow-3xl tw-shadow-black/30 tw-p-0 tw-w-15 tw-h-15 tw-rounded-full tw-text-center tw-text-h3 tw-inline-flex tw-justify-center tw-items-center tw-bg-primary tw-text-white"
                onClick={onClickHandler}
            >
                <i
                    className={clsx(
                        "fal fa-long-arrow-up",
                        "tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-text-white tw-transition-transorm tw-duration-300",
                        "group-hover:-tw-translate-y-20"
                    )}
                />
                <i
                    className={clsx(
                        "fal fa-long-arrow-up",
                        "tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 tw-translate-y-20 tw-text-white tw-transition-transorm tw-duration-300",
                        "group-hover:-tw-translate-y-1/2"
                    )}
                />
            </button>
        );
    }
    return null;
};

export default ScrollToTop;
