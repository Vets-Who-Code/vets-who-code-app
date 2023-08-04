import clsx from "clsx";
import { useScroll, motion, useTransform } from "framer-motion";
import Button from "@ui/button";
import Video from "@ui/video-with-poster/video-01";
import BottomShape from "@ui/bottom-shape/shape-05";
import {
    ButtonType,
    HeadingType,
    ImageType,
    TextType,
    VideoType,
} from "@utils/types";
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

const HeroArea = ({
    data: { headings, texts, buttons, images, video },
}: TProps) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, -100]);

    return (
        <div className="hero-area tw-relative tw-bg-gore tw-pt-[120px] md:tw-pt-44 xl:tw-pt-[176px]">
            <div className="tw-container">
                <motion.div
                    className="tw-text-center tw-relative tw-z-10 tw-mb-10 md:tw-mb-20"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw-text-[34px] sm:tw-text-[42px] lg:tw-text-5xl tw-text-white lg:tw-leading-[1.17] tw-mb-0">
                            {headings[0].content}
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw-text-lg tw-font-medium tw-text-white/70 tw-mb-6"
                        >
                            {text.content}
                        </p>
                    ))}
                    {buttons?.map(({ id, content, icon, ...rest }) => (
                        <Button key={id} {...rest}>
                            {content}
                            {icon && <i className={clsx(icon, "tw-ml-4")} />}
                        </Button>
                    ))}
                </motion.div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-7.5 tw-items-end tw-relative -tw-bottom-[90px] -tw-mt-[90px] md:-tw-bottom-[50px] md:-tw-mt-[50px]  lg:-tw-bottom-[90px] lg:-tw-mt-[90px]">
                    <motion.div
                        style={{ y: y1 }}
                        className="tw-col-span-2 tw-relative tw-z-1 md:tw-left-0 md:tw-top-0 xl:tw-w-[410px] xl:tw-h-[504px] xl:tw-left-[-168px] xl:tw-bottom-32 tw-hidden md:tw-block"
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
                        <Video
                            poster={images[1]}
                            video={video}
                            className="tw-col-span-8"
                        />
                    )}
                    <motion.div
                        style={{ y: y1 }}
                        className="tw-col-span-2 tw-relative tw-z-1 md:tw-right-0 md:tw-bottom-0 xl:tw-w-[230px] xl:tw-h-[353px] xl:tw-right-5 xl:-tw-bottom-8 tw-hidden md:tw-block"
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
