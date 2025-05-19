import { forwardRef } from "react";
import clsx from "clsx";

type TProps = {
    className?: string;
};

const DonateForm = forwardRef<HTMLDivElement, TProps>(({ className }, ref) => {
    return (
        <div
            className={clsx("tw-flex tw-flex-col tw-gap-8 tw-py-10 lg:tw-flex-row", className)}
            ref={ref}
        >
            {/* Donation form column */}
            <div className="tw-w-full lg:tw-w-full">
                <div className="tw-flex tw-flex-col tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-lg md:tw-flex-row">
                    <div className="tw-bg-primary tw-p-3 tw-text-white md:tw-w-1/4">
                        <h3 className="tw-text-xl tw-font-bold">Make a Difference Today</h3>
                        <p className="tw-mt-1 tw-text-sm tw-text-gray-100">
                            Your donation directly supports veterans learning to code
                        </p>

                        <div className="tw-mt-3 tw-text-xs">
                            <div className="tw-mb-1 tw-flex tw-items-center">
                                <svg
                                    className="tw-mr-1 tw-h-4 tw-w-4 tw-text-green-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>501(c)(3) nonprofit</span>
                            </div>
                            <div className="tw-flex tw-items-center">
                                <svg
                                    className="tw-mr-1 tw-h-4 tw-w-4 tw-text-green-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Tax-deductible</span>
                            </div>
                        </div>

                        <div className="tw-mt-2 tw-flex tw-items-center tw-justify-between tw-text-xs">
                            <svg
                                className="tw-h-4 tw-w-4 tw-text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            <a href="#" className="tw-text-white hover:tw-underline">
                                Contact us
                            </a>
                        </div>
                    </div>

                    <div className="md:tw-w-3/4">
                        <iframe
                            title="#VWC Donorbox"
                            src="https://donorbox.org/embed/vetswhocode-donation?show_content=true&default_interval=o&amount=25&hide_donation_meter=true&compact=true"
                            name="vwc-donorbox"
                            seamless
                            className="tw-h-[400px] tw-w-full tw-border-none"
                        />
                    </div>
                </div>
            </div>

            {/* Impact information column */}
            <div className="tw-w-full lg:tw-w-5/12">
                <div className="tw-h-full tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-shadow-sm">
                    <h3 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-primary">
                        Your Impact
                    </h3>

                    <div className="tw-mb-8">
                        <h4 className="tw-mb-2 tw-text-lg tw-font-semibold">
                            Where Your Money Goes
                        </h4>
                        <ul className="tw-ml-5 tw-list-disc tw-space-y-2">
                            <li>Providing training materials and resources for our veterans</li>
                            <li>Supporting our mentorship program</li>
                            <li>Maintaining our learning infrastructure</li>
                            <li>Offering career support and job placement assistance</li>
                        </ul>
                    </div>

                    <div className="tw-mb-8">
                        <h4 className="tw-mb-2 tw-text-lg tw-font-semibold">Donation Impact</h4>
                        <div className="tw-mb-4 tw-grid tw-grid-cols-2 tw-gap-4">
                            <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-text-center tw-shadow-sm">
                                <span className="tw-block tw-text-3xl tw-font-bold tw-text-primary">
                                    $50
                                </span>
                                <span className="tw-mt-1 tw-block tw-text-sm">
                                    Learning resources for one veteran
                                </span>
                            </div>
                            <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-text-center tw-shadow-sm">
                                <span className="tw-block tw-text-3xl tw-font-bold tw-text-primary">
                                    $100
                                </span>
                                <span className="tw-mt-1 tw-block tw-text-sm">
                                    Technical mentorship session
                                </span>
                            </div>
                            <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-text-center tw-shadow-sm">
                                <span className="tw-block tw-text-3xl tw-font-bold tw-text-primary">
                                    $500
                                </span>
                                <span className="tw-mt-1 tw-block tw-text-sm">
                                    Coding bootcamp scholarship
                                </span>
                            </div>
                            <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-text-center tw-shadow-sm">
                                <span className="tw-block tw-text-3xl tw-font-bold tw-text-primary">
                                    $1000
                                </span>
                                <span className="tw-mt-1 tw-block tw-text-sm">
                                    Complete training for one veteran
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="tw-mb-2 tw-text-lg tw-font-semibold">Need Help?</h4>
                        <p className="tw-mb-2">
                            For questions about donations or to explore other ways to support our
                            mission, please contact us:
                        </p>
                        <a
                            href="mailto:info@vetswhocode.io"
                            className="tw-font-medium tw-text-primary tw-underline"
                        >
                            info@vetswhocode.io
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

DonateForm.displayName = "DonateForm";

export default DonateForm;
