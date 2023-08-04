import clsx from "clsx";
import Anchor from "@ui/anchor";
import { IInstructor } from "@utils/types";

type TProps = {
    author: IInstructor;
    className?: string;
};

const AuthorMeta = ({ author, className }: TProps) => {
    return (
        <div className={clsx("post-author tw-mb-[5px]", className)}>
            <Anchor path={author.path} className="tw-flex tw-items-center">
                {author.image?.src && (
                    <img
                        alt={author.image?.alt || "Avatar"}
                        src={author.image.src}
                        className="tw-w-8 tw-h-8 tw-rounded-full tw-mr-2"
                        height="96"
                        width="96"
                    />
                )}
                {author.name}
            </Anchor>
        </div>
    );
};

export default AuthorMeta;
