import { useScrollTop } from "@hooks";
import clsx from "clsx";

const ScrollToTop = () => {
    const { stick, onClickHandler } = useScrollTop();
    if (stick) {
        return (
            <button
                aria-label="Scroll to top"
                type="button"
                className="tw-group tw-fixed tw-bottom-15 tw-right-7.5 tw-z-50 tw-inline-flex tw-h-15 tw-w-15 tw-items-center tw-justify-center tw-overflow-hidden tw-rounded-full tw-bg-primary tw-p-0 tw-text-center tw-text-h3 tw-text-white tw-shadow-3xl tw-shadow-black/30"
                onClick={onClickHandler}
            >
                <i
                    className={clsx(
                        "fal fa-long-arrow-up",
                        "tw-transition-transorm tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-text-white tw-duration-300",
                        "group-hover:-tw-translate-y-20"
                    )}
                />
                <i
                    className={clsx(
                        "fal fa-long-arrow-up",
                        "tw-transition-transorm tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 tw-translate-y-20 tw-text-white tw-duration-300",
                        "group-hover:-tw-translate-y-1/2"
                    )}
                />
            </button>
        );
    }
    return null;
};

export default ScrollToTop;
