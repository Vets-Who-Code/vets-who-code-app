import HTMLContent from "@components/html-content";
import { IContent } from "@utils/types";

type TProps = {
    description: IContent[];
};

const OverviewPanel = ({ description }: TProps) => {
    return (
        <div className="course-overview tw-prose tw-max-w-none prose-h2:tw-text-xl sm:prose-h2:tw-text-3xl">
            <h2 className="title tw-mb-5">Course Description</h2>
            <HTMLContent body={description} />
        </div>
    );
};

export default OverviewPanel;
