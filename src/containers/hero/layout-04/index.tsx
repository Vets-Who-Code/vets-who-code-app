import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Button from "@ui/button";
import BottomShape from "@components/ui/bottom-shape/shape-02";
import {
    ButtonType,
    HeadingType,
    ImageType,
    TextType,
    VideoType,
} from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const ModalVideo = dynamic(() => import("../../../components/ui/video-modal"), {
    ssr: false,
});

type TProps = {
    data: {
        images?: ImageType[];
        headings?: HeadingType[];
        texts?: TextType[];
        buttons?: ButtonType[];
        video?: VideoType;
    };
};

const HeroArea = ({
    data: { images, headings, texts, buttons, video },
}: TProps) => {
    const [isOpen, setOpen] = useState(false);
    const words =
        headings?.slice(1, headings.length).map((heading) => heading.content) ||
        [];
    const { text: animatedText } = useTypewriter({
        words,
        loop: true,
    });
    return (
        <>
            <div className="hero-area tw-relative tw-pt-[100px] tw-pb-[130px] md:tw-py-[170px] xl:tw-pt-[270px] xl:tw-pb-[248px]">
                {images?.[0]?.src && (
                    <div className="tw-absolute tw-inset-0 -tw-z-10">
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "bg"}
                            loading="eager"
                            className="tw-w-full tw-h-full tw-object-cover"
                        />
                    </div>
                )}
                <motion.div
                    className="tw-container tw-text-center"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={scrollUpVariants}
                >
                    {headings?.[0]?.content && (
                        <h1 className="tw-text-[46px] lg:tw-text-[56px] tw-leading-tight tw-font-medium tw-text-white">
                            {headings[0].content}{" "}
                            <span className="tw-text-primary tw-inline-block">
                                {animatedText}
                                <Cursor />
                            </span>
                        </h1>
                    )}
                    {texts?.map((text) => (
                        <p
                            key={text.id}
                            className="tw-text-lg tw-font-medium tw-leading-relaxed tw-text-white tw-mb-5 sm:tw-mb-8"
                        >
                            {text.content}
                        </p>
                    ))}
                    <div className="tw-flex tw-items-center tw-justify-center tw-flex-wrap">
                        {buttons?.[0] && (
                            <Button {...buttons[0]} className="tw-m-2.5">
                                {buttons[0].content}
                            </Button>
                        )}
                        {buttons?.[1] && (
                            <Button
                                {...buttons[1]}
                                className="tw-m-2.5"
                                onClick={() => setOpen(true)}
                            >
                                <i
                                    className={clsx(
                                        buttons[1]?.icon,
                                        "tw-mr-4"
                                    )}
                                />
                                {buttons[1].content}
                            </Button>
                        )}
                    </div>
                </motion.div>
                <BottomShape color="tw-fill-light-100" />
            </div>
            {video && (
                <ModalVideo
                    show={isOpen}
                    videoId={video.videoId}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default HeroArea;
