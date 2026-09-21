import Logo from "@components/logo";
import MainMenu from "@components/menu/main-menu";
import UserMenu from "@components/user-menu";
import menu, { filterMenuByAuth } from "@data/menu";
import siteConfig from "@data/site-config";
import { useSticky } from "@hooks";
import BurgerButton from "@ui/burger-button";
import Button from "@ui/button";
import CountdownTimer from "@ui/countdown-timer/layout-03";
import { getCohortStartDate, isCohortUpcoming } from "@utils/cohort";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
    const topBarRef = useRef<HTMLDivElement>(null);
    // The sticky nav pins below the top bar, whose height changes with the cohort
    // countdown (present or not, one row or two). Measure it instead of guessing.
    const [topBarHeight, setTopBarHeight] = useState(52);
    // useSticky measures the nav once on mount, before the session loads and before
    // the sticky border appears. The published offset needs the live height.
    const navRef = useRef<HTMLDivElement | null>(null);
    const [navHeight, setNavHeight] = useState(0);
    const setNavNode = useCallback(
        (node: HTMLDivElement | null) => {
            navRef.current = node;
            if (node) measuredRef(node);
        },
        [measuredRef]
    );
    const { status } = useSession();
    const cohortStartDate = getCohortStartDate(siteConfig.cohortStartDate);
    const cohortUpcoming = isCohortUpcoming(cohortStartDate);
    const filteredMenu = useMemo(
        () => filterMenuByAuth(menu, status === "authenticated"),
        [status]
    );

    useEffect(() => {
        setOffcanvas(false);
    }, [router]);

    useEffect(() => {
        const el = topBarRef.current;
        if (!el) return undefined;
        const measure = () => setTopBarHeight(el.offsetHeight);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const el = navRef.current;
        if (!el) return undefined;
        const measure = () => setNavHeight(el.offsetHeight);
        measure();
        const observer = new ResizeObserver(measure);
        // border-box, so the 1px border the nav gains when it goes sticky is picked up
        observer.observe(el, { box: "border-box" });
        return () => observer.disconnect();
    }, []);

    // Publish the fixed header's height so page-level sticky bars can pin below it
    // (`top: var(--header-sticky-offset, 0px)`) instead of sliding underneath.
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--header-sticky-offset",
            sticky ? `${topBarHeight + navHeight}px` : "0px"
        );
        return () => {
            document.documentElement.style.removeProperty("--header-sticky-offset");
        };
    }, [sticky, topBarHeight, navHeight]);

    return (
        <>
            <header className="header tw-relative">
                <div
                    ref={topBarRef}
                    className={clsx(
                        "header-top tw-bg-gray-50 tw-py-2.5 tw-z-[60] tw-w-full tw-transition-all",
                        sticky && "tw-fixed tw-top-0 tw-left-0 tw-shadow-md"
                    )}
                >
                    <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-justify-center md:tw-justify-end">
                        {/* Hidden once the cohort date passes (no dead 0:0:0:0 timer). */}
                        {cohortUpcoming && (
                            <>
                                <p className="tw-mb-3.8 tw-flex-100 tw-text-center md:tw-mb-0 md:tw-mr-7.5 md:tw-flex-1 md:tw-text-left">
                                    New Cohort Starts:
                                </p>
                                <div className="tw-flex tw-items-center sm:tw-mr-[45px] md:tw-mr-5 lg:tw-mr-[45px]">
                                    <i
                                        className="far fa-clock tw-mr-[5px] tw-text-lg tw-text-secondary"
                                        aria-hidden="true"
                                    />
                                    <CountdownTimer targetDate={cohortStartDate || ""} />
                                </div>
                            </>
                        )}
                        <Button size="sm" color="gold" path="/donate" className="tw-gap-2">
                            <i className="fas fa-heart tw-text-[13px]" aria-hidden="true" />
                            Donate
                        </Button>
                    </div>
                </div>
                <div className="header-bottom tw-relative">
                    <div
                        ref={setNavNode}
                        className={clsx(
                            "header-inner tw-left-0 tw-z-50 tw-h-auto tw-w-full tw-py-[25px] tw-transition-all xl:tw-py-0",
                            !sticky && "tw-absolute tw-top-0 tw-bg-white",
                            sticky &&
                                "tw-fixed tw-animate-headerSlideDown tw-backdrop-blur-lg tw-bg-white/90 tw-border-b tw-border-gray-200/50 tw-shadow-lg tw-shadow-black/5",
                            shadow && "tw-shadow-sm tw-shadow-black/5"
                        )}
                        style={sticky ? { top: topBarHeight } : undefined}
                    >
                        <div
                            className={clsx(
                                "tw-container tw-flex tw-items-center tw-justify-between tw-gap-6",
                                fluid && "tw-max-w-full tw-px-3.8 3xl:tw-px-37"
                            )}
                        >
                            <Logo
                                variant="dark"
                                className="tw-flex tw-items-center tw-shrink-0 tw-max-w-[120px] sm:tw-max-w-[158px]"
                            />
                            <MainMenu
                                className="tw-hidden xl:tw-block"
                                align="center"
                                menu={filteredMenu}
                                hoverStyle="B"
                            />
                            <div className="tw-flex tw-items-center tw-justify-end tw-gap-4 tw-shrink-0">
                                <div className="tw-hidden lg:tw-flex tw-items-center tw-gap-2">
                                    <span className="tw-relative tw-flex tw-h-[5px] tw-w-[5px]">
                                        <span
                                            className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-red tw-opacity-75"
                                            style={{
                                                animation: "statusBlink 2s ease-in-out infinite",
                                            }}
                                        />
                                        <span className="tw-relative tw-inline-flex tw-h-[5px] tw-w-[5px] tw-rounded-full tw-bg-red" />
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            color: "#495057",
                                        }}
                                    >
                                        {siteConfig.cohortStatusShort}
                                    </span>
                                </div>
                                {/* Socials moved out of the header — the container has no
                                    slack, and the nav needs their 145px to stay on one line.
                                    They still render in the footer. */}
                                <UserMenu />
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
                menu={filteredMenu}
            />
        </>
    );
};

Header.defaultProps = {
    fluid: false,
};

export default Header;
