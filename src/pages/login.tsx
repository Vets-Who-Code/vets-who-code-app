import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PageSeo from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import Spinner from "@ui/spinner";
import { useMount } from "@hooks";
import WelcomeMessage from "@components/welcome-message";
import { useSession, signIn } from "next-auth/react";

const Login = () => {
    const mounted = useMount();
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/profile").catch(console.error);
        }
    }, [status, router]);

    // Show loading state while mounting or checking authentication
    if (!mounted || status === "loading") {
        return (
            <div className="fixed bg-light-100 top-0 z-50 w-screen h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    // Show login page for unauthenticated users
    if (status === "unauthenticated") {
        return (
            <>
                <PageSeo title="Login" description="Login to your account" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Login"
                    showTitle={false}
                />
                <div className="container pb-15 md:pb-20 lg:pb-[100px] grid grid-cols-1 lg:grid-cols-2 gap-7.5 lg:gap-15">
                    <div className="flex items-center w-full lg:w-3/4 mx-auto">
                        <WelcomeMessage />
                    </div>
                    <div className="flex items-center w-full lg:w-3/4 mx-auto">
                        <button
                            type="button"
                            onClick={() => signIn("github")}
                            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
                        >
                            Sign in with GitHub
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // This state should rarely be seen as useEffect should redirect
    return (
        <div className="fixed bg-light-100 top-0 z-50 w-screen h-screen flex flex-col gap-4 justify-center items-center">
            <span className="text-gray-600">Redirecting to profile...</span>
            <Spinner />
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
