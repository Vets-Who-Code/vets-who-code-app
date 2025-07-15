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
        <div className="review tw:flex tw:flex-wrap">
            {user?.avatar?.src && (
                <figure className="tw:h-[80px] tw:w-[80px] tw:child:rounded-full">
                    <img src={user.avatar.src} alt={user.avatar?.alt || user.name} />
                </figure>
            )}

            <div className="tw:w-full tw:pl-0 tw:pt-7.5 tw:sm:w-[calc(100%-80px)] tw:sm:pl-8 tw:sm:pt-0 tw:md:pl-[45px]">
                <div className="tw:flex tw:items-center tw:justify-between">
                    <h4 className="tw:mb-0 tw:text-base tw:uppercase tw:tracking-wider">
                        {user.name}
                    </h4>
                    <StarRating rating={rating} space="xs" />
                </div>
                <h5 className="tw:mb-[5px] tw:mt-3.8 tw:text-base">{title}</h5>
                <p>{review}</p>
            </div>
        </div>
    );
};

export default Review;
