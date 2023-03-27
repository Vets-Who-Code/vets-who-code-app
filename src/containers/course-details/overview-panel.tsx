import { IContent } from "@utils/types";

import HTMLContent from "@components/html-content";

type TProps = {
    description: IContent[];
};

const OverviewPanel = ({ description }: TProps) => {
    return (
        <div className="course-overview tw-prose prose-h2:tw-text-xl sm:prose-h2:tw-text-3xl tw-max-w-none">
            <h2 className="title tw-mb-5">Course Description</h2>
            <HTMLContent body={description} />
        </div>
    );
};

export default OverviewPanel;
