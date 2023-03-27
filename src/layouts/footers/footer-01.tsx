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
                        className="tw-col-span-12 lg:tw-col-span-5 xl:tw-col-span-6 tw-mb-[43px]"
                    />
                    <TwoColumnListWidget
                        mode={mode}
                        className="tw-col-span-12 md:tw-col-span-7 lg:tw-col-span-4 xl:tw-col-span-3 tw-mb-[25px]"
                    />
                    <ListWidget
                        mode={mode}
                        className="tw-col-span-12 md:tw-col-span-5 lg:tw-col-span-3 tw-mb-7.5"
                    />
                </div>
                <p className="copyright tw-text-center tw-text-md tw-text-gray-400 tw-mt-5">
                    &copy; {new Date().getFullYear()} Maxcoach.{" "}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://themeforest.net/user/bootxperts/portfolio"
                    >
                        All Rights Reserved
                    </a>
                </p>
            </div>
        </footer>
    );
};

Footer01.defaultProps = {
    mode: "dark",
};

export default Footer01;
