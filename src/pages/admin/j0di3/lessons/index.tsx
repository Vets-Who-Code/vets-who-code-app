import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { requireAdminSSR } from "@/lib/auth-guards";

type PageProps = {
    layout?: { headerShadow: boolean; headerFluid: boolean; footerMode: string };
};

type PageWithLayout = NextPage<PageProps> & { Layout?: typeof Layout01 };

interface ReviewItem {
    lesson_id?: string;
    id?: string;
    title?: string;
    module?: number;
    status?: string;
    claimed_by?: string;
    updated_at?: string;
}

const LessonsAdmin: PageWithLayout = () => {
    const [queue, setQueue] = useState<ReviewItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [busy, setBusy] = useState<string | null>(null);

    const load = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/j0di3/admin/lessons/review-queue");
            if (res.ok) {
                const body = await res.json();
                setQueue(Array.isArray(body) ? body : (body.items ?? body.lessons ?? []));
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const action = async (id: string, kind: "claim" | "release" | "force-release") => {
        setBusy(`${id}:${kind}`);
        try {
            const res = await fetch(`/api/j0di3/admin/lessons/${id}/${kind}`, { method: "POST" });
            if (res.ok) await load();
        } finally {
            setBusy(null);
        }
    };

    return (
        <>
            <SEO title="Lesson review — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                ]}
                currentPage="Lessons review"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-6">
                <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Lesson review queue</h1>

                {isLoading ? (
                    <p className="tw-text-ink/60">Loading...</p>
                ) : (
                    <table className="tw-w-full tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-overflow-hidden">
                        <thead className="tw-bg-navy/5">
                            <tr className="tw-text-left tw-text-xs tw-uppercase tw-text-navy/60">
                                <th className="tw-px-4 tw-py-2">Title</th>
                                <th className="tw-px-4 tw-py-2">Module</th>
                                <th className="tw-px-4 tw-py-2">Status</th>
                                <th className="tw-px-4 tw-py-2">Claimed by</th>
                                <th className="tw-px-4 tw-py-2 tw-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queue.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="tw-px-4 tw-py-6 tw-text-center tw-text-ink/60"
                                    >
                                        Queue clear.
                                    </td>
                                </tr>
                            )}
                            {queue.map((q) => {
                                const id = q.id || q.lesson_id || "";
                                return (
                                    <tr
                                        key={id}
                                        className="tw-border-t tw-border-navy/10 tw-text-sm"
                                    >
                                        <td className="tw-px-4 tw-py-2 tw-font-medium tw-text-ink">
                                            {q.title || id}
                                        </td>
                                        <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                            {q.module ?? "—"}
                                        </td>
                                        <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                            {q.status || "—"}
                                        </td>
                                        <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                            {q.claimed_by || "—"}
                                        </td>
                                        <td className="tw-px-4 tw-py-2 tw-text-right">
                                            <div className="tw-flex tw-justify-end tw-gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => action(id, "claim")}
                                                    disabled={busy === `${id}:claim`}
                                                    className="tw-text-xs tw-rounded tw-border tw-border-primary tw-px-2 tw-py-1 tw-text-primary hover:tw-bg-primary/5 disabled:tw-opacity-50"
                                                >
                                                    Claim
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => action(id, "release")}
                                                    disabled={busy === `${id}:release`}
                                                    className="tw-text-xs tw-rounded tw-border tw-border-navy/10 tw-px-2 tw-py-1 tw-text-ink/80 hover:tw-bg-navy/5 disabled:tw-opacity-50"
                                                >
                                                    Release
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => action(id, "force-release")}
                                                    disabled={busy === `${id}:force-release`}
                                                    className="tw-text-xs tw-rounded tw-border tw-border-red tw-px-2 tw-py-1 tw-text-red-dark hover:tw-bg-cream disabled:tw-opacity-50"
                                                >
                                                    Force release
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

LessonsAdmin.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default LessonsAdmin;
