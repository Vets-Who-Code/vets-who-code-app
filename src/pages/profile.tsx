import React, { useEffect, useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import { useRouter } from "next/router";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
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

// Mock user progress data (in real app, this would come from API)
const mockProgress = {
    coursesEnrolled: 3,
    coursesCompleted: 1,
    totalLessons: 156,
    completedLessons: 45,
    hoursLearned: 32,
    currentStreak: 7,
    achievements: [
        {
            id: 1,
            title: "First Course Complete",
            description: "Completed your first course",
            earned: true,
        },
        { id: 2, title: "Week Warrior", description: "7 day learning streak", earned: true },
        { id: 3, title: "Code Master", description: "Submitted 10 projects", earned: false },
        { id: 4, title: "Mentor", description: "Helped 5 fellow veterans", earned: false },
    ],
    recentActivity: [
        { id: 1, action: "Completed lesson", content: "JavaScript Functions", date: "2025-08-27" },
        { id: 2, action: "Started module", content: "React Fundamentals", date: "2025-08-26" },
        { id: 3, action: "Submitted project", content: "Portfolio Website", date: "2025-08-25" },
    ],
};

const Profile: PageWithLayout = () => {
    const mounted = useMount();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isSaving, setIsSaving] = useState(false);
    const [notification, setNotification] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // Form state for editing
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        title: "",
        location: "",
        githubUrl: "",
        linkedinUrl: "",
        websiteUrl: "",
        branch: "",
        rank: "",
        yearsServed: "",
        mos: "",
    });

    // Store original data to restore on cancel
    const [originalFormData, setOriginalFormData] = useState(formData);

    // Check for dev session as fallback
    const [devSession, setDevSession] = React.useState<{
        user: { id: string; name: string; email: string; image: string };
    } | null>(null);
    const [devSessionLoaded, setDevSessionLoaded] = React.useState(false);

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
            setDevSessionLoaded(true);
        }
    }, []);

    // Use either real session or dev session
    const currentSession = session || devSession;

    // Initialize form data when session loads - fetch from database
    useEffect(() => {
        const fetchProfile = async () => {
            if (currentSession?.user) {
                try {
                    // Add dev user ID header for dev mode
                    const headers: HeadersInit = {};
                    if (devSession) {
                        headers["x-dev-user-id"] = devSession.user.id;
                    }

                    const response = await fetch("/api/user/profile", { headers });
                    if (response.ok) {
                        const userData = await response.json();
                        const profileData = {
                            name: userData.name || currentSession.user.name || "",
                            bio: userData.bio || "",
                            title: userData.title || "",
                            location: userData.location || "",
                            githubUrl: userData.githubUrl || "",
                            linkedinUrl: userData.linkedinUrl || "",
                            websiteUrl: userData.websiteUrl || "",
                            branch: userData.branch || "",
                            rank: userData.rank || "",
                            yearsServed: userData.yearsServed?.toString() || "",
                            mos: userData.mos || "",
                        };
                        setFormData(profileData);
                        setOriginalFormData(profileData);
                    } else {
                        // Fallback to session data if API fails
                        const fallbackData = {
                            name: currentSession.user.name || "",
                            bio: "",
                            title: "",
                            location: "",
                            githubUrl: "",
                            linkedinUrl: "",
                            websiteUrl: "",
                            branch: "",
                            rank: "",
                            yearsServed: "",
                            mos: "",
                        };
                        setFormData(fallbackData);
                        setOriginalFormData(fallbackData);
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    // Fallback to session data on error
                    const fallbackData = {
                        name: currentSession.user.name || "",
                        bio: "",
                        title: "",
                        location: "",
                        githubUrl: "",
                        linkedinUrl: "",
                        websiteUrl: "",
                        branch: "",
                        rank: "",
                        yearsServed: "",
                        mos: "",
                    };
                    setFormData(fallbackData);
                    setOriginalFormData(fallbackData);
                }
            }
        };
        fetchProfile();
    }, [currentSession]);

    useEffect(() => {
        // Only redirect if we've loaded dev session and there's no session at all
        if (devSessionLoaded && status === "unauthenticated" && !devSession) {
            router.replace("/login");
        }
    }, [status, router, devSession, devSessionLoaded]);

    if (!mounted || (!devSessionLoaded && status === "loading")) {
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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            // Add dev user ID header for dev mode
            const headers: HeadersInit = { "Content-Type": "application/json" };
            if (devSession) {
                headers["x-dev-user-id"] = devSession.user.id;
            }

            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers,
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsEditing(false);
                setOriginalFormData(formData); // Update the saved data
                setNotification({
                    type: "success",
                    message: "Profile updated successfully!",
                });
                // Auto-dismiss after 3 seconds
                setTimeout(() => setNotification(null), 3000);
            } else {
                const error = await response.json();
                setNotification({
                    type: "error",
                    message: error.message || "Failed to update profile",
                });
                // Auto-dismiss after 5 seconds for errors
                setTimeout(() => setNotification(null), 5000);
            }
        } catch (error) {
            setNotification({
                type: "error",
                message: "An error occurred while saving your profile",
            });
            // Auto-dismiss after 5 seconds for errors
            setTimeout(() => setNotification(null), 5000);
        } finally {
            setIsSaving(false);
        }
    };

    const progressPercentage = Math.round(
        (mockProgress.completedLessons / mockProgress.totalLessons) * 100
    );

    return (
        <>
            <SEO title="Profile" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Profile"
                showTitle={false}
            />

            {/* Notification Toast */}
            {notification && (
                <div
                    className={`tw-fixed tw-top-4 tw-right-4 tw-z-50 tw-rounded-lg tw-p-4 tw-shadow-lg tw-animate-in tw-fade-in tw-slide-in-from-top-5 tw-duration-300 ${
                        notification.type === "success"
                            ? "tw-bg-green-50 tw-text-green-800 tw-border tw-border-green-200"
                            : "tw-bg-red-50 tw-text-red-800 tw-border tw-border-red-200"
                    }`}
                >
                    <div className="tw-flex tw-items-center tw-space-x-2">
                        <i
                            className={`fas ${
                                notification.type === "success"
                                    ? "fa-check-circle"
                                    : "fa-exclamation-circle"
                            }`}
                        />
                        <span>{notification.message}</span>
                        <button
                            type="button"
                            onClick={() => setNotification(null)}
                            className="tw-ml-4 tw-text-gray-500 hover:tw-text-gray-700"
                            aria-label="Close notification"
                        >
                            <i className="fas fa-times" />
                        </button>
                    </div>
                </div>
            )}

            <div className="tw-container tw-py-8">
                {/* Profile Header */}
                <div className="tw-mb-8 tw-rounded-xl tw-bg-gradient-to-r tw-from-primary tw-to-primary/80 tw-p-8 tw-text-white">
                    <div className="tw-flex tw-flex-col tw-items-start tw-space-y-4 md:tw-flex-row md:tw-items-center md:tw-space-x-6 md:tw-space-y-0">
                        <div className="tw-relative">
                            {currentSession.user?.image ? (
                                <img
                                    src={currentSession.user.image}
                                    alt={currentSession.user.name || "User"}
                                    className="tw-h-24 tw-w-24 tw-rounded-full tw-border-4 tw-border-white/20"
                                />
                            ) : (
                                <div className="tw-flex tw-h-24 tw-w-24 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/20 tw-text-2xl">
                                    <i className="fas fa-user" />
                                </div>
                            )}
                            <button
                                type="button"
                                className="tw-absolute tw-bottom-0 tw-right-0 tw-rounded-full tw-bg-white tw-p-2 tw-text-secondary tw-shadow-lg tw-transition-colors hover:tw-bg-gray-100"
                                title="Change Profile Picture"
                            >
                                <i className="fas fa-camera tw-text-sm" />
                            </button>
                        </div>

                        <div className="tw-flex-1">
                            <div className="tw-mb-2 tw-flex tw-items-center tw-space-x-2">
                                <h1 className="tw-text-3xl tw-font-bold">
                                    {currentSession.user?.name || "User"}
                                </h1>
                                {devSession && (
                                    <span className="tw-rounded tw-bg-yellow-100 tw-px-2 tw-py-1 tw-text-xs tw-text-yellow-800">
                                        Dev Mode
                                    </span>
                                )}
                            </div>
                            <p className="tw-text-lg tw-opacity-90">{currentSession.user?.email}</p>
                            <p className="tw-opacity-75">
                                {formData.title || "Software Engineering Student"}{" "}
                                {formData.branch ? `• ${formData.branch} Veteran` : "• Army Veteran"}
                            </p>
                        </div>

                        <div className="tw-flex tw-space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(!isEditing)}
                                className="tw-rounded-lg tw-bg-white/20 tw-px-4 tw-py-2 tw-font-semibold tw-transition-colors hover:tw-bg-white/30"
                            >
                                <i className="fas fa-edit tw-mr-2" />
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="tw-rounded-lg tw-bg-danger tw-px-4 tw-py-2 tw-font-semibold tw-transition-colors hover:tw-bg-danger/90"
                            >
                                <i className="fas fa-sign-out-alt tw-mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="tw-mb-8">
                    <nav className="tw-flex tw-space-x-8 tw-border-b tw-border-gray-200">
                        {[
                            { id: "overview", label: "Overview", icon: "fas fa-chart-line" },
                            {
                                id: "progress",
                                label: "Learning Progress",
                                icon: "fas fa-graduation-cap",
                            },
                            { id: "achievements", label: "Achievements", icon: "fas fa-trophy" },
                            { id: "settings", label: "Settings", icon: "fas fa-cog" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`tw-flex tw-items-center tw-space-x-2 tw-border-b-2 tw-px-1 tw-py-4 tw-font-medium tw-transition-colors ${
                                    activeTab === tab.id
                                        ? "tw-border-primary tw-text-secondary"
                                        : "tw-border-transparent tw-text-secondary/60 hover:tw-border-primary/30 hover:tw-text-secondary"
                                }`}
                            >
                                <i className={tab.icon} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="tw-grid tw-grid-cols-1 tw-gap-8 lg:tw-grid-cols-3">
                    {activeTab === "overview" && (
                        <>
                            {/* Quick Stats */}
                            <div className="tw-col-span-1 tw-space-y-6 lg:tw-col-span-2">
                                <div className="tw-grid tw-grid-cols-2 tw-gap-6 md:tw-grid-cols-4">
                                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                                        <div className="tw-text-2xl tw-font-bold tw-text-secondary">
                                            {mockProgress.coursesCompleted}
                                        </div>
                                        <div className="tw-text-sm tw-text-secondary">
                                            Courses Completed
                                        </div>
                                    </div>
                                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                                        <div className="tw-text-2xl tw-font-bold tw-text-secondary">
                                            {progressPercentage}%
                                        </div>
                                        <div className="tw-text-sm tw-text-secondary">
                                            Overall Progress
                                        </div>
                                    </div>
                                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                                        <div className="tw-text-2xl tw-font-bold tw-text-success">
                                            {mockProgress.hoursLearned}
                                        </div>
                                        <div className="tw-text-sm tw-text-secondary">
                                            Hours Learned
                                        </div>
                                    </div>
                                    <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-text-center tw-shadow-md">
                                        <div className="tw-text-2xl tw-font-bold tw-text-warning">
                                            {mockProgress.currentStreak}
                                        </div>
                                        <div className="tw-text-sm tw-text-secondary">
                                            Day Streak
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                    <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                        Recent Activity
                                    </h3>
                                    <div className="tw-space-y-4">
                                        {mockProgress.recentActivity.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="tw-flex tw-items-center tw-space-x-3"
                                            >
                                                <div className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-primary" />
                                                <div className="tw-flex-1">
                                                    <div className="tw-text-sm tw-font-medium tw-text-gray-900">
                                                        {activity.action}: {activity.content}
                                                    </div>
                                                    <div className="tw-text-xs tw-text-secondary">
                                                        {activity.date}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Profile Details */}
                            <div className="tw-col-span-1">
                                <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                    <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                        Profile Details
                                    </h3>

                                    {isEditing ? (
                                        <div className="tw-space-y-4">
                                            <div>
                                                <label
                                                    htmlFor="bio"
                                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                                >
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-shadow-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="title"
                                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                                >
                                                    Current Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-shadow-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                                    placeholder="e.g., Software Engineer, Student"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="location"
                                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                                >
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-shadow-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                                    placeholder="City, State"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="branch"
                                                    className="tw-block tw-text-sm tw-font-medium tw-text-gray-700"
                                                >
                                                    Military Branch
                                                </label>
                                                <select
                                                    id="branch"
                                                    name="branch"
                                                    value={formData.branch}
                                                    onChange={handleInputChange}
                                                    title="Select your military branch"
                                                    className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border tw-border-gray-300 tw-px-3 tw-py-2 tw-shadow-sm focus:tw-border-primary focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-primary"
                                                >
                                                    <option value="">Select Branch</option>
                                                    <option value="Army">Army</option>
                                                    <option value="Navy">Navy</option>
                                                    <option value="Air Force">Air Force</option>
                                                    <option value="Marines">Marines</option>
                                                    <option value="Coast Guard">Coast Guard</option>
                                                    <option value="Space Force">Space Force</option>
                                                </select>
                                            </div>

                                            <div className="tw-flex tw-space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={handleSaveProfile}
                                                    disabled={isSaving}
                                                    className="tw-flex-1 tw-rounded-lg tw-bg-primary tw-px-4 tw-py-2 tw-font-semibold tw-text-white tw-transition-colors hover:tw-bg-primary/90 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                                                >
                                                    {isSaving ? (
                                                        <>
                                                            <i className="fas fa-spinner fa-spin tw-mr-2" />
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        "Save Changes"
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(originalFormData);
                                                        setIsEditing(false);
                                                    }}
                                                    disabled={isSaving}
                                                    className="tw-flex-1 tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-font-semibold tw-text-gray-700 tw-transition-colors hover:tw-bg-gray-50 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="tw-space-y-4 tw-text-sm">
                                            <div>
                                                <div className="tw-font-medium tw-text-gray-900">
                                                    Bio
                                                </div>
                                                <div className="tw-text-secondary">
                                                    {formData.bio ||
                                                        "No bio added yet. Click Edit Profile to add one."}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="tw-font-medium tw-text-gray-900">
                                                    Location
                                                </div>
                                                <div className="tw-text-secondary">
                                                    {formData.location || "Not specified"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="tw-font-medium tw-text-gray-900">
                                                    Military Branch
                                                </div>
                                                <div className="tw-text-secondary">
                                                    {formData.branch || "Not specified"}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="tw-font-medium tw-text-gray-900">
                                                    Member Since
                                                </div>
                                                <div className="tw-text-secondary">August 2025</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "progress" && (
                        <div className="tw-col-span-1 tw-space-y-6 lg:tw-col-span-3">
                            {/* Progress Overview */}
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                    Learning Progress
                                </h3>
                                <div className="tw-mb-4">
                                    <div className="tw-flex tw-justify-between tw-text-sm">
                                        <span>Overall Progress</span>
                                        <span>{progressPercentage}%</span>
                                    </div>
                                    <div className="tw-mt-2 tw-h-2 tw-w-full tw-rounded-full tw-bg-gray-200">
                                        <div
                                            className={`tw-h-2 tw-rounded-full tw-bg-primary tw-transition-all tw-duration-300 tw-w-[${progressPercentage}%]`}
                                        />
                                    </div>
                                </div>
                                <div className="tw-text-sm tw-text-secondary">
                                    {mockProgress.completedLessons} of {mockProgress.totalLessons}{" "}
                                    lessons completed
                                </div>
                            </div>

                            {/* Current Courses */}
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                    Current Enrollments
                                </h3>
                                <div className="tw-space-y-4">
                                    <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-p-4">
                                        <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between">
                                            <h4 className="tw-font-medium tw-text-gray-900">
                                                Software Engineering
                                            </h4>
                                            <span className="tw-rounded tw-bg-primary/10 tw-px-2 tw-py-1 tw-text-xs tw-text-secondary">
                                                In Progress
                                            </span>
                                        </div>
                                        <div className="tw-mb-2 tw-h-1.5 tw-w-full tw-rounded-full tw-bg-gray-200">
                                            <div className="tw-h-1.5 tw-w-1/3 tw-rounded-full tw-bg-primary" />
                                        </div>
                                        <div className="tw-text-sm tw-text-secondary">
                                            33% complete • 12/36 lessons
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "achievements" && (
                        <div className="tw-col-span-1 tw-space-y-6 lg:tw-col-span-3">
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                    Achievements
                                </h3>
                                <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
                                    {mockProgress.achievements.map((achievement) => (
                                        <div
                                            key={achievement.id}
                                            className={`tw-flex tw-items-center tw-space-x-4 tw-rounded-lg tw-border tw-p-4 ${
                                                achievement.earned
                                                    ? "tw-border-success tw-bg-success/5"
                                                    : "tw-border-gray-200 tw-bg-gray-50"
                                            }`}
                                        >
                                            <div
                                                className={`tw-flex tw-h-12 tw-w-12 tw-items-center tw-justify-center tw-rounded-full ${
                                                    achievement.earned
                                                        ? "tw-bg-success tw-text-white"
                                                        : "tw-bg-gray-300 tw-text-gray-500"
                                                }`}
                                            >
                                                <i className="fas fa-trophy" />
                                            </div>
                                            <div>
                                                <h4 className="tw-font-medium tw-text-gray-900">
                                                    {achievement.title}
                                                </h4>
                                                <p className="tw-text-sm tw-text-secondary">
                                                    {achievement.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="tw-col-span-1 tw-space-y-6 lg:tw-col-span-3">
                            <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow-md">
                                <h3 className="tw-mb-4 tw-text-lg tw-font-semibold tw-text-gray-900">
                                    Account Settings
                                </h3>
                                <div className="tw-space-y-6">
                                    <div>
                                        <h4 className="tw-mb-2 tw-font-medium tw-text-gray-900">
                                            Notifications
                                        </h4>
                                        <div className="tw-space-y-2">
                                            <label className="tw-flex tw-items-center">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="tw-mr-3 tw-h-4 tw-w-4 tw-text-secondary"
                                                />
                                                <span className="tw-text-sm tw-text-secondary">
                                                    Email notifications for course updates
                                                </span>
                                            </label>
                                            <label className="tw-flex tw-items-center">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="tw-mr-3 tw-h-4 tw-w-4 tw-text-secondary"
                                                />
                                                <span className="tw-text-sm tw-text-secondary">
                                                    Weekly progress reports
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="tw-mb-2 tw-font-medium tw-text-gray-900">
                                            Privacy
                                        </h4>
                                        <div className="tw-space-y-2">
                                            <label className="tw-flex tw-items-center">
                                                <input
                                                    type="checkbox"
                                                    className="tw-mr-3 tw-h-4 tw-w-4 tw-text-secondary"
                                                />
                                                <span className="tw-text-sm tw-text-secondary">
                                                    Make profile visible to other veterans
                                                </span>
                                            </label>
                                            <label className="tw-flex tw-items-center">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="tw-mr-3 tw-h-4 tw-w-4 tw-text-secondary"
                                                />
                                                <span className="tw-text-sm tw-text-secondary">
                                                    Show progress on leaderboards
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
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
