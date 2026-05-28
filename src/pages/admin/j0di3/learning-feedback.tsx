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

interface FeedbackItem {
    id?: string;
    message_id?: string;
    troop_id?: string;
    rating?: "up" | "down";
    content?: string;
    question?: string;
    reviewed?: boolean;
    created_at?: string;
}

const LearningFeedbackAdmin: PageWithLayout = () => {
    const [items, setItems] = useState<FeedbackItem[]>([]);
    const [busy, setBusy] = useState<string | null>(null);

    const load = async () => {
        const res = await fetch("/api/j0di3/admin/learning/feedback");
        if (res.ok) {
            const body = await res.json();
            setItems(Array.isArray(body) ? body : (body.items ?? body.feedback ?? []));
        }
    };

    useEffect(() => {
        load();
    }, []);

    const markReviewed = async (id: string, action: "approve" | "reject") => {
        setBusy(id);
        try {
            const res = await fetch(`/api/j0di3/admin/learning/feedback/${id}/review`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });
            if (res.ok) await load();
        } finally {
            setBusy(null);
        }
    };

    return (
        <>
            <SEO title="Learning feedback — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                ]}
                currentPage="Learning feedback"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-4">
                <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Learning feedback</h1>

                <ul className="tw-space-y-3">
                    {items.length === 0 && (
                        <li className="tw-text-ink/60">No feedback to review.</li>
                    )}
                    {items.map((f) => {
                        const id = f.id || f.message_id || "";
                        return (
                            <li
                                key={id}
                                className="tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4"
                            >
                                <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                                    <span
                                        className={`tw-text-xs tw-font-bold ${f.rating === "up" ? "tw-text-navy-deep" : "tw-text-red-dark"}`}
                                    >
                                        {f.rating === "up" ? "👍" : "👎"} {f.rating}
                                    </span>
                                    {f.reviewed && (
                                        <span className="tw-text-xs tw-text-ink/60">reviewed</span>
                                    )}
                                </div>
                                {f.question && (
                                    <div className="tw-text-sm tw-text-ink/80 tw-mb-1">
                                        <strong>Q:</strong> {f.question}
                                    </div>
                                )}
                                {f.content && (
                                    <div className="tw-text-sm tw-text-ink/70 tw-whitespace-pre-wrap">
                                        {f.content}
                                    </div>
                                )}
                                {!f.reviewed && (
                                    <div className="tw-flex tw-gap-2 tw-mt-2">
                                        <button
                                            type="button"
                                            onClick={() => markReviewed(id, "approve")}
                                            disabled={busy === id}
                                            className="tw-text-xs tw-rounded tw-border tw-border-primary tw-px-2 tw-py-1 tw-text-primary disabled:tw-opacity-50"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => markReviewed(id, "reject")}
                                            disabled={busy === id}
                                            className="tw-text-xs tw-rounded tw-border tw-border-red tw-px-2 tw-py-1 tw-text-red-dark disabled:tw-opacity-50"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

LearningFeedbackAdmin.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default LearningFeedbackAdmin;
