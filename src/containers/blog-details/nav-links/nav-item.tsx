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
                "tw:group tw:relative tw:z-1 tw:flex tw:min-h-[120px] tw:items-center tw:justify-start tw:rounded-sm tw:bg-white tw:px-7.5 tw:py-5 tw:shadow-2xl tw:shadow-heading/10",
                variant === "next" && "tw:flex-row-reverse tw:text-right"
            )}
        >
            {image?.src && (
                <div className="tw:absolute tw:inset-0 tw:-z-1 tw:rounded-sm tw:opacity-0 tw:transition-opacity tw:duration-300 tw:before:absolute tw:before:inset-0 tw:before:rounded tw:before:bg-body-gradient tw:before:opacity-50 tw:before:content-[''] tw:group-hover:opacity-100">
                    <img
                        src={image.src}
                        alt={
                            image?.alt || variant === "prev" ? "Prev Navigation" : "Next Navigation"
                        }
                        className="tw:h-full tw:w-full tw:object-cover"
                    />
                </div>
            )}

            <i
                className={clsx(
                    "far fa-angle-left tw:text-2xl tw:text-primary tw:transition-colors tw:duration-300 tw:group-hover:text-white",
                    variant === "prev" && "tw:mr-4",
                    variant === "next" && "tw:ml-4 tw:rotate-180"
                )}
            />
            <h3 className="tw:mb-0 tw:text-h6 tw:leading-normal tw:transition-colors tw:duration-300 tw:group-hover:text-white tw:md:text-lg">
                {title}
            </h3>
        </Anchor>
    );
};

export default NavItem;
