import React, { useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import { useRouter } from "next/router";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import ProfileBio from "@containers/profile/bio";
import Spinner from "@ui/spinner";
import { useSession, signOut } from "next-auth/react";
import { useMount } from "@hooks";

type PageProps = {
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const Profile: PageWithLayout = () => {
    const mounted = useMount();
    const { data: session, status } = useSession();
    const router = useRouter();

    // Check for dev session as fallback
    const [devSession, setDevSession] = React.useState<{
        user: { id: string; name: string; email: string; image: string };
    } | null>(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("dev-session");
            if (stored) {
                try {
                    const user = JSON.parse(stored);
                    setDevSession({ user });
                } catch {
                    localStorage.removeItem("dev-session");
                }
            }
        }
    }, []);

    // Use either real session or dev session
    const currentSession = session || devSession;

    useEffect(() => {
        if (status === "unauthenticated" && !devSession) {
            router.replace("/login");
        }
    }, [status, router, devSession]);

    if (!mounted || (status === "loading" && !devSession)) {
        return (
            <div className="tw-fixed tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-screen tw-items-center tw-justify-center tw-bg-white">
                <Spinner />
            </div>
        );
    }

    if (!currentSession) {
        return (
            <div className="tw-fixed tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-screen tw-items-center tw-justify-center tw-bg-white">
                <Spinner />
            </div>
        );
    }

    const handleLogout = async () => {
        try {
            // Handle dev session logout
            if (devSession && !session) {
                localStorage.removeItem("dev-session");
                setDevSession(null);
                await router.replace("/login");
                return;
            }

            // Handle real session logout
            await signOut({ redirect: false });
            await router.replace("/login");
        } catch (error) {
            // Handle logout error
        }
    };

    return (
        <>
            <SEO title="Profile" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Profile"
                showTitle={false}
            />

            {/* User Info Section */}
            <div className="tw-container tw-py-8">
                <div className="tw-mx-auto tw-max-w-2xl tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
                    <div className="tw-mb-6 tw-flex tw-items-center tw-space-x-4">
                        {currentSession.user?.image && (
                            <img
                                src={currentSession.user.image}
                                alt={currentSession.user.name || "User"}
                                className="tw-h-16 tw-w-16 tw-rounded-full"
                            />
                        )}
                        <div>
                            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">
                                {currentSession.user?.name || "User"}
                            </h1>
                            <p className="tw-text-gray-600">{currentSession.user?.email}</p>
                            {devSession && (
                                <span className="tw-inline-block tw-rounded tw-bg-yellow-100 tw-px-2 tw-py-1 tw-text-xs tw-text-yellow-800">
                                    Development Mode
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="tw-border-t tw-pt-6">
                        <h2 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                            Account Actions
                        </h2>
                        <button
                            onClick={handleLogout}
                            type="button"
                            className="tw-rounded-md tw-bg-danger tw-px-4 tw-py-2 tw-font-medium tw-text-white tw-transition-colors hover:tw-bg-danger/90"
                        >
                            <i className="fas fa-sign-out-alt tw-mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <ProfileBio />
        </>
    );
};

Profile.Layout = Layout01;

export const getStaticProps: GetStaticProps<PageProps> = () => {
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

export default Profile;
