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
                "tw-pt-[70px] tw-pb-[50px]",
                mode === "dark" && "tw-bg-dark-100",
                mode === "light" && "tw-bg-light-100"
            )}
        >
            <h2 className="tw-sr-only">Footer</h2>
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-12">
                    <TextWidget
                        mode={mode}
                        className="tw-col-span-12 lg:tw-col-span-5 xl:tw-col-span-5 tw-mb-[43px]"
                    />
                    <TwoColumnListWidget
                        mode={mode}
                        className="tw-col-span-12 md:tw-col-span-7 lg:tw-col-span-4 xl:tw-col-span-3 tw-mb-[25px]"
                    />

                    <ListWidget
                        mode={mode}
                        className="tw-col-span-12 md:tw-col-span-5 lg:tw-col-span-3 tw-mb-7.5"
                    />
                    <div className="maxSm:tw-col-span-3 sm:tw-col-span-2 xl:tw-col-span-1">
                        <img
                            src="https://res.cloudinary.com/vetswhocode/image/upload/v1705549609/candid-seal-platinum-2024_wexkdk.png"
                            alt="Candid Seal Platinum Award"
                            width={150}
                        />
                    </div>
                </div>
                <p className="copyright tw-text-center tw-text-md tw-text-gray-400 tw-mt-5">
                    &copy; {new Date().getFullYear()} Vets Who Code{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.vetswhocode.io/"
                    >
                        All Rights Reserved
                    </a>
                </p>
                <p className="copyright tw-text-center tw-text-md tw-text-gray-400 mt-n5">
                    Vets Who Code is a registered 501(c)(3) nonprofit under EIN
                    86-2122804. Donations are tax-deductible to the fullest
                    extent allowable under the law.
                </p>
            </div>
        </footer>
    );
};

Footer01.defaultProps = {
    mode: "dark",
};

export default Footer01;
