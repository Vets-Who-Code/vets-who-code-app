import { motion } from "framer-motion";
import Section from "@ui/section";
import CourseCard from "@components/course-card/course-02";
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
    const { itemsToShow } = useLoadMore<ICourse>(sortedItems, 9, 3);

    return (
        <Section className="course-area" space="bottom">
            <h2 className="tw-sr-only">Course Section</h2>
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[30px]">
                    {itemsToShow?.map((course) => (
                        <AnimatedCourseCard
                            key={course.path}
                            title={course.title}
                            path={course.path}
                            thumbnail={course.thumbnail}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default CourseArea;
