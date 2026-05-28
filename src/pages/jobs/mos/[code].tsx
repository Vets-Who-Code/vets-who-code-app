import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { requireAuthSSR } from "@/lib/auth-guards";

type PageProps = {
    layout?: { headerShadow: boolean; headerFluid: boolean; footerMode: string };
};

type PageWithLayout = NextPage<PageProps> & { Layout?: typeof Layout01 };

interface MosPayload {
    code?: string;
    title?: string;
    branch?: string;
    description?: string;
    skills?: string[];
    target_roles?: { role?: string; relevance?: number }[];
    salary_range?: { min?: number; max?: number; currency?: string };
}

const MosPage: PageWithLayout = () => {
    const router = useRouter();
    const codeParam = router.query.code;
    const code = typeof codeParam === "string" ? codeParam : null;

    const [data, setData] = useState<MosPayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!code) return;
        (async () => {
            try {
                const res = await fetch(`/api/j0di3/jobs/mos/${code}`);
                if (!res.ok) {
                    setError("MOS not found.");
                    return;
                }
                setData(await res.json());
            } catch {
                setError("MOS not found.");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [code]);

    return (
        <>
            <SEO title={`MOS ${code ?? ""}`} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage={`MOS ${code ?? ""}`}
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-max-w-3xl tw-space-y-6">
                {isLoading && <p className="tw-text-ink/60">Loading MOS data...</p>}
                {error && <p className="tw-text-red-dark">{error}</p>}

                {data && (
                    <>
                        <header>
                            <p className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-primary">
                                {data.branch || "MOS"}
                            </p>
                            <h1 className="tw-text-3xl tw-font-bold tw-text-ink">
                                {data.code} — {data.title}
                            </h1>
                        </header>

                        {data.description && (
                            <p className="tw-text-ink/80 tw-whitespace-pre-wrap">
                                {data.description}
                            </p>
                        )}

                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                                    Skills
                                </h2>
                                <div className="tw-flex tw-flex-wrap tw-gap-2">
                                    {data.skills.map((s) => (
                                        <span
                                            key={s}
                                            className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-xs tw-text-navy-deep"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.target_roles && data.target_roles.length > 0 && (
                            <section>
                                <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                                    Adjacent tech roles
                                </h2>
                                <ul className="tw-space-y-1 tw-text-sm">
                                    {data.target_roles.map((r, i) => (
                                        <li
                                            key={i}
                                            className="tw-flex tw-justify-between tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-px-3 tw-py-2"
                                        >
                                            <span className="tw-font-medium tw-text-ink">
                                                {r.role}
                                            </span>
                                            {r.relevance != null && (
                                                <span className="tw-text-ink/60">
                                                    {Math.round(r.relevance * 100)}% match
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {data.salary_range && (
                            <section>
                                <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                                    Salary range
                                </h2>
                                <p className="tw-text-ink/80">
                                    {data.salary_range.currency || "$"}
                                    {data.salary_range.min?.toLocaleString() ?? "?"} –{" "}
                                    {data.salary_range.currency || "$"}
                                    {data.salary_range.max?.toLocaleString() ?? "?"}
                                </p>
                            </section>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

MosPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAuthSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default MosPage;
