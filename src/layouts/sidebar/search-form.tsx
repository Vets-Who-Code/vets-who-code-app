import { useState, useEffect } from "react";
import clsx from "clsx";
import { useCurriculumContext } from "@contexts/curriculum-context";

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
        <form
            className={clsx(
                "tw-relative tw-overflow-hidden tw-z-20",
                className
            )}
        >
            <label htmlFor="search" className="tw-sr-only">
                Search For Lesson
            </label>
            <input
                id="search"
                name="search"
                type="text"
                placeholder="Search courses content"
                onChange={(e) => setSearch(e.target.value)}
                className="tw-bg-secondary tw-text-white placeholder:tw-text-white tw-w-full tw-text-md tw-pl-5 tw-pr-10 tw-py-1 tw-h-full focus-visible:tw-rounded-none focus-visible:tw-outline-none"
            />
            <button
                type="submit"
                aria-label="Search"
                className="tw-text-white tw-absolute tw-right-2.5 tw-top-0 tw-h-full tw-w-4 tw-mx-2.5"
            >
                <i className="far fa-search" />
            </button>
        </form>
    );
};

export default SearchForm02;
