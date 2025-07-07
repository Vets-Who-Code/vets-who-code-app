import { motion } from "motion/react";
import { HeadingType, TextType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = {
    data: {
        headings?: HeadingType[];
        texts?: TextType[];
    };
};

const QuoteArea = ({ data: { headings, texts } }: TProps) => {
    return (
        <div className="quote-area tw:pt-15 tw:md:pt-20 tw:lg:pt-[100px]">
            <div className="tw:container tw:grid tw:grid-cols-1 tw:gap-7.5 tw:md:grid-cols-12">
                <motion.div
                    className="tw:md:col-span-5"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h3
                            className="tw:leading-normal tw:child:text-primary tw:md:max-w-[370px]"
                            dangerouslySetInnerHTML={{
                                __html: headings[0].content,
                            }}
                        />
                    )}
                </motion.div>
                <motion.div
                    className="tw:md:col-span-7"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {texts?.map((text) => <p key={text.id}>{text.content}</p>)}
                </motion.div>
            </div>
        </div>
    );
};

export default QuoteArea;
