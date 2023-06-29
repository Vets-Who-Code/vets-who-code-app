import { motion } from "framer-motion";
import Section from "@ui/section";
import CourseCard from "@components/course-card/course-03";
import { ICourse } from "@utils/types";
import { courseSorting } from "@utils/methods";
import { useSort, useLoadMore } from "@hooks";
import { scrollUpVariants } from "@utils/variants";

const AnimatedCourseCard = motion(CourseCard);

type TProps = {
    data: {
        courses: ICourse[];
    };
};

const CourseArea = ({ data: { courses } }: TProps) => {
    const { sortedItems } = useSort<ICourse>(courses, courseSorting);
    const { itemsToShow } = useLoadMore<ICourse>(sortedItems, 8, 2);

    return (
        <Section className="course-area" space="bottom">
            <h2 className="tw-sr-only">Subjects Section</h2>
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-items-center tw-mb-5">
                    <p className="tw-mb-2.5">
                        We found {sortedItems.length} subjects available for you
                    </p>
                </div>
                <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-7.5">
                    {itemsToShow?.map((course) => (
                        <AnimatedCourseCard
                            key={course.path}
                            title={course.title}
                            path={course.path}
                            thumbnail={course.thumbnail}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default CourseArea;
