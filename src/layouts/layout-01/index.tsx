import { ReactNode } from "react";
import ScrollToTop from "@/components/ui/scroll-to-top";
import Footer from "../footers/footer-01";
import Header from "../headers/header";

type TProps = {
    children: ReactNode;
    headerShadow?: boolean;
    headerFluid?: boolean;
    footerMode?: "light" | "dark";
};

const Layout01 = ({ children, headerShadow, headerFluid, footerMode }: TProps) => {
    return (
        <>
            <Header shadow={headerShadow} fluid={headerFluid} />
            <main className="tw-relative">{children}</main>
            <Footer mode={footerMode} />
            <ScrollToTop />
        </>
    );
};

export default Layout01;
