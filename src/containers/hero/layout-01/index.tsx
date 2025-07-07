import clsx from "clsx";
import { motion } from "motion/react";
import Button from "@ui/button";
import CourseCard from "@components/course-card/course-01";
import BottomShape from "@ui/bottom-shape/shape-01";
import { scrollUpVariants } from "@utils/variants";
import { useUI } from "@contexts/ui-context";
import { HeadingType, TextType, ButtonType, ImageType, ICourse } from "@utils/types";

type TProps = {
    data: {
        headings?: HeadingType[];
        texts?: TextType[];
        buttons?: ButtonType[];
        images?: ImageType[];
        popularCourse: ICourse;
    };
};

const HeroArea = ({ data: { headings, texts, buttons, images, popularCourse } }: TProps) => {
    const { trans1 } = useUI();

    return (
        <div className="tw:relative tw:isolate tw:flex tw:h-full tw:items-center tw:overflow-hidden tw:bg-pearl tw:py-[50px] tw:md:min-h-[750px] tw:xl:min-h-[820px]">
            <h1 className="tw:sr-only">Home Page</h1>
            <div className="bgimg tw:absolute tw:inset-0 tw:-z-10 tw:hidden tw:md:block">
                {images?.[0]?.src && (
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "bg"}
                        loading="eager"
                        className="tw:h-full tw:w-full tw:object-cover"
                    />
                )}
            </div>
            <div className="tw:container tw:3xl:max-w-full tw:3xl:px-37">
                <div className="tw:grid tw:md:grid-cols-2 tw:md:gap-7.5">
                    <motion.div
                        className="content tw:mb-7.5 tw:text-center tw:md:self-center tw:md:text-left"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        {headings?.[0]?.content && (
                            <span className="tw:mb-2.5 tw:block tw:text-sm tw:font-bold tw:uppercase tw:leading-loose tw:-tracking-tightest tw:text-secondary tw:md:mb-[18px] tw:md:tracking-[4px]">
                                {headings[0].content}
                            </span>
                        )}
                        {headings?.[1]?.content && (
                            <h2
                                className="tw:text-3xl tw:leading-[1.13] tw:text-secondary tw:sm:text-[40px] tw:lg:text-[54px] tw:xl:text-[63px]"
                                dangerouslySetInnerHTML={{
                                    __html: headings[1].content,
                                }}
                            />
                        )}
                        {texts?.map((text) => (
                            <p
                                key={text.id}
                                className="tw:mt-3 tw:max-w-[540px] tw:text-md tw:font-medium tw:leading-relaxed tw:sm:mx-auto tw:sm:text-[16px] tw:md:ml-0 tw:md:text-lg"
                            >
                                {text.content}
                            </p>
                        ))}
                        {buttons?.map(({ id, content, icon, ...rest }) => (
                            <Button key={id} className="tw:mt-3" {...rest}>
                                <i className={clsx(icon, "tw:mr-3")} />
                                {content}
                            </Button>
                        ))}
                    </motion.div>
                    <motion.div
                        className="course tw:space-between tw:relative tw:z-10 tw:flex tw:justify-center tw:xl:justify-end"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        <img
                            className="tw:absolute tw:-top-7.5 tw:left-0 tw:z-1 tw:mr-5 tw:max-w-[100px] tw:sm:relative tw:sm:left-auto tw:sm:top-auto tw:sm:z-20 tw:sm:mb-[100px] tw:sm:ml-auto tw:sm:max-w-[120px] tw:sm:flex-auto tw:sm:self-end tw:md:-ml-[60px] tw:md:-mr-7.5 tw:lg:max-w-[186px]"
                            src="/images/intro/intro1/intro-popular-course.png"
                            alt="popular"
                            width={186}
                            height={157}
                        />
                        <CourseCard
                            className="tw:max-w-[370px]"
                            title={popularCourse.title}
                            path={popularCourse.path}
                            published_at={popularCourse.published_at}
                            excerpt={popularCourse.excerpt}
                            thumbnail={{
                                ...popularCourse.thumbnail,
                                loading: "eager",
                            }}
                        />
                        <motion.div
                            className="intro1-scene tw:absolute tw:-bottom-11 tw:-right-11 tw:-z-1 tw:w-[136px]"
                            animate={{
                                x: trans1().x,
                                y: trans1().y,
                            }}
                        >
                            <img
                                src="/images/shape-animation/code.svg"
                                alt=""
                                width={136}
                                height={136}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
            <BottomShape />
        </div>
    );
};

export default HeroArea;
