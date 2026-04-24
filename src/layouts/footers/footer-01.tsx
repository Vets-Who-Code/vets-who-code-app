import SitemapNav from "@components/widgets/sitemap-nav";
import TextWidget from "@widgets/text-widget";
import clsx from "clsx";

type TProps = {
    mode?: "light" | "dark";
};

const Footer01 = ({ mode }: TProps) => {
    return (
        <footer
            className={clsx(
                "tw-relative",
                mode === "dark" && "tw-text-dark-text-muted",
                mode === "light" && "tw-bg-gray-50"
            )}
            style={{
                background: mode === "dark" ? "var(--navy, #091f40)" : undefined,
                paddingTop: "64px",
                paddingBottom: "64px",
                borderTop: "1px solid rgba(185, 214, 242, 0.08)",
            }}
        >
            <h2 className="tw-sr-only">Footer</h2>
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 tw-gap-y-10 lg:tw-grid-cols-12 lg:tw-gap-x-8">
                    <TextWidget mode={mode} className="lg:tw-col-span-4" />
                    <SitemapNav mode={mode} className="lg:tw-col-span-8" />
                </div>

                <div
                    style={{
                        marginTop: "48px",
                        paddingTop: "24px",
                        borderTop: "1px solid rgba(185, 214, 242, 0.08)",
                    }}
                    className="tw-flex tw-flex-col tw-items-center tw-gap-6 md:tw-flex-row md:tw-justify-between"
                >
                    <div className="tw-text-center md:tw-text-left">
                        <p
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color:
                                    mode === "dark"
                                        ? "rgba(185, 214, 242, 0.4)"
                                        : "var(--navy, #091f40)",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                marginBottom: "8px",
                            }}
                        >
                            &copy; {new Date().getFullYear()} Vets Who Code — All Rights Reserved
                        </p>
                        <p
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color:
                                    mode === "dark" ? "rgba(185, 214, 242, 0.4)" : "#495057",
                                letterSpacing: "0.06em",
                                margin: 0,
                            }}
                        >
                            Vets Who Code is a registered 501(c)(3) nonprofit — EIN 86-2122804.
                            Donations are tax-deductible to the fullest extent allowable under the
                            law.
                        </p>
                    </div>
                    <a
                        href="https://app.candid.org/profile/9981881/vets-who-code-86-2122804"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw-shrink-0"
                        aria-label="Vets Who Code Candid/Guidestar Transparency Seal"
                    >
                        <img
                            src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9981881/svg"
                            alt="Candid/Guidestar Transparency Seal"
                            title="Candid/Guidestar Transparency Seal"
                            width={80}
                            height={80}
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

Footer01.defaultProps = {
    mode: "light",
};

export default Footer01;
