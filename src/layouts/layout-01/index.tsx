import { ReactNode } from "react";
import ScrollToTop from "@ui/scroll-to-top";
import Header from "../headers/header";
import Footer from "../footers/footer-01";

type TProps = {
    children: ReactNode;
    headerShadow?: boolean;
    headerFluid?: boolean;
    headerMode?: "light" | "dark";
    headerTransparent?: boolean;
    footerMode?: "light" | "dark";
};

const Layout01 = ({
    children,
    headerShadow,
    headerFluid,
    headerMode,
    headerTransparent,
    footerMode,
}: TProps) => {
    return (
        <>
            <Header
                shadow={headerShadow}
                fluid={headerFluid}
                transparent={headerTransparent}
                mode={headerMode}
            />
            <main className="tw-relative">{children}</main>
            <Footer mode={footerMode} />
            <ScrollToTop />
        </>
    );
};

export default Layout01;
