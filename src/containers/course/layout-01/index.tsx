import { motion } from "framer-motion";
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

const CourseArea = ({
    data: { section_title, motto, courses },
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
                <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[30px]">
                    {courses?.map((course) => (
                        <AnimatedCourseCard
                            key={course.path}
                            title={course.title}
                            path={course.path}
                            published_at={course.published_at}
                            thumbnail={course.thumbnail}
                            price={course.price}
                            currency={course.currency}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        />
                    ))}
                </div>
                {motto && (
                    <div className="lg:tw-w-7/12 tw-mx-auto tw-text-center tw-mt-[70px]">
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
