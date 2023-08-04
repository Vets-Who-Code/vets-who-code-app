import { ReactNode } from "react";
import ScrollToTop from "@ui/scroll-to-top";
import Header from "../headers/header";
import Footer from "../footers/footer-01";

type TProps = {
    children: ReactNode;
    headerShadow?: boolean;
    headerFluid?: boolean;
    footerMode?: "light" | "dark";
};

const Layout = ({
    children,
    headerShadow,
    headerFluid,
    footerMode,
}: TProps) => {
    return (
        <>
            <Header shadow={headerShadow} fluid={headerFluid} />
            <main className="tw-relative">{children}</main>
            <Footer mode={footerMode} />
            <ScrollToTop />
        </>
    );
};

export default Layout;
