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
            <Breadcrumb
                pages={[{ path: "/", label: "Home" }]}
                currentPage="Our Team"
            />
            <div className="tw-container tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
                <div className="tw-text-center">
                    <h2 className="tw-text-3xl tw-font-bold">Team Members</h2>
                </div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5 tw-mt-10">
                    {data.teamMembers.map((member) => (
                        <a key={member.slug} href={`/team/${member.slug}`}>
                            <TeamCard
                                name={member.name}
                                designation={member.designation}
                                image={member.image}
                            />
                        </a>
                    ))}
                </div>
                <div className="tw-text-center tw-mt-20">
                    <h2 className="tw-text-3xl tw-font-bold">Board Members</h2>
                </div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5 tw-mt-10">
                    {data.boardMembers.map((member) => (
                        <a key={member.slug} href={`/team/${member.slug}`}>
                            <TeamCard
                                name={member.name}
                                designation={member.designation}
                                image={member.image}
                            />
                        </a>
                    ))}
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
