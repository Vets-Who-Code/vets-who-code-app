import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { requireAdminSSR } from "@/lib/auth-guards";

type PageProps = {
    layout?: { headerShadow: boolean; headerFluid: boolean; footerMode: string };
};

type PageWithLayout = NextPage<PageProps> & { Layout?: typeof Layout01 };

interface Cohort {
    id?: string;
    name?: string;
    start_date?: string;
    end_date?: string;
    status?: string;
}

interface RosterEntry {
    troop_id?: string;
    name?: string;
    email?: string;
    branch?: string;
    current_module?: number;
    status?: string;
}

const CohortDetail: PageWithLayout = () => {
    const router = useRouter();
    const id = typeof router.query.id === "string" ? router.query.id : null;

    const [cohort, setCohort] = useState<Cohort | null>(null);
    const [roster, setRoster] = useState<RosterEntry[]>([]);
    const [bulkText, setBulkText] = useState("");
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const load = async () => {
        if (!id) return;
        const [cRes, rRes] = await Promise.all([
            fetch(`/api/j0di3/admin/cohorts/${id}`),
            fetch(`/api/j0di3/admin/cohorts/${id}/roster`),
        ]);
        if (cRes.ok) setCohort(await cRes.json());
        if (rRes.ok) {
            const body = await rRes.json();
            setRoster(Array.isArray(body) ? body : (body.troops ?? []));
        }
    };

    useEffect(() => {
        load();
    }, [id]);

    const addBulk = async () => {
        if (!id || !bulkText.trim()) return;
        const emails = bulkText
            .split(/[\s,]+/)
            .map((s) => s.trim())
            .filter(Boolean);
        if (emails.length === 0) return;
        setBusy(true);
        setMessage(null);
        try {
            const res = await fetch(`/api/j0di3/admin/cohorts/${id}/troops-bulk`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emails }),
            });
            if (res.ok) {
                setMessage(`Added ${emails.length} troops.`);
                setBulkText("");
                await load();
            } else {
                const err = await res.json();
                setMessage(err.error || "Add failed.");
            }
        } finally {
            setBusy(false);
        }
    };

    return (
        <>
            <SEO title={`${cohort?.name ?? "Cohort"} — J0dI3 Admin`} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                    { path: "/admin/j0di3/cohorts", label: "cohorts" },
                ]}
                currentPage={cohort?.name ?? "Cohort"}
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-6">
                <h1 className="tw-text-3xl tw-font-bold tw-text-ink">{cohort?.name || "Cohort"}</h1>

                <section className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-4">
                    <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                        Bulk add troops
                    </h2>
                    <textarea
                        value={bulkText}
                        onChange={(e) => setBulkText(e.target.value)}
                        rows={3}
                        placeholder="Comma- or newline-separated emails"
                        className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                    />
                    <button
                        type="button"
                        onClick={addBulk}
                        disabled={busy || !bulkText.trim()}
                        className="tw-mt-2 tw-rounded-md tw-bg-primary tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-white disabled:tw-opacity-50"
                    >
                        {busy ? "Adding..." : "Add troops"}
                    </button>
                    {message && <p className="tw-mt-2 tw-text-sm tw-text-ink/70">{message}</p>}
                </section>

                <section>
                    <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                        Roster ({roster.length})
                    </h2>
                    <table className="tw-w-full tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-overflow-hidden">
                        <thead className="tw-bg-navy/5">
                            <tr className="tw-text-left tw-text-xs tw-uppercase tw-text-navy/60">
                                <th className="tw-px-4 tw-py-2">Name</th>
                                <th className="tw-px-4 tw-py-2">Email</th>
                                <th className="tw-px-4 tw-py-2">Branch</th>
                                <th className="tw-px-4 tw-py-2">Module</th>
                                <th className="tw-px-4 tw-py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roster.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="tw-px-4 tw-py-6 tw-text-center tw-text-ink/60"
                                    >
                                        Empty roster.
                                    </td>
                                </tr>
                            )}
                            {roster.map((r) => (
                                <tr
                                    key={r.troop_id}
                                    className="tw-border-t tw-border-navy/10 tw-text-sm"
                                >
                                    <td className="tw-px-4 tw-py-2 tw-font-medium tw-text-ink">
                                        {r.name || "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {r.email || "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {r.branch || "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {r.current_module ?? "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {r.status || "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
};

CohortDetail.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default CohortDetail;
