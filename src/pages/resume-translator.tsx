import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout01 from "@layout/layout-01";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Breadcrumb from "@components/breadcrumb";
import ResumeTranslator from "@components/translator/ResumeTranslator";

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

const ResumeTranslatorPage: PageWithLayout = () => {
    const { data: session, status } = useSession();

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

    if (status === "loading") {
        return (
            <div className="tw-container tw-py-16">
                <div className="tw-text-center">
                    <div className="tw-mx-auto tw-h-32 tw-w-32 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                    <p className="tw-mt-4 tw-text-gray-600">Loading translator...</p>
                </div>
            </div>
        );
    }

    // Require authentication to access translator
    if (!currentSession) {
        return (
            <>
                <SEO title="Military Resume Translator - Sign In Required" />
                <Breadcrumb
                    pages={[{ path: "/", label: "home" }]}
                    currentPage="Military Resume Translator"
                    showTitle={false}
                />
                <div className="tw-container tw-py-16">
                    <div className="tw-text-center">
                        <div className="tw-mb-8">
                            <i className="fas fa-file-alt tw-mb-4 tw-text-6xl tw-text-gray-400" />
                            <h1 className="tw-mb-4 tw-text-4xl tw-font-bold tw-text-gray-900">
                                Military Resume Translator
                            </h1>
                            <p className="tw-mx-auto tw-max-w-2xl tw-text-xl tw-text-gray-600">
                                This powerful tool helps veterans translate their military experience
                                into civilian-friendly resume language. Sign in to get started.
                            </p>
                        </div>

                        <div className="tw-mb-8 tw-rounded-lg tw-bg-gradient-to-r tw-from-primary tw-to-primary tw-p-8 tw-text-white">
                            <h2 className="tw-mb-4 tw-text-2xl tw-font-bold">
                                What This Tool Does:
                            </h2>
                            <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                                <div className="tw-text-center">
                                    <i className="fas fa-language tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Military-to-Civilian Translation</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Convert military jargon to business language
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-briefcase tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Job Title Conversion</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Transform MOS/ratings to civilian roles
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-list-check tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Skills Translation</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Highlight transferable skills
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-lightbulb tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Smart Suggestions</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Get tips to improve your resume
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-download tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">Export Results</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Download your translated resume
                                    </div>
                                </div>
                                <div className="tw-text-center">
                                    <i className="fas fa-bolt tw-mb-2 tw-text-3xl" />
                                    <div className="tw-font-semibold">AI-Powered</div>
                                    <div className="tw-text-sm tw-opacity-90">
                                        Advanced translation technology
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tw-space-y-4">
                            <div className="tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-justify-center">
                                <Link
                                    href="/login"
                                    className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-primary tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary/90"
                                >
                                    <i className="fas fa-sign-in-alt tw-mr-2" />
                                    Sign In to Use Translator
                                </Link>
                                <Link
                                    href="/dev-login"
                                    className="tw-inline-flex tw-items-center tw-rounded-md tw-bg-gray-600 tw-px-8 tw-py-3 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-gray-500"
                                >
                                    <i className="fas fa-code tw-mr-2" />
                                    Dev Login (Testing)
                                </Link>
                            </div>
                            <div className="tw-text-gray-600">
                                <p>Need help with your resume first?</p>
                                <Link
                                    href="/apply"
                                    className="tw-text-primary tw-transition-colors hover:tw-text-primary/80"
                                >
                                    Learn more about applying to VetsWhoCode →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

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
                            {currentSession?.user?.image && (
                                <img
                                    src={currentSession.user.image}
                                    alt={currentSession.user.name || "User"}
                                    className="tw-h-8 tw-w-8 tw-rounded-full"
                                />
                            )}
                            <span>
                                Welcome, {currentSession?.user?.name?.split(" ")[0] || "User"}
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

export default ResumeTranslatorPage;
