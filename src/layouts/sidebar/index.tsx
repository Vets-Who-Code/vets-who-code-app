import clsx from "clsx";
import { useCurriculumContext } from "@contexts/curriculum-context";
import SearchForm from "@layout/sidebar/search-form";
import Header from "./header";
import Item from "./item";

type TProps = {
    open: boolean;
};

const Sidebar = ({ open }: TProps) => {
    const { curriculum } = useCurriculumContext();
    return (
        <div
            className={clsx(
                "tw-fixed tw-inset-0 tw-right-auto tw-z-20 tw-h-full tw-translate-x-0 tw-bg-white tw-shadow-4md tw-shadow-black/10 tw-transition-all tw-duration-300",
                open && "tw-w-0 md:tw-w-[340px]",
                !open && "tw-w-[340px] md:tw-w-0"
            )}
        >
            <SearchForm className="tw-h-[90px] md:tw-h-15" />
            <div
                className={clsx(
                    "tw-no-scroll tw-absolute tw-bottom-0 tw-left-0 tw-top-[90px] tw-z-1 tw-h-full tw-w-[340px] tw-overflow-y-auto tw-transition-all tw-duration-300 md:tw-top-15",
                    !open &&
                        "tw-visible tw-opacity-100 tw-delay-100 md:tw-invisible md:tw-opacity-0 md:tw-delay-0",
                    open &&
                        "tw-invisible tw-opacity-0 md:tw-visible md:tw-opacity-100 md:tw-delay-100"
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
                                            className="tw-group tw-relative tw-bg-white tw-text-md"
                                            key={lsn.slug}
                                        >
                                            <Item
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
