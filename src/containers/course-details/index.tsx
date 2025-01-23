import { TabContainer, TabNav, TabPane, TabList, TabContent } from "@ui/tab";
import { ICourse, ICurriculum, IInstructor } from "@utils/types";
import CourseInfo from "@widgets/course-info";
import OverviewPanel from "./overview-panel";
import CurriculamPanel from "./curriculam-panel";
import InstructorPanel from "./instructor-panel";
import ReviewPanel from "./review-panel";

type TProps = {
    data: {
        course: ICourse;
        curriculum: ICurriculum[];
        instructor: IInstructor;
    };
};

const CourseDetails = ({
    data: { course, curriculum, instructor },
}: TProps) => {
    return (
        <section className="course-details">
            <div className="tw-container tw-grid lg:tw-grid-cols-3 tw-gap-12">
                <div className="lg:tw-col-[1/3]">
                    <TabContainer variant="underline">
                        <TabList>
                            <TabNav>Overview</TabNav>
                            <TabNav>Curriculam</TabNav>
                            <TabNav>Instructor</TabNav>
                            <TabNav>Reviews</TabNav>
                        </TabList>
                        <TabContent className="tw-mt-10 lg:tw-mt-[50px]">
                            <TabPane>
                                {course?.description && (
                                    <OverviewPanel
                                        description={course?.description}
                                    />
                                )}
                            </TabPane>
                            <TabPane>
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
                            </TabPane>
                        </TabContent>
                    </TabContainer>
                </div>
                <div className="lg:tw-col-[3/-1]">
                    <div className="tw-sticky tw-top-24">
                        <CourseInfo
                            lessonLink={curriculum[0].lessons[0].path}
                            slug={course.slug}
                            price={course.price}
                            currency={course.currency}
                            instructor={instructor.name}
                            duration={course.duration}
                            lectures={course.total_lectures}
                            students={course.total_students}
                            language={course.language}
                            published_at={course.published_at}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
