import Anchor from "@ui/anchor";
import { IMedia } from "@utils/types";
import clsx from "clsx";
import { forwardRef } from "react";

type TProps = IMedia & {
    className?: string;
};

const MediaCard = forwardRef<HTMLDivElement, TProps>(
    ({ title, mediaType, url, publication, date, image, description, className }, ref) => (
        <div
            className={clsx(
                "media-card tw-group tw-relative tw-flex tw-flex-col tw-overflow-hidden tw-bg-white tw-transition-all tw-duration-300",
                className
            )}
            style={{
                border: "1px solid rgba(185, 214, 242, 0.08)",
                borderRadius: 0,
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTop = "2px solid var(--red, #c5203e)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTop = "1px solid rgba(185, 214, 242, 0.08)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
            ref={ref}
        >
            {image?.src && (
                <figure className="tw-relative tw-overflow-hidden">
                    <img
                        className="tw-h-52 tw-w-full tw-object-cover tw-transition-transform tw-duration-1500 tw-group-hover:tw-scale-105"
                        src={image.src}
                        alt={image?.alt || title}
                        width={image?.width || 300}
                        height={image?.height || 210}
                        loading="lazy"
                    />
                </figure>
            )}
            <div className="tw-flex tw-flex-grow tw-flex-col tw-p-6">
                {mediaType && (
                    <p
                        className="tw-mb-1"
                        style={{
                            fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                            fontSize: "9px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "#6C757D",
                        }}
                    >
                        {mediaType}
                        {publication && <span style={{ color: "#6C757D" }}> — {publication}</span>}
                    </p>
                )}
                <h3
                    className="tw-mb-2 tw-leading-snug"
                    style={{
                        fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                        fontWeight: 700,
                        fontSize: "17px",
                        textTransform: "none",
                        letterSpacing: "0",
                    }}
                >
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:tw-text-primary"
                    >
                        {title}
                    </a>
                </h3>
                {description && (
                    <p className="tw-mb-3 tw-flex-grow tw-text-sm tw-text-gray-200">
                        {description}
                    </p>
                )}
                <div className="tw-mt-auto">
                    {date && (
                        <p
                            style={{
                                fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                                fontSize: "10px",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "#6C757D",
                            }}
                        >
                            <i className="far fa-calendar tw-mr-1.5" />
                            {new Date(date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    )}
                    <Anchor
                        path={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tw-mt-3 tw-inline-block tw-group"
                        style={{
                            fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#091f40",
                            transition: "color 0.3s ease",
                        }}
                    >
                        View Media <i className="fas fa-external-link-alt tw-ml-1" />
                    </Anchor>
                </div>
            </div>
        </div>
    )
);

MediaCard.displayName = "MediaCard";

export default MediaCard;
