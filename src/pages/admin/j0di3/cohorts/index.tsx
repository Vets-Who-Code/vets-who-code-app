import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
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
    size?: number;
    status?: string;
}

const CohortsAdmin: PageWithLayout = () => {
    const [cohorts, setCohorts] = useState<Cohort[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/j0di3/admin/cohorts");
            if (res.ok) {
                const body = await res.json();
                setCohorts(Array.isArray(body) ? body : (body.cohorts ?? []));
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setCreating(true);
        setError(null);
        try {
            const res = await fetch("/api/j0di3/admin/cohorts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, start_date: startDate || undefined }),
            });
            if (!res.ok) {
                const err = await res.json();
                setError(err.error || "Create failed");
                return;
            }
            setName("");
            setStartDate("");
            await load();
        } finally {
            setCreating(false);
        }
    };

    return (
        <>
            <SEO title="Cohorts — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin", label: "admin" },
                    { path: "/admin/j0di3", label: "j0di3" },
                ]}
                currentPage="Cohorts"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-6">
                <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Cohorts</h1>

                <form
                    onSubmit={create}
                    className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-4 tw-flex tw-flex-wrap tw-gap-3 tw-items-end"
                >
                    <div className="tw-flex-1 tw-min-w-[200px]">
                        <label
                            htmlFor="cohort-name"
                            className="tw-block tw-text-xs tw-font-medium tw-text-ink/80 tw-mb-1"
                        >
                            Cohort name
                        </label>
                        <input
                            id="cohort-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Cohort 12"
                            className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="cohort-start"
                            className="tw-block tw-text-xs tw-font-medium tw-text-ink/80 tw-mb-1"
                        >
                            Start date
                        </label>
                        <input
                            id="cohort-start"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={creating || !name.trim()}
                        className="tw-rounded-md tw-bg-primary tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-white disabled:tw-opacity-50"
                    >
                        {creating ? "Creating..." : "Create cohort"}
                    </button>
                </form>

                {error && <p className="tw-text-red-dark tw-text-sm">{error}</p>}

                {isLoading ? (
                    <p className="tw-text-ink/60">Loading...</p>
                ) : (
                    <table className="tw-w-full tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-overflow-hidden">
                        <thead className="tw-bg-navy/5">
                            <tr className="tw-text-left tw-text-xs tw-uppercase tw-text-navy/60">
                                <th className="tw-px-4 tw-py-2">Name</th>
                                <th className="tw-px-4 tw-py-2">Start</th>
                                <th className="tw-px-4 tw-py-2">Size</th>
                                <th className="tw-px-4 tw-py-2">Status</th>
                                <th className="tw-px-4 tw-py-2 tw-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cohorts.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="tw-px-4 tw-py-6 tw-text-center tw-text-ink/60"
                                    >
                                        No cohorts yet.
                                    </td>
                                </tr>
                            )}
                            {cohorts.map((c) => (
                                <tr key={c.id} className="tw-border-t tw-border-navy/10 tw-text-sm">
                                    <td className="tw-px-4 tw-py-2 tw-font-medium tw-text-ink">
                                        {c.name || c.id}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {c.start_date || "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {c.size ?? "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {c.status || "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-right">
                                        <Link
                                            href={`/admin/j0di3/cohorts/${c.id}`}
                                            className="tw-text-xs tw-text-primary hover:tw-underline"
                                        >
                                            Open →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

CohortsAdmin.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default CohortsAdmin;
