import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { formatDate } from "@utils/date";
import { IEvent } from "@utils/types";
import clsx from "clsx";
import { forwardRef } from "react";

interface TProps extends Pick<IEvent, "thumbnail" | "title" | "path" | "start_date" | "location"> {
    className?: string;
}

const Event01 = forwardRef<HTMLDivElement, TProps>(
    ({ thumbnail, title, path, start_date, location, className }, ref) => {
        return (
            <div
                className={clsx(
                    "event tw-group tw-relative tw-h-full tw-transition-all tw-duration-300",
                    className
                )}
                style={{
                    border: "1px solid rgba(185, 214, 242, 0.08)",
                    borderRadius: 0,
                    background: "var(--cream, #EEEDE9)",
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
                <div className="tw-relative tw-h-[230px] tw-overflow-hidden max-w-full">
                    {thumbnail?.src && (
                        <figure className="tw-group-hover:tw-scale-110 tw-h-full tw-transition-transform tw-duration-1500">
                            <img
                                className="tw-h-full tw-w-full tw-object-cover"
                                src={thumbnail.src}
                                alt={thumbnail?.alt || "Event"}
                                width={thumbnail.width || 371}
                                height={thumbnail.height || 230}
                                loading={thumbnail.loading || "lazy"}
                            />
                        </figure>
                    )}
                    <div className="tw-invisible tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-secondary/60 tw-opacity-0 tw-transition-opacity tw-duration-300 group-hover:tw-visible group-hover:tw-opacity-100">
                        <Button color="light" hover={false} className="tw-text-primary" path={path}>
                            Get ticket
                        </Button>
                    </div>
                </div>
                <div className="info tw-relative tw-z-1 tw-px-7.5 tw-pb-10 tw-pt-7.5 tw-text-center">
                    <p
                        style={{
                            fontFamily: "var(--font-mono, HashFlag, sans-serif)",
                            fontSize: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--red, #c5203e)",
                        }}
                        className="tw-mb-1"
                    >
                        {formatDate(start_date)}
                    </p>
                    <h3
                        className="tw-mb-0 tw-leading-normal"
                        style={{
                            fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                            fontWeight: 700,
                            fontSize: "17px",
                            textTransform: "none",
                            letterSpacing: "0",
                            color: "var(--navy, #091f40)",
                        }}
                    >
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                    <p className="tw-mb-0 tw-mt-6.1 tw-text-[17px]">
                        <i className="far fa-map-marker-alt tw-mr-2.5" />
                        {location.city}, {location.country}
                    </p>
                </div>
            </div>
        );
    }
);

export default Event01;
