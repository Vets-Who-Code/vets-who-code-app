import { useCurriculumContext } from "@contexts/curriculum-context";
import clsx from "clsx";
import { useEffect, useState } from "react";

type TProps = {
    className?: string;
};

const SearchForm02 = ({ className }: TProps) => {
    const [search, setSearch] = useState("");
    const { searchCurriculum } = useCurriculumContext();
    useEffect(() => {
        searchCurriculum(search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    return (
        <form className={clsx("tw-relative tw-z-20 tw-overflow-hidden", className)}>
            <label htmlFor="search" className="tw-sr-only">
                Search For Lesson
            </label>
            <input
                id="search"
                name="search"
                type="text"
                placeholder="Search courses content"
                onChange={(e) => setSearch(e.target.value)}
                className="tw-h-full tw-w-full tw-bg-secondary tw-py-1 tw-pl-5 tw-pr-10 tw-text-md tw-text-white placeholder:tw-text-white focus-visible:tw-rounded-none focus-visible:tw-outline-none"
            />
            <button
                type="submit"
                aria-label="Search"
                className="tw-absolute tw-right-2.5 tw-top-0 tw-mx-2.5 tw-h-full tw-w-4 tw-text-white"
            >
                <i className="far fa-search" />
            </button>
        </form>
    );
};

export default SearchForm02;
