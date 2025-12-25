import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import type { NextPage } from "next";
import Layout from "@layout/layout-01";

type ErrorType = {
    [key: string]: {
        title: string;
        message: string;
        action: string;
    };
};

const errorMessages: ErrorType = {
    default: {
        title: "Authentication Error",
        message: "An unexpected error occurred during the authentication process.",
        action: "Please try signing in again.",
    },
    configuration: {
        title: "Server Configuration Error",
        message: "There is a problem with the server configuration.",
        action: "Please contact support for assistance.",
    },
    accessdenied: {
        title: "Access Denied",
        message:
            "You must be a member of the required GitHub organization to access this application.",
        action: "Please request access from your organization administrator.",
    },
    verification: {
        title: "Account Verification Required",
        message: "Your account requires verification before continuing.",
        action: "Please check your email for verification instructions.",
    },
    signin: {
        title: "Sign In Error",
        message: "The sign in attempt was unsuccessful.",
        action: "Please try again or use a different method to sign in.",
    },
    callback: {
        title: "Callback Error",
        message: "There was a problem with the authentication callback.",
        action: "Please try signing in again. If the problem persists, clear your browser cookies.",
    },
    oauthsignin: {
        title: "GitHub Sign In Error",
        message: "Unable to initiate GitHub sign in process.",
        action: "Please try again or check if GitHub is accessible.",
    },
    oauthcallback: {
        title: "GitHub Callback Error",
        message: "There was a problem processing the GitHub authentication.",
        action: "Please try signing in again or ensure you've granted the required permissions.",
    },
};

type PageWithLayout = NextPage & {
    Layout: typeof Layout;
};

const AuthError: PageWithLayout = () => {
    const router = useRouter();
    const [error, setError] = useState(errorMessages.default);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const errorType = router.query.error as string;
        const normalizedErrorType = errorType.toLowerCase();
        if (errorType && errorMessages[normalizedErrorType]) {
            setError(errorMessages[normalizedErrorType]);
        }
    }, [router.query]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/").catch(console.error);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="tw-sm:px-6 tw-lg:px-8 tw-flex tw-min-h-[75vh] tw-flex-col tw-justify-center tw-bg-gray-50 tw-py-12">
            <div className="tw-sm:mx-auto tw-sm:w-full tw-sm:max-w-md">
                <div className="tw-sm:rounded-lg tw-sm:px-10 tw-bg-white tw-px-4 tw-py-8 tw-shadow">
                    <div className="tw-text-center">
                        <h2 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-ink">
                            {error.title}
                        </h2>
                        <div className="tw-mb-6 tw-rounded-md tw-bg-red-50 tw-p-4">
                            <div className="tw-flex tw-justify-center">
                                <div className="tw-flex-shrink-0">
                                    <svg
                                        className="tw-h-5 tw-w-5 tw-text-red-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="tw-ml-3">
                                    <p className="tw-text-sm tw-text-red-700">{error.message}</p>
                                    <p className="tw-mt-2 tw-text-sm tw-text-red-700">
                                        {error.action}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="tw-space-y-4">
                            <Link
                                href="/"
                                className="tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-transparent tw-bg-primary tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white tw-shadow-sm hover:tw-bg-opacity-90 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-primary focus:tw-ring-offset-2"
                            >
                                Return to Home Page
                            </Link>

                            <p className="tw-text-sm tw-text-secondary">
                                Redirecting in {countdown} seconds...
                            </p>

                            <div className="tw-mt-4 tw-text-sm tw-text-secondary">
                                Need help?{" "}
                                <a
                                    href="mailto:support@vetswhocode.io"
                                    className="tw-hover:tw-text-opacity-90 tw-font-medium tw-text-primary"
                                >
                                    Contact Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AuthError.Layout = Layout;

export default AuthError;
