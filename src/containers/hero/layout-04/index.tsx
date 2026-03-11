import BottomShape from "@components/ui/bottom-shape/shape-02";
import Button from "@ui/button";
import { ButtonType, HeadingType, ImageType, TextType, VideoType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

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

const HeroArea = ({ data: { images, headings, texts, buttons, video } }: TProps) => {
    const [isOpen, setOpen] = useState(false);
    const words = headings?.slice(1, headings.length).map((heading) => heading.content) || [];
    const { text: animatedText } = useTypewriter({
        words,
        loop: true,
    });

    return (
        <>
            <div className="hero-area dark-section tw-relative tw-pb-[130px] tw-pt-[100px] md:tw-py-[170px] xl:tw-pb-[248px] xl:tw-pt-[270px]">
                {images?.[0]?.src && (
                    <div className="tw-absolute tw-inset-0 -tw-z-10">
                        <img
                            src={images[0].src}
                            alt={images[0]?.alt || "bg"}
                            loading="eager"
                            className="tw-h-full tw-w-full tw-object-cover"
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background:
                                    "linear-gradient(135deg, rgba(9, 31, 64, 0.92) 0%, rgba(6, 26, 64, 0.88) 100%)",
                            }}
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
                    <div className="tw-flex tw-flex-col tw-items-center">
                        {headings?.[0]?.content && (
                            <div className="md:tw-mb-4">
                                <h1
                                    className="tw-text-white tw-leading-none"
                                    style={{
                                        fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                                        fontWeight: 900,
                                        fontSize: "clamp(38px, 7vw, 72px)",
                                        textTransform: "uppercase",
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.05,
                                    }}
                                >
                                    {headings[0].content}
                                </h1>
                                <div className="tw-flex tw-min-h-[60px] tw-items-center tw-justify-center md:tw-min-h-[70px]">
                                    <span
                                        style={{
                                            fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                                            fontWeight: 900,
                                            fontSize: "clamp(38px, 7vw, 72px)",
                                            textTransform: "uppercase",
                                            letterSpacing: "-0.02em",
                                            lineHeight: 1.05,
                                            color: "var(--red, #c5203e)",
                                        }}
                                    >
                                        {animatedText}
                                        <Cursor />
                                    </span>
                                </div>
                            </div>
                        )}
                        {texts?.map((text) => (
                            <p
                                key={text.id}
                                style={{
                                    fontFamily: "var(--font-body, Gilroy, sans-serif)",
                                    fontSize: "16px",
                                    color: "#FFFFFF",
                                    lineHeight: 1.7,
                                }}
                                className="tw-mb-5 tw-max-w-[600px] sm:tw-mb-8"
                            >
                                {text.content}
                            </p>
                        ))}

                        {/* Est. badge — Evil Rabbit tag pattern */}
                        <div
                            className="tw-mb-6"
                            style={{
                                fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                                fontSize: "10px",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                background: "var(--red, #c5203e)",
                                color: "var(--gold, #FDB330)",
                                padding: "4px 12px",
                                borderRadius: "2px",
                                fontWeight: 500,
                            }}
                        >
                            Est. 2014 — Veteran-Led &amp; Operated
                        </div>

                        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center">
                            {buttons?.[0] && (
                                <Button
                                    path={buttons[0].path}
                                    className="tw-m-2.5 btn-primary-upgraded tw-group tw-inline-flex tw-items-center"
                                >
                                    {buttons[0].content}
                                    <span
                                        className="tw-ml-2 tw-inline-block tw-transition-transform tw-duration-300 group-hover:tw-translate-x-[3px]"
                                    >
                                        →
                                    </span>
                                </Button>
                            )}
                            {buttons?.[1] && (
                                <Button
                                    {...buttons[1]}
                                    className="tw-m-2.5 btn-secondary-upgraded"
                                    color="light"
                                    variant="outlined"
                                    onClick={() => setOpen(true)}
                                >
                                    <i className={clsx(buttons[1]?.icon, "tw-mr-4")} />
                                    {buttons[1].content}
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
                <BottomShape color="tw-fill-white" />
            </div>

            {video && (
                <ModalVideo show={isOpen} videoId={video.videoId} onClose={() => setOpen(false)} />
            )}
        </>
    );
};

export default HeroArea;
