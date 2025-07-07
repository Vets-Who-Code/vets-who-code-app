import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import BurgerButton from "@ui/burger-button";

import menu from "@data/menu";
import { useSticky } from "@hooks";

const MobileMenu = dynamic(() => import("../../components/menu/mobile-menu"), {
    ssr: false,
});

type TProps = {
    shadow?: boolean;
    fluid?: boolean;
    transparent?: boolean;
    mode?: "light" | "dark";
};

const Header = ({ shadow, fluid, transparent, mode }: TProps) => {
    const router = useRouter();
    const [offcanvas, setOffcanvas] = useState(false);
    const { sticky, measuredRef } = useSticky();

    useEffect(() => {
        setOffcanvas(false);
    }, [router]);

    return (
        <>
            <header
                className={clsx(
                    "header",
                    !transparent && "tw:relative",
                    transparent && "tw:absolute tw:inset-0 tw:bottom-auto tw:bg-transparent"
                )}
            >
                <div
                    ref={measuredRef}
                    className={clsx(
                        "header-inner tw:left-0 tw:top-0 tw:z-50 tw:h-auto tw:w-full tw:py-[19px] tw:transition-all tw:xl:py-0",
                        !sticky && "tw:absolute",
                        sticky &&
                            "tw:fixed tw:animate-header-slide-down tw:shadow-3md tw:shadow-black/10",
                        shadow && "tw:shadow-xs tw:shadow-black/5",
                        !transparent && "tw:bg-white",
                        transparent && !sticky && "tw:bg-transparent",
                        transparent && sticky && "tw:bg-white",
                        transparent && sticky && mode === "light" && "tw:bg-black"
                    )}
                >
                    <div
                        className={clsx(
                            "tw:container tw:grid tw:grid-flow-col tw:items-center tw:xl:grid-cols-[22%_minmax(56%,1fr)_22%]",
                            fluid && "tw:max-w-full tw:px-3.8 tw:3xl:px-37"
                        )}
                    >
                        <Logo variant={mode} className="tw:max-w-[120px] tw:sm:max-w-[158px]" />

                        <MainMenu
                            className="tw:hidden tw:xl:block"
                            align="center"
                            menu={menu}
                            color={mode}
                        />
                        <div className="tw:overflow-hidden tw:md:hidden">
                            <BurgerButton
                                className="tw:pl-5 tw:xl:hidden"
                                onClick={() => setOffcanvas(true)}
                                color={mode}
                                label="Toggle Menu"
                            />
                        </div>
                    </div>
                </div>
                <div className="tw:h-20" />
            </header>
            <MobileMenu isOpen={offcanvas} onClose={() => setOffcanvas(false)} menu={menu} />
        </>
    );
};

Header.defaultProps = {
    fluid: true,
    mode: "dark",
};

export default Header;
