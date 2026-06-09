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

interface Lesson {
    id?: string;
    lesson_id?: string;
    title?: string;
    summary?: string;
    sub_section?: number | string;
    duration_minutes?: number;
    difficulty?: string;
    completed?: boolean;
}

interface ModulePayload {
    module?: number;
    title?: string;
    summary?: string;
    lessons?: Lesson[];
}

const ModuleLessonsPage: PageWithLayout = () => {
    const router = useRouter();
    const moduleParam = router.query.module;
    const module = typeof moduleParam === "string" ? Number(moduleParam) : null;

    const [data, setData] = useState<ModulePayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!module) return;
        (async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/j0di3/lessons/module/${module}`);
                if (!res.ok) {
                    setError("Failed to load module.");
                    return;
                }
                const body = await res.json();
                setData(body);
            } catch {
                setError("Failed to load module.");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [module]);

    const lessons = data?.lessons ?? [];

    return (
        <>
            <SEO title={`Module ${module ?? ""} — Lessons`} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/lessons", label: "lessons" },
                ]}
                currentPage={`Module ${module ?? ""}`}
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-6">
                {isLoading && <p className="tw-text-ink/60">Loading module...</p>}
                {error && <p className="tw-text-red-dark">{error}</p>}

                {!isLoading && !error && (
                    <>
                        <header>
                            <p className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-primary">
                                Module {module}
                            </p>
                            <h1 className="tw-text-3xl tw-font-bold tw-text-ink">
                                {data?.title ?? `Module ${module}`}
                            </h1>
                            {data?.summary && (
                                <p className="tw-mt-2 tw-text-ink/70">{data.summary}</p>
                            )}
                        </header>

                        {lessons.length === 0 && (
                            <p className="tw-text-ink/60">No lessons in this module yet.</p>
                        )}

                        <ul className="tw-space-y-2">
                            {lessons.map((l, i) => {
                                const id = l.id || l.lesson_id || "";
                                return (
                                    <li key={id || i}>
                                        <Link
                                            href={`/lessons/lesson/${id}`}
                                            className="tw-block tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4 hover:tw-border-primary tw-transition-colors"
                                        >
                                            <div className="tw-flex tw-items-start tw-justify-between tw-gap-3">
                                                <div>
                                                    <div className="tw-text-sm tw-font-semibold tw-text-ink">
                                                        {l.title || `Lesson ${id}`}
                                                    </div>
                                                    {l.summary && (
                                                        <div className="tw-text-xs tw-text-ink/60 tw-mt-1 tw-line-clamp-2">
                                                            {l.summary}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="tw-flex tw-items-center tw-gap-2 tw-flex-shrink-0">
                                                    {l.duration_minutes != null && (
                                                        <span className="tw-text-xs tw-text-ink/60">
                                                            {l.duration_minutes}m
                                                        </span>
                                                    )}
                                                    {l.completed && (
                                                        <span className="tw-rounded-full tw-bg-gold-light tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-ink">
                                                            done
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

ModuleLessonsPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAuthSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default ModuleLessonsPage;
