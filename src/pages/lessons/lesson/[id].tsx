import { AITeachingAssistant } from "@components/ai-assistant";
import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { requireAuthSSR } from "@/lib/auth-guards";

type PageProps = {
    layout?: { headerShadow: boolean; headerFluid: boolean; footerMode: string };
};

type PageWithLayout = NextPage<PageProps> & { Layout?: typeof Layout01 };

interface LessonPayload {
    id?: string;
    title?: string;
    module?: number;
    summary?: string;
    content?: string;
    markdown?: string;
    body?: string;
    completed?: boolean;
}

const LessonPage: PageWithLayout = () => {
    const router = useRouter();
    const idParam = router.query.id;
    const id = typeof idParam === "string" ? idParam : null;

    const [lesson, setLesson] = useState<LessonPayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCompleting, setIsCompleting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/j0di3/lessons/${id}`);
                if (res.ok) {
                    const body = (await res.json()) as LessonPayload;
                    setLesson(body);
                    setCompleted(!!body.completed);
                }
            } catch {
                // non-critical
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    const markComplete = async () => {
        if (!id) return;
        setIsCompleting(true);
        try {
            const res = await fetch(`/api/j0di3/lessons/${id}/complete`, { method: "POST" });
            if (res.ok) setCompleted(true);
        } finally {
            setIsCompleting(false);
        }
    };

    const body = lesson?.content || lesson?.markdown || lesson?.body || "";

    return (
        <>
            <SEO title={lesson?.title ?? "Lesson"} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/lessons", label: "lessons" },
                ]}
                currentPage={lesson?.title ?? "Lesson"}
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-max-w-3xl tw-space-y-6">
                {isLoading && <p className="tw-text-ink/60">Loading lesson...</p>}

                {!isLoading && lesson && (
                    <>
                        <header>
                            {lesson.module != null && (
                                <p className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-primary">
                                    <Link href={`/lessons/module/${lesson.module}`}>
                                        Module {lesson.module}
                                    </Link>
                                </p>
                            )}
                            <h1 className="tw-text-3xl tw-font-bold tw-text-ink tw-mt-1">
                                {lesson.title || "Lesson"}
                            </h1>
                            {lesson.summary && (
                                <p className="tw-mt-2 tw-text-ink/70">{lesson.summary}</p>
                            )}
                        </header>

                        {body && (
                            <article className="tw-prose tw-max-w-none tw-text-ink tw-whitespace-pre-wrap">
                                {body}
                            </article>
                        )}

                        <div className="tw-pt-4 tw-border-t tw-border-navy/10">
                            <button
                                type="button"
                                onClick={markComplete}
                                disabled={isCompleting || completed}
                                className="tw-rounded-md tw-bg-primary tw-px-6 tw-py-2 tw-font-medium tw-text-white disabled:tw-opacity-50"
                            >
                                {completed
                                    ? "Completed"
                                    : isCompleting
                                      ? "Marking..."
                                      : "Mark complete"}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <button
                type="button"
                onClick={() => setIsAssistantOpen(true)}
                className="tw-fixed tw-bottom-6 tw-right-6 tw-z-40 tw-rounded-full tw-bg-navy tw-px-5 tw-py-3 tw-font-medium tw-text-white tw-shadow-lg tw-transition-colors hover:tw-bg-navy-royal focus-visible:tw-ring-2 focus-visible:tw-ring-gold"
                aria-label="Open AI teaching assistant"
            >
                Ask J0d!e
            </button>

            <AITeachingAssistant
                isOpen={isAssistantOpen}
                onClose={() => setIsAssistantOpen(false)}
                lessonContext={
                    lesson && id
                        ? {
                              lessonId: id,
                              lessonTitle: lesson.title ?? "Lesson",
                              moduleTitle:
                                  lesson.module != null ? `Module ${lesson.module}` : "Curriculum",
                              courseTitle: "Vets Who Code",
                              content: body || undefined,
                          }
                        : undefined
                }
            />
        </>
    );
};

LessonPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAuthSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default LessonPage;
