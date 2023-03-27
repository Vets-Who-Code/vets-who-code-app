import { motion } from "framer-motion";
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
        <div className="quote-area tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px]">
            <div className="tw-container tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-7.5">
                <motion.div
                    className="md:tw-col-span-5"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h3
                            className="md:tw-max-w-[370px] tw-leading-normal child:tw-text-primary"
                            dangerouslySetInnerHTML={{
                                __html: headings[0].content,
                            }}
                        />
                    )}
                </motion.div>
                <motion.div
                    className="md:tw-col-span-7"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {texts?.map((text) => (
                        <p key={text.id}>{text.content}</p>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default QuoteArea;
