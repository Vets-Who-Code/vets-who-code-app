import Logo from "@components/logo";
import Offcanvas from "@ui/offcanvas";
import OffcanvasBody from "@ui/offcanvas/body";
import OffcanvasHeader from "@ui/offcanvas/header";
import { TMenu } from "@utils/types";
import { motion } from "motion/react";
import { useState } from "react";
import ExpandButton from "./expand-button";
import Megamenu from "./megamenu";
import NavLink from "./nav-link";
import Submenu from "./submenu";

type TProps = {
    menu: TMenu[];
    onClose: () => void;
    isOpen: boolean;
};

const MobileMenu = ({ menu, onClose, isOpen }: TProps) => {
    const [expanded, setExpanded] = useState<false | number>(0);
    return (
        <Offcanvas isOpen={isOpen} onClose={onClose}>
            <OffcanvasHeader onClose={onClose}>
                <Logo variant="dark" />
            </OffcanvasHeader>
            <OffcanvasBody className="tw-no-scroll">
                <ul>
                    {menu.map(({ id, label, path, submenu, megamenu }) => {
                        const isExpand = id === expanded;
                        const hasSubmenu = !!submenu || !!megamenu;
                        const submenuId = `mobile-submenu-${id}`;
                        const toggle = () => setExpanded(isExpand ? false : id);
                        return (
                            <li
                                key={id}
                                className="group tw-relative tw-border-b tw-border-b-white/[.15] last:tw-border-b-0"
                            >
                                {/* A "#!" parent only reveals its submenu, so the whole row is
                                    the disclosure button. Anchor would render it as a new-tab link. */}
                                {path === "#!" && hasSubmenu ? (
                                    <button
                                        type="button"
                                        aria-expanded={isExpand}
                                        aria-controls={submenuId}
                                        onClick={toggle}
                                        className="tw-flex tw-w-full tw-items-center tw-justify-between tw-py-[19px] tw-text-left tw-text-[16px] tw-font-medium tw-leading-normal tw-text-white"
                                    >
                                        {label}
                                        <i
                                            className="fa fa-chevron-down tw-text-xs"
                                            aria-hidden="true"
                                        />
                                    </button>
                                ) : (
                                    <>
                                        <NavLink path={path}>{label}</NavLink>
                                        {hasSubmenu && (
                                            <ExpandButton
                                                onClick={toggle}
                                                expanded={isExpand}
                                                controls={submenuId}
                                            />
                                        )}
                                    </>
                                )}
                                {submenu && (
                                    <motion.div
                                        id={submenuId}
                                        className="tw-overflow-hidden"
                                        initial={{ height: 0 }}
                                        animate={{
                                            height: isExpand ? "100%" : "0",
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.645, 0.045, 0.355, 1],
                                        }}
                                        aria-hidden={!isExpand}
                                    >
                                        <Submenu menu={submenu} isExpand={isExpand} />
                                    </motion.div>
                                )}
                                {megamenu && (
                                    <motion.div
                                        id={submenuId}
                                        className="tw-overflow-hidden"
                                        initial={{ height: 0 }}
                                        animate={{
                                            height: isExpand ? "100%" : "0",
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.645, 0.045, 0.355, 1],
                                        }}
                                        aria-hidden={!isExpand}
                                    >
                                        <Megamenu menu={megamenu} isExpand={isExpand} />
                                    </motion.div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </OffcanvasBody>
        </Offcanvas>
    );
};

export default MobileMenu;
