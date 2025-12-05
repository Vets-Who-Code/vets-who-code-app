import React from "react";
import Link from "next/link";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/options";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import ResumeTranslator from "@components/translator/ResumeTranslator";

type PageProps = {
    user: {
        id: string;
        name: string | null;
        email: string;
        image: string | null;
    };
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const ResumeTranslatorPage: PageWithLayout = ({ user }) => {

    return (
        <>
            <SEO
                title="Military Resume Translator"
                description="Transform your military experience into civilian-friendly resume language with our AI-powered translation tool."
            />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Military Resume Translator"
                showTitle={false}
            />

            <div className="tw-container tw-py-16">
                {/* Header with User Menu */}
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-end">
                    <div className="tw-flex tw-items-center tw-space-x-4">
                        <div className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-text-gray-600">
                            {user.image && (
                                <img
                                    src={user.image}
                                    alt={user.name || "User"}
                                    className="tw-h-8 tw-w-8 tw-rounded-full"
                                />
                            )}
                            <span>
                                Welcome, {user.name?.split(" ")[0] || "User"}
                            </span>
                        </div>
                        <div className="tw-flex tw-space-x-2">
                            <Link
                                href="/profile"
                                className="tw-rounded-md tw-bg-gray-100 tw-px-3 tw-py-2 tw-text-sm tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-200"
                                title="View Profile"
                            >
                                <i className="fas fa-user tw-mr-1" />
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Resume Translator Component */}
                <ResumeTranslator className="tw-mx-auto tw-max-w-5xl" />

                {/* Additional Resources */}
                <div className="tw-mt-16 tw-mx-auto tw-max-w-5xl">
                    <div className="tw-bg-gray-50 tw-rounded-lg tw-p-8">
                        <h2 className="tw-text-2xl tw-font-bold tw-text-[#091f40] tw-mb-4">
                            Resume Writing Tips
                        </h2>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                            <div>
                                <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                    <i className="fas fa-check-circle tw-text-success tw-mr-2" />
                                    Do:
                                </h3>
                                <ul className="tw-space-y-2 tw-text-gray-700">
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>Use action verbs to start each bullet point</span>
                                    </li>
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>Include specific numbers and metrics</span>
                                    </li>
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>Focus on results and outcomes</span>
                                    </li>
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>Highlight transferable leadership skills</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="tw-font-semibold tw-text-[#091f40] tw-mb-2">
                                    <i className="fas fa-times-circle tw-text-danger tw-mr-2" />
                                    Don&apos;t:
                                </h3>
                                <ul className="tw-space-y-2 tw-text-gray-700">
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>Use military acronyms without explanation</span>
                                    </li>
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>Assume civilians know military terminology</span>
                                    </li>
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>List duties without showing impact</span>
                                    </li>
                                    <li className="tw-flex tw-items-start">
                                        <span className="tw-mr-2">•</span>
                                        <span>Forget to quantify your achievements</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ResumeTranslatorPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    // Check authentication
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/resume-translator",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: {
                id: session.user.id,
                name: session.user.name || null,
                email: session.user.email || "",
                image: session.user.image || null,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default ResumeTranslatorPage;
