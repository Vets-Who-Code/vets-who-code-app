import { motion } from "framer-motion";
import Section from "@ui/section";
import MediaCard from "@components/media-card/media-03";
import Pagination from "@components/pagination/pagination-01";
import { IMedia } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedMediaCard = motion(MediaCard);

type TProps = {
    data: {
        medias: IMedia[];
        pagiData?: {
            currentPage: number;
            numberOfPages: number;
        };
    };
};

const MediaArea = ({ data: { medias, pagiData } }: TProps) => {
    return (
        <Section className="media-area" space="bottom">
            <h2 className="tw-sr-only">Media Section</h2>
            <div className="tw-container">
                {medias.length > 0 && (
                    <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                        {medias.map((media) => (
                            <AnimatedMediaCard
                                key={media.path}
                                image={media.image}
                                title={media.title}
                                path={media.path}
                                outlet={media.outlet}
                                datePublished={media.datePublished}
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={scrollUpVariants}
                            />
                        ))}
                    </div>
                )}
                {pagiData && pagiData.numberOfPages > 1 && (
                    <Pagination
                        className="tw-mt-[50px]"
                        numberOfPages={pagiData.numberOfPages}
                        currentPage={pagiData.currentPage}
                        rootPage="medias/media"
                    />
                )}
            </div>
        </Section>
    );
};

export default MediaArea;
