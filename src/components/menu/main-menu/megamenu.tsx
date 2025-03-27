import { TMegaMenu } from "@utils/types";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import Badge from "@ui/badge";

type TProps = React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
    align?: "left" | "right" | "center";
    menu: TMegaMenu[];
};

const Megamenu = ({ className, align, menu, ...rest }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-invisible tw-absolute tw-top-full tw-z-20 tw-mt-5 tw-flex tw-w-[1170px] tw-flex-wrap tw-border-b-4 tw-border-b-primary tw-bg-white tw-px-3.8 tw-pb-[34px] tw-pt-7.5 tw-opacity-0 tw-shadow-2md tw-shadow-black/5 tw-transition-all tw-duration-300",
                align === "left" && "tw-left-0",
                align === "center" && "tw-left-1/2 -tw-translate-x-1/2",
                className
            )}
            {...rest}
        >
            {menu.map(({ id, title, submenu, banner }) => (
                <div
                    key={id}
                    className={clsx(
                        "tw-shrink-0 tw-grow-0 tw-px-3.8",
                        submenu && "tw-w-1/4 tw-basis-1/4",
                        banner && "tw-w-1/2 tw-basis-1/2"
                    )}
                >
                    <h2 className="tw-sr-only">{title}</h2>
                    {submenu && (
                        <ul>
                            {submenu?.map((nav) => (
                                <li key={nav.id} className="tw-relative">
                                    <Anchor
                                        path={nav.path}
                                        className={clsx(
                                            "tw-block tw-py-2 tw-font-medium tw-leading-relaxed hover:tw-text-heading",
                                            nav.status === "coming soon" && "tw-pointer-events-none"
                                        )}
                                    >
                                        {nav.label}
                                        {nav.status && (
                                            <Badge
                                                color={
                                                    nav.status === "hot" ? "gradient" : "primary"
                                                }
                                                size="xs"
                                                variant="contained"
                                                className="tw-ml-2.5 tw-font-bold tw-uppercase tw-tracking-wide"
                                            >
                                                {nav.status.toUpperCase()}
                                            </Badge>
                                        )}
                                    </Anchor>
                                </li>
                            ))}
                        </ul>
                    )}
                    {banner && (
                        <Anchor path={banner.path}>
                            {banner.image?.src && (
                                <img src={banner.image.src} alt={banner.image?.alt || "Banner"} />
                            )}
                        </Anchor>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Megamenu;
