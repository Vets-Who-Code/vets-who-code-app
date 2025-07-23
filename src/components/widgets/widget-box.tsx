const WidgetBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="course-info-widget tw:rounded-sm tw:bg-white tw:px-7.5 tw:pb-[33px] tw:pt-7.5 tw:shadow-2sm tw:shadow-heading/10">
            {children}
        </div>
    );
};

export default WidgetBox;
