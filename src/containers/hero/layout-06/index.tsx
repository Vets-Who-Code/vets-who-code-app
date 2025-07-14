import clsx from "clsx";
import { useScroll, motion, useTransform } from "motion/react";
import Button from "@ui/button";
import Video from "@ui/video-with-poster/video-01";
import BottomShape from "@ui/bottom-shape/shape-05";
import { ButtonType, HeadingType, ImageType, TextType, VideoType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

type TProps = {
    data: {
        headings?: HeadingType[];
        texts?: TextType[];
        buttons?: ButtonType[];
        images?: ImageType[];
        video?: VideoType;
    };
};

const HeroArea = ({ data: { headings, texts, buttons, images, video } }: TProps) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -100]);

    return (
        <div className="hero-area tw:relative tw:bg-gore tw:pt-[120px] tw:md:pt-44 tw:xl:pt-[176px]">
            <div className="tw:container">
                <motion.div
                    className="tw:relative tw:z-10 tw:mb-10 tw:text-center tw:md:mb-20"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw:mb-0 tw:text-[34px] tw:text-white tw:sm:text-[42px] tw:lg:text-5xl tw:lg:leading-[1.17]">
                            {headings[0].content}
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw:mb-6 tw:text-lg tw:font-medium tw:text-white/70"
                        >
                            {text.content}
                        </p>
                    ))}
                    {buttons?.map(({ id, content, icon, ...rest }) => (
                        <Button key={id} {...rest}>
                            {content}
                            {icon && <i className={clsx(icon, "tw:ml-4")} />}
                        </Button>
                    ))}
                </motion.div>
                <div className="tw:relative tw:-bottom-[90px] tw:-mt-[90px] tw:grid tw:grid-cols-1 tw:items-end tw:gap-7.5 tw:md:-bottom-[50px] tw:md:-mt-[50px] tw:md:grid-cols-12 tw:lg:-bottom-[90px] tw:lg:-mt-[90px]">
                    <motion.div
                        style={{ y: y1 }}
                        className="tw:relative tw:z-1 tw:col-span-2 tw:hidden tw:md:left-0 tw:md:top-0 tw:md:block tw:xl:bottom-32 tw:xl:left-[-168px] tw:xl:h-[504px] tw:xl:w-[410px]"
                    >
                        {images?.[0]?.src && (
                            <img
                                src={images[0].src}
                                alt={images[0]?.alt || "Hero Parallax"}
                                width={410}
                                height={504}
                            />
                        )}
                    </motion.div>
                    {video && images?.[1] && (
                        <Video poster={images[1]} video={video} className="tw:col-span-8" />
                    )}
                    <motion.div
                        style={{ y: y1 }}
                        className="tw:relative tw:z-1 tw:col-span-2 tw:hidden tw:md:bottom-0 tw:md:right-0 tw:md:block tw:xl:-bottom-8 tw:xl:right-5 tw:xl:h-[353px] tw:xl:w-[230px]"
                    >
                        {images?.[2]?.src && (
                            <img
                                src={images[2].src}
                                alt={images[2]?.alt || "Hero Parallax"}
                                width={230}
                                height={353}
                            />
                        )}
                    </motion.div>
                </div>
            </div>
            <BottomShape />
        </div>
    );
};

export default HeroArea;
