import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Logo from "@components/logo";
import SearchForm from "@components/forms/search-form";
import MainMenu from "@components/menu/main-menu";
import BurgerButton from "@ui/burger-button";
import Anchor from "@ui/anchor";
import menu from "@data/menu";
import { useSticky } from "@hooks";

const MobileMenu = dynamic(() => import("../../components/menu/mobile-menu"), {
    ssr: false,
});
const FlyoutSearchForm = dynamic(
    () => import("../../components/forms/flyout-search-form-01"),
    {
        ssr: false,
    }
);

type TProps = {
    shadow?: boolean;
    fluid?: boolean;
    transparent?: boolean;
    mode?: "light" | "dark";
};

const Header = ({ shadow, fluid, transparent, mode }: TProps) => {
    const router = useRouter();
    const [visibleSearch, setVisibleSearch] = useState(false);
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
                    !transparent && "tw-relative",
                    transparent &&
                        "tw-absolute tw-inset-0 tw-bottom-auto tw-bg-transparent"
                )}
            >
                <div
                    ref={measuredRef}
                    className={clsx(
                        "header-inner tw-py-[19px] xl:tw-py-0 tw-z-50 tw-transition-all tw-left-0 tw-top-0 tw-w-full tw-h-auto",
                        !sticky && "tw-absolute",
                        sticky &&
                            "tw-fixed tw-shadow-3md tw-shadow-black/10 tw-animate-headerSlideDown",
                        shadow && "tw-shadow-sm tw-shadow-black/5",
                        !transparent && "tw-bg-white",
                        transparent && !sticky && "tw-bg-transparent",
                        transparent && sticky && "tw-bg-white",
                        transparent &&
                            sticky &&
                            mode === "light" &&
                            "tw-bg-black"
                    )}
                >
                    <div
                        className={clsx(
                            "tw-container tw-grid tw-grid-flow-col xl:tw-grid-cols-[22%_minmax(56%,_1fr)_22%] tw-items-center",
                            fluid && "tw-max-w-full tw-px-3.8 3xl:tw-px-37"
                        )}
                    >
                        <Logo
                            variant={mode}
                            className="tw-max-w-[120px] sm:tw-max-w-[158px]"
                        />

                        <MainMenu
                            className="tw-hidden xl:tw-block"
                            align="center"
                            menu={menu}
                            color={mode}
                        />
                        <div className="tw-flex tw-justify-end tw-items-center">
                            <Anchor
                                path="/profile"
                                className={clsx(
                                    "tw-inline-block tw-px-2.5 tw-py-1.5",
                                    mode === "light" &&
                                        "tw-text-white hover:tw-text-white",
                                    mode === "dark" && "tw-text-dark-50"
                                )}
                                aria-label="User Profile"
                            >
                                <i className="far fa-user-circle tw-text-lg" />
                            </Anchor>
                            <div className="tw-hidden md:tw-block md:tw-max-w-[250px] md:tw-pl-2.5">
                                <SearchForm
                                    bg={transparent ? "white" : "light"}
                                />
                            </div>
                            <div className="md:tw-hidden tw-overflow-hidden">
                                <button
                                    type="button"
                                    className={clsx(
                                        "tw-inline-block tw-px-2.5 tw-py-1.5 md:tw-hidden",
                                        mode === "light" && "tw-text-white",
                                        mode === "dark" && "tw-text-dark-50"
                                    )}
                                    onClick={() =>
                                        setVisibleSearch((prev) => !prev)
                                    }
                                    aria-label="Search Toggle"
                                >
                                    <i className="far fa-search tw-text-lg" />
                                </button>
                                <FlyoutSearchForm
                                    show={visibleSearch}
                                    onClose={() => setVisibleSearch(false)}
                                />
                            </div>
                            <BurgerButton
                                className="tw-pl-5 xl:tw-hidden"
                                onClick={() => setOffcanvas(true)}
                                color={mode}
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
    mode: "dark",
};

export default Header;
