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

interface Placement {
    id?: string;
    troop_id?: string;
    troop_name?: string;
    company?: string;
    role?: string;
    start_date?: string;
    salary?: number;
    status?: string;
}

const PlacementsAdmin: PageWithLayout = () => {
    const [items, setItems] = useState<Placement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [form, setForm] = useState<Placement>({});
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/j0di3/admin/placements");
            if (res.ok) {
                const body = await res.json();
                setItems(Array.isArray(body) ? body : (body.placements ?? []));
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
        if (!form.troop_id || !form.company || !form.role) return;
        setCreating(true);
        setError(null);
        try {
            const res = await fetch("/api/j0di3/admin/placements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const err = await res.json();
                setError(err.error || "Create failed");
                return;
            }
            setForm({});
            await load();
        } finally {
            setCreating(false);
        }
    };

    return (
        <>
            <SEO title="Placements — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                ]}
                currentPage="Placements"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-6">
                <div className="tw-flex tw-items-center tw-justify-between">
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Placements</h1>
                    <a
                        href="/api/j0di3/admin/placements/export.csv"
                        className="tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-ink hover:tw-bg-navy/5"
                    >
                        Export CSV
                    </a>
                </div>

                <form
                    onSubmit={create}
                    className="tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-4 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-3"
                >
                    <Field
                        label="Troop ID"
                        value={form.troop_id ?? ""}
                        onChange={(v) => setForm({ ...form, troop_id: v })}
                    />
                    <Field
                        label="Company"
                        value={form.company ?? ""}
                        onChange={(v) => setForm({ ...form, company: v })}
                    />
                    <Field
                        label="Role"
                        value={form.role ?? ""}
                        onChange={(v) => setForm({ ...form, role: v })}
                    />
                    <Field
                        label="Start date"
                        type="date"
                        value={form.start_date ?? ""}
                        onChange={(v) => setForm({ ...form, start_date: v })}
                    />
                    <Field
                        label="Salary"
                        type="number"
                        value={form.salary != null ? String(form.salary) : ""}
                        onChange={(v) => setForm({ ...form, salary: v ? Number(v) : undefined })}
                    />
                    <div className="md:tw-col-span-3 tw-flex tw-items-end">
                        <button
                            type="submit"
                            disabled={creating || !form.troop_id || !form.company || !form.role}
                            className="tw-rounded-md tw-bg-primary tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-white disabled:tw-opacity-50"
                        >
                            {creating ? "Creating..." : "Create placement"}
                        </button>
                    </div>
                </form>

                {error && <p className="tw-text-sm tw-text-red-dark">{error}</p>}

                {isLoading ? (
                    <p className="tw-text-ink/60">Loading...</p>
                ) : (
                    <table className="tw-w-full tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-overflow-hidden">
                        <thead className="tw-bg-navy/5">
                            <tr className="tw-text-left tw-text-xs tw-uppercase tw-text-navy/60">
                                <th className="tw-px-4 tw-py-2">Troop</th>
                                <th className="tw-px-4 tw-py-2">Company</th>
                                <th className="tw-px-4 tw-py-2">Role</th>
                                <th className="tw-px-4 tw-py-2">Start</th>
                                <th className="tw-px-4 tw-py-2">Status</th>
                                <th className="tw-px-4 tw-py-2 tw-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="tw-px-4 tw-py-6 tw-text-center tw-text-ink/60"
                                    >
                                        No placements.
                                    </td>
                                </tr>
                            )}
                            {items.map((p) => (
                                <tr key={p.id} className="tw-border-t tw-border-navy/10 tw-text-sm">
                                    <td className="tw-px-4 tw-py-2 tw-font-medium tw-text-ink">
                                        {p.troop_name || p.troop_id}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">{p.company}</td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">{p.role}</td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {p.start_date || "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                        {p.status || "—"}
                                    </td>
                                    <td className="tw-px-4 tw-py-2 tw-text-right">
                                        <Link
                                            href={`/admin/j0di3/placements/${p.id}`}
                                            className="tw-text-xs tw-text-primary hover:tw-underline"
                                        >
                                            Edit →
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

function Field({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
}) {
    const id = `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
    return (
        <div>
            <label
                htmlFor={id}
                className="tw-block tw-text-xs tw-font-medium tw-text-ink/80 tw-mb-1"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
            />
        </div>
    );
}

PlacementsAdmin.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default PlacementsAdmin;
