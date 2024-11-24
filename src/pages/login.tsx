import React, { useEffect, useCallback, useState } from "react";
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
    const [error, setError] = useState<string | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Handle authenticated state
    useEffect(() => {
        if (status === "authenticated" && !isRedirecting) {
            setIsRedirecting(true);
            
            // Set a timeout for the redirect
            const redirectTimeout = setTimeout(() => {
                router.push("/profile").catch((err) => {
                    setError("Failed to redirect to profile. Please try refreshing the page.");
                    setIsRedirecting(false);
                    if (process.env.NODE_ENV === "development") {
                        console.error("Redirect failed:", err);
                    }
                });
            }, 100);

            return () => clearTimeout(redirectTimeout);
        }
    }, [status, router, isRedirecting]);

    const handleSignIn = useCallback(async () => {
        try {
            setError(null);
            const result = await signIn("github", {
                callbackUrl: "/profile",
                redirect: true,
            });
            
            // Handle failed sign-in
            if (result?.error) {
                setError("Failed to sign in with GitHub. Please try again.");
                if (process.env.NODE_ENV === "development") {
                    console.error("Sign-in error:", result.error);
                }
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
            if (process.env.NODE_ENV === "development") {
                console.error("Sign-in failed:", error);
            }
        }
    }, []);

    // Show loading state
    if (!mounted || status === "loading") {
        return (
            <div className="tw-fixed tw-bg-white tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }

    // Show login form for unauthenticated users
    if (status === "unauthenticated") {
        return (
            <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-bg-secondary">
                <div className="tw-bg-white tw-rounded-lg tw-shadow-lg tw-w-full tw-max-w-md tw-overflow-hidden">
                    <div className="tw-p-8 tw-space-y-3">
                        <h1 className="tw-text-2xl tw-font-bold tw-text-center tw-text-secondary">
                            Retool. Retrain. Relaunch.
                        </h1>
                        <p className="tw-text-center tw-text-secondary">
                            Sign in to continue your journey with #VetsWhoCode
                        </p>
                        {error && (
                            <div className="tw-p-3 tw-text-sm tw-text-red-600 tw-bg-red-50 tw-rounded">
                                {error}
                            </div>
                        )}
                    </div>
                    <div className="tw-p-6">
                        <button
                            type="button"
                            onClick={handleSignIn}
                            className="tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-text-white tw-bg-primary tw-rounded-md tw-transition-colors hover:tw-opacity-90"
                            disabled={isRedirecting}
                        >
                            <i className="fab fa-github" />
                            Sign in with GitHub
                        </button>
                    </div>
                    <div className="tw-px-8 tw-pb-8">
                        <p className="tw-text-center tw-text-sm tw-text-secondary">
                            By clicking continue, you agree to our{" "}
                            <a
                                href="/terms"
                                className="tw-text-primary tw-underline tw-underline-offset-4 hover:tw-opacity-80"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="/privacy"
                                className="tw-text-primary tw-underline tw-underline-offset-4 hover:tw-opacity-80"
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

    // Show redirect state
    return (
        <div className="tw-fixed tw-bg-white tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-flex-col tw-gap-4 tw-justify-center tw-items-center">
            <span className="tw-text-secondary">
                {error || "Redirecting to profile..."}
            </span>
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