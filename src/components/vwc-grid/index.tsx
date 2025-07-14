import Section from "@components/ui/engagement-modal";
import { PropsWithChildren } from "react";

interface TProps {
    title: string;
}

export const VWCGrid = ({ title, children }: PropsWithChildren<TProps>) => {
    // const { itemsToShow } = useLoadMore<ICourse>(sortedItems, 9, 3);

    return (
        <Section className="course-area" space="bottom">
            <h2 className="tw:sr-only">{title}</h2>
            <div className="tw:container">
                <div className="tw:grid tw:grid-cols-1 tw:gap-[30px] tw:md:grid-cols-2 tw:lg:grid-cols-3">
                    {children}
                </div>
            </div>
        </Section>
    );
};

export default VWCGrid;
