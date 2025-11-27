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
            <header className="header tw-relative">
                <div
                    className={clsx(
                        "header-top tw-bg-gray-200 tw-py-2.5 tw-z-[60] tw-w-full tw-transition-all",
                        sticky && "tw-fixed tw-top-0 tw-left-0 tw-shadow-md"
                    )}
                >
                    <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-justify-center">
                        <p className="tw-mb-3.8 tw-flex-100 tw-text-center md:tw-mb-0 md:tw-mr-7.5 md:tw-flex-1 md:tw-text-left">
                            New Cohort Starts:
                        </p>
                        <div className="tw-flex tw-items-center sm:tw-mr-[45px] md:tw-mr-5 lg:tw-mr-[45px]">
                            <i className="far fa-clock tw-mr-[5px] tw-text-lg tw-text-secondary" />
                            <CountdownTimer targetDate="2026/04/07" />
                        </div>
                        <Button size="sm" path="/donate" className="tw-shadow-lg tw-shadow-primary/25">
                            Donate
                        </Button>
                    </div>
                </div>
                <div className="header-bottom tw-relative">
                    <div
                        ref={measuredRef}
                        className={clsx(
                            "header-inner tw-left-0 tw-z-50 tw-h-auto tw-w-full tw-py-[25px] tw-transition-all xl:tw-py-0",
                            !sticky && "tw-absolute tw-top-0 tw-bg-white",
                            sticky &&
                                "tw-fixed tw-top-[52px] tw-animate-headerSlideDown tw-backdrop-blur-lg tw-bg-white/90 tw-border-b tw-border-gray-200/50 tw-shadow-lg tw-shadow-black/5",
                            shadow && "tw-shadow-sm tw-shadow-black/5"
                        )}
                    >
                        <div
                            className={clsx(
                                "tw-container tw-grid tw-grid-flow-col tw-items-center xl:tw-grid-cols-[22%_minmax(56%,_1fr)_22%]",
                                fluid && "tw-max-w-full tw-px-3.8 3xl:tw-px-37"
                            )}
                        >
                            <Logo variant="dark" className="tw-max-w-[120px] sm:tw-max-w-[158px]" />
                            <MainMenu
                                className="tw-hidden xl:tw-block"
                                align="center"
                                menu={menu}
                                hoverStyle="B"
                            />
                            <div className="tw-flex tw-items-center tw-justify-end">
                                <Social01 className="tw-hidden md:tw-flex md:tw-items-center" />
                                <BurgerButton
                                    className="tw-pl-2 xl:tw-hidden"
                                    color="dark"
                                    onClick={() => setOffcanvas(true)}
                                    label="Toggle Search"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tw-h-20" />
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
