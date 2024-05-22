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
    return (
        <>
            <SEO title="Media" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Media"
            />
            <div className="tw-container tw-mx-auto tw-my-8">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
                    <MediaGrid section="What we have built" data={media} />
                    <MediaGrid section="Publications" data={media} />
                    <MediaGrid section="Podcasts" data={media} />
                    <MediaGrid section="Courses" data={media} />
                </div>
            </div>
        </>
    );
};

Media.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const { media } = getAllMedia(["title", "image", "description", "tags", "date", "content", "slug", "excerpt"]);

    return {
        props: {
            data: {
                media,
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
