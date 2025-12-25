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
        <div className="tw-relative tw-isolate tw-flex tw-h-full tw-items-center tw-overflow-hidden tw-bg-cream tw-py-[50px] md:tw-min-h-[750px] xl:tw-min-h-[820px]">
            <h1 className="tw-sr-only">Home Page</h1>
            <div className="bgimg tw-absolute tw-inset-0 -tw-z-10 tw-hidden md:tw-block">
                {images?.[0]?.src && (
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "bg"}
                        loading="eager"
                        className="tw-h-full tw-w-full tw-object-cover"
                    />
                )}
            </div>
            <div className="tw-container 3xl:tw-max-w-full 3xl:tw-px-37">
                <div className="tw-grid md:tw-grid-cols-2 md:tw-gap-7.5">
                    <motion.div
                        className="content tw-mb-7.5 tw-text-center md:tw-self-center md:tw-text-left"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        {headings?.[0]?.content && (
                            <span className="tw-mb-2.5 tw-block tw-text-sm tw-font-bold tw-uppercase tw-leading-loose -tw-tracking-tightest tw-text-secondary md:tw-mb-[18px] md:tw-tracking-[4px]">
                                {headings[0].content}
                            </span>
                        )}
                        {headings?.[1]?.content && (
                            <h2
                                className="tw-text-3xl tw-leading-[1.13] tw-text-secondary sm:tw-text-[40px] lg:tw-text-[54px] xl:tw-text-[63px]"
                                dangerouslySetInnerHTML={{
                                    __html: headings[1].content,
                                }}
                            />
                        )}
                        {texts?.map((text) => (
                            <p
                                key={text.id}
                                className="tw-mt-3 tw-max-w-[540px] tw-text-md tw-font-medium tw-leading-relaxed sm:tw-mx-auto sm:tw-text-[16px] md:tw-ml-0 md:tw-text-lg"
                            >
                                {text.content}
                            </p>
                        ))}
                        {buttons?.map(({ id, content, icon, ...rest }) => (
                            <Button key={id} className="tw-mt-3" {...rest}>
                                <i className={clsx(icon, "tw-mr-3")} />
                                {content}
                            </Button>
                        ))}
                    </motion.div>
                    <motion.div
                        className="course tw-space-between tw-relative tw-z-10 tw-flex tw-justify-center xl:tw-justify-end"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        <img
                            className="tw-absolute -tw-top-7.5 tw-left-0 tw-z-1 tw-mr-5 tw-max-w-[100px] sm:tw-relative sm:tw-left-auto sm:tw-top-auto sm:tw-z-20 sm:tw-mb-[100px] sm:tw-ml-auto sm:tw-max-w-[120px] sm:tw-flex-auto sm:tw-self-end md:-tw-ml-[60px] md:-tw-mr-7.5 lg:tw-max-w-[186px]"
                            src="/images/intro/intro1/intro-popular-course.png"
                            alt="popular"
                            width={186}
                            height={157}
                        />
                        <CourseCard
                            className="tw-max-w-[370px]"
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
                            className="intro1-scene tw-absolute -tw-bottom-11 -tw-right-11 -tw-z-1 tw-w-[136px]"
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
