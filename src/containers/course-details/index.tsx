import { TabContainer, TabNav, TabPane, TabList, TabContent } from "@ui/tab";
import { ICourse, IInstructor } from "@utils/types";
import OverviewPanel from "./overview-panel";
// import InstructorPanel from "./instructor-panel";
// import ReviewPanel from "./review-panel";

type TProps = {
    data: {
        course: ICourse;
    };
};

const CourseDetails = ({ data: { course } }: TProps) => {
    return (
        <section className="course-details">
            <div className="tw-container tw-grid lg:tw-grid-cols-3 tw-gap-12">
                <div className="lg:tw-col-[1/3]">
                    <TabContainer variant="underline">
                        <TabList>
                            <TabNav>Overview</TabNav>
                            {/* Remove unused tabs */}
                            {/* <TabNav>Curriculum</TabNav>
                            <TabNav>Instructor</TabNav>
                            <TabNav>Reviews</TabNav> */}
                        </TabList>
                        <TabContent className="tw-mt-10 lg:tw-mt-[50px]">
                            <TabPane>
                                {course?.description && (
                                    <OverviewPanel
                                        description={course?.description}
                                    />
                                )}
                            </TabPane>
                            {/* Remove unused TabPane components */}
                            {/* <TabPane>
                                {curriculum && (
                                    <CurriculamPanel
                                        curriculum={curriculum}
                                        courseSlug={course.slug}
                                    />
                                )}
                            </TabPane>
                            <TabPane>
                                <InstructorPanel {...instructor} />
                            </TabPane>
                            <TabPane>
                                {course?.reviews && (
                                    <ReviewPanel {...course.reviews} />
                                )}
                            </TabPane> */}
                        </TabContent>
                    </TabContainer>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
