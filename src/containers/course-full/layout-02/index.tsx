import { motion } from "framer-motion";
import Section from "@ui/section";
import NiceSelect from "@ui/nice-select";
import CourseCard from "@components/course-card/course-01";
import Button from "@ui/button";
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
    const { sortedItems, setSortValue, sortValue } = useSort<ICourse>(
        courses,
        courseSorting
    );
    const { hasMore, itemsToShow, handlerLoadMore } = useLoadMore<ICourse>(
        sortedItems,
        9,
        3
    );

    return (
        <Section className="course-area" space="bottom">
            <h2 className="tw-sr-only">Course Section</h2>
            <div className="tw-container">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-items-center tw-mb-5">
                    <p className="tw-mb-2.5">
                        We found {sortedItems.length} courses available for you
                    </p>
                    <NiceSelect
                        className="tw-w-[270px] md:tw-ml-auto tw-mb-2.5"
                        options={[
                            {
                                label: "Default",
                                value: "default",
                                selected: true,
                            },
                            { label: "Popularity", value: "popular" },
                            { label: "Latest", value: "latest" },
                            { label: "Price: low to high", value: "price" },
                            {
                                label: "Price: high to low",
                                value: "price-desc",
                            },
                        ]}
                        setValue={setSortValue}
                        prefix="Sort By:"
                        defaultValue={sortValue}
                    />
                </div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-[30px]">
                    {itemsToShow?.map((course) => (
                        <AnimatedCourseCard
                            key={course.path}
                            title={course.title}
                            path={course.path}
                            thumbnail={course.thumbnail}
                            price={course.price}
                            currency={course.currency}
                            published_at={course.published_at}
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
                            Load More <i className="fal fa-redo tw-ml-4" />
                        </Button>
                    ) : (
                        <p>No course to show</p>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default CourseArea;
