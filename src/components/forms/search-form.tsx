import { forwardRef, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Input from "@ui/form-elements/input";

type TProps = {
    className?: string;
    bg?: "white" | "light";
};

const SearchForm = forwardRef<HTMLFormElement, TProps>(
    ({ className, bg }, ref) => {
        const [search, setSearch] = useState("");
        const router = useRouter();
        const onSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!search) return;
            void router.push(
                {
                    pathname: "/courses/search",
                    query: {
                        s: search,
                    },
                },
                undefined,
                { scroll: false }
            );
        };
        return (
            <form
                className={clsx("tw-relative", className)}
                ref={ref}
                onSubmit={onSubmit}
            >
                <label htmlFor="search" className="tw-sr-only">
                    Search For
                </label>
                <Input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search..."
                    bg={bg}
                    className={clsx("tw-max-h-[48px] tw-pr-[50px]")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    type="submit"
                    aria-label="Search"
                    className="tw-absolute tw-right-0 tw-top-0 tw-w-12 tw-h-12 tw-rounded-tr tw-rounded-br tw-transition-colors tw-text-primary tw-flex tw-justify-center tw-items-center hover:tw-bg-primary hover:tw-text-white"
                >
                    <i className="fas fa-search" />
                </button>
            </form>
        );
    }
);

export default SearchForm;
