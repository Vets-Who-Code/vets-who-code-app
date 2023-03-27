const ExpandButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="tw-absolute tw-z-10 tw-top-[11px] tw-right-0 tw-flex tw-justify-center tw-items-center tw-w-10 tw-h-10 tw-text-white tw-rounded-full tw-transition-colors hover:tw-bg-white/20"
        >
            <i className="fa fa-chevron-down tw-text-xs" />
        </button>
    );
};

export default ExpandButton;
