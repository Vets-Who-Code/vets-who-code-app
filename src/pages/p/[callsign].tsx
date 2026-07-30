import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import type { GetServerSideProps, NextPage } from "next";
import j0di3 from "@/lib/j0di3-client";

interface PublicTroop {
    callsign?: string;
    name?: string;
    branch?: string;
    mos?: string;
    skill_level?: string;
    target_role?: string;
    current_module?: number;
    github_username?: string;
    bio?: string;
    skills?: string[];
    placements?: { company?: string; role?: string; status?: string }[];
    badges?: string[];
    stats?: {
        challenges_completed?: number;
        lessons_completed?: number;
        current_streak?: number;
        total_xp?: number;
    };
}

type PageProps = {
    troop: PublicTroop | null;
    layout?: { headerShadow: boolean; headerFluid: boolean; footerMode: string };
};

type PageWithLayout = NextPage<PageProps> & { Layout?: typeof Layout01 };

const PublicProfilePage: PageWithLayout = ({ troop }) => {
    if (!troop) {
        return (
            <div className="tw-container tw-py-16 tw-text-center">
                <h1 className="tw-text-2xl tw-font-bold tw-text-ink">Troop not found</h1>
            </div>
        );
    }

    const stats = troop.stats || {};

    return (
        <>
            <SEO title={`${troop.name || troop.callsign} — VWC`} />
            <Breadcrumb
                pages={[{ path: "/", label: "home" }]}
                currentPage={troop.callsign || troop.name || "Troop"}
                showTitle={false}
            />

            <div className="tw-container tw-py-12 tw-max-w-3xl tw-space-y-6">
                <header>
                    <p className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-primary">
                        @{troop.callsign}
                    </p>
                    <h1 className="tw-text-3xl tw-font-bold tw-text-ink">
                        {troop.name || troop.callsign}
                    </h1>
                    <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-3">
                        {troop.branch && <Pill>{troop.branch}</Pill>}
                        {troop.mos && <Pill>{troop.mos}</Pill>}
                        {troop.skill_level && <Pill>{troop.skill_level}</Pill>}
                        {troop.target_role && <Pill>{troop.target_role}</Pill>}
                    </div>
                </header>

                {troop.bio && <p className="tw-text-ink/80">{troop.bio}</p>}

                {(stats.challenges_completed != null ||
                    stats.lessons_completed != null ||
                    stats.current_streak != null ||
                    stats.total_xp != null) && (
                    <section className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-3">
                        {stats.total_xp != null && <StatTile label="XP" value={stats.total_xp} />}
                        {stats.current_streak != null && (
                            <StatTile label="Streak" value={`${stats.current_streak}d`} />
                        )}
                        {stats.challenges_completed != null && (
                            <StatTile label="Challenges" value={stats.challenges_completed} />
                        )}
                        {stats.lessons_completed != null && (
                            <StatTile label="Lessons" value={stats.lessons_completed} />
                        )}
                    </section>
                )}

                {troop.skills && troop.skills.length > 0 && (
                    <section>
                        <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                            Skills
                        </h2>
                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                            {troop.skills.map((s) => (
                                <Pill key={s}>{s}</Pill>
                            ))}
                        </div>
                    </section>
                )}

                {troop.badges && troop.badges.length > 0 && (
                    <section>
                        <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                            Badges
                        </h2>
                        <div className="tw-flex tw-flex-wrap tw-gap-2">
                            {troop.badges.map((b) => (
                                <span
                                    key={b}
                                    className="tw-rounded-full tw-bg-gold-light tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-text-ink"
                                >
                                    {b}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {troop.placements && troop.placements.length > 0 && (
                    <section>
                        <h2 className="tw-font-mono tw-text-xs tw-uppercase tw-tracking-widest tw-text-navy/60 tw-mb-2">
                            Placements
                        </h2>
                        <ul className="tw-space-y-1 tw-text-sm tw-text-ink/80">
                            {troop.placements.map((p, i) => (
                                <li key={i}>
                                    {p.role || "Role"}
                                    {p.company && <> @ {p.company}</>}
                                    {p.status && (
                                        <span className="tw-text-ink/60"> · {p.status}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </>
    );
};

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="tw-rounded-full tw-bg-navy-sky tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-text-navy-deep">
            {children}
        </span>
    );
}

function StatTile({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="tw-rounded-md tw-border tw-border-navy/10 tw-bg-white tw-p-4">
            <div className="tw-font-mono tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-primary">
                {label}
            </div>
            <div className="tw-text-2xl tw-font-bold tw-text-ink tw-mt-1">{value}</div>
        </div>
    );
}

PublicProfilePage.Layout = Layout01;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const callsign = context.params?.callsign as string;
    let troop: PublicTroop | null = null;

    try {
        const { data } = await j0di3.get(`/p/${callsign}`);
        troop = data as PublicTroop;
    } catch {
        // 404 / network — render not-found state
    }

    if (!troop) return { notFound: true };

    return {
        props: {
            troop,
            layout: { headerShadow: true, headerFluid: false, footerMode: "light" },
        },
    };
};

export default PublicProfilePage;
