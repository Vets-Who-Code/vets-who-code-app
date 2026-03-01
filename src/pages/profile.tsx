import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import { useMount } from "@hooks";
import Layout01 from "@layout/layout-01";
import Spinner from "@ui/spinner";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { options } from "@/pages/api/auth/options";
import useGitHubProfile from "@/hooks/use-github-profile";
import useLearningStats from "@/hooks/use-learning-stats";
import useProfileForm from "@/hooks/use-profile-form";
import type { ProfileUser, ProfileTab } from "@/types/profile";
import {
    NotificationToast,
    ProfileHeader,
    ProfileNav,
    GitHubStatsGrid,
    RepositoryShowcase,
    LanguageBreakdown,
    ActivityFeed,
    ServiceRecord,
    LearningProgress,
    ProfileSettings,
    GitHubReadme,
} from "@/components/profile";

type PageProps = {
    user: ProfileUser;
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const Profile: PageWithLayout = ({ user }) => {
    const mounted = useMount();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<ProfileTab>("command-center");

    const github = useGitHubProfile();
    const learning = useLearningStats();
    const form = useProfileForm(user);

    if (!mounted) {
        return (
            <div className="tw-fixed tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-screen tw-items-center tw-justify-center tw-bg-white">
                <Spinner />
            </div>
        );
    }

    const handleLogout = async () => {
        try {
            await signOut({ redirect: false });
            await router.replace("/login");
        } catch {
            // logout error handled silently
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

            {form.notification && (
                <NotificationToast
                    type={form.notification.type}
                    message={form.notification.message}
                    onDismiss={form.dismissNotification}
                />
            )}

            <div className="tw-container tw-py-8">
                <ProfileHeader
                    user={user}
                    formData={form.formData}
                    github={github.data}
                    isEditing={form.isEditing}
                    onToggleEdit={() =>
                        form.isEditing ? form.handleCancel() : form.setIsEditing(true)
                    }
                    onLogout={handleLogout}
                />

                <ProfileNav activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Command Center — GitHub overview */}
                {activeTab === "command-center" && (
                    <div className="tw-space-y-8">
                        {github.error && !github.isLoading && (
                            <div className="tw-rounded-lg tw-border tw-border-red/20 tw-bg-red/5 tw-p-6 tw-text-center">
                                <i className="fas fa-exclamation-triangle tw-text-red tw-text-2xl tw-mb-2" />
                                <p className="tw-font-mono tw-text-sm tw-text-red/80">
                                    Unable to load GitHub data: {github.error}
                                </p>
                                <p className="tw-font-mono tw-text-xs tw-text-gray-300 tw-mt-1">
                                    Try logging out and back in to refresh your GitHub token.
                                </p>
                            </div>
                        )}
                        <GitHubStatsGrid
                            github={github.data}
                            isLoading={github.isLoading}
                        />
                        <LanguageBreakdown
                            languages={github.data?.languages || []}
                            isLoading={github.isLoading}
                        />
                        <GitHubReadme
                            content={github.data?.readme || null}
                            login={github.data?.profile.login || ""}
                            isLoading={github.isLoading}
                        />
                    </div>
                )}

                {/* Arsenal — Repositories */}
                {activeTab === "arsenal" && (
                    <RepositoryShowcase
                        repos={github.data?.repos || []}
                        isLoading={github.isLoading}
                    />
                )}

                {/* Ops Log — GitHub activity feed */}
                {activeTab === "ops-log" && (
                    <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                        <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                            Operations Log
                        </h3>
                        <ActivityFeed
                            events={github.data?.events || []}
                            isLoading={github.isLoading}
                        />
                    </div>
                )}

                {/* Service Record — Military background + profile edit */}
                {activeTab === "service-record" && (
                    <ServiceRecord
                        formData={form.formData}
                        isEditing={form.isEditing}
                        isSaving={form.isSaving}
                        onInputChange={form.handleInputChange}
                        onSave={form.handleSave}
                        onCancel={form.handleCancel}
                    />
                )}

                {/* Training — Learning progress */}
                {activeTab === "training" && (
                    <LearningProgress
                        data={learning.data}
                        isLoading={learning.isLoading}
                        error={learning.error}
                    />
                )}

                {/* Settings */}
                {activeTab === "settings" && <ProfileSettings />}
            </div>
        </>
    );
};

Profile.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const session = await getServerSession(context.req, context.res, options);

    if (!session?.user) {
        return {
            redirect: {
                destination: "/login?callbackUrl=/profile",
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

export default Profile;
