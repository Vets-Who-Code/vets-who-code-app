import ScrollToTop from "@ui/scroll-to-top";
import SkipLink from "@ui/skip-link";
import { ReactNode } from "react";
import Footer from "../footers/footer-01";
import Header from "../headers/header";

type TProps = {
    children: ReactNode;
    headerShadow?: boolean;
    headerFluid?: boolean;
    footerMode?: "light" | "dark";
};

const Layout = ({ children, headerShadow, headerFluid, footerMode }: TProps) => {
    return (
        <>
            <SkipLink />
            <Header shadow={headerShadow} fluid={headerFluid} />
            <main id="main-content" tabIndex={-1} className="tw-relative">
                {children}
            </main>
            <Footer mode={footerMode} />
            <ScrollToTop />
        </>
    );
};

export default Layout;
