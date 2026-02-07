import Input from "@ui/form-elements/input";
import { useRouter } from "next/router";
import { useState } from "react";

type TProps = {
    className?: string;
};

const SearchWidget = ({ className }: TProps) => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!search) return;
        router.push(
            {
                pathname: "/blogs/search",
                query: {
                    s: search,
                },
            },
            undefined,
            { scroll: false }
        );
    };
    return (
        <div className={className}>
            <h3 className="tw-mb-7.5">Search</h3>
            <form className="tw-relative" onSubmit={onSubmit}>
                <label htmlFor="widgetSearch" className="tw-sr-only">
                    Search For
                </label>
                <Input
                    id="widgetSearch"
                    name="widgetSearch"
                    type="text"
                    className="tw-pr-[72px]"
                    value={search}
                    placeholder="Search for blogs"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    aria-label="Search"
                    type="submit"
                    className="tw-absolute tw-right-0 tw-top-0 tw-flex tw-h-14 tw-w-14 tw-items-center tw-justify-center tw-rounded-br tw-rounded-tr tw-text-primary tw-transition-colors hover:tw-bg-primary hover:tw-text-white"
                >
                    <i className="fas fa-search" />
                </button>
            </form>
        </div>
    );
};

export default SearchWidget;
