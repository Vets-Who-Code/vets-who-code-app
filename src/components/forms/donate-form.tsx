import { forwardRef } from "react";
import clsx from "clsx";

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
                seamless
                className="tw-min-h-[900px] tw-overflow-x-hidden md:tw-min-h-[700px]"
            />
        </div>
    );
});

export default DonateForm;
