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
            <header className="header tw-relative">
                <div
                    ref={measuredRef}
                    className={clsx(
                        "header-inner tw-py-[19px] xl:tw-py-0 tw-z-50 tw-bg-white tw-transition-all tw-left-0 tw-top-0 tw-w-full tw-h-auto",
                        !sticky && "tw-absolute",
                        sticky &&
                            "tw-fixed tw-shadow-3md tw-shadow-black/10 tw-animate-headerSlideDown",
                        shadow && "tw-shadow-sm tw-shadow-black/5"
                    )}
                >
                    <div
                        className={clsx(
                            "tw-container tw-grid tw-grid-flow-col xl:tw-grid-cols-[45%_minmax(10%,_1fr)_45%] tw-items-center",
                            fluid && "tw-max-w-full tw-px-3.8 3xl:tw-px-37"
                        )}
                    >
                        <MainMenu
                            menu={menu}
                            hoverStyle="B"
                            className="tw-hidden xl:tw-block"
                        />
                        <Logo
                            variant="dark"
                            className="tw-max-w-[120px] sm:tw-max-w-[158px]"
                        />
                        <div className="tw-flex tw-justify-end tw-items-center">
                            <BurgerButton
                                className="tw-pl-5 xl:tw-hidden"
                                color="dark"
                                onClick={() => setOffcanvas(true)}
                                label="Toggle Menu"
                            />
                        </div>
                    </div>
                </div>
                <div className="tw-h-20" />
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
    fluid: true,
};

export default Header;
