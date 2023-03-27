import CommentForm from "@components/forms/comment-form";

const Comment = () => {
    return (
        <div className="tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
            <div className="tw-container">
                <h3 className="tw-text-center tw-mb-11 tw-text-4xl lg:tw-text-5xl">
                    Leave your thought here
                </h3>
                <CommentForm />
            </div>
        </div>
    );
};

export default Comment;
