import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MediaArea from "@containers/media-full/layout-01";
import { IMedia } from "@utils/types";
import { getAllMedia } from "../../../../lib/media";

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
            <SEO title={`Media Grid - Page - ${currentPage}`} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Blog Grid"
            />
            <MediaArea
                data={{
                    medias,
                    pagiData: { currentPage, numberOfPages },
                }}
            />
        </>
    );
};

MediaGrid.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const { count } = getAllMedia([]);
    const pages = Math.ceil(count / POSTS_PER_PAGE);

    const pagesToGenerate = [...Array(pages).keys()]
        .map((a) => {
            if (a !== 0) return a + 1;
            return null;
        })
        .filter(Boolean);

    const paths = pagesToGenerate.map((page) => {
        return { params: { page: String(page) } }; // cast page to string
    });
    return {
        paths,
        fallback: false,
    };
};

interface Params extends ParsedUrlQuery {
    page: string;
}

export const getStaticProps: GetStaticProps<TProps, Params> = ({ params }) => {
    const page = params?.page;
    const currentPage = !page || Number.isNaN(+page) ? 1 : +page;
    const skip = (currentPage - 1) * POSTS_PER_PAGE;
    const { medias, count } = getAllMedia(
        ["title", "slug", "image", "datePublished"],
        skip,
        POSTS_PER_PAGE
    );

    return {
        props: {
            data: {
                medias,
                currentPage,
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
