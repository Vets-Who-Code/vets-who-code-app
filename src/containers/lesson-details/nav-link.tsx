import clsx from "clsx";
import Anchor from "@ui/anchor";

type TProps = {
    title: string;
    path: string;
    variant: "prev" | "next";
};

const NavLink = ({ title, path, variant }: TProps) => {
    return (
        <Anchor
            path={path}
            className={clsx(
                "tw-group tw-inline-flex tw-items-center tw-py-0.5 tw-px-5 tw-rounded tw-min-w-[150px] tw-min-h-[52px] tw-text-md tw-font-bold tw-bg-light-100 tw-text-body hover:tw-bg-primary hover:tw-text-white",
                variant === "prev" && "tw-text-right tw-flex-row-reverse",
                variant === "next" && "tw-ml-auto"
            )}
        >
            {title}
            <i
                className={clsx(
                    "far fa-angle-right tw-text-md tw-text-primary tw-transition-colors tw-duration-300 group-hover:tw-text-white",
                    variant === "next" && "tw-ml-10",
                    variant === "prev" && "tw-mr-10 tw-rotate-180"
                )}
            />
        </Anchor>
    );
};

export default NavLink;
