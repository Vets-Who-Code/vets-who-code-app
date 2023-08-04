import clsx from "clsx";

type TProps = {
    rating: number;
    className?: string;
    align?: "left" | "center" | "right";
    size?: "sm" | "md";
    space?: "xs" | "sm";
};

const BASE_RATING = 5;

const StarRating = ({ rating, className, align, size, space }: TProps) => {
    const unrated = Array.from(
        new Array(Math.floor(BASE_RATING - rating)),
        (_x, i) => i
    );
    const rated = Array.from(new Array(Math.floor(rating)), (_x, i) => i + 1);
    const remainder = rating - parseInt(`${rating}`, 10);

    return (
        <div
            title={`${rating} out of ${BASE_RATING}`}
            className={clsx(
                size === "md" && "tw-text-md",
                size === "sm" && "tw-text-sm",
                align === "center" && "tw-text-center",
                align === "left" && "tw-text-left",
                align === "right" && "tw-text-right",
                className
            )}
        >
            {rated.map((item) => (
                <i
                    key={item}
                    className={clsx(
                        "fas fa-star tw-text-yellow first:tw-ml-0",
                        space === "xs" && "tw-mx-px",
                        space === "sm" && "tw-mx-0.5"
                    )}
                />
            ))}
            {remainder > 0 && (
                <i
                    className={clsx(
                        "fas fa-star-half-alt tw-text-yellow first:tw-ml-0",
                        space === "xs" && "tw-mx-px",
                        space === "sm" && "tw-mx-0.5"
                    )}
                />
            )}
            {unrated.map((item) => (
                <i
                    key={item}
                    className={clsx(
                        "far fa-star tw-text-gray-400 first:tw-ml-0",
                        space === "xs" && "tw-mx-px",
                        space === "sm" && "tw-mx-0.5"
                    )}
                />
            ))}
        </div>
    );
};

StarRating.defaultProps = {
    align: "center",
    size: "md",
    space: "sm",
};

export default StarRating;
