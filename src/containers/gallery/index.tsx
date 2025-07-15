import { motion } from "motion/react";
import { ItemType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import Item from "./item";

const AnimatedItem = motion(Item);

type TProps = {
    data: {
        items?: ItemType[];
    };
};

const GalleryArea = ({ data: { items } }: TProps) => {
    return (
        <div className="gallery-area tw:grid tw:grid-cols-1 tw:gap-2.5 tw:md:grid-cols-2 tw:lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] tw:2xl:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-flow-dense">
            <h2 className="tw:sr-only">Gallery Section</h2>
            {items?.map(({ id, images, name, designation }) => (
                <AnimatedItem
                    key={id}
                    image={images[0]}
                    name={name}
                    designation={designation}
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />
            ))}
        </div>
    );
};

export default GalleryArea;
