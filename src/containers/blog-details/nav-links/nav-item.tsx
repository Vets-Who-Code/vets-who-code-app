import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IBlog } from "@utils/types";

type TProps = Pick<IBlog, "title" | "path" | "image"> & {
    variant: "prev" | "next";
};

const NavItem = ({ title, path, image, variant }: TProps) => {
    return (
        <Anchor
            path={path}
            rel={variant}
            className={clsx(
                "tw-relative tw-min-h-[120px] tw-z-1 tw-py-5 tw-px-7.5 tw-rounded tw-bg-white tw-shadow-2xl tw-shadow-heading/10 tw-flex tw-justify-start tw-items-center tw-group",
                variant === "next" && "tw-text-right tw-flex-row-reverse"
            )}
        >
            {image?.src && (
                <div className="tw-absolute -tw-z-1 tw-inset-0 tw-opacity-0 tw-rounded tw-transition-opacity tw-duration-300 before:tw-absolute before:tw-content-[''] before:tw-inset-0 before:tw-rounded before:tw-bg-bodyGradient before:tw-opacity-50 group-hover:tw-opacity-100">
                    <img
                        src={image.src}
                        alt={
                            image?.alt || variant === "prev"
                                ? "Prev Navigation"
                                : "Next Navigation"
                        }
                        className="tw-w-full tw-h-full tw-object-cover"
                    />
                </div>
            )}

            <i
                className={clsx(
                    "far fa-angle-left tw-text-2xl tw-text-primary tw-transition-colors tw-duration-300 group-hover:tw-text-white",
                    variant === "prev" && "tw-mr-4",
                    variant === "next" && "tw-ml-4 tw-rotate-180"
                )}
            />
            <h3 className="tw-mb-0 tw-text-h6 md:tw-text-lg tw-leading-normal tw-transition-colors tw-duration-300 group-hover:tw-text-white">
                {title}
            </h3>
        </Anchor>
    );
};

export default NavItem;
