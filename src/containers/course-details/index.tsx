import {
    TabContainer,
    /* TabNav, */ TabPane,
    /* TabList, */ TabContent,
} from "@ui/tab";
import { ICourse, ICurriculum, IInstructor } from "@utils/types";
import CourseInfo from "@widgets/course-info";
import OverviewPanel from "./overview-panel";
import CurriculamPanel from "./curriculam-panel";
import InstructorPanel from "./instructor-panel";

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
                        {/*
                      <TabList>
                            <TabNav>Overview</TabNav>
                            <TabNav>Curriculum</TabNav>
                            <TabNav>Instructor</TabNav>
                        </TabList>
                        */}
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
                        </TabContent>
                    </TabContainer>
                </div>
            </div>
        </section>
    );
};

export default CourseDetails;
