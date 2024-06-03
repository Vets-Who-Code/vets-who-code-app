import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MediaArea from "@containers/media-full/index"; // Assuming the new component is saved here
import { getAllMedia } from "../lib/media";
import { IMedia } from "@utils/types";

type TProps = {
    data: {
        media: IMedia[];
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 9;

const Media: PageProps = ({ data: { media, currentPage, numberOfPages } }) => {
    return (
        <>
            <SEO title="Media" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Media"
            />
            <MediaArea
                data={{
                    media,
                    pagiData: { currentPage, numberOfPages },
                }}
            />
        </>
    );
};

Media.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const { media, count } = getAllMedia([
        "title", "image", "description", "tags", "date", "content", "slug", "excerpt", "sortOrder", "type"
    ], 0, POSTS_PER_PAGE);

    // Remove duplicates and sort data by sortOrder
    const uniqueMedia = Array.from(new Set(media.map(item => item.slug)))
        .map(slug => media.find(item => item.slug === slug))
        .filter(item => item !== undefined) // Ensure item is not undefined
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    return {
        props: {
            data: {
                media: uniqueMedia,
                currentPage: 1,
                numberOfPages: Math.ceil(count / POSTS_PER_PAGE),
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Media;