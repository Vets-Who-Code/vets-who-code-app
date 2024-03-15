// import type { GetStaticProps } from "next";
import type { NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import MediaArea from "@containers/media-full/layout-01";
import {IMedia} from "@utils/types";
// import { getPageData } from "../lib/page";
// import { getAllBlogs } from "../lib/blog";

type TProps = {
    data:{
        medias: IMedia[];
    }
}

// type TProps = {
//     data: {
//         page: {
//             content: PageContent[];
//         };
//     };
// };

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};


const MediaGrid: PageProps = ({ data: {medias} }) => {
    // const content = normalizedData<PageContent>(data.page?.content, "section");
    
    return (
        <>
            <SEO title="In The Media" />
            <h1 className="tw-sr-only">In The Media</h1>
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="In The Media"
            />
            <MediaArea
            data={{medias}}
            
            />
            
        </>
    );
};

MediaGrid.Layout = Layout01;

// export const getStaticProps: GetStaticProps = () => {
//     const { medias, count } = getAllBlogs(
//         ["title", "image", "category", "postedAt", "views"],
//         0,
//         POSTS_PER_PAGE
//     );

//     return {
//         props: {
//             data: {
//                 medias,
//                 currentPage: 1,
//                 numberOfPages: Math.ceil(count / POSTS_PER_PAGE),
//             },
//             layout: {
//                 headerShadow: true,
//                 headerFluid: false,
//                 footerMode: "light",
//             },
//         },
//     };
// };

export default MediaGrid;
