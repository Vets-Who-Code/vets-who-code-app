import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";

type PageWithLayout = NextPage & {
    Layout?: typeof Layout01;
};

const AdminDashboard: PageWithLayout = () => {
    const { data: session } = useSession();
    const [devSession, setDevSession] = useState<{
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

    const currentSession = session || devSession;

    if (!currentSession) {
        return (
            <>
                <SEO title="Access Denied" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Admin"
                    showTitle={false}
                />
                <div className="tw-container tw-py-16">
                    <div className="tw-text-center">
                        <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                            Admin Access Denied
                        </h1>
                        <p className="tw-mx-auto tw-max-w-2xl tw-text-xl tw-text-gray-600">
                            This area is restricted to authorized administrators only.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <SEO title="Admin Dashboard" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Admin Dashboard"
                showTitle={false}
            />

            <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
                <div className="tw-mx-auto tw-max-w-7xl tw-px-4 sm:tw-px-6 lg:tw-px-8">
                    <div className="tw-mb-8">
                        <h1 className="tw-text-3xl tw-font-bold tw-text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="tw-mt-2 tw-text-gray-600">
                            Welcome back, {currentSession.user.name}! Manage your VWC platform here.
                        </p>
                    </div>

                    <div className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-4">
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Total Students
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">312</p>
                            <p className="tw-text-sm tw-text-green-600">+12% from last month</p>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Active Courses
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">24</p>
                            <p className="tw-text-sm tw-text-green-600">+3 new this month</p>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Completion Rate
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">78%</p>
                            <p className="tw-text-sm tw-text-green-600">+5% improvement</p>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <h3 className="tw-text-sm tw-font-medium tw-text-gray-500">
                                Certificates Issued
                            </h3>
                            <p className="tw-text-3xl tw-font-bold tw-text-primary">127</p>
                            <p className="tw-text-sm tw-text-green-600">+23 this month</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AdminDashboard.Layout = Layout01;

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

export default AdminDashboard;
