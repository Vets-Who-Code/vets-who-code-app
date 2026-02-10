import Anchor from "@ui/anchor";
import { IInstructor } from "@utils/types";
import clsx from "clsx";

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
                        className="tw-mr-2 tw-h-8 tw-w-8 tw-rounded-full"
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
