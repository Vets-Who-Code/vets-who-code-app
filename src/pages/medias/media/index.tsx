import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MediaArea from "@containers/media-full/layout-01";
import { IMedia } from "@utils/types";
import { getAllMedia } from "lib/media";

type TProps = {
    data: {
        medias: IMedia[];
        currentPage: number;
        numberOfPages: number;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const POSTS_PER_PAGE = 9;

const MediaGrid: PageProps = ({
    data: { medias, currentPage, numberOfPages },
}) => {
    return (
        <>
            <SEO title="In The Media" />
            <h1 className="tw-sr-only">In The Media</h1>
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="In The Media"
            />
            <MediaArea
                data={{ medias, pagiData: { currentPage, numberOfPages } }}
            />
        </>
    );
};

MediaGrid.Layout = Layout01;

export const getStaticProps: GetStaticProps = () => {
    const { medias, count } = getAllMedia(
        ["title", "image", "datePublished"],
        0,
        POSTS_PER_PAGE
    );

    return {
        props: {
            data: {
                medias,
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

export default MediaGrid;
