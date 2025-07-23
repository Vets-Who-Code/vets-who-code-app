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
                "tw:relative",
                align === "center" && "tw:mx-auto",
                align === "right" && "tw:ml-auto",
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
                                "tw:group tw:inline-block tw:px-2.5 tw:py-[29px] tw:2xl:px-[15px]",
                                submenu && "tw:relative"
                            )}
                            role="none"
                        >
                            <NavLink
                                id={`nav-${id}`}
                                path={path}
                                hoverStyle={hoverStyle}
                                color={color}
                                aria-haspopup={hasSubmenu ? true : undefined}
                                aria-expanded={hasSubmenu ? focusId === `nav-${id}` : undefined}
                                onFocus={handleFocusEvent}
                                onBlur={handleBlurEvent}
                            >
                                {label}
                                {hasSubmenu && (
                                    <i className="fa fa-chevron-down tw:ml-2 tw:text-xs" />
                                )}
                            </NavLink>
                            {submenu && (
                                <Submenu
                                    menu={submenu}
                                    className="tw:group-focus-within:pointer-events-auto tw:group-focus-within:visible tw:group-focus-within:mt-0 tw:group-focus-within:opacity-100 tw:group-hover:pointer-events-auto tw:group-hover:visible tw:group-hover:mt-0 tw:group-hover:opacity-100"
                                    role="menu"
                                />
                            )}
                            {megamenu && (
                                <Megamenu
                                    menu={megamenu}
                                    align={align}
                                    className="tw:group-focus-within:pointer-events-auto tw:group-focus-within:visible tw:group-focus-within:mt-0 tw:group-focus-within:opacity-100 tw:group-hover:pointer-events-auto tw:group-hover:visible tw:group-hover:mt-0 tw:group-hover:opacity-100"
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
