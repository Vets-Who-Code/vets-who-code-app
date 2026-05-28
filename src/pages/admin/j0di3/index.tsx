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

interface Stats {
    troops_total?: number;
    troops_active?: number;
    challenges_completed_today?: number;
    lessons_completed_today?: number;
    [key: string]: unknown;
}

const links = [
    { href: "/admin/j0di3/cohorts", label: "Cohorts", icon: "fa-users" },
    { href: "/admin/j0di3/lessons", label: "Lessons review", icon: "fa-book-open" },
    { href: "/admin/j0di3/placements", label: "Placements", icon: "fa-briefcase" },
    { href: "/admin/j0di3/learning-feedback", label: "Learning feedback", icon: "fa-comment" },
    { href: "/admin/j0di3/funnel", label: "Funnel", icon: "fa-chart-line" },
    { href: "/admin/j0di3/budget", label: "Budget", icon: "fa-dollar-sign" },
    { href: "/admin/j0di3/troops-stuck", label: "Stuck troops", icon: "fa-exclamation-triangle" },
];

const J0di3AdminHome: PageWithLayout = () => {
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/j0di3/admin/stats");
                if (res.ok) setStats(await res.json());
            } catch {
                // non-critical
            }
        })();
    }, []);

    return (
        <>
            <SEO title="J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin", label: "admin" },
                ]}
                currentPage="J0dI3"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-8">
                <header>
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink">J0dI3 Admin</h1>
                    <p className="tw-mt-2 tw-text-ink/70">
                        Cohorts, lessons review, placements, telemetry.
                    </p>
                </header>

                {stats && (
                    <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-3">
                        {Object.entries(stats)
                            .filter(([, v]) => typeof v === "number")
                            .slice(0, 8)
                            .map(([k, v]) => (
                                <div
                                    key={k}
                                    className="tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4"
                                >
                                    <div className="tw-font-mono tw-text-[10px] tw-uppercase tw-text-navy/60">
                                        {k.replace(/_/g, " ")}
                                    </div>
                                    <div className="tw-text-2xl tw-font-bold tw-text-ink tw-mt-1">
                                        {v as number}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="tw-flex tw-items-center tw-gap-3 tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4 hover:tw-border-primary"
                        >
                            <i className={`fas ${l.icon} tw-text-2xl tw-text-primary`} />
                            <span className="tw-font-medium tw-text-ink">{l.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

J0di3AdminHome.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default J0di3AdminHome;
