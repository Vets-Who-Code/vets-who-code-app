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
import prisma from "@/lib/prisma";
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
    TroopDashboard,
} from "@/components/profile";

type PageProps = {
    user: ProfileUser;
    isOwner: boolean;
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const MemberProfile: PageWithLayout = ({ user, isOwner }) => {
    const mounted = useMount();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<ProfileTab>("command-center");

    // Pass the target user's ID to hooks so they fetch that member's data
    const targetId = isOwner ? undefined : user.id;
    const github = useGitHubProfile(targetId);
    const learning = useLearningStats(targetId);
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
            <SEO title={isOwner ? "Profile" : `${user.name || "Member"}'s Profile`} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage={isOwner ? "Profile" : user.name || "Member"}
                showTitle={false}
            />

            {isOwner && form.notification && (
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
                    isEditing={isOwner ? form.isEditing : false}
                    isOwner={isOwner}
                    onToggleEdit={() =>
                        form.isEditing ? form.handleCancel() : form.setIsEditing(true)
                    }
                    onLogout={handleLogout}
                />

                <ProfileNav
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    isOwner={isOwner}
                />

                {/* Command Center — GitHub overview */}
                {activeTab === "command-center" && (
                    <div className="tw-space-y-8">
                        {github.error && !github.isLoading && (
                            <div className="tw-rounded-lg tw-border tw-border-red/20 tw-bg-red/5 tw-p-6 tw-text-center">
                                <i className="fas fa-exclamation-triangle tw-text-red tw-text-2xl tw-mb-2" />
                                <p className="tw-font-mono tw-text-sm tw-text-red/80">
                                    Unable to load GitHub data: {github.error}
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

                {/* Service Record — Military background (read-only for non-owners) */}
                {activeTab === "service-record" && (
                    <ServiceRecord
                        formData={form.formData}
                        isEditing={isOwner ? form.isEditing : false}
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

                {/* J0dI3 — AI dashboard */}
                {activeTab === "j0di3" && <TroopDashboard />}

                {/* Settings — only for owner */}
                {activeTab === "settings" && isOwner && <ProfileSettings />}
            </div>
        </>
    );
};

MemberProfile.Layout = Layout01;

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

    const targetId = context.params?.id as string;
    const isOwner = session.user.id === targetId;

    // Look up the target user
    const targetUser = await prisma.user.findUnique({
        where: { id: targetId },
        select: { id: true, name: true, email: true, image: true },
    });

    if (!targetUser) {
        return { notFound: true };
    }

    // If image is missing, try GitHub avatar fallback
    let image = targetUser.image || null;
    if (!image) {
        try {
            const account = await prisma.account.findFirst({
                where: { userId: targetId, provider: "github" },
                select: { providerAccountId: true },
            });
            if (account?.providerAccountId) {
                image = `https://avatars.githubusercontent.com/u/${account.providerAccountId}?v=4`;
            }
        } catch {
            // non-critical
        }
    }

    return {
        props: {
            user: {
                id: targetUser.id,
                name: targetUser.name || null,
                email: isOwner ? targetUser.email || "" : "",
                image,
            },
            isOwner,
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default MemberProfile;
