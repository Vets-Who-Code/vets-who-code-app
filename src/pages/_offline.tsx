import React from "react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";

type PageWithLayout = NextPage & {
    Layout?: typeof Layout01;
};

const OfflinePage: PageWithLayout = () => {
    return (
        <>
            <SEO
                title="Offline - Vets Who Code"
                description="You are currently offline. Please check your internet connection."
            />
            <div className="tw-flex tw-min-h-screen tw-items-center tw-justify-center tw-bg-gray-50">
                <div className="tw-mx-auto tw-max-w-md tw-p-8 tw-text-center">
                    <div className="tw-mb-8">
                        <svg
                            className="tw-mx-auto tw-h-24 tw-w-24 tw-text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    <h1 className="tw-mb-4 tw-text-3xl tw-font-bold tw-text-gray-900">
                        You're Offline
                    </h1>

                    <p className="tw-mb-8 tw-text-lg tw-text-gray-600">
                        No internet connection found. Please check your connection and try again.
                    </p>

                    <div className="tw-space-y-4">
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="tw-w-full tw-rounded-lg tw-bg-primary tw-px-6 tw-py-3 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                        >
                            Try Again
                        </button>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="tw-w-full tw-rounded-lg tw-bg-gray-200 tw-px-6 tw-py-3 tw-font-medium tw-text-gray-800 tw-transition-colors hover:tw-bg-gray-300"
                        >
                            Go Back
                        </button>
                    </div>

                    <div className="tw-mt-8 tw-text-sm tw-text-gray-500">
                        <p>When you're back online, this page will automatically refresh.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

OfflinePage.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default OfflinePage;
