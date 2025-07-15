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
};

const Header = ({ shadow, fluid }: TProps) => {
    const router = useRouter();
    const [offcanvas, setOffcanvas] = useState(false);
    const { sticky, measuredRef } = useSticky();

    useEffect(() => {
        setOffcanvas(false);
    }, [router]);

    return (
        <>
            <header className="header tw:relative">
                <div
                    ref={measuredRef}
                    className={clsx(
                        "header-inner tw:left-0 tw:top-0 tw:z-50 tw:h-auto tw:w-full tw:bg-white tw:py-[19px] tw:transition-all tw:xl:py-0",
                        !sticky && "tw:absolute",
                        sticky &&
                            "tw:fixed tw:animate-header-slide-down tw:shadow-3md tw:shadow-black/10",
                        shadow && "tw:shadow-xs tw:shadow-black/5"
                    )}
                >
                    <div
                        className={clsx(
                            "tw:container tw:grid tw:grid-flow-col tw:items-center tw:xl:grid-cols-[45%_minmax(10%,1fr)_45%]",
                            fluid && "tw:max-w-full tw:px-3.8 tw:3xl:px-37"
                        )}
                    >
                        <MainMenu menu={menu} hoverStyle="B" className="tw:hidden tw:xl:block" />
                        <Logo variant="dark" className="tw:max-w-[120px] tw:sm:max-w-[158px]" />
                        <div className="tw:flex tw:items-center tw:justify-end">
                            <BurgerButton
                                className="tw:pl-5 tw:xl:hidden"
                                color="dark"
                                onClick={() => setOffcanvas(true)}
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
};

export default Header;
