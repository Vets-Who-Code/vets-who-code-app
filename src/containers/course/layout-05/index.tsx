import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import CourseCard from "@components/course-card/course-02";
import Button from "@ui/button";
import { scrollUpVariants } from "@utils/variants";
import { SectionTitleType, ICourse, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedCourseCard = motion(CourseCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        courses: ICourse[];
    };
};

const CourseArea = ({
    data: { section_title, courses },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section className="course-area" space={space} bg={bg}>
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-7.5 md:tw-mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                    {courses.map((course) => (
                        <AnimatedCourseCard
                            key={course.path}
                            title={course.title}
                            path={course.path}
                            thumbnail={course.thumbnail}
                            price={course.price}
                            currency={course.currency}
                            total_lectures={course.total_lectures}
                            total_students={course.total_students}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
                <motion.div
                    className="tw-text-center"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    <Button path="/courses/grid-03" className="tw-mt-[50px]">
                        View all courses{" "}
                        <i className="far fa-long-arrow-right tw-ml-3" />
                    </Button>
                </motion.div>
            </div>
        </Section>
    );
};

export default CourseArea;
