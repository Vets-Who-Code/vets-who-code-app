import type { GetStaticPaths, NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout01 from "@layout/layout-01";
import Breadcrumb from "@components/breadcrumb";
import { IInstructor } from "@utils/types";
import { getTeamMemberBySlug, getAllTeamMembers } from "../../lib/team";

type TProps = {
    data: {
        member: IInstructor;
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout01;
};

const MemberProfile: PageProps = ({ data: { member } }) => {
    return (
        <>
            <SEO title={member.name} />
            <Breadcrumb
                pages={[
                    { path: "/", label: "home" },
                    {
                        path: "/team",
                        label: "team",
                    },
                ]}
                currentPage={member.name}
            />
            <div className="tw-container tw-py-15 md:tw-py-20 lg:tw-py-[100px]">
                <h1>{member.name}</h1>
                <p>{member.designation}</p>
                <img src={member.image.src} alt={member.name} />
                <p>{member.bio}</p>
            </div>
        </>
    );
};

MemberProfile.Layout = Layout01;

export const getStaticPaths: GetStaticPaths = () => {
    const { teamMembers, boardMembers } = getAllTeamMembers();
    const allMembers = [...teamMembers, ...boardMembers];
    return {
        paths: allMembers.map((member) => {
            return {
                params: {
                    slug: member.slug,
                },
            };
        }),
        fallback: false,
    };
};

type Params = {
    params: {
        slug: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const member = getTeamMemberBySlug(params.slug);

    return {
        props: {
            data: {
                member,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default MemberProfile;
