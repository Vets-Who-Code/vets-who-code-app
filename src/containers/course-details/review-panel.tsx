import Review from "@components/review";
import ProgressBar from "@ui/progress-bar";
import StarRating from "@ui/star-rating";
import { ReviewType } from "@utils/types";

const ReviewPanel = ({ average, count, rating_details, items }: ReviewType) => {
    return (
        <>
            <h3 className="tw-mb-[26px] tw-mt-[13px]">Reviews</h3>
            <div className="tw-flex tw-flex-wrap">
                <div className="tw-mb-7.5 tw-w-full tw-shrink-0 sm:tw-mb-0 sm:tw-mr-7.5 sm:tw-w-[200px] md:tw-mr-[70px]">
                    <p className="tw-mb-3.8 tw-font-medium tw-text-secondary">Average Rating</p>
                    <div className="tw-bg-white tw-px-7.5 tw-pb-[38px] tw-pt-[34px] tw-text-center tw-shadow-2sm tw-shadow-heading/10">
                        <div className="tw-mb-2 tw-text-[56px] tw-font-semibold tw-leading-none tw-text-primary">
                            {average}
                        </div>
                        <StarRating rating={average} />
                        <div className="tw-mt-0.5">({count} ratings)</div>
                    </div>
                </div>
                <div className="tw-grow">
                    <p className="tw-font-medium tw-text-secondary sm:tw-mb-[42px]">
                        Detailed Rating
                    </p>
                    {Object.entries(rating_details).map(([key, value]) => (
                        <div className="tw-flex tw-items-center" key={key}>
                            <StarRating
                                rating={+key}
                                size="sm"
                                align="left"
                                className="tw-mr-5 tw-shrink-0"
                            />
                            <ProgressBar
                                color="primary"
                                now={value ? 50 : 0}
                                disableAnimation={true}
                                className="tw-grow"
                            />
                            <span className="tw-ml-1 tw-min-w-[25px] tw-shrink-0 tw-text-right tw-font-medium tw-text-gray-400">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {items.length > 0 && (
                <ul className="course-reviews-list tw-mt-[50px]">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="tw-mb-7.5 tw-mt-2.5 tw-border-b tw-border-b-gray-500 tw-pb-7 tw-pl-[5px] tw-pr-5 tw-pt-5 first:tw-mt-0 last:tw-mb-0"
                        >
                            <Review {...item} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ReviewPanel;
