import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { requireAuthSSR } from "@/lib/auth-guards";

type PageProps = {
    layout?: { headerShadow: boolean; headerFluid: boolean; footerMode: string };
};

type PageWithLayout = NextPage<PageProps> & { Layout?: typeof Layout01 };

interface RecallItem {
    lesson_id?: string;
    id?: string;
    title?: string;
    module?: number;
    due_at?: string;
}

const LessonsIndex: PageWithLayout = () => {
    const [recall, setRecall] = useState<RecallItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/j0di3/lessons/recall-due");
                if (res.ok) {
                    const body = await res.json();
                    setRecall(Array.isArray(body) ? body : (body.items ?? body.lessons ?? []));
                }
            } catch {
                // non-critical
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const modules = Array.from({ length: 25 }, (_, i) => i + 1);

    return (
        <>
            <SEO title="Lessons" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Lessons"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-8">
                <header>
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Lessons</h1>
                    <p className="tw-mt-2 tw-text-ink/70">
                        Jump into a module or knock out a recall card.
                    </p>
                </header>

                {!isLoading && recall.length > 0 && (
                    <section className="tw-rounded-lg tw-border tw-border-primary/20 tw-bg-white tw-p-6 tw-shadow-sm">
                        <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary tw-mb-3">
                            Recall — due now
                        </h2>
                        <ul className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3">
                            {recall.slice(0, 9).map((r) => {
                                const id = r.lesson_id || r.id || "";
                                return (
                                    <li key={id || r.title}>
                                        <Link
                                            href={`/lessons/lesson/${id}`}
                                            className="tw-block tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-3 hover:tw-border-primary"
                                        >
                                            <div className="tw-text-sm tw-font-semibold tw-text-ink">
                                                {r.title || `Lesson ${id}`}
                                            </div>
                                            {r.module != null && (
                                                <div className="tw-text-xs tw-text-ink/60 tw-mt-1">
                                                    Module {r.module}
                                                </div>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}

                <section>
                    <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3">
                        Curriculum modules
                    </h2>
                    <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-5 tw-gap-3">
                        {modules.map((m) => (
                            <Link
                                key={m}
                                href={`/lessons/module/${m}`}
                                className="tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4 tw-text-center hover:tw-border-primary tw-transition-colors"
                            >
                                <div className="tw-font-mono tw-text-xs tw-text-navy/60 tw-uppercase">
                                    Module
                                </div>
                                <div className="tw-text-2xl tw-font-bold tw-text-ink">{m}</div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

LessonsIndex.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAuthSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default LessonsIndex;
