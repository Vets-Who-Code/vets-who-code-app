import { motion } from "framer-motion";
import Section from "@ui/section";
import SectionTitle from "@components/section-title";
import Button from "@ui/button";
import Testimonial03 from "@components/testimonial/testimonial-03";
import Testimonial04 from "@components/testimonial/testimonial-04";
import RatingBox from "@components/testimonial/rating-box";
import Shape2 from "@assets/svgs/shape-2.svg";
import { useUI } from "@contexts/ui-context";
import { ButtonType, ItemType, SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
        buttons?: ButtonType[];
        items?: ItemType[];
        total_reviews?: {
            text?: string;
            heading?: string;
        };
    };
};

const TestimonialArea = ({
    data: { section_title, buttons, items, total_reviews },
    space,
    bg,
    titleSize,
}: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <Section className="testimonial-area" space={space} bg={bg}>
            <div className="tw-container tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-7.5 md:tw-gap-y-[50px]">
                <motion.div
                    className="tw-relative tw-z-1 md:tw-col-span-6 xl:tw-col-span-4"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {items?.[0] && (
                        <Testimonial03
                            image={items[0].images[0]}
                            description={items[0].description}
                            name={items[0].name}
                            designation={items[0].designation}
                            className="tw-my-7.5"
                        />
                    )}
                    {items?.[1] && (
                        <Testimonial04
                            title={items[1].title}
                            className="tw-ml-auto"
                        />
                    )}
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-left-[-110px] tw-bottom-[130px] tw-w-[166px] tw-h-[-110px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <Shape2 className="tw-fill-primary-light tw-w-full tw-h-full" />
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 tw-bottom-20 tw-left-[-70px]"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/shape-3.png"
                            alt="shape"
                            loading="lazy"
                            width={178}
                            height={178}
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="xl:tw-pr-[100px] tw-relative tw-z-1 md:tw-col-span-6 xl:tw-col-span-4"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {total_reviews && (
                        <RatingBox {...total_reviews} className="tw-mb-7.5" />
                    )}
                    {items?.[2] && (
                        <Testimonial03
                            image={{
                                ...items[2].images[0],
                                width: 100,
                                height: 100,
                            }}
                            description={items[2].description}
                            name={items[2].name}
                            designation={items[2].designation}
                            className="tw-mb-7.5"
                        />
                    )}
                    <motion.div
                        className="tw-absolute tw-z-10 tw-top-[100px] tw-right-[50px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <span className="tw-block -tw-indent-[99999px] tw-border-desert tw-rounded-full tw-border-8 tw-w-[54px] tw-h-[54px]">
                            shape 3
                        </span>
                    </motion.div>
                    <motion.div
                        className="tw-absolute -tw-z-1 -tw-right-2.5 tw-bottom-15"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    >
                        <img
                            src="/images/shape-animation/nwesletter-shape-2.png"
                            alt=""
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="tw-self-center md:tw-col-span-12 xl:tw-col-span-4"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    {section_title && (
                        <SectionTitle
                            {...section_title}
                            align="left"
                            titleSize={titleSize}
                        />
                    )}

                    {buttons?.[0]?.content && (
                        <Button
                            {...buttons[0]}
                            className="tw-mt-4 lg:tw-mt-7.5"
                        >
                            {buttons[0].content}
                        </Button>
                    )}
                </motion.div>
            </div>
        </Section>
    );
};

TestimonialArea.defaultProps = {
    bg: "tw-bg-gray-200",
};

export default TestimonialArea;
