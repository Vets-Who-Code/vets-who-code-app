import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PageSeo from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import Spinner from "@ui/spinner";
import { useMount } from "@hooks";
import WelcomeMessage from "@components/welcome-message";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
    const mounted = useMount();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            void router.push("/profile"); // Redirect to profile if logged in
        }
    }, [status, router]);

    if (!mounted || status === "loading") {
        return (
            <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }

    if (!session) {
        return (
            <>
                <PageSeo title="Login" description="Login to your account" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Login"
                    showTitle={false}
                />
                <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-7.5 lg:tw-gap-15">
                    <div className="tw-flex tw-items-center tw-w-full lg:tw-w-3/4 tw-mx-auto">
                        <WelcomeMessage />
                    </div>
                    <div className="tw-flex tw-items-center tw-w-full lg:tw-w-3/4 tw-mx-auto">
                        <button
                            onClick={() => signIn("github")}
                            className="tw-bg-primary tw-text-white tw-py-2 tw-px-4 tw-rounded"
                        >
                            Sign in with GitHub
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <Spinner />
            <button
                type="button"
                onClick={() => signOut()}
                className="tw-bg-red-500 tw-text-white tw-py-2 tw-px-4 tw-rounded"
            >
                Logout
            </button>
        </div>
    );
};

Login.Layout = Layout;

export const getStaticProps = () => {
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
