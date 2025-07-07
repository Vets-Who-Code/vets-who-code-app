import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import Social01 from "@components/socials/social-01";
import BurgerButton from "@ui/burger-button";
import Button from "@ui/button";
import CountdownTimer from "@ui/countdown-timer/layout-03";
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
                <div className="header-top tw:bg-gray-200 tw:py-2.5">
                    <div className="tw:container tw:flex tw:flex-wrap tw:items-center tw:justify-center">
                        <p className="tw:mb-3.8 tw:flex-100 tw:text-center tw:md:mb-0 tw:md:mr-7.5 tw:md:flex-1 tw:md:text-left">
                            Platform Launch + Vets Who Code Demo Day
                        </p>
                        <div className="tw:flex tw:items-center tw:sm:mr-[45px] tw:md:mr-5 tw:lg:mr-[45px]">
                            <i className="far fa-clock tw:mr-[5px] tw:text-lg tw:text-secondary" />
                            <CountdownTimer targetDate="2025/11/11" />
                        </div>
                        <Button size="xs" path="/donate">
                            Donate
                        </Button>
                    </div>
                </div>
                <div className="header-bottom tw:relative">
                    <div
                        ref={measuredRef}
                        className={clsx(
                            "header-inner tw:left-0 tw:top-0 tw:z-50 tw:h-auto tw:w-full tw:bg-white tw:py-[25px] tw:transition-all tw:xl:py-0",
                            !sticky && "tw:absolute",
                            sticky &&
                                "tw:fixed tw:animate-header-slide-down tw:shadow-3md tw:shadow-black/10",
                            shadow && "tw:shadow-xs tw:shadow-black/5"
                        )}
                    >
                        <div
                            className={clsx(
                                "tw:container tw:grid tw:grid-flow-col tw:items-center tw:xl:grid-cols-[22%_minmax(56%,1fr)_22%]",
                                fluid && "tw:max-w-full tw:px-3.8 tw:3xl:px-37"
                            )}
                        >
                            <Logo variant="dark" className="tw:max-w-[120px] tw:sm:max-w-[158px]" />
                            <MainMenu
                                className="tw:hidden tw:xl:block"
                                align="center"
                                menu={menu}
                                hoverStyle="B"
                            />
                            <div className="tw:flex tw:items-center tw:justify-end">
                                <Social01 className="tw:hidden tw:md:flex tw:md:items-center" />
                                <BurgerButton
                                    className="tw:pl-2 tw:xl:hidden tw:hover:cursor-pointer"
                                    color="dark"
                                    onClick={() => setOffcanvas(true)}
                                    label="Toggle Search"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tw:h-20" />
                </div>
            </header>
            <MobileMenu isOpen={offcanvas} onClose={() => setOffcanvas(false)} menu={menu} />
        </>
    );
};

Header.defaultProps = {
    fluid: false,
};

export default Header;
