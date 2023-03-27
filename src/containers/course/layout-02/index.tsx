import { motion } from "framer-motion";
import SectionTitle from "@components/section-title";
import Swiper, { SwiperSlide } from "@ui/swiper";
import CourseCard from "@components/course-card/course-02";
import { SectionTitleType, ICourse } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedSectionTitle = motion(SectionTitle);
const AnimatedSwiper = motion(Swiper);

type TProps = {
    data: {
        section_title?: SectionTitleType;
        courses: ICourse[];
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

const CourseArea = ({ data: { section_title, courses } }: TProps) => {
    return (
        <div className="course-area tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px] tw-pb-[90px] md:tw-pb-[110px] lg:tw-pb-32">
            <div className="tw-container">
                {section_title && (
                    <AnimatedSectionTitle
                        {...section_title}
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
                            <CourseCard
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
            </div>
        </div>
    );
};

export default CourseArea;
