import SectionTitle from "@components/section-title";
import SEO from "@components/seo/page-seo";
import boardMembers from "@data/board-members.json";
import teamMembers from "@data/team-members.json";
import Layout from "@layout/layout-01";
import Anchor from "@ui/anchor";
import { IInstructor } from "@utils/types";
import type { GetStaticProps, NextPage } from "next";

type TProps = {
    data: {
        teamMembers: IInstructor[];
        boardMembers: IInstructor[];
    };
};

type PageWithLayout = NextPage<TProps> & {
    Layout: typeof Layout;
};

// The design system exposes the mono stack as a CSS var, not a Tailwind token —
// same approach SectionTitle uses for its eyebrow.
const mono = { fontFamily: "var(--font-mono)", letterSpacing: "0.1em" } as const;

// The context-bar counts are zero-padded array lengths, so they self-correct
// whenever the JSON gains or loses a person.
const pad = (n: number) => String(n).padStart(2, "0");

const fallbackPhoto = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    // React attaches the error listener itself, so nulling onerror would not disarm
    // it — flag the element so a failing placeholder can't spin in a request loop.
    if (target.dataset.fallback) return;
    target.dataset.fallback = "1";
    target.src = "/images/profile/placeholder-profile.jpg";
};

const Team: PageWithLayout = ({ data }) => {
    return (
        <>
            <SEO title="Team | Vets Who Code" />

            {/* Hero — navy gradient, no photo */}
            <section className="tw-relative tw-bg-secondary">
                <div className="tw-absolute tw-inset-0 tw-bg-[linear-gradient(135deg,rgba(9,31,64,0.92)_0%,rgba(6,26,64,0.88)_100%)]" />
                <div className="tw-container tw-relative tw-px-[clamp(20px,4vw,32px)] tw-pb-[clamp(56px,8vw,110px)] tw-pt-[clamp(72px,11vw,150px)]">
                    <span
                        style={mono}
                        className="tw-inline-flex tw-items-center tw-gap-3 tw-text-[12px] tw-font-medium tw-uppercase tw-text-[rgba(185,214,242,0.7)]"
                    >
                        <span className="tw-inline-block tw-h-0.5 tw-w-4 tw-shrink-0 tw-bg-primary" />
                        About / Our Team
                    </span>
                    <h1 className="tw-mt-5 tw-font-heading tw-text-[clamp(44px,8vw,92px)] tw-font-black tw-uppercase tw-leading-[0.98] tw-tracking-[-0.02em] tw-text-white">
                        Our Team
                    </h1>
                    <p className="tw-mt-5 tw-max-w-[560px] tw-text-[clamp(17px,2vw,21px)] tw-leading-[1.6] tw-text-gray-50">
                        Meet the people behind #VetsWhoCode
                    </p>
                </div>
            </section>

            {/* Context bar — breadcrumb + team scale */}
            <div className="tw-border-b tw-border-gray-100 tw-bg-gray-50">
                <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4 tw-px-[clamp(20px,4vw,32px)] tw-py-4">
                    <nav
                        aria-label="Breadcrumb"
                        style={mono}
                        className="tw-flex tw-shrink-0 tw-items-center tw-gap-2.5 tw-whitespace-nowrap tw-text-[11px] tw-uppercase tw-text-gray-300"
                    >
                        <Anchor path="/" className="tw-text-secondary">
                            Home
                        </Anchor>
                        <span aria-hidden="true" className="tw-text-gray-100">
                            /
                        </span>
                        <span aria-current="page">Our Team</span>
                    </nav>
                    <div
                        style={mono}
                        className="tw-flex tw-shrink-0 tw-items-center tw-gap-3.5 tw-whitespace-nowrap tw-text-[11px] tw-uppercase tw-text-gray-300"
                    >
                        <span>{pad(data.teamMembers.length)} Staff</span>
                        <span
                            aria-hidden="true"
                            className="tw-inline-block tw-h-px tw-w-4 tw-shrink-0 tw-bg-primary"
                        />
                        <span>{pad(data.boardMembers.length)} Board</span>
                    </div>
                </div>
            </div>

            {/* Team Members — two feature cards */}
            <section className="tw-bg-cream tw-py-[clamp(64px,9vw,120px)]">
                <div className="tw-container tw-px-[clamp(20px,4vw,32px)]">
                    <SectionTitle
                        align="left"
                        subtitle="01 / Leadership"
                        title="Team Members"
                        description="The staff running the accelerator day to day."
                    />
                    <div className="tw-mt-[clamp(32px,4vw,56px)] tw-grid tw-grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] tw-gap-[30px]">
                        {data.teamMembers.map((member) => (
                            <Anchor
                                key={member.slug}
                                path={`/team/${member.slug}`}
                                title={`View ${member.name}'s profile`}
                                className="tw-group tw-block tw-border tw-border-t-2 tw-border-gray-100 tw-bg-white tw-transition-[transform,box-shadow,border-color] tw-duration-300 tw-ease-[cubic-bezier(0.3,0.2,0.3,0.3)] hover:tw--translate-y-0.5 hover:tw-border-t-primary hover:tw-shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                            >
                                <div className="tw-aspect-[35/34] tw-overflow-hidden tw-bg-secondary">
                                    <img
                                        src={member.image?.src}
                                        alt=""
                                        loading="lazy"
                                        onError={fallbackPhoto}
                                        className="tw-h-full tw-w-full tw-object-cover tw-object-top tw-grayscale tw-transition-[filter,transform] tw-duration-1000 tw-ease-out group-hover:tw-scale-105 group-hover:tw-grayscale-0"
                                    />
                                </div>
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-px-[30px] tw-pb-[30px] tw-pt-[26px]">
                                    <h3 className="tw-m-0 tw-font-heading tw-text-[clamp(20px,2.4vw,26px)] tw-font-bold tw-uppercase tw-leading-[1.15] tw-tracking-[-0.02em] tw-text-secondary">
                                        {member.name}
                                    </h3>
                                    <p
                                        style={mono}
                                        className="tw-m-0 tw-text-[12px] tw-font-medium tw-uppercase tw-text-primary"
                                    >
                                        {member.designation}
                                    </p>
                                </div>
                            </Anchor>
                        ))}
                    </div>
                </div>
            </section>

            {/* Board Members — compact roster */}
            <section className="tw-bg-white tw-py-[clamp(64px,9vw,120px)]">
                <div className="tw-container tw-px-[clamp(20px,4vw,32px)]">
                    <SectionTitle
                        align="left"
                        subtitle="02 / Governance"
                        title="Board Members"
                        description="Engineering, security, media, and veteran-service leaders who govern the organization."
                    />

                    {/* Section divider with the red signature segment at its left edge */}
                    <div className="tw-relative tw-my-[clamp(32px,4vw,48px)] tw-h-px tw-bg-gray-100">
                        <span className="tw-absolute tw-left-0 tw-top-0 tw-h-px tw-w-12 tw-bg-primary" />
                    </div>

                    <div className="tw-grid tw-grid-cols-[repeat(auto-fill,minmax(min(100%,200px),1fr))] tw-gap-6">
                        {data.boardMembers.map((member) => (
                            <Anchor
                                key={member.slug}
                                path={`/team/${member.slug}`}
                                title={`View ${member.name}'s profile`}
                                className="tw-group tw-block tw-border-t-2 tw-border-transparent tw-pt-[14px] tw-transition-[transform,border-color] tw-duration-300 tw-ease-[cubic-bezier(0.3,0.2,0.3,0.3)] hover:tw--translate-y-0.5 hover:tw-border-t-primary"
                            >
                                <div className="tw-aspect-square tw-overflow-hidden tw-bg-secondary">
                                    <img
                                        src={member.image?.src}
                                        alt=""
                                        loading="lazy"
                                        onError={fallbackPhoto}
                                        className="tw-h-full tw-w-full tw-object-cover tw-object-top tw-grayscale tw-transition-[filter,transform] tw-duration-1000 tw-ease-out group-hover:tw-scale-105 group-hover:tw-grayscale-0"
                                    />
                                </div>
                                {/* Role omitted: every board entry is "Board Member", which the
                                    section heading already says. Restore it if titles differentiate. */}
                                <h3 className="tw-mt-4 tw-font-heading tw-text-[17px] tw-font-bold tw-normal-case tw-leading-[1.25] tw-tracking-[-0.01em] tw-text-secondary">
                                    {member.name}
                                </h3>
                            </Anchor>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

Team.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            data: {
                teamMembers,
                boardMembers,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default Team;
