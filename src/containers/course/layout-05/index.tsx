import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import SectionTitle from "@components/section-title";
import CourseCard from "@components/course-card/course-02";
import Button from "@ui/button";
import { scrollUpVariants } from "@utils/variants";
import { SectionTitleType, ICourse, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        courses: ICourse[];
    };
};

const CourseArea = ({ data: { section_title, courses }, space, bg, titleSize }: TProps) => {
    return (
        <Section className="course-area" space={space} bg={bg}>
            <div className="tw:container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw:mb-7.5 tw:md:mb-15"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <div className="tw:grid tw:gap-7.5 tw:md:grid-cols-2 tw:lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.path}
                            title={course.title}
                            path={course.path}
                            thumbnail={course.thumbnail}
                        />
                    ))}
                </div>
                <motion.div
                    className="tw:text-center"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    <Button path="/subjects/all" className="tw:mt-[50px]">
                        View All Subjects <i className="far fa-long-arrow-right tw:ml-3" />
                    </Button>
                </motion.div>
            </div>
        </Section>
    );
};

export default CourseArea;
