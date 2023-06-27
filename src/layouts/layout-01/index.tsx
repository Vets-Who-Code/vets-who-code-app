import { ReactNode } from "react";
import ScrollToTop from "@ui/scroll-to-top";
import Header from "../headers/header";
import Footer from "../footers/footer-01";

type TProps = {
    children: ReactNode;
    headerShadow?: boolean;
    headerFluid?: boolean;
    headerMode?: "light" | "dark";
    footerMode?: "light" | "dark";
};

const Layout01 = ({
    children,
    headerShadow,
    headerFluid,
    headerMode,
    footerMode,
}: TProps) => {
    return (
        <>
            <Header
                shadow={headerShadow}
                fluid={headerFluid}
                mode={headerMode}
            />
            <main className="tw-relative">{children}</main>
            <Footer mode={footerMode} />
            <ScrollToTop />
        </>
    );
};

export default Layout01;
