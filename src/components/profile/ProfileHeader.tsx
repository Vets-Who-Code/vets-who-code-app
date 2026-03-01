import { motion } from "framer-motion";
import type { ProfileUser, ProfileFormData, GitHubData } from "@/types/profile";

interface ProfileHeaderProps {
    user: ProfileUser;
    formData: ProfileFormData;
    github: GitHubData | null;
    isEditing: boolean;
    onToggleEdit: () => void;
    onLogout: () => void;
}

const ProfileHeader = ({
    user,
    formData,
    github,
    isEditing,
    onToggleEdit,
    onLogout,
}: ProfileHeaderProps) => {
    const accountAge = github?.stats.accountAgeDays
        ? Math.floor(github.stats.accountAgeDays / 365)
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tw-mb-8 tw-rounded-xl tw-bg-gradient-to-br tw-from-navy tw-via-navy-deep tw-to-secondary-dark tw-p-8 tw-text-white tw-relative tw-overflow-hidden"
        >
            {/* Subtle grid overlay */}
            <div
                className="tw-absolute tw-inset-0 tw-opacity-5"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="tw-relative tw-flex tw-flex-col tw-items-start tw-space-y-6 md:tw-flex-row md:tw-items-center md:tw-space-x-8 md:tw-space-y-0">
                {/* Avatar */}
                <div className="tw-relative tw-flex-shrink-0">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="tw-h-28 tw-w-28 tw-rounded-full tw-border-4 tw-border-gold/40 tw-shadow-lg tw-shadow-gold/10"
                        />
                    ) : (
                        <div className="tw-flex tw-h-28 tw-w-28 tw-items-center tw-justify-center tw-rounded-full tw-bg-white/10 tw-text-3xl tw-border-4 tw-border-gold/40">
                            <i className="fas fa-user" />
                        </div>
                    )}
                    {formData.branch && (
                        <div className="tw-absolute -tw-bottom-1 -tw-right-1 tw-rounded-full tw-bg-gold tw-px-2 tw-py-1 tw-text-xs tw-font-bold tw-text-navy tw-shadow-md">
                            {formData.branch}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="tw-flex-1 tw-min-w-0">
                    <h1 className="tw-text-3xl tw-font-bold tw-tracking-tight">
                        {user.name || "Operator"}
                    </h1>
                    <p className="tw-mt-1 tw-font-mono tw-text-sm tw-text-gold/80">
                        {formData.title || "Software Engineering Recruit"}{" "}
                        {formData.branch && (
                            <span className="tw-text-white/60">// {formData.branch} Veteran</span>
                        )}
                    </p>
                    {formData.location && (
                        <p className="tw-mt-1 tw-text-sm tw-text-white/60">
                            <i className="fas fa-map-marker-alt tw-mr-1" />
                            {formData.location}
                        </p>
                    )}

                    {/* GitHub stats row */}
                    {github && (
                        <div className="tw-mt-4 tw-flex tw-flex-wrap tw-gap-4 tw-font-mono tw-text-xs">
                            <span className="tw-text-gold">
                                <i className="fas fa-code-branch tw-mr-1" />
                                {github.profile.public_repos} repos
                            </span>
                            <span className="tw-text-gold">
                                <i className="fas fa-star tw-mr-1" />
                                {github.stats.totalStars} stars
                            </span>
                            <span className="tw-text-white/70">
                                <i className="fas fa-users tw-mr-1" />
                                {github.profile.followers} followers
                            </span>
                            {accountAge !== null && accountAge > 0 && (
                                <span className="tw-text-white/70">
                                    <i className="fas fa-clock tw-mr-1" />
                                    {accountAge}yr on GitHub
                                </span>
                            )}
                        </div>
                    )}

                    {/* Social links */}
                    <div className="tw-mt-3 tw-flex tw-gap-3">
                        {github?.profile.html_url && (
                            <a
                                href={github.profile.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-text-white/50 hover:tw-text-gold tw-transition-colors"
                                aria-label="GitHub profile"
                            >
                                <i className="fab fa-github tw-text-lg" />
                            </a>
                        )}
                        {formData.linkedinUrl && (
                            <a
                                href={formData.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-text-white/50 hover:tw-text-gold tw-transition-colors"
                                aria-label="LinkedIn profile"
                            >
                                <i className="fab fa-linkedin tw-text-lg" />
                            </a>
                        )}
                        {formData.websiteUrl && (
                            <a
                                href={formData.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-text-white/50 hover:tw-text-gold tw-transition-colors"
                                aria-label="Personal website"
                            >
                                <i className="fas fa-globe tw-text-lg" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="tw-flex tw-flex-shrink-0 tw-space-x-3">
                    <button
                        type="button"
                        onClick={onToggleEdit}
                        className="tw-rounded-lg tw-border tw-border-gold/30 tw-bg-gold/10 tw-px-4 tw-py-2 tw-font-mono tw-text-sm tw-font-semibold tw-text-gold tw-transition-all hover:tw-bg-gold/20"
                    >
                        <i className={`fas ${isEditing ? "fa-times" : "fa-edit"} tw-mr-2`} />
                        {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                    <button
                        type="button"
                        onClick={onLogout}
                        className="tw-rounded-lg tw-bg-red/80 tw-px-4 tw-py-2 tw-font-mono tw-text-sm tw-font-semibold tw-text-white tw-transition-all hover:tw-bg-red"
                    >
                        <i className="fas fa-sign-out-alt tw-mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileHeader;
