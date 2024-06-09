import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PageSeo from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import LoginForm from "@components/forms/login-form";
import Spinner from "@ui/spinner";
import { useUser } from "@contexts/user-context";
import { useMount } from "@hooks";
import WelcomeMessage from "@components/welcome-message";

const Login = () => {
    const mounted = useMount();
    const { isLoggedIn, logout } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            void router.push("/dashboard"); // Redirect to dashboard if already logged in
        }
    }, [isLoggedIn, router]);

    if (!mounted) return null;

    if (!isLoggedIn) {
        return (
            <>
                <PageSeo
                    title="Login Register"
                    description="Login to your account"
                />
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
                        <LoginForm />
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <Spinner />
            <button type="button" onClick={logout}>
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
