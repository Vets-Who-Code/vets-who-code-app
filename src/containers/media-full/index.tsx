import { motion } from "framer-motion";
import Section from "@ui/section";
import MediaCard from "@components/media-card/index"; // Assuming there's a media-card component similar to blog-card
import Pagination from "@components/pagination/pagination-01";
import { IMedia } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedMediaCard = motion(MediaCard);

type TProps = {
    data: {
        media: IMedia[];
        pagiData?: {
            currentPage: number;
            numberOfPages: number;
        };
    };
};

const MediaArea = ({ data: { media, pagiData } }: TProps) => {
    return (
        <Section className="media-area" space="bottom">
            <h2 className="tw-sr-only">Media Section</h2>
            <div className="tw-container">
                {media.length > 0 && (
                    <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">
                        {media.map((item) => (
                            <AnimatedMediaCard
                                key={item.path}
                                image={item.image}
                                title={item.title}
                                path={item.path}
                                description={item.description}
                                type={item.type}
                                date={item.date}
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
                        rootPage="media/media"
                    />
                )}
            </div>
        </Section>
    );
};

export default MediaArea;