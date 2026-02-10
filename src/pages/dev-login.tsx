import Layout from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface DevLoginProps {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
}

type PageWithLayout = NextPage<DevLoginProps> & {
    Layout?: typeof Layout;
};

const DevLogin: PageWithLayout = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleDevLogin = async () => {
        setIsLoading(true);

        // Set a fake session in localStorage for development
        const fakeUser = {
            id: "dev-user-1",
            name: "Jerome Hardaway",
            email: "jeromehardaway@users.noreply.github.com",
            image: "https://github.com/jeromehardaway.png",
            login: "jeromehardaway",
        };

        localStorage.setItem("dev-session", JSON.stringify(fakeUser));

        // Redirect to courses page
        router.push("/courses");
    };

    return (
        <div className="tw-flex tw-min-h-screen tw-items-center tw-justify-center tw-bg-secondary">
            <div className="tw-w-full tw-max-w-md tw-overflow-hidden tw-rounded-lg tw-bg-white tw-shadow-lg">
                <div className="tw-space-y-3 tw-p-8">
                    <h1 className="tw-text-center tw-text-2xl tw-font-bold tw-text-secondary">
                        Development Login
                    </h1>
                    <p className="tw-text-center tw-text-secondary">
                        Quick bypass for testing the platform
                    </p>
                    <div className="tw-rounded tw-bg-gold-light/20 tw-p-3 tw-text-sm tw-text-gold-rich">
                        ⚠️ This is for development only - bypasses GitHub OAuth
                    </div>
                </div>
                <div className="tw-space-y-4 tw-p-6">
                    <button
                        type="button"
                        onClick={handleDevLogin}
                        className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-bg-primary tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-text-white tw-transition-colors hover:tw-opacity-90"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="tw-h-4 tw-w-4 tw-animate-spin tw-rounded-full tw-border-2 tw-border-white tw-border-t-transparent" />
                                Logging in...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-code" />
                                Login as Admin (Dev)
                            </>
                        )}
                    </button>

                    <div className="tw-text-center">
                        <Link
                            href="/login"
                            className="tw-text-sm tw-text-secondary tw-underline hover:tw-opacity-80"
                        >
                            Use GitHub OAuth instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

DevLogin.Layout = Layout;

export const getServerSideProps: GetServerSideProps<DevLoginProps> = async () => {
    // Redirect to home page if not in development
    if (process.env.NODE_ENV !== "development") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

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

export default DevLogin;
