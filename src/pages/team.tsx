import type { GetStaticProps, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import teamMembers from "@data/team-members.json";
import boardMembers from "@data/board-members.json";
import TeamCard from "@components/team-card";
import { IInstructor } from "@utils/types";

type TProps = {
    data: {
        teamMembers: IInstructor[];
        boardMembers: IInstructor[];
    };
};

type PageWithLayout = NextPage<TProps> & {
    Layout: typeof Layout;
};

const Team: PageWithLayout = ({ data }) => {
    return (
        <>
            <SEO title="Team | Vets Who Code" />
            <h1 className="tw-sr-only">Our Team</h1>

            {/* Custom Hero Area with original size */}
            <div className="tw-relative tw-z-1 tw-overflow-hidden tw-bg-cream">
                <div className="tw-relative tw-z-1 tw-flex tw-h-[450px] tw-w-full tw-items-end md:tw-h-[500px] lg:tw-h-[600px] xl:tw-h-[700px]">
                    <div className="tw-absolute tw-inset-0 tw-object-cover">
                        <img
                            src="https://res.cloudinary.com/vetswhocode/image/upload/v1746583132/14_ogbakk.png"
                            alt="Vets Who Code Team"
                            className="tw-h-full tw-w-full tw-object-cover"
                        />
                        <div className="tw-absolute tw-inset-0 tw-bg-[rgba(9,31,64,0.3)]" />
                    </div>

                    {/* Text Overlay */}
                    <div className="tw-container tw-relative tw-z-1 tw-flex tw-h-full tw-items-center tw-justify-center tw-pt-16">
                        <div className="tw-text-center">
                            <h2 className="tw-text-5xl tw-font-bold tw-uppercase tw-tracking-wider tw-text-white tw-drop-shadow-lg md:tw-text-6xl lg:tw-text-7xl">
                                Our Team
                            </h2>
                            <p className="tw-mt-4 tw-text-lg tw-font-light tw-tracking-wide tw-text-white tw-drop-shadow-md md:tw-text-xl lg:tw-text-2xl">
                                Meet the people behind #VetsWhoCode
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Breadcrumb pages={[{ path: "/", label: "Home" }]} currentPage="Our Team" />
            <div className="tw-container tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
                <div className="tw-text-center">
                    <h2 className="tw-text-3xl tw-font-bold">Team Members</h2>
                </div>
                <div className="tw-mx-auto tw-mt-10 tw-grid tw-max-w-4xl tw-grid-cols-1 tw-gap-7.5 md:tw-grid-cols-2 lg:tw-grid-cols-2">
                    {data.teamMembers.map((member) => {
                        const memberWithSafeSocials = {
                            ...member,
                            socials: Array.isArray(member.socials) ? member.socials : [],
                        };

                        return (
                            <div key={member.slug} className="tw-group">
                                <a
                                    href={`/team/${member.slug}`}
                                    aria-label={`View ${member.name}'s profile`}
                                    title={`View ${member.name}'s profile`}
                                    className="tw-block"
                                >
                                    <TeamCard
                                        name={member.name}
                                        designation={member.designation}
                                        image={member.image}
                                        socials={memberWithSafeSocials.socials}
                                    />
                                </a>
                            </div>
                        );
                    })}
                </div>
                <div className="tw-mt-20 tw-text-center">
                    <h2 className="tw-text-3xl tw-font-bold">Board Members</h2>
                </div>
                <div className="tw-mx-auto tw-mt-10 tw-grid tw-max-w-4xl tw-grid-cols-1 tw-gap-7.5 md:tw-grid-cols-2 lg:tw-grid-cols-2">
                    {data.boardMembers.map((member) => {
                        // Ensure member.socials is defined and is an array
                        const memberWithSafeSocials = {
                            ...member,
                            socials: Array.isArray(member.socials) ? member.socials : [],
                        };

                        return (
                            <div key={member.slug} className="tw-group">
                                <a
                                    href={`/team/${member.slug}`}
                                    aria-label={`View ${member.name}'s profile`}
                                    title={`View ${member.name}'s profile`}
                                    className="tw-block"
                                >
                                    <TeamCard
                                        name={member.name}
                                        designation={member.designation}
                                        image={member.image}
                                        socials={memberWithSafeSocials.socials}
                                    />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
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
