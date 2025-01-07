import { motion } from "motion/react";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import CourseCard from "@components/course-card/course-01";
import MottoText from "@components/ui/motto-text";
import { scrollUpVariants } from "@utils/variants";
import { MottoType, SectionTitleType, ICourse, TSection } from "@utils/types";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedCourseCard = motion(CourseCard);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        motto?: MottoType;
        courses: ICourse[];
    };
};

const CourseArea = ({ data: { section_title, motto, courses }, space, bg, titleSize }: TProps) => {
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
                <div className="tw-grid tw-gap-[30px] md:tw-grid-cols-2 lg:tw-grid-cols-3">
                    {courses?.map((course) => (
                        <AnimatedCourseCard
                            key={course.path}
                            title={course.title}
                            path={course.path}
                            published_at={course.published_at}
                            thumbnail={course.thumbnail}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
                {motto && (
                    <div className="tw-mx-auto tw-mt-[70px] tw-text-center lg:tw-w-7/12">
                        <MottoText {...motto} />
                    </div>
                )}
            </div>
        </Section>
    );
};

CourseArea.defaultProps = {
    space: "top-bottom",
};

export default CourseArea;
