import StarRating from "@ui/star-rating";
import { ImageType } from "@utils/types";

type TProps = {
    user: {
        name: string;
        avatar: ImageType;
    };
    rating: number;
    title: string;
    review: string;
};

const Review = ({ user, rating, title, review }: TProps) => {
    return (
        <div className="review tw-flex tw-flex-wrap">
            {user?.avatar?.src && (
                <figure className="tw-w-[80px] tw-h-[80px] child:tw-rounded-full">
                    <img
                        src={user.avatar.src}
                        alt={user.avatar?.alt || user.name}
                    />
                </figure>
            )}

            <div className="tw-w-full tw-pl-0 tw-pt-7.5 sm:tw-pt-0 sm:tw-w-[calc(100%_-_80px)] sm:tw-pl-8 md:tw-pl-[45px]">
                <div className="tw-flex tw-items-center tw-justify-between">
                    <h4 className="tw-text-base tw-uppercase tw-tracking-wider tw-mb-0">
                        {user.name}
                    </h4>
                    <StarRating rating={rating} space="xs" />
                </div>
                <h5 className="tw-text-base tw-mt-3.8 tw-mb-[5px]">{title}</h5>
                <p>{review}</p>
            </div>
        </div>
    );
};

export default Review;
