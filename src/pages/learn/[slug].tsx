import SEO from "@components/seo/page-seo";
import InteractiveLessonWorkspace from "@containers/interactive-lesson";
import Layout01 from "@layout/layout-01";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getAdjacentLessons, getAllLessonSlugs, getLessonBySlug } from "@/lib/interactive-lessons";
import type { InteractiveLesson, LessonNavRef } from "@/lib/interactive-lessons/types";

type PageProps = {
    lesson: InteractiveLesson;
    prev: LessonNavRef | null;
    next: LessonNavRef | null;
    layout?: {
        headerShadow: boolean;
        headerFluid: boolean;
        footerMode: string;
    };
};

type PageWithLayout = NextPage<PageProps> & {
    Layout?: typeof Layout01;
};

const LessonPage: PageWithLayout = ({ lesson, prev, next }) => (
    <>
        <SEO
            title={`${lesson.title} — Learn | Vets Who Code`}
            description={`Interactive ${lesson.moduleTitle} lesson: ${lesson.title}. Write code, run it live in the browser, and pass the tests.`}
        />
        {/* key by slug so the workspace fully remounts between lessons — Next.js reuses
            the [slug] page component across slug changes, which would otherwise leave
            stale editor state (active file, starter srcdoc) from the previous lesson. */}
        <InteractiveLessonWorkspace key={lesson.slug} lesson={lesson} prev={prev} next={next} />
    </>
);

LessonPage.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: getAllLessonSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
    const slug = typeof params?.slug === "string" ? params.slug : "";
    const lesson = getLessonBySlug(slug);
    if (!lesson) return { notFound: true };

    const { prev, next } = getAdjacentLessons(slug);
    return {
        props: {
            lesson,
            prev,
            next,
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default LessonPage;
