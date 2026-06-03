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

interface BudgetPayload {
    total_spent?: number;
    monthly_limit?: number;
    period?: string;
    by_provider?: { provider?: string; spent?: number; calls?: number }[];
    by_pillar?: { pillar?: string; spent?: number; calls?: number }[];
}

const BudgetAdmin: PageWithLayout = () => {
    const [data, setData] = useState<BudgetPayload | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/j0di3/admin/budget");
            if (res.ok) setData(await res.json());
        })();
    }, []);

    return (
        <>
            <SEO title="Budget — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                ]}
                currentPage="Budget"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-6">
                <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Budget</h1>

                {data && (
                    <>
                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-3">
                            <Tile label="Spent" value={`$${(data.total_spent ?? 0).toFixed(2)}`} />
                            {data.monthly_limit != null && (
                                <Tile
                                    label="Monthly limit"
                                    value={`$${data.monthly_limit.toFixed(2)}`}
                                />
                            )}
                            {data.period && <Tile label="Period" value={data.period} />}
                        </div>

                        {data.by_provider && data.by_provider.length > 0 && (
                            <Section
                                title="By provider"
                                rows={data.by_provider}
                                keyName="provider"
                            />
                        )}
                        {data.by_pillar && data.by_pillar.length > 0 && (
                            <Section title="By pillar" rows={data.by_pillar} keyName="pillar" />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

function Tile({ label, value }: { label: string; value: string }) {
    return (
        <div className="tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4">
            <div className="tw-font-mono tw-text-[10px] tw-uppercase tw-text-navy/60">{label}</div>
            <div className="tw-text-2xl tw-font-bold tw-text-ink tw-mt-1">{value}</div>
        </div>
    );
}

function Section({
    title,
    rows,
    keyName,
}: {
    title: string;
    rows: { spent?: number; calls?: number; [k: string]: unknown }[];
    keyName: string;
}) {
    return (
        <section>
            <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                {title}
            </h2>
            <table className="tw-w-full tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-overflow-hidden">
                <thead className="tw-bg-navy/5">
                    <tr className="tw-text-left tw-text-xs tw-uppercase tw-text-navy/60">
                        <th className="tw-px-4 tw-py-2">{keyName}</th>
                        <th className="tw-px-4 tw-py-2 tw-text-right">Calls</th>
                        <th className="tw-px-4 tw-py-2 tw-text-right">Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="tw-border-t tw-border-navy/10 tw-text-sm">
                            <td className="tw-px-4 tw-py-2 tw-text-ink">
                                {String(r[keyName] ?? "—")}
                            </td>
                            <td className="tw-px-4 tw-py-2 tw-text-right tw-text-ink/70">
                                {r.calls ?? "—"}
                            </td>
                            <td className="tw-px-4 tw-py-2 tw-text-right tw-text-ink/70">
                                ${(r.spent ?? 0).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

BudgetAdmin.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default BudgetAdmin;
