import clsx from "clsx";
import Anchor from "@ui/anchor";
import Badge from "@ui/badge";
import { TMegaMenu } from "@utils/types";

type TProps = {
    className?: string;
    menu: TMegaMenu[];
    isExpand: boolean;
};

const Megamenu = ({ menu, isExpand, className }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-py-[14px] tw-border-t tw-border-t-white/[.15]",
                className
            )}
        >
            {menu.map(({ id, title, submenu, banner }) => (
                <div key={id}>
                    <h2 className="tw-sr-only">{title}</h2>
                    {submenu && (
                        <ul>
                            {submenu?.map((nav) => (
                                <li key={nav.id} className="tw-relative">
                                    <Anchor
                                        path={nav.path}
                                        className={clsx(
                                            "tw-inline-block tw-text-base tw-font-medium tw-leading-normal tw-py-2.5 tw-text-white/[0.7] hover:tw-text-white",
                                            nav.status === "coming soon" &&
                                                "tw-pointer-events-none",
                                            className
                                        )}
                                        tabIndex={isExpand ? 0 : -1}
                                    >
                                        {nav.label}
                                        {nav.status && (
                                            <Badge
                                                color={
                                                    nav.status === "hot"
                                                        ? "gradient"
                                                        : "primary"
                                                }
                                                size="xs"
                                                className="tw-ml-2.5 tw-font-bold tw-tracking-wide tw-uppercase"
                                            >
                                                {nav.status}
                                            </Badge>
                                        )}
                                    </Anchor>
                                </li>
                            ))}
                        </ul>
                    )}
                    {banner && (
                        <Anchor path={banner.path} tabIndex={isExpand ? 0 : -1}>
                            {banner.image?.src && (
                                <img
                                    src={banner.image.src}
                                    alt={banner.image?.alt || "Banner"}
                                />
                            )}
                        </Anchor>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Megamenu;
