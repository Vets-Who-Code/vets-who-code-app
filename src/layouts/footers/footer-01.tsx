import ListWidget from "@components/widgets/list-widget";
import TextWidget from "@widgets/text-widget";
import TwoColumnListWidget from "@widgets/two-col-list-widget";
import clsx from "clsx";

type TProps = {
    mode?: "light" | "dark";
};

const Footer01 = ({ mode }: TProps) => {
    return (
        <footer
            className={clsx(
                "tw-relative",
                mode === "dark" &&
                    "tw-text-dark-text-muted",
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
                {/* Top row — nav links and content */}
                <div className="tw-grid tw-grid-cols-12 tw-gap-y-8">
                    <TextWidget
                        mode={mode}
                        className="tw-col-span-12 tw-mb-[43px] lg:tw-col-span-5 xl:tw-col-span-5"
                    />
                    <TwoColumnListWidget
                        mode={mode}
                        className="tw-col-span-12 tw-mb-[25px] md:tw-col-span-7 lg:tw-col-span-4 xl:tw-col-span-3"
                    />

                    <ListWidget
                        mode={mode}
                        className="tw-col-span-12 tw-mb-7.5 md:tw-col-span-5 lg:tw-col-span-3"
                    />
                    <div className="sm:tw-col-span-2 xl:tw-col-span-1 maxSm:tw-col-span-3">
                        <a
                            href="https://app.candid.org/profile/9981881/vets-who-code-86-2122804"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9981881/svg"
                                alt="Candid/Guidestar Transparency Seal"
                                title="Candid/Guidestar Transparency Seal"
                            />{" "}
                        </a>
                    </div>
                </div>

                {/* Bottom row — copyright */}
                <div
                    style={{
                        marginTop: "48px",
                        paddingTop: "24px",
                        borderTop: "1px solid rgba(185, 214, 242, 0.08)",
                        textAlign: "center",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            color: mode === "dark" ? "rgba(185, 214, 242, 0.4)" : "var(--navy, #091f40)",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                        }}
                    >
                        &copy; {new Date().getFullYear()} Vets Who Code{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.vetswhocode.io/"
                            className="tw-transition-colors hover:tw-text-accent"
                            style={{ color: "inherit" }}
                        >
                            All Rights Reserved
                        </a>
                    </p>
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            color: mode === "dark" ? "rgba(185, 214, 242, 0.4)" : "#6C757D",
                            letterSpacing: "0.06em",
                            margin: 0,
                        }}
                    >
                        Vets Who Code is a registered 501(c)(3) nonprofit under EIN 86-2122804.
                        Donations are tax-deductible to the fullest extent allowable under the law.
                    </p>
                </div>
            </div>
        </footer>
    );
};

Footer01.defaultProps = {
    mode: "light",
};

export default Footer01;
