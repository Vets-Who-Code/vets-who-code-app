import Anchor from "@ui/anchor";
import Badge from "@ui/badge";
import { ILesson } from "@utils/types";
import clsx from "clsx";
import { useRouter } from "next/router";

type IProps = Omit<ILesson, "id" | "chapter" | "slug" | "content">;

const Item = ({ title, type, duration, video, access, path }: IProps) => {
    const router = useRouter();
    const active = router.asPath === path;

    return (
        <Anchor
            className={clsx(
                "tw-flex tw-min-h-[56px] tw-flex-wrap tw-items-center tw-px-[22px]",
                !active && "group-odd:tw-bg-light-100 group-even:tw-bg-white",
                active && "tw-bg-primary tw-text-white hover:tw-text-white"
            )}
            path={path}
        >
            <div className="tw-relative tw-flex-1 tw-py-2.5 tw-pl-7.5 tw-leading-normal">
                <i
                    className={clsx(
                        "far tw-absolute tw-left-0 tw-top-1/2 tw-w-5 -tw-translate-y-1/2 tw-text-md",
                        type === "lesson" && "fa-file-alt",
                        type === "quiz" && "fa-clock"
                    )}
                />
                <span>{title}</span>
            </div>

            <div className="tw-flex tw-shrink-0 tw-items-center tw-justify-end tw-py-2.5">
                <Badge
                    className="tw-ml-2.5"
                    size="sm"
                    variant={active ? "outlined" : "contained"}
                    color={active ? "white" : "teracotta"}
                >
                    {duration}
                </Badge>
                {type === "lesson" && access === "free" && video && (
                    <Badge
                        className="tw-ml-2.5"
                        size="sm"
                        variant={active ? "outlined" : "contained"}
                        color={active ? "white" : "primary"}
                    >
                        Preview
                    </Badge>
                )}
                {access === "paid" && video && (
                    <span className="tw-ml-2.5 tw-px-3.8 tw-font-medium">
                        <i className="far fa-video" />
                    </span>
                )}
            </div>
        </Anchor>
    );
};

export default Item;
