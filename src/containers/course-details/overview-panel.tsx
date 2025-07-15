import { IContent } from "@utils/types";

import HTMLContent from "@components/html-content";

type TProps = {
    description: IContent[];
};

const OverviewPanel = ({ description }: TProps) => {
    return (
        <div className="course-overview tw:prose tw:max-w-none tw:prose-h2:text-xl tw:sm:prose-h2:text-3xl">
            <h2 className="title tw:mb-5">Course Description</h2>
            <HTMLContent body={description} />
        </div>
    );
};

export default OverviewPanel;
