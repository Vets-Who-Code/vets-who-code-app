import { useState } from "react";
import { motion } from "framer-motion";
import Offcanvas from "@ui/offcanvas";
import OffcanvasHeader from "@ui/offcanvas/header";
import OffcanvasBody from "@ui/offcanvas/body";
import Logo from "@components/logo";
import { TMenu } from "@utils/types";
import NavLink from "./nav-link";
import Submenu from "./submenu";
import Megamenu from "./megamenu";
import ExpandButton from "./expand-button";

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
                        return (
                            <li
                                key={id}
                                className="tw-relative group tw-border-b tw-border-b-white/[.15] last:tw-border-b-0"
                            >
                                <NavLink path={path}>{label}</NavLink>
                                {(submenu || megamenu) && (
                                    <ExpandButton
                                        onClick={() =>
                                            setExpanded(isExpand ? false : id)
                                        }
                                    />
                                )}
                                {submenu && (
                                    <motion.div
                                        className="tw-overflow-hidden"
                                        initial={{ height: 0 }}
                                        animate={{
                                            height: isExpand ? "100%" : "0",
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.645, 0.045, 0.355, 1],
                                        }}
                                        aria-expanded={isExpand}
                                    >
                                        <Submenu
                                            menu={submenu}
                                            isExpand={isExpand}
                                        />
                                    </motion.div>
                                )}
                                {megamenu && (
                                    <motion.div
                                        className="tw-overflow-hidden"
                                        initial={{ height: 0 }}
                                        animate={{
                                            height: isExpand ? "100%" : "0",
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.645, 0.045, 0.355, 1],
                                        }}
                                        aria-expanded={isExpand}
                                    >
                                        <Megamenu
                                            menu={megamenu}
                                            isExpand={isExpand}
                                        />
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
