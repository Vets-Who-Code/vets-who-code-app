import clsx from "clsx";
import { ISpeaker } from "@utils/types";

type TProps = Omit<ISpeaker, "id"> & {
    className?: string;
};

const SpeakerCard = ({ className, name, designation, image }: TProps) => {
    return (
        <div className={clsx("speaker tw-text-center", className)}>
            <div className="tw-mb-7 tw-w-[170px] tw-h-[170px] tw-mx-auto">
                {image?.src && (
                    <img
                        src={image.src}
                        alt={image?.alt || name}
                        width="200"
                        className="tw-object-cover tw-rounded-full tw-w-full"
                    />
                )}
            </div>
            <h3 className="tw-mb-1.5 tw-text-h6">{name}</h3>
            <p className="tw-mb-0">/ {designation}</p>
        </div>
    );
};

export default SpeakerCard;
