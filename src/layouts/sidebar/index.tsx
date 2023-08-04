import clsx from "clsx";
import { useCurriculumContext } from "@contexts/curriculum-context";
import SearchForm from "@layout/sidebar/search-form";
import Header from "./header";
import Item from "./item";

type TProps = {
    open: boolean;
    courseSlug: string;
};

const Sidebar = ({ open, courseSlug }: TProps) => {
    const { curriculum } = useCurriculumContext();
    return (
        <div
            className={clsx(
                "tw-fixed tw-inset-0 tw-right-auto tw-z-20 tw-bg-white tw-h-full tw-translate-x-0 tw-shadow-4md tw-shadow-black/10 tw-transition-all tw-duration-300",
                open && "tw-w-0 md:tw-w-[340px]",
                !open && "tw-w-[340px] md:tw-w-0"
            )}
        >
            <SearchForm className="tw-h-[90px] md:tw-h-15" />
            <div
                className={clsx(
                    "tw-absolute tw-top-[90px] md:tw-top-15 tw-left-0 tw-bottom-0 tw-h-full tw-z-1 tw-overflow-y-auto tw-no-scroll tw-w-[340px] tw-transition-all tw-duration-300",
                    !open &&
                        "tw-delay-100 tw-visible tw-opacity-100 md:tw-invisible md:tw-opacity-0 md:tw-delay-0",
                    open &&
                        "tw-invisible tw-opacity-0 md:tw-delay-100 md:tw-visible md:tw-opacity-100"
                )}
            >
                <ul>
                    {curriculum?.map(({ id, title, description, lessons }) => (
                        <li className="tw-mt-5 first:tw-mt-0" key={id}>
                            <Header title={title} description={description} />
                            {lessons.length > 0 && (
                                <ul className="section-content">
                                    {lessons.map((lsn) => (
                                        <li
                                            className="tw-relative tw-text-md tw-bg-white tw-group"
                                            key={lsn.slug}
                                        >
                                            <Item
                                                courseSlug={courseSlug}
                                                title={lsn.title}
                                                path={lsn.path}
                                                type={lsn.type}
                                                duration={lsn.duration}
                                                video={lsn.video}
                                                access={lsn.access}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
