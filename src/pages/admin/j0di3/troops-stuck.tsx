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

interface StuckTroop {
    troop_id?: string;
    name?: string;
    email?: string;
    current_module?: number;
    last_activity?: string;
    days_stuck?: number;
    reason?: string;
}

const StuckTroopsAdmin: PageWithLayout = () => {
    const [items, setItems] = useState<StuckTroop[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/j0di3/admin/troops/stuck");
            if (res.ok) {
                const body = await res.json();
                setItems(Array.isArray(body) ? body : (body.troops ?? []));
            }
        })();
    }, []);

    const triggerSlack = async () => {
        const res = await fetch("/api/j0di3/admin/slack/daily-grind", { method: "POST" });
        window.alert(res.ok ? "Daily grind sent." : "Send failed.");
    };

    return (
        <>
            <SEO title="Stuck troops — J0dI3 Admin" />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    { path: "/admin/j0di3", label: "j0di3" },
                ]}
                currentPage="Stuck troops"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-6">
                <div className="tw-flex tw-items-center tw-justify-between">
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Stuck troops</h1>
                    <button
                        type="button"
                        onClick={triggerSlack}
                        className="tw-rounded-md tw-bg-primary tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white"
                    >
                        Send daily grind to Slack
                    </button>
                </div>

                <table className="tw-w-full tw-rounded-lg tw-border tw-border-navy/10 tw-bg-white tw-overflow-hidden">
                    <thead className="tw-bg-navy/5">
                        <tr className="tw-text-left tw-text-xs tw-uppercase tw-text-navy/60">
                            <th className="tw-px-4 tw-py-2">Troop</th>
                            <th className="tw-px-4 tw-py-2">Module</th>
                            <th className="tw-px-4 tw-py-2">Last activity</th>
                            <th className="tw-px-4 tw-py-2">Days stuck</th>
                            <th className="tw-px-4 tw-py-2">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="tw-px-4 tw-py-6 tw-text-center tw-text-ink/60"
                                >
                                    Nobody's stuck right now.
                                </td>
                            </tr>
                        )}
                        {items.map((t) => (
                            <tr
                                key={t.troop_id}
                                className="tw-border-t tw-border-navy/10 tw-text-sm"
                            >
                                <td className="tw-px-4 tw-py-2 tw-font-medium tw-text-ink">
                                    {t.name || t.email || t.troop_id}
                                </td>
                                <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                    {t.current_module ?? "—"}
                                </td>
                                <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                    {t.last_activity || "—"}
                                </td>
                                <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                    {t.days_stuck ?? "—"}
                                </td>
                                <td className="tw-px-4 tw-py-2 tw-text-ink/70">
                                    {t.reason || "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

StuckTroopsAdmin.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAdminSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default StuckTroopsAdmin;
