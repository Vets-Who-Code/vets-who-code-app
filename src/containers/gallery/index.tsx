import { motion } from "framer-motion";
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
        <div className="gallery-area tw-grid tw-gap-2.5 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] 2xl:tw-grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] md:grid-flow-dense">
            <h2 className="tw-sr-only">Gallery Section</h2>
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
