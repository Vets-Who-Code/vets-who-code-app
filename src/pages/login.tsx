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
    const { status, data: session } = useSession();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session && !isRedirecting) {
            setIsRedirecting(true);
            router.replace("/profile").catch((error) => {
                console.error("Redirect error:", error);
                setErrorMessage("Failed to redirect to profile. Please try refreshing the page.");
                setIsRedirecting(false);
            });
        }
    }, [status, session, router, isRedirecting]);

    const handleSignIn = useCallback(async () => {
        try {
            setErrorMessage(null);
            const result = await signIn("github", {
                redirect: false,
            });

            if (result?.error) {
                setErrorMessage("Failed to sign in with GitHub. Please try again.");
            }
        } catch (error) {
            console.error("Sign in error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    }, []);

    if (!mounted || status === "loading") {
        return (
            <div className="tw:fixed tw:top-0 tw:z-50 tw:flex tw:h-screen tw:w-screen tw:items-center tw:justify-center tw:bg-white">
                <Spinner />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-secondary">
                <div className="tw:w-full tw:max-w-md tw:overflow-hidden tw:rounded-lg tw:bg-white tw:shadow-lg">
                    <div className="tw:space-y-3 tw:p-8">
                        <h1 className="tw:text-center tw:text-2xl tw:font-bold tw:text-secondary">
                            Retool. Retrain. Relaunch.
                        </h1>
                        <p className="tw:text-center tw:text-secondary">
                            Sign in to continue your journey with #VetsWhoCode
                        </p>
                        {errorMessage && (
                            <div className="tw:rounded-sm tw:bg-red-50 tw:p-3 tw:text-sm tw:text-red-600">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                    <div className="tw:p-6">
                        <button
                            type="button"
                            onClick={handleSignIn}
                            className="tw:flex tw:w-full tw:items-center tw:justify-center tw:gap-2 tw:rounded-md tw:bg-primary tw:px-4 tw:py-3 tw:text-sm tw:font-medium tw:text-white tw:transition-colors tw:hover:opacity-90"
                            disabled={isRedirecting}
                        >
                            <i className="fab fa-github" />
                            Sign in with GitHub
                        </button>
                    </div>
                    <div className="tw:px-8 tw:pb-8">
                        <p className="tw:text-center tw:text-sm tw:text-secondary">
                            By clicking continue, you agree to our{" "}
                            <a
                                href="/terms"
                                className="tw:text-primary tw:underline tw:underline-offset-4 tw:hover:opacity-80"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="/privacy"
                                className="tw:text-primary tw:underline tw:underline-offset-4 tw:hover:opacity-80"
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
        <div className="tw:fixed tw:top-0 tw:z-50 tw:flex tw:h-screen tw:w-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:bg-white">
            <span className="tw:text-secondary">{errorMessage || "Redirecting to profile..."}</span>
            <Spinner />
        </div>
    );
};

Login.Layout = Layout;

export const getStaticProps: GetStaticProps<LoginProps> = () => ({
    props: {
        layout: {
            headerShadow: true,
            headerFluid: false,
            footerMode: "light",
        },
    },
});

export default Login;
