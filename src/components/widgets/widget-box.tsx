const WidgetBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="course-info-widget tw-pt-7.5 tw-px-7.5 tw-pb-[33px] tw-bg-white tw-shadow-2sm tw-shadow-heading/10 tw-rounded">
            {children}
        </div>
    );
};

export default WidgetBox;
