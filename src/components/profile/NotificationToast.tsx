interface NotificationToastProps {
    type: "success" | "error";
    message: string;
    onDismiss: () => void;
}

const NotificationToast = ({ type, message, onDismiss }: NotificationToastProps) => (
    <div
        className={`tw-fixed tw-top-4 tw-right-4 tw-z-50 tw-rounded-lg tw-p-4 tw-shadow-lg tw-animate-in tw-fade-in tw-slide-in-from-top-5 tw-duration-300 ${
            type === "success"
                ? "tw-bg-navy/95 tw-text-gold tw-border tw-border-gold/30"
                : "tw-bg-red-dark/95 tw-text-white tw-border tw-border-red/30"
        }`}
    >
        <div className="tw-flex tw-items-center tw-space-x-2">
            <i
                className={`fas ${
                    type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
                }`}
            />
            <span className="tw-font-mono tw-text-sm">{message}</span>
            <button
                type="button"
                onClick={onDismiss}
                className="tw-ml-4 tw-opacity-60 hover:tw-opacity-100 tw-transition-opacity"
                aria-label="Close notification"
            >
                <i className="fas fa-times" />
            </button>
        </div>
    </div>
);

export default NotificationToast;
