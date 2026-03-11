import { ImageType, ItemType } from "@utils/types";
import clsx from "clsx";

type TProps = Pick<ItemType, "description" | "name" | "designation"> & {
    image: ImageType;
    className?: string;
};

const Testimonial03 = ({ description, name, designation, image, className }: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-relative tw-py-8 tw-px-7",
                className
            )}
            style={{
                background: "var(--red, #c5203e)",
                borderRadius: 0,
                borderLeft: "none",
            }}
        >
            {/* Large decorative quotation mark — navy blue */}
            <div
                style={{
                    fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                    fontWeight: 900,
                    fontSize: "64px",
                    color: "var(--navy, #091f40)",
                    lineHeight: 1,
                    opacity: 0.4,
                    position: "absolute",
                    top: "8px",
                    left: "24px",
                }}
            >
                &ldquo;
            </div>

            {image?.src && (
                <div className="tw-mb-5 tw-mt-8 tw-flex tw-items-center tw-gap-4">
                    <img
                        src={image.src}
                        width={image?.width || 60}
                        height={image?.height || 60}
                        alt={image?.alt || name}
                        style={{ borderRadius: 0 }}
                    />
                </div>
            )}

            <p
                style={{
                    fontFamily: "var(--font-body, Gilroy, sans-serif)",
                    fontSize: "18px",
                    fontStyle: "italic",
                    color: "#FFFFFF",
                    lineHeight: 1.6,
                }}
                className="tw-mb-6"
            >
                {description}
            </p>

            <div>
                <span
                    style={{
                        fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#FFFFFF",
                        fontWeight: 700,
                    }}
                    className="tw-block tw-mb-1"
                >
                    {name}
                </span>
                <span
                    style={{
                        fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(255, 255, 255, 0.7)",
                    }}
                >
                    / {designation}
                </span>
            </div>
        </div>
    );
};

export default Testimonial03;
