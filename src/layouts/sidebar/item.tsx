import clsx from "clsx";
import { useRouter } from "next/router";
import Anchor from "@ui/anchor";
import Badge from "@ui/badge";
import { ILesson } from "@utils/types";
import { useUser } from "@contexts/user-context";

type IProps = Omit<ILesson, "id" | "chapter" | "slug" | "content"> & {
    courseSlug: string;
};

const Item = ({
    courseSlug,
    title,
    type,
    duration,
    video,
    access,
    path,
}: IProps) => {
    const router = useRouter();
    const active = router.asPath === path;
    const { courseProgress } = useUser();
    const enrolledCourse = courseProgress.find(
        (cs) => cs.course === courseSlug
    );
    const hasAccess = enrolledCourse || access === "free";

    return (
        <Anchor
            className={clsx(
                "tw-px-[22px] tw-min-h-[56px] tw-flex tw-flex-wrap tw-items-center",
                !active && "group-odd:tw-bg-light-100 group-even:tw-bg-white",
                active && "tw-bg-primary tw-text-white hover:tw-text-white",
                !hasAccess && "tw-pointer-events-none"
            )}
            path={path}
        >
            <div className="tw-flex-1 tw-py-2.5 tw-relative tw-pl-7.5 tw-leading-normal">
                <i
                    className={clsx(
                        "far tw-w-5 tw-text-md tw-absolute tw-left-0 tw-top-1/2 -tw-translate-y-1/2",
                        type === "lesson" && "fa-file-alt",
                        type === "quiz" && "fa-clock"
                    )}
                />
                <span>{title}</span>
            </div>

            <div className="tw-flex tw-justify-end tw-items-center tw-py-2.5 tw-shrink-0">
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
                    <span className="tw-ml-2.5 tw-font-medium tw-px-3.8">
                        <i className="far fa-video" />
                    </span>
                )}
            </div>
        </Anchor>
    );
};
export default Item;
