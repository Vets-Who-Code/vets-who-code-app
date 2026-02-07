import { ISpeaker } from "@utils/types";
import clsx from "clsx";

type TProps = Omit<ISpeaker, "id"> & {
    className?: string;
};

const SpeakerCard = ({ className, name, designation, image }: TProps) => {
    return (
        <div className={clsx("speaker tw-text-center", className)}>
            <div className="tw-mx-auto tw-mb-7 tw-h-[170px] tw-w-[170px]">
                {image?.src && (
                    <img
                        src={image.src}
                        alt={image?.alt || name}
                        width="200"
                        className="tw-w-full tw-rounded-full tw-object-cover"
                    />
                )}
            </div>
            <h3 className="tw-mb-1.5 tw-text-h6">{name}</h3>
            <p className="tw-mb-0">/ {designation}</p>
        </div>
    );
};

export default SpeakerCard;
