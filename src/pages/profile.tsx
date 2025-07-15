import { useEffect } from "react";
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

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login").catch((error) => {
                console.error("Redirect error:", error);
            });
        }
    }, [status, router]);

    if (!mounted || status === "loading") {
        return (
            <div className="tw:fixed tw:top-0 tw:z-50 tw:flex tw:h-screen tw:w-screen tw:items-center tw:justify-center tw:bg-white">
                <Spinner />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="tw:fixed tw:top-0 tw:z-50 tw:flex tw:h-screen tw:w-screen tw:items-center tw:justify-center tw:bg-white">
                <Spinner />
            </div>
        );
    }

    const handleLogout = async () => {
        try {
            await signOut({ redirect: false });
            await router.replace("/login");
        } catch (error) {
            console.error("Logout error:", error);
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
            <ProfileBio />
            <div className="tw:mt-4 tw:flex tw:justify-center">
                <button
                    onClick={handleLogout}
                    type="button"
                    className="tw:rounded-sm tw:bg-red-500 tw:px-4 tw:py-2 tw:text-white"
                >
                    Logout
                </button>
            </div>
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
