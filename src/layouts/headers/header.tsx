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
                <div className="header-top tw-py-2.5 tw-bg-gray-200">
                    <div className="tw-container tw-flex tw-justify-center tw-items-center tw-flex-wrap">
                        <p className="tw-text-center tw-flex-100 tw-mb-3.8 md:tw-flex-1 md:tw-text-left md:tw-mb-0 md:tw-mr-7.5">
                            We start accepting new troops in
                        </p>
                        <div className="tw-flex tw-items-center sm:tw-mr-[45px] md:tw-mr-5 lg:tw-mr-[45px]">
                            <i className="far fa-clock tw-text-lg tw-text-secondary tw-mr-[5px]" />
                            <CountdownTimer targetDate="2023/09/11" />
                        </div>
                        <Button size="xs" path="/donate">
                            Donate
                        </Button>
                    </div>
                </div>
                <div className="header-bottom tw-relative">
                    <div
                        ref={measuredRef}
                        className={clsx(
                            "header-inner tw-py-[25px] xl:tw-py-0 tw-z-50 tw-bg-white tw-transition-all tw-left-0 tw-top-0 tw-w-full tw-h-auto",
                            !sticky && "tw-absolute",
                            sticky &&
                                "tw-fixed tw-shadow-3md tw-shadow-black/10 tw-animate-headerSlideDown",
                            shadow && "tw-shadow-sm tw-shadow-black/5"
                        )}
                    >
                        <div
                            className={clsx(
                                "tw-container tw-grid tw-grid-flow-col xl:tw-grid-cols-[22%_minmax(56%,_1fr)_22%] tw-items-center",
                                fluid && "tw-max-w-full tw-px-3.8 3xl:tw-px-37"
                            )}
                        >
                            <Logo
                                variant="dark"
                                className="tw-max-w-[120px] sm:tw-max-w-[158px]"
                            />
                            <MainMenu
                                className="tw-hidden xl:tw-block"
                                align="center"
                                menu={menu}
                                hoverStyle="B"
                            />
                            <div className="tw-flex tw-justify-end tw-items-center">
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
            <MobileMenu
                isOpen={offcanvas}
                onClose={() => setOffcanvas(false)}
                menu={menu}
            />
        </>
    );
};

Header.defaultProps = {
    fluid: false,
};

export default Header;
