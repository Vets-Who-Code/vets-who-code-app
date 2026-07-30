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

interface Placement {
    id?: string;
    troop_id?: string;
    company?: string;
    role?: string;
    start_date?: string;
    salary?: number;
    status?: string;
    notes?: string;
}

const PlacementDetail: PageWithLayout = () => {
    const router = useRouter();
    const id = typeof router.query.id === "string" ? router.query.id : null;
    const [data, setData] = useState<Placement | null>(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        (async () => {
            const res = await fetch(`/api/j0di3/admin/placements/${id}`);
            if (res.ok) setData(await res.json());
        })();
    }, [id]);

    const save = async () => {
        if (!id || !data) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/j0di3/admin/placements/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            setMessage(res.ok ? "Saved." : "Save failed.");
        } finally {
            setSaving(false);
        }
    };

    const remove = async () => {
        if (!id || !window.confirm("Delete this placement?")) return;
        const res = await fetch(`/api/j0di3/admin/placements/${id}`, { method: "DELETE" });
        if (res.ok) router.push("/admin/j0di3/placements");
    };

    if (!data) {
        return (
            <div className="tw-container tw-py-12">
                <p className="tw-text-ink/60">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <SEO title="Edit placement — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                    { path: "/admin/j0di3/placements", label: "placements" },
                ]}
                currentPage={data.company || "Placement"}
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-max-w-2xl tw-space-y-6">
                <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Edit placement</h1>

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-3 tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-p-4">
                    <Field
                        label="Company"
                        value={data.company ?? ""}
                        onChange={(v) => setData({ ...data, company: v })}
                    />
                    <Field
                        label="Role"
                        value={data.role ?? ""}
                        onChange={(v) => setData({ ...data, role: v })}
                    />
                    <Field
                        label="Start date"
                        type="date"
                        value={data.start_date ?? ""}
                        onChange={(v) => setData({ ...data, start_date: v })}
                    />
                    <Field
                        label="Salary"
                        type="number"
                        value={data.salary != null ? String(data.salary) : ""}
                        onChange={(v) => setData({ ...data, salary: v ? Number(v) : undefined })}
                    />
                    <Field
                        label="Status"
                        value={data.status ?? ""}
                        onChange={(v) => setData({ ...data, status: v })}
                    />
                    <div className="sm:tw-col-span-2">
                        <label
                            htmlFor="notes"
                            className="tw-block tw-text-xs tw-font-medium tw-text-ink/80 tw-mb-1"
                        >
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            value={data.notes ?? ""}
                            onChange={(e) => setData({ ...data, notes: e.target.value })}
                            rows={3}
                            className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-px-3 tw-py-2 tw-text-sm focus:tw-border-primary focus:tw-outline-none"
                        />
                    </div>
                </div>

                <div className="tw-flex tw-gap-3">
                    <button
                        type="button"
                        onClick={save}
                        disabled={saving}
                        className="tw-rounded-md tw-bg-primary tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-white disabled:tw-opacity-50"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={remove}
                        className="tw-rounded-md tw-border tw-border-red tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-red-dark hover:tw-bg-cream"
                    >
                        Delete
                    </button>
                    {message && (
                        <span className="tw-self-center tw-text-sm tw-text-ink/70">{message}</span>
                    )}
                </div>
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

PlacementDetail.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default PlacementDetail;
