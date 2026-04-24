import { ImageType, ItemType } from "@utils/types";
import clsx from "clsx";

type TProps = Pick<ItemType, "description" | "name" | "designation"> & {
    image: ImageType;
    className?: string;
};

const Testimonial03 = ({ description, name, designation, image, className }: TProps) => {
    return (
        <div
            className={clsx("testimonial tw-relative", className)}
            style={{
                background: "transparent",
                borderLeft: "2px solid var(--red, #c5203e)",
                paddingLeft: "24px",
                paddingTop: "24px",
                paddingRight: "24px",
                paddingBottom: "24px",
                borderRadius: 0,
            }}
        >
            <div
                aria-hidden="true"
                style={{
                    fontFamily: "var(--font-headline)",
                    fontWeight: 900,
                    fontSize: "64px",
                    color: "#FFFFFF",
                    lineHeight: 1,
                    opacity: 0.08,
                    position: "absolute",
                    top: "-16px",
                    left: "16px",
                    pointerEvents: "none",
                }}
            >
                &ldquo;
            </div>

            {image?.src && (
                <div className="tw-mb-5 tw-flex tw-items-center tw-gap-4 tw-relative">
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
                    fontSize: "clamp(16px, 2vw, 20px)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: 1.74,
                    position: "relative",
                }}
                className="tw-mb-6"
            >
                {description}
            </p>

            <div>
                <span
                    style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                    }}
                    className="tw-block tw-mb-1"
                >
                    {name}
                </span>
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "rgba(185, 214, 242, 0.7)",
                    }}
                >
                    {designation}
                </span>
            </div>
        </div>
    );
};

export default Testimonial03;
