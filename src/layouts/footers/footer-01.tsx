import clsx from "clsx";
import TwoColumnListWidget from "@widgets/two-col-list-widget";
import TextWidget from "@widgets/text-widget";
import ListWidget from "@components/widgets/list-widget";

type TProps = {
    mode?: "light" | "dark";
};

const Footer01 = ({ mode }: TProps) => {
    return (
        <footer
            className={clsx(
                "tw-pb-[50px] tw-pt-[70px]",
                mode === "dark" && "tw-bg-dark-100",
                mode === "light" && "tw-bg-light-100"
            )}
        >
            <h2 className="tw-sr-only">Footer</h2>
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-12">
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
                <p className="copyright tw-mt-5 tw-text-center tw-text-md tw-text-gray-400">
                    &copy; {new Date().getFullYear()} Vets Who Code{" "}
                    <a target="_blank" rel="noopener noreferrer" href="https://www.vetswhocode.io/">
                        All Rights Reserved
                    </a>
                </p>
                <p className="copyright mt-n5 tw-text-center tw-text-md tw-text-gray-400">
                    Vets Who Code is a registered 501(c)(3) nonprofit under EIN 86-2122804.
                    Donations are tax-deductible to the fullest extent allowable under the law.
                </p>
            </div>
        </footer>
    );
};

Footer01.defaultProps = {
    mode: "dark",
};

export default Footer01;
