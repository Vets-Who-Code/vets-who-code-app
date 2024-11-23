import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import Spinner from "@ui/spinner";
import { useMount } from "@hooks";
import type { GetStaticProps, NextPage } from "next";
import Layout from "@layout/layout-01";

interface LoginProps {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
}

type PageWithLayout = NextPage<LoginProps> & {
    Layout?: typeof Layout;
};

const Login: PageWithLayout = () => {
    const mounted = useMount();
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/profile").catch((err) => {
                console.error("Failed to redirect to profile:", err);
            });
        }
    }, [status, router]);

    if (!mounted || status === "loading") {
        return (
            <div className="tw-fixed tw-bg-white tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            // Changed background from gradient to navy blue
            <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen" style={{ background: '#091f40' }}>
                <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md tw-overflow-hidden">
                    <div className="tw-p-8 tw-space-y-3">
                        {/* Updated heading text and styling */}
                        <h1 className="tw-text-2xl tw-font-bold tw-text-center" 
                            style={{ 
                                fontFamily: 'Gotham, Arial, sans-serif',
                                color: '#091f40'
                            }}>
                            Retool. Retrain. Relaunch.
                        </h1>
                        {/* Updated text color and content */}
                        <p className="tw-text-center" style={{ color: '#091f40' }}>
                            Sign in to continue your journey with #VetsWhoCode
                        </p>
                    </div>
                    <div className="tw-p-6">
                        {/* Updated button styling to use brand red */}
                        <button 
                            type="button"
                            onClick={() => void signIn("github", { 
                                callbackUrl: "/profile",
                                redirect: true
                            })}
                            className="tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-text-white tw-rounded-md tw-transition-colors"
                            style={{ 
                                backgroundColor: '#c5203e',
                                fontFamily: 'Gotham, Arial, sans-serif'
                            }}
                        >
                            <i className="fa-brands fab fa-github tw-h-4 tw-w-4" aria-hidden="true"></i>
                            Sign in with GitHub
                        </button>
                    </div>
                    <div className="tw-px-8 tw-pb-8">
                        {/* Updated link colors to brand red */}
                        <p className="tw-text-center tw-text-sm" style={{ color: '#091f40' }}>
                            By clicking continue, you agree to our{" "}
                            <a 
                                href="/terms" 
                                className="tw-underline tw-underline-offset-4 hover:tw-opacity-80"
                                style={{ color: '#c5203e' }}
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a 
                                href="/privacy" 
                                className="tw-underline tw-underline-offset-4 hover:tw-opacity-80"
                                style={{ color: '#c5203e' }}
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="tw-fixed tw-bg-white tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-flex-col tw-gap-4 tw-justify-center tw-items-center">
            <span style={{ color: '#091f40' }}>Redirecting to profile...</span>
            <Spinner />
        </div>
    );
};

Login.Layout = Layout;

export const getStaticProps: GetStaticProps<LoginProps> = () => {
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

export default Login;