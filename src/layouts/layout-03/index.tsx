const Layout = ({
    children,
    headerShadow,
    headerFluid,
    footerMode,
}: TProps) => {
    return (
        <>
            <Head>
                <script
                    src="https://chimpstatic.com/mcjs-connected/js/users/e5c2275b0bdbc424dc0ab4480/9706a936fe91a998a1c6ed3d9.js"
                    id="mcjs"
                />
            </Head>
            <Header shadow={headerShadow} fluid={headerFluid} />
            <main className="tw-relative">{children}</main>
            <Footer mode={footerMode} />
            <ScrollToTop />
        </>
    );
};
