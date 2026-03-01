import type { ProfileFormData } from "@/types/profile";

interface ServiceRecordProps {
    formData: ProfileFormData;
    isEditing: boolean;
    isSaving: boolean;
    onInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    onSave: () => void;
    onCancel: () => void;
}

const BRANCHES = ["Army", "Navy", "Air Force", "Marines", "Coast Guard", "Space Force"];

const ServiceRecord = ({
    formData,
    isEditing,
    isSaving,
    onInputChange,
    onSave,
    onCancel,
}: ServiceRecordProps) => {
    if (isEditing) {
        return (
            <div className="tw-space-y-8">
                {/* Personal Info */}
                <section className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        Personnel Data
                    </h3>
                    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                        <Field label="Full Name" name="name" value={formData.name} onChange={onInputChange} placeholder="Your name" />
                        <Field label="Current Title" name="title" value={formData.title} onChange={onInputChange} placeholder="e.g., Software Engineer" />
                        <Field label="Location" name="location" value={formData.location} onChange={onInputChange} placeholder="City, State" />
                        <div>
                            <label htmlFor="bio" className="tw-block tw-font-mono tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-text-navy/50 tw-mb-1">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={onInputChange}
                                rows={3}
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/15 tw-bg-cream/30 tw-px-3 tw-py-2 tw-font-mono tw-text-sm tw-text-ink focus:tw-border-gold focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-gold/50"
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </div>
                </section>

                {/* Military Info */}
                <section className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        Military Service
                    </h3>
                    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                        <div>
                            <label htmlFor="branch" className="tw-block tw-font-mono tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-text-navy/50 tw-mb-1">
                                Branch
                            </label>
                            <select
                                id="branch"
                                name="branch"
                                value={formData.branch}
                                onChange={onInputChange}
                                title="Select military branch"
                                className="tw-w-full tw-rounded-md tw-border tw-border-navy/15 tw-bg-cream/30 tw-px-3 tw-py-2 tw-font-mono tw-text-sm tw-text-ink focus:tw-border-gold focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-gold/50"
                            >
                                <option value="">Select Branch</option>
                                {BRANCHES.map((b) => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        </div>
                        <Field label="Rank" name="rank" value={formData.rank} onChange={onInputChange} placeholder="e.g., E-5, O-3" />
                        <Field label="Years Served" name="yearsServed" value={formData.yearsServed} onChange={onInputChange} placeholder="e.g., 4" />
                        <Field label="MOS / AFSC / Rating" name="mos" value={formData.mos} onChange={onInputChange} placeholder="e.g., 25B, 0311" />
                    </div>
                </section>

                {/* Links */}
                <section className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                    <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                        Comms Links
                    </h3>
                    <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                        <Field label="GitHub URL" name="githubUrl" value={formData.githubUrl} onChange={onInputChange} placeholder="https://github.com/..." />
                        <Field label="LinkedIn URL" name="linkedinUrl" value={formData.linkedinUrl} onChange={onInputChange} placeholder="https://linkedin.com/in/..." />
                        <Field label="Website URL" name="websiteUrl" value={formData.websiteUrl} onChange={onInputChange} placeholder="https://..." />
                    </div>
                </section>

                {/* Save/Cancel */}
                <div className="tw-flex tw-gap-3">
                    <button
                        type="button"
                        onClick={onSave}
                        disabled={isSaving}
                        className="tw-flex-1 tw-rounded-lg tw-bg-gradient-to-r tw-from-navy tw-to-navy-deep tw-px-6 tw-py-3 tw-font-mono tw-text-sm tw-font-bold tw-text-gold tw-transition-all hover:tw-shadow-lg disabled:tw-opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <i className="fas fa-spinner fa-spin tw-mr-2" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save tw-mr-2" />
                                Save Record
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSaving}
                        className="tw-flex-1 tw-rounded-lg tw-border tw-border-navy/15 tw-px-6 tw-py-3 tw-font-mono tw-text-sm tw-font-semibold tw-text-gray-300 tw-transition-all hover:tw-bg-navy/5 disabled:tw-opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    // View mode
    return (
        <div className="tw-space-y-8">
            <section className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    Personnel Data
                </h3>
                <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                    <InfoRow label="Full Name" value={formData.name} />
                    <InfoRow label="Title" value={formData.title} />
                    <InfoRow label="Location" value={formData.location} />
                    <InfoRow label="Bio" value={formData.bio} />
                </div>
            </section>

            <section className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    Military Service
                </h3>
                <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                    <InfoRow label="Branch" value={formData.branch} />
                    <InfoRow label="Rank" value={formData.rank} />
                    <InfoRow label="Years Served" value={formData.yearsServed} />
                    <InfoRow label="MOS / AFSC / Rating" value={formData.mos} />
                </div>
            </section>

            <section className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
                <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    Comms Links
                </h3>
                <div className="tw-grid tw-gap-4 md:tw-grid-cols-2">
                    <InfoRow label="GitHub" value={formData.githubUrl} isLink />
                    <InfoRow label="LinkedIn" value={formData.linkedinUrl} isLink />
                    <InfoRow label="Website" value={formData.websiteUrl} isLink />
                </div>
            </section>
        </div>
    );
};

function Field({
    label,
    name,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}) {
    return (
        <div>
            <label htmlFor={name} className="tw-block tw-font-mono tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wider tw-text-navy/50 tw-mb-1">
                {label}
            </label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="tw-w-full tw-rounded-md tw-border tw-border-navy/15 tw-bg-cream/30 tw-px-3 tw-py-2 tw-font-mono tw-text-sm tw-text-ink focus:tw-border-gold focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-gold/50"
                placeholder={placeholder}
            />
        </div>
    );
}

function InfoRow({
    label,
    value,
    isLink,
}: {
    label: string;
    value: string;
    isLink?: boolean;
}) {
    return (
        <div>
            <div className="tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-widest tw-text-navy/40">
                {label}
            </div>
            {value ? (
                isLink ? (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw-font-mono tw-text-sm tw-text-navy-ocean hover:tw-text-gold tw-transition-colors"
                    >
                        {value}
                    </a>
                ) : (
                    <div className="tw-text-sm tw-text-ink">{value}</div>
                )
            ) : (
                <div className="tw-text-sm tw-text-gray-300 tw-italic">Not specified</div>
            )}
        </div>
    );
}

export default ServiceRecord;
