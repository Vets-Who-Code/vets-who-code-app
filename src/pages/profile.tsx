import { useEffect } from "react";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import { useRouter } from "next/router";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import ProfileBio from "@containers/profile/bio";
import Spinner from "@ui/spinner";
import { useSession, signOut } from "next-auth/react";

type PageProps = NextPage & {
    Layout: typeof Layout01;
};

const Profile: PageProps = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            // Redirect to login if not logged in
            void router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        // Show a spinner while the session is being fetched
        return (
            <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                <Spinner />
            </div>
        );
    }

    if (!session) {
        // This shouldn't happen due to the redirect above, but handle the case
        return (
            <div className="tw-fixed tw-bg-light-100 tw-top-0 tw-z-50 tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center">
                <p>You are not logged in.</p>
            </div>
        );
    }

    const handleLogout = async () => {
        await signOut();
        void router.push("/login");
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
            <div className="tw-mt-4 tw-flex tw-justify-center">
                <button
                    onClick={handleLogout}
                    type="button"
                    className="tw-bg-red-500 tw-text-white tw-px-4 tw-py-2 tw-rounded"
                >
                    Logout
                </button>
            </div>
        </>
    );
};

Profile.Layout = Layout01;

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

export default Profile;