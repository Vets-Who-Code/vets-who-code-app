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
    const handleFocusEvent = (e: React.FocusEvent<HTMLElement>) => {
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
                    const navId = `nav-${id}`;
                    const isOpen = focusId === navId;
                    // Hover reveal stays CSS; keyboard reveal is state. The closed and open
                    // token sets are exclusive because Tailwind's source order decides ties
                    // (tw-invisible is emitted after tw-visible and would always win).
                    const revealClass = clsx(
                        "group-hover:tw-pointer-events-auto group-hover:tw-visible group-hover:tw-mt-0 group-hover:tw-opacity-100",
                        isOpen
                            ? "tw-pointer-events-auto tw-visible tw-mt-0 tw-opacity-100"
                            : "tw-pointer-events-none tw-invisible tw-mt-5 tw-opacity-0"
                    );
                    // Escape must dismiss the submenu without moving focus (WCAG 1.4.13).
                    // Focus the trigger before clearing state: its onFocus fires
                    // synchronously and would otherwise reopen the submenu.
                    const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
                        if (e.key === "Escape" && hasSubmenu && isOpen) {
                            e.preventDefault();
                            document.getElementById(navId)?.focus();
                            setFocusId("");
                        }
                    };
                    return (
                        // biome-ignore lint/a11y/noNoninteractiveElementInteractions: only observes focus leaving the item's own links and Escape inside it; the <li> is not an interaction target
                        <li
                            key={id}
                            className={clsx(
                                "tw-group tw-inline-block tw-px-2.5 tw-py-[29px] 2xl:tw-px-[15px]",
                                submenu && "tw-relative"
                            )}
                            onBlur={handleBlurEvent}
                            onKeyDown={handleKeyDown}
                        >
                            <NavLink
                                id={navId}
                                path={path}
                                hoverStyle={hoverStyle}
                                color={color}
                                aria-expanded={hasSubmenu ? isOpen : undefined}
                                aria-controls={hasSubmenu ? `${navId}-submenu` : undefined}
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
                                    id={`${navId}-submenu`}
                                    menu={submenu}
                                    className={revealClass}
                                />
                            )}
                            {megamenu && (
                                <Megamenu
                                    id={`${navId}-submenu`}
                                    menu={megamenu}
                                    align={align}
                                    className={revealClass}
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
