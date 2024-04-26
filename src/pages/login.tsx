import React, { useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import LoginForm from "@components/forms/login-form";
import Spinner from "@ui/spinner";
import { useUser } from "@contexts/user-context";
import { useMount } from "@hooks";

interface PageProps {
    Layout: typeof Layout;
}

const Login: NextPage & PageProps = () => {
    const mounted = useMount();
    const { isLoggedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            void router.push("/profile");
        }
    }, [isLoggedIn, router]);

    if (!mounted) return null;

    if (!isLoggedIn) {
        return (
            <>
                <SEO title="Login" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Login"
                    showTitle={false}
                />
                <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-grid tw-items-start lg:tw-grid-cols-2 tw-gap-7.5 lg:tw-gap-15">
                    <div className="tw-p-8 tw-border tw-rounded tw-shadow-lg tw-flex tw-flex-col tw-justify-center tw-text-center">
                        <h2>Welcome Back!</h2>
                        <p>
                            Please log in to access your account and continue
                            exploring our services.
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </>
        );
    }

    return (
        <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
            <Spinner />
        </div>
    );
};

Login.Layout = Layout;

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

export default Login;
