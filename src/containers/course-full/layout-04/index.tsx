import { motion } from "framer-motion";
import Section from "@ui/section";
import CourseCard from "@components/course-card/course-02";
import Button from "@ui/button";
import { ICourse } from "@utils/types";
import { useLoadMore } from "@hooks";
import { scrollUpVariants } from "@utils/variants";

const AnimatedCourseCard = motion(CourseCard);

type TProps = {
    data: {
        courses: ICourse[];
    };
};

const CourseArea = ({ data: { courses } }: TProps) => {
    const { hasMore, itemsToShow, handlerLoadMore } = useLoadMore<ICourse>(
        courses,
        6,
        3
    );

    return (
        <Section className="course-area" space="bottom">
            <h2 className="tw-sr-only">Course Section</h2>
            <div className="tw-container">
                {courses.length > 0 ? (
                    <>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[30px]">
                            {itemsToShow?.map((course) => (
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
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={scrollUpVariants}
                                />
                            ))}
                        </div>
                        <div className="tw-text-center tw-mt-[50px]">
                            {hasMore ? (
                                <Button
                                    variant="outlined"
                                    className="tw-min-w-[250px] tw-border-gray-500"
                                    onClick={handlerLoadMore}
                                >
                                    Load More{" "}
                                    <i className="fal fa-redo tw-ml-4" />
                                </Button>
                            ) : (
                                <p>No course to show</p>
                            )}
                        </div>
                    </>
                ) : (
                    <h6>No Course found</h6>
                )}
            </div>
        </Section>
    );
};

export default CourseArea;
