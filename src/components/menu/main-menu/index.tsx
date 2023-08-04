import { useState } from "react";
import clsx from "clsx";
import { TMenu } from "@utils/types";
import NavLink from "./nav-link";
import Submenu from "./submenu";
import Megamenu from "./megamenu";

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
    const handleBlurEvent = (e: React.FocusEvent<HTMLAnchorElement>) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
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
            <ul aria-label="Main Menu" role="menubar">
                {menu.map(({ id, label, path, submenu, megamenu }) => {
                    const hasSubmenu = !!submenu || !!megamenu;
                    return (
                        <li
                            key={id}
                            className={clsx(
                                "tw-inline-block tw-px-2.5 2xl:tw-px-[17px] tw-py-[29px] tw-group",
                                submenu && "tw-relative"
                            )}
                            role="none"
                        >
                            <NavLink
                                id={`nav-${id}`}
                                path={path}
                                hoverStyle={hoverStyle}
                                color={color}
                                aria-haspopup={hasSubmenu ? true : undefined}
                                aria-expanded={
                                    hasSubmenu
                                        ? focusId === `nav-${id}`
                                        : undefined
                                }
                                onFocus={handleFocusEvent}
                                onBlur={handleBlurEvent}
                            >
                                {label}
                                {hasSubmenu && (
                                    <i className="fa fa-chevron-down tw-ml-2 tw-text-xs" />
                                )}
                            </NavLink>
                            {submenu && (
                                <Submenu
                                    menu={submenu}
                                    className="group-hover:tw-visible group-hover:tw-opacity-100 group-hover:tw-mt-0 group-hover:tw-pointer-events-auto group-focus-within:tw-visible group-focus-within:tw-opacity-100 group-focus-within:tw-mt-0 group-focus-within:tw-pointer-events-auto"
                                    role="menu"
                                />
                            )}
                            {megamenu && (
                                <Megamenu
                                    menu={megamenu}
                                    align={align}
                                    className="group-hover:tw-visible group-hover:tw-opacity-100 group-hover:tw-mt-0 group-hover:tw-pointer-events-auto group-focus-within:tw-visible group-focus-within:tw-opacity-100 group-focus-within:tw-mt-0 group-focus-within:tw-pointer-events-auto"
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
