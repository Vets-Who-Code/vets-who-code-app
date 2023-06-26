import { forwardRef } from "react";
import clsx from "clsx";
import { IContent } from "@utils/types";
import HTMLContent from "@components/html-content";

type TProps = {
    className?: string;
};

const DonateForm = forwardRef<HTMLDivElement, TProps>(({ className }, ref) => {
    return (
        <div className={clsx(className)} ref={ref}>
            <iframe
                title="#VWC Donorbox"
                src="https://donorbox.org/embed/vetswhocode-donation?show_content=true"
                name="vwc-donorbox"
                seamless="seamless"
                scrolling="no"
                allowpaymentrequest="true"
                className="tw-overflow-x-hidden tw-min-h-[900px] md:tw-min-h-[700px]"
            />
        </div>
    );
});

export default DonateForm;
