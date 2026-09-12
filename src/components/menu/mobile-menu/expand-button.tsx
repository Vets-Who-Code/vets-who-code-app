const ExpandButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            aria-label="Toggle submenu"
            className="tw-absolute tw-right-0 tw-top-[11px] tw-z-10 tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-full tw-text-white tw-transition-colors hover:tw-bg-white/20"
        >
            <i className="fa fa-chevron-down tw-text-xs" aria-hidden="true" />
        </button>
    );
};

export default ExpandButton;
