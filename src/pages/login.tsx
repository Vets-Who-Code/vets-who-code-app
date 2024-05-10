import { useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import LoginForm from "@components/forms/login-form";
import Spinner from "@ui/spinner";
import { useUser } from "@contexts/user-context";
import { useMount } from "@hooks";

type PageProps = NextPage & {
    Layout: typeof Layout;
};

const Login: PageProps = () => {
    const mounted = useMount();
    const { isLoggedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            void router.push("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    if (!mounted) return null;

    if (!isLoggedIn) {
        return (
            <>
                <SEO title="Login Register" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Login"
                    showTitle={false}
                />
                <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] tw-grid tw-items-start lg:tw-grid-cols-2 tw-gap-7.5 lg:tw-gap-15">
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
