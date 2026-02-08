import Section from "@components/ui/engagement-modal";
import Social, { SocialLink } from "@components/ui/social";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface UserProfile {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    bio: string | null;
    title: string | null;
}

const ProfileBio = () => {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<UserProfile>>({});

    useEffect(() => {
        if (session?.user?.id) {
            fetchProfile();
        }
    }, [session]);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/user/profile-basic");
            if (response.ok) {
                const userData = await response.json();
                setProfile(userData);
                setFormData(userData);
            }
        } catch (_error) {
            // Error handling
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch("/api/user/profile-basic", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                setProfile(updatedProfile);
                setIsEditing(false);
            }
        } catch (_error) {
            // Error handling
        } finally {
            setSaving(false);
        }
    };

    if (loading || !profile) {
        return (
            <Section className="profile-area" space="bottom">
                <div className="tw-container tw-flex tw-min-h-[400px] tw-items-center tw-justify-center">
                    <div className="tw-text-center">
                        <div className="tw-mx-auto tw-h-16 tw-w-16 tw-animate-spin tw-rounded-full tw-border-b-2 tw-border-primary" />
                        <p className="tw-mt-4 tw-text-gray-300">Loading your profile...</p>
                    </div>
                </div>
            </Section>
        );
    }

    return (
        <Section className="profile-area" space="bottom">
            <div className="tw-container">
                {/* Header with Edit Button */}
                <div className="tw-mb-8 tw-flex tw-items-center tw-justify-between">
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Your Profile</h1>
                    <div className="tw-flex tw-space-x-3">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData(profile);
                                    }}
                                    className="tw-rounded-md tw-border tw-border-gray-300 tw-px-4 tw-py-2 tw-text-gray-200 hover:tw-bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-white disabled:tw-opacity-50"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="hover:tw-bg-primary-dark tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-white"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Profile Content */}
                <div className="tw-grid tw-grid-cols-1 tw-items-start tw-gap-7.5 md:tw-grid-cols-12 lg:tw-items-center">
                    <figure className="tw-col-span-full md:tw-col-span-6 xl:tw-col-span-5">
                        <img
                            className="tw-w-full tw-rounded-lg"
                            src={
                                profile.image ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || profile.email)}&background=c5203e&color=fff&size=470`
                            }
                            alt={profile.name || "Profile"}
                            width={470}
                            height={470}
                        />
                    </figure>
                    <div className="tw-col-span-full md:tw-col-[7/-1]">
                        {isEditing ? (
                            <div className="tw-space-y-6">
                                {/* Basic Info Editing */}
                                <div className="tw-space-y-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={formData.name || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-gray-300 tw-shadow-sm focus:tw-border-primary focus:tw-ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                                        >
                                            Job Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            value={formData.title || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            className="tw-mt-1 tw-block tw-w-full tw-rounded-md tw-border-gray-300 tw-shadow-sm focus:tw-border-primary focus:tw-ring-primary"
                                            placeholder="e.g., Software Engineer, Student"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="bio"
                                            className="tw-block tw-text-sm tw-font-medium tw-text-gray-200"
                                        >
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            value={formData.bio || ""}
                                            onChange={(e) =>
                                                setFormData({ ...formData, bio: e.target.value })
                                            }
                                            rows={4}
                                            className="tw-w-full tw-rounded-md tw-border-gray-300 tw-shadow-sm focus:tw-border-primary focus:tw-ring-primary"
                                            placeholder="Tell us about yourself, your goals, and what you're learning..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Display Mode */}
                                <h2 className="tw-mb-0 tw-leading-[1.42]">
                                    {profile.name || "Your Name"}
                                </h2>
                                <h3 className="tw-mb-0 tw-text-h6 tw-font-normal tw-leading-relaxed tw-text-body">
                                    {profile.title || "Add your title"}
                                </h3>

                                <p className="tw-mb-0 tw-mt-3.8">
                                    {profile.bio ||
                                        'Click "Edit Profile" to add your bio and tell us about yourself, your goals, and what you\'re learning!'}
                                </p>

                                <h4 className="tw-mb-2.5 tw-mt-9 tw-text-h5">Contact</h4>
                                <div className="contact-info-text">
                                    <br />
                                    <span className="email">
                                        Email:{" "}
                                        <strong className="tw-text-heading">{profile.email}</strong>
                                    </span>
                                </div>

                                <Social
                                    shape="circle"
                                    variant="outlined"
                                    color="light"
                                    className="tw-mt-7.5"
                                >
                                    <SocialLink
                                        href="https://twitter.com"
                                        label="twitter link"
                                        className="tw-mr-3"
                                    >
                                        <i className="fab fa-twitter" />
                                    </SocialLink>
                                    <SocialLink
                                        href="https://facebook.com"
                                        label="facebook link"
                                        className="tw-mr-3"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </SocialLink>
                                    <SocialLink
                                        href="https://github.com"
                                        label="github link"
                                        className="tw-mr-3"
                                    >
                                        <i className="fab fa-github" />
                                    </SocialLink>
                                    <SocialLink
                                        href="https://linkedin.com"
                                        label="linkedin link"
                                        className="tw-mr-3"
                                    >
                                        <i className="fab fa-linkedin" />
                                    </SocialLink>
                                </Social>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ProfileBio;
