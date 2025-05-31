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
                    <div className="tw-bg-primary tw-p-3 tw-text-white lg:tw-w-1/4">
                        <h3 className="tw-text-xl tw-font-bold tw-text-white">
                            Make a Difference Today
                        </h3>
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
                            <a
                                href="mailto:info@vetswhocode.io"
                                className="tw-text-white hover:tw-underline"
                            >
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
                            className="tw-h-[950px] tw-w-full tw-border-none"
                        />
                    </div>
                </div>
            </div>

            {/* Impact information column */}
            <div className="tw-w-full lg:tw-w-5/12">
                <div className="tw-bg-white-100 tw-h-full tw-rounded-lg tw-p-8 tw-shadow-sm">
                    <h3 className="tw-mb-6 tw-text-2xl tw-font-bold tw-text-primary">
                        Your Impact
                    </h3>

                    <div className="tw-mb-8">
                        <h4 className="tw-mb-2 tw-text-lg tw-font-semibold">
                            Where Your Money Goes
                        </h4>
                        <ul className="tw-ml-5 tw-list-disc tw-space-y-2">
                            <li>Supports compute costs</li>
                            <li>Keeps our platform fast, secure, and accessible</li>
                            <li>Supports Mentorship Program</li>
                            <li>Supports Job Placement</li>
                            <li>Sustains lifelong growth and connection</li>
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
                                    Supports building our free resources for all.
                                </span>
                            </div>
                            <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-text-center tw-shadow-sm">
                                <span className="tw-block tw-text-3xl tw-font-bold tw-text-primary">
                                    $100
                                </span>
                                <span className="tw-mt-1 tw-block tw-text-sm">
                                    Support Mentorship Resources
                                </span>
                            </div>
                            <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-text-center tw-shadow-sm">
                                <span className="tw-block tw-text-3xl tw-font-bold tw-text-primary">
                                    $500
                                </span>
                                <span className="tw-mt-1 tw-block tw-text-sm">
                                    covers AI compute for a month for one veteran
                                </span>
                            </div>
                            <div className="tw-rounded-lg tw-bg-white tw-p-4 tw-text-center tw-shadow-sm">
                                <span className="tw-block tw-text-3xl tw-font-bold tw-text-primary">
                                    $1000
                                </span>
                                <span className="tw-mt-1 tw-block tw-text-sm">
                                    Supports a veteran for an entire year.
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
                            jerome@vetswhocode.io
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
});

DonateForm.displayName = "DonateForm";

export default DonateForm;
