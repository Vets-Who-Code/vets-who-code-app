import { GetStaticProps, NextPage } from "next";
import { useState, useMemo } from "react"; // Import useState and useMemo
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import { IMedia } from "@utils/types";
import MediaCard from "@components/media-card";
import { getAllMediaPosts } from "../lib/mdx-pages";

type TProps = {
    allMediaItems: IMedia[]; // Renamed to allMediaItems to avoid conflict with filtered list
    page: {
        title: string;
    };
};

type PageWithLayout = NextPage<TProps> & {
    Layout: typeof Layout;
};

const MediaPage: PageWithLayout = ({ allMediaItems, page }) => {
    const [mediaTypeFilter, setMediaTypeFilter] = useState<string>("");
    const [yearFilter, setYearFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Get unique media types for the filter dropdown
    const mediaTypes = useMemo(() => {
        const types = new Set(allMediaItems.map((item) => item.mediaType));
        return Array.from(types).sort(); // Sort alphabetically
    }, [allMediaItems]);

    // Get unique years for the filter dropdown
    const years = useMemo(() => {
        const extractedYears = new Set(
            allMediaItems.map((item) => new Date(item.date).getFullYear().toString())
        );
        return Array.from(extractedYears).sort((a, b) => parseInt(b, 10) - parseInt(a, 10)); // Sort descending
    }, [allMediaItems]);

    // Filtering logic will go here in the next step
    const filteredMediaItems = allMediaItems.filter((item) => {
        const itemYear = new Date(item.date).getFullYear().toString();
        return (
            (mediaTypeFilter === "" || item.mediaType === mediaTypeFilter) &&
            (yearFilter === "" || itemYear === yearFilter) &&
            (searchTerm === "" ||
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.description &&
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.publication &&
                    item.publication.toLowerCase().includes(searchTerm.toLowerCase())))
        );
    });

    return (
        <>
            <SEO title={`${page.title} | Vets Who Code`} />
            <div className="tw:container tw:py-10 tw:md:py-15">
                <h1 className="tw:mb-10 tw:text-center tw:text-3xl tw:md:text-4xl">{page.title}</h1>

                {/* Filter and Search Controls */}
                <div className="tw:mb-8 tw:rounded-lg tw:border tw:border-gray-200 tw:bg-gray-50 tw:p-4 tw:md:p-6">
                    <div className="tw:flex tw:flex-col tw:gap-4 tw:sm:flex-row tw:md:items-end">
                        <div className="tw:flex-1">
                            <label
                                htmlFor="mediaTypeFilter"
                                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
                            >
                                Filter by Type
                            </label>
                            <select
                                id="mediaTypeFilter"
                                name="mediaTypeFilter"
                                className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:py-3 tw:pl-3 tw:pr-10 tw:text-base tw:focus:border-primary tw:focus:outline-hidden tw:focus:ring-primary tw:sm:text-sm h-12"
                                value={mediaTypeFilter}
                                onChange={(e) => setMediaTypeFilter(e.target.value)}
                            >
                                <option value="">All Types</option>
                                {mediaTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="tw:flex-1">
                            <label
                                htmlFor="yearFilter"
                                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
                            >
                                Filter by Year
                            </label>
                            <select
                                id="yearFilter"
                                name="yearFilter"
                                className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:py-3 tw:pl-3 tw:pr-10 tw:text-base tw:focus:border-primary tw:focus:outline-hidden tw:focus:ring-primary tw:sm:text-sm h-12"
                                value={yearFilter}
                                onChange={(e) => setYearFilter(e.target.value)}
                            >
                                <option value="">All Years</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="tw:flex-1">
                            <label
                                htmlFor="searchTerm"
                                className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
                            >
                                Search
                            </label>
                            <input
                                type="text"
                                id="searchTerm"
                                name="searchTerm"
                                className="tw:mt-1 tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:py-3 tw:pl-3 tw:pr-10 tw:focus:border-primary tw:focus:outline-hidden tw:focus:ring-primary tw:sm:text-sm h-12 appearance-none py-3 text-base"
                                placeholder="Keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Optional: Add a Reset button */}
                        <div className="tw:sm:ml-auto">
                            {" "}
                            {/* Pushes to the right on sm screens if items-end is used */}
                            <button
                                type="button"
                                onClick={() => {
                                    setMediaTypeFilter("");
                                    setYearFilter("");
                                    setSearchTerm("");
                                }}
                                className="tw:mt-1 tw:w-full tw:rounded-md tw:border tw:border-gray-300 tw:bg-white tw:px-4 tw:py-3 tw:text-sm tw:font-medium tw:text-gray-700 tw:shadow-xs tw:hover:bg-gray-50 tw:focus:outline-hidden tw:focus:ring-2 tw:focus:ring-primary tw:focus:ring-offset-2 tw:sm:mt-0 tw:sm:w-auto h-12"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {filteredMediaItems && filteredMediaItems.length > 0 ? (
                    <div className="tw:grid tw:grid-cols-1 tw:gap-6 tw:md:grid-cols-2 tw:lg:grid-cols-3">
                        {filteredMediaItems.map((item) => (
                            <MediaCard key={item.slug} {...item} />
                        ))}
                    </div>
                ) : (
                    <p className="tw:py-10 tw:text-center">
                        No media items found matching your criteria. Try adjusting your filters or
                        search term.
                    </p>
                )}
            </div>
        </>
    );
};

MediaPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
    const allMediaItems = getAllMediaPosts<IMedia>(
        ["slug", "title", "mediaType", "url", "publication", "date", "image", "description"],
        "media"
    );

    return {
        props: {
            allMediaItems, // Pass all items to the page
            page: {
                title: "Media & Features",
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default MediaPage;
