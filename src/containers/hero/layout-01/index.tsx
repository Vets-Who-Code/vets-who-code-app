import clsx from "clsx";
import { motion } from "framer-motion";
import Button from "@ui/button";
import CourseCard from "@components/course-card/course-01";
import BottomShape from "@ui/bottom-shape/shape-01";
import { scrollUpVariants } from "@utils/variants";
import { useUI } from "@contexts/ui-context";
import {
    HeadingType,
    TextType,
    ButtonType,
    ImageType,
    ICourse,
} from "@utils/types";

type TProps = {
    data: {
        headings?: HeadingType[];
        texts?: TextType[];
        buttons?: ButtonType[];
        images?: ImageType[];
        popularCourse: ICourse;
    };
};

const HeroArea = ({
    data: { headings, texts, buttons, images, popularCourse },
}: TProps) => {
    const { trans1 } = useUI();

    return (
        <div className="tw-h-full md:tw-min-h-[750px] xl:tw-min-h-[820px] tw-py-[50px] tw-relative tw-flex tw-items-center tw-isolate tw-bg-pearl tw-overflow-hidden">
            <h1 className="tw-sr-only">Home Page</h1>
            <div className="bgimg tw-absolute tw-inset-0 -tw-z-10 tw-hidden md:tw-block">
                {images?.[0]?.src && (
                    <img
                        src={images[0].src}
                        alt={images[0]?.alt || "bg"}
                        loading="eager"
                        className="tw-w-full tw-h-full tw-object-cover"
                    />
                )}
            </div>
            <div className="tw-container 3xl:tw-max-w-full 3xl:tw-px-37">
                <div className="tw-grid md:tw-gap-7.5 md:tw-grid-cols-2">
                    <motion.div
                        className="content tw-text-center tw-mb-7.5 md:tw-text-left md:tw-self-center"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        {headings?.[0]?.content && (
                            <span className="tw-text-sm tw-mb-2.5 -tw-tracking-tightest tw-font-bold tw-leading-loose tw-uppercase tw-text-secondary tw-block md:tw-mb-[18px] md:tw-tracking-[4px]">
                                {headings[0].content}
                            </span>
                        )}
                        {headings?.[1]?.content && (
                            <h2
                                className="tw-text-3xl sm:tw-text-[40px] lg:tw-text-[54px] xl:tw-text-[63px] tw-leading-[1.13] tw-text-secondary"
                                dangerouslySetInnerHTML={{
                                    __html: headings[1].content,
                                }}
                            />
                        )}
                        {texts?.map((text) => (
                            <p
                                key={text.id}
                                className="tw-text-md sm:tw-text-[16px] tw-font-medium tw-leading-relaxed tw-mt-3 sm:tw-mx-auto tw-max-w-[540px] md:tw-ml-0 md:tw-text-lg"
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
                        className="course tw-flex tw-space-between tw-justify-center xl:tw-justify-end tw-relative tw-z-10"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={scrollUpVariants}
                    >
                        <img
                            className="tw-absolute tw-left-0 -tw-top-7.5 tw-max-w-[100px] tw-z-1 sm:tw-relative sm:tw-left-auto sm:tw-top-auto sm:tw-z-20 sm:tw-self-end sm:tw-flex-auto sm:tw-ml-auto tw-mr-5 sm:tw-mb-[100px] sm:tw-max-w-[120px] md:-tw-mr-7.5 md:-tw-ml-[60px] lg:tw-max-w-[186px]"
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
                            price={popularCourse.price}
                            currency={popularCourse.currency}
                            excerpt={popularCourse.excerpt}
                            thumbnail={{
                                ...popularCourse.thumbnail,
                                loading: "eager",
                            }}
                        />
                        <motion.div
                            className="intro1-scene tw-absolute -tw-z-1 -tw-right-11 -tw-bottom-11 tw-w-[136px]"
                            animate={{
                                x: trans1().x,
                                y: trans1().y,
                            }}
                        >
                            <img
                                src="/images/shape-animation/shape-1.png"
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
