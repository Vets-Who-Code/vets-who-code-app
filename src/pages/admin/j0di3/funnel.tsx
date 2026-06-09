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

interface FunnelPayload {
    stages?: { name?: string; count?: number; rate?: number }[];
    overall?: Record<string, number | string>;
}

const FunnelAdmin: PageWithLayout = () => {
    const [data, setData] = useState<FunnelPayload | null>(null);
    const [placements, setPlacements] = useState<FunnelPayload | null>(null);

    useEffect(() => {
        (async () => {
            const [f, p] = await Promise.all([
                fetch("/api/j0di3/admin/funnel"),
                fetch("/api/j0di3/admin/funnel/placements"),
            ]);
            if (f.ok) setData(await f.json());
            if (p.ok) setPlacements(await p.json());
        })();
    }, []);

    return (
        <>
            <SEO title="Funnel — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                ]}
                currentPage="Funnel"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-8">
                <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Funnel</h1>

                <FunnelTable title="Engagement funnel" data={data} />
                <FunnelTable title="Placement funnel" data={placements} />
            </div>
        </>
    );
};

function FunnelTable({ title, data }: { title: string; data: FunnelPayload | null }) {
    if (!data) return null;
    const stages = data.stages ?? [];
    return (
        <section>
            <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-3">
                {title}
            </h2>
            {stages.length === 0 ? (
                <p className="tw-text-ink/60 tw-text-sm">No funnel data.</p>
            ) : (
                <ul className="tw-space-y-2">
                    {stages.map((s, i) => (
                        <li
                            key={i}
                            className="tw-flex tw-items-center tw-gap-3 tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-px-4 tw-py-2"
                        >
                            <span className="tw-w-6 tw-font-mono tw-text-xs tw-text-ink/60">
                                {i + 1}.
                            </span>
                            <span className="tw-flex-1 tw-font-medium tw-text-ink">{s.name}</span>
                            <span className="tw-text-ink/70 tw-text-sm">{s.count}</span>
                            {s.rate != null && (
                                <span className="tw-text-xs tw-text-primary tw-w-12 tw-text-right">
                                    {Math.round(s.rate * 100)}%
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

FunnelAdmin.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default FunnelAdmin;
