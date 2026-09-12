import { TMenu } from "@utils/types";
import clsx from "clsx";
import { useState } from "react";
import Megamenu from "./megamenu";
import NavLink from "./nav-link";
import Submenu from "./submenu";

type TProps = {
    className?: string;
    hoverStyle?: "A" | "B";
    color?: "light" | "dark";
    align?: "left" | "right" | "center";
    menu: TMenu[];
};

const MainMenu = ({ className, hoverStyle, menu, color, align }: TProps) => {
    const [focusId, setFocusId] = useState<string | number>("");
    const handleFocusEvent = (e: React.FocusEvent<HTMLAnchorElement>) => {
        setFocusId(e.target.id);
    };
    // On the <li>: collapse only when focus leaves the item and its submenu entirely.
    const handleBlurEvent = (e: React.FocusEvent<HTMLLIElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setFocusId("");
        }
    };

    return (
        <nav
            aria-label="Main Menu"
            className={clsx(
                "tw-relative",
                align === "center" && "tw-mx-auto",
                align === "right" && "tw-ml-auto",
                className
            )}
        >
            <ul aria-label="Main Menu">
                {menu.map(({ id, label, path, submenu, megamenu }) => {
                    const hasSubmenu = !!submenu || !!megamenu;
                    return (
                        // biome-ignore lint/a11y/noNoninteractiveElementInteractions: only observes focus leaving the item's own links; the <li> is not an interaction target
                        <li
                            key={id}
                            className={clsx(
                                "tw-group tw-inline-block tw-px-2.5 tw-py-[29px] 2xl:tw-px-[15px]",
                                submenu && "tw-relative"
                            )}
                            onBlur={handleBlurEvent}
                        >
                            <NavLink
                                id={`nav-${id}`}
                                path={path}
                                hoverStyle={hoverStyle}
                                color={color}
                                aria-expanded={hasSubmenu ? focusId === `nav-${id}` : undefined}
                                onFocus={handleFocusEvent}
                            >
                                {label}
                                {hasSubmenu && (
                                    <i
                                        className="fa fa-chevron-down tw-ml-2 tw-text-xs"
                                        aria-hidden="true"
                                    />
                                )}
                            </NavLink>
                            {submenu && (
                                <Submenu
                                    menu={submenu}
                                    className="group-focus-within:tw-pointer-events-auto group-focus-within:tw-visible group-focus-within:tw-mt-0 group-focus-within:tw-opacity-100 group-hover:tw-pointer-events-auto group-hover:tw-visible group-hover:tw-mt-0 group-hover:tw-opacity-100"
                                />
                            )}
                            {megamenu && (
                                <Megamenu
                                    menu={megamenu}
                                    align={align}
                                    className="group-focus-within:tw-pointer-events-auto group-focus-within:tw-visible group-focus-within:tw-mt-0 group-focus-within:tw-opacity-100 group-hover:tw-pointer-events-auto group-hover:tw-visible group-hover:tw-mt-0 group-hover:tw-opacity-100"
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

MainMenu.defaultProps = {
    color: "dark",
};

export default MainMenu;
