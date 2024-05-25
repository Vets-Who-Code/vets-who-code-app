import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MediaGrid from "@components/media-grid";
import { getAllMedia } from "../lib/media";
import { IMedia } from "@utils/types";

type TProps = {
    data: {
        media: IMedia[];
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const Media: PageProps = ({ data: { media } }) => {
    const whatWeHaveBuilt = media.filter(item => item.tags.some(tag => tag.title === 'github'));
    const publications = media.filter(item => item.type === 'publication');
    const podcasts = media.filter(item => item.type === 'podcast');
    const courses = media.filter(item => item.type === 'course');

    return (
        <>
            <SEO title="Media" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Media"
            />
            <div className="tw-container tw-mx-auto tw-my-8">
                <MediaGrid section="What we have built" data={whatWeHaveBuilt} />
                <MediaGrid section="Publications" data={publications} />
                <MediaGrid section="Podcasts" data={podcasts} />
                <MediaGrid section="Courses" data={courses} />
            </div>
        </>
    );
};

Media.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const { media } = getAllMedia([
        "title", "image", "description", "tags", "date", "content", "slug", "excerpt", "sortOrder", "type"
    ]);

    if (!Array.isArray(media)) {
        return {
            props: {
                data: {
                    media: [],
                },
                layout: {
                    headerShadow: true,
                    headerFluid: false,
                    footerMode: "light",
                },
            },
        };
    }

    // Remove duplicates and sort data by sortOrder
    const uniqueMedia = Array.from(new Set(media.map(item => item.slug)))
        .map(slug => media.find(item => item.slug === slug))
        .filter(item => item !== undefined) // Ensure item is not undefined
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    return {
        props: {
            data: {
                media: uniqueMedia,
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
