import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import { handleClientError } from "@utils/handle-client-error";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { requireAuthSSR } from "@/lib/auth-guards";

type PageProps = {
    layout?: { headerShadow: boolean; headerFluid: boolean; footerMode: string };
};

type PageWithLayout = NextPage<PageProps> & { Layout?: typeof Layout01 };

interface Candidate {
    troop_id?: string;
    id?: string;
    name?: string;
    callsign?: string;
    branch?: string;
    mos?: string;
    current_module?: number;
    skill_level?: string;
    target_role?: string;
    match_score?: number;
    reason?: string;
}

const CommunityPage: PageWithLayout = () => {
    const [pairs, setPairs] = useState<Candidate[]>([]);
    const [mentors, setMentors] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    const fetchCandidates = useCallback(async () => {
        setIsLoading(true);
        setLoadError(null);
        try {
            const [pRes, mRes] = await Promise.all([
                fetch("/api/j0di3/troops/pair-candidates"),
                fetch("/api/j0di3/troops/mentor-candidates"),
            ]);
            if (pRes.ok) {
                const body = await pRes.json();
                setPairs(Array.isArray(body) ? body : (body.candidates ?? []));
            }
            if (mRes.ok) {
                const body = await mRes.json();
                setMentors(Array.isArray(body) ? body : (body.candidates ?? []));
            }
        } catch (err) {
            setLoadError(handleClientError(err, "community:candidates"));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCandidates();
    }, [fetchCandidates]);

    return (
        <>
            <SEO title="Community" />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage="Community"
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-space-y-8">
                <header>
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink">Community</h1>
                    <p className="tw-mt-2 tw-text-ink/70">
                        Pair up with peers at your level or get a mentor a few modules ahead.
                    </p>
                </header>

                {isLoading && <p className="tw-text-ink/60">Loading candidates...</p>}

                {!isLoading && loadError && (
                    <div>
                        <p className="tw-text-red-dark">{loadError}</p>
                        <button
                            type="button"
                            onClick={fetchCandidates}
                            className="tw-mt-2 tw-rounded-md tw-border tw-border-navy/10 tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium tw-text-ink/80 hover:tw-bg-navy/5"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!isLoading && !loadError && (
                    <>
                        <CandidateSection
                            title="Pair candidates"
                            subtitle="Same level, same module — pair-program together."
                            candidates={pairs}
                        />
                        <CandidateSection
                            title="Mentor candidates"
                            subtitle="A few modules ahead — ask for review and guidance."
                            candidates={mentors}
                        />
                    </>
                )}
            </div>
        </>
    );
};

function CandidateSection({
    title,
    subtitle,
    candidates,
}: {
    title: string;
    subtitle: string;
    candidates: Candidate[];
}) {
    return (
        <section>
            <div className="tw-mb-3">
                <h2 className="tw-font-mono tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-navy/60">
                    {title}
                </h2>
                <p className="tw-text-sm tw-text-ink/70 tw-mt-1">{subtitle}</p>
            </div>
            {candidates.length === 0 ? (
                <p className="tw-text-sm tw-text-ink/60">
                    No matches right now. Check back after you complete more work.
                </p>
            ) : (
                <ul className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-3">
                    {candidates.map((c, i) => {
                        const callsign = c.callsign || c.troop_id || c.id || "";
                        return (
                            <li
                                key={callsign || i}
                                className="tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4"
                            >
                                <div className="tw-flex tw-items-start tw-justify-between tw-gap-2">
                                    <div>
                                        <div className="tw-text-sm tw-font-semibold tw-text-ink">
                                            {c.name || c.callsign || "Troop"}
                                        </div>
                                        {c.target_role && (
                                            <div className="tw-text-xs tw-text-ink/60">
                                                {c.target_role}
                                            </div>
                                        )}
                                    </div>
                                    {c.match_score != null && (
                                        <span className="tw-rounded-full tw-bg-primary/10 tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-bold tw-text-primary">
                                            {Math.round(c.match_score * 100)}%
                                        </span>
                                    )}
                                </div>
                                <div className="tw-flex tw-flex-wrap tw-gap-1 tw-mt-2">
                                    {c.branch && (
                                        <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-navy-deep">
                                            {c.branch}
                                        </span>
                                    )}
                                    {c.mos && (
                                        <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-navy-deep">
                                            {c.mos}
                                        </span>
                                    )}
                                    {c.current_module != null && (
                                        <span className="tw-rounded-full tw-bg-gold-light tw-px-2 tw-py-0.5 tw-text-[10px] tw-font-medium tw-text-ink">
                                            Module {c.current_module}
                                        </span>
                                    )}
                                </div>
                                {c.reason && (
                                    <p className="tw-text-xs tw-text-ink/70 tw-mt-2 tw-line-clamp-2">
                                        {c.reason}
                                    </p>
                                )}
                                {callsign && (
                                    <Link
                                        href={`/p/${callsign}`}
                                        className="tw-mt-3 tw-inline-block tw-text-xs tw-font-medium tw-text-primary hover:tw-underline"
                                    >
                                        View profile →
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}

CommunityPage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const guard = await requireAuthSSR(context);
    if (!guard.ok) return guard.result;
    return {
        props: {
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default CommunityPage;
