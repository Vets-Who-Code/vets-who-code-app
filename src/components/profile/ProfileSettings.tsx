const ProfileSettings = () => (
    <div className="tw-space-y-6">
        <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
            <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                Notifications
            </h3>
            <div className="tw-space-y-3">
                <Toggle label="Email notifications for course updates" defaultChecked />
                <Toggle label="Weekly progress reports" defaultChecked />
                <Toggle label="New assignment alerts" defaultChecked={false} />
            </div>
        </div>

        <div className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-6 tw-shadow-sm">
            <h3 className="tw-mb-4 tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                Privacy
            </h3>
            <div className="tw-space-y-3">
                <Toggle label="Make profile visible to other veterans" defaultChecked={false} />
                <Toggle label="Show progress on leaderboards" defaultChecked />
                <Toggle label="Display GitHub stats on profile" defaultChecked />
            </div>
        </div>
    </div>
);

function Toggle({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
    return (
        <label className="tw-flex tw-items-center tw-gap-3 tw-cursor-pointer tw-group">
            <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className="tw-h-4 tw-w-4 tw-rounded tw-border-navy/20 tw-text-navy focus:tw-ring-gold/50"
            />
            <span className="tw-font-mono tw-text-xs tw-text-gray-300 group-hover:tw-text-ink tw-transition-colors">
                {label}
            </span>
        </label>
    );
}

export default ProfileSettings;
