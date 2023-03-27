import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Swiper, { SwiperSlide } from "@ui/swiper";
import Course from "@components/course-card/course-02";
import MottoText from "@ui/motto-text";
import BottomShape from "@components/ui/bottom-shape/shape-02";
import { SectionTitleType, ICourse, MottoType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedSwiper = motion(Swiper);
const AnimatedMottoText = motion(MottoText);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        courses: ICourse[];
        motto?: MottoType;
    };
};

const options = {
    pagination: true,
    autoplay: false,
    breakpoints: {
        300: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
};

const CourseArea = ({
    data: { section_title, courses, motto },
    space,
    bg,
    titleSize,
}: TProps) => {
    return (
        <Section className="course-area tw-relative" space={space} bg={bg}>
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
                        titleSize={titleSize}
                        className="tw-mb-8"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
                <AnimatedSwiper
                    options={options}
                    shadowSize="small"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {courses.map((course) => (
                        <SwiperSlide key={course.path}>
                            <Course
                                thumbnail={course.thumbnail}
                                title={course.title}
                                path={course.path}
                                price={course.price}
                                currency={course.currency}
                                total_lectures={course.total_lectures}
                                total_students={course.total_students}
                            />
                        </SwiperSlide>
                    ))}
                </AnimatedSwiper>
                {motto && (
                    <AnimatedMottoText
                        {...motto}
                        className="lg:tw-w-7/12 tw-mx-auto tw-text-center tw-mt-[50px] lg:tw-mt-[70px]"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    />
                )}
            </div>
            <BottomShape />
        </Section>
    );
};

CourseArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default CourseArea;
