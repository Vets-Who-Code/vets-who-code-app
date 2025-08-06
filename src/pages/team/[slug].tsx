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
                <div className="tw-mx-auto tw-max-w-4xl">
                    <div className="tw-grid tw-grid-cols-1 tw-gap-10 md:tw-grid-cols-3">
                        <div className="md:tw-col-span-1">
                            <div className="tw-overflow-hidden tw-rounded-lg tw-shadow-md">
                                <img
                                    src={member.image.src}
                                    alt={member.name}
                                    className="tw-w-full tw-object-cover"
                                    width={member.image.width}
                                    height={member.image.height}
                                    onError={(e) => {
                                        // Fallback to a placeholder if image fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null; // Prevent infinite loop
                                        target.src = "/images/profile/placeholder-profile.jpg";
                                    }}
                                />
                            </div>
                            {member.socials && member.socials.length > 0 && (
                                <div className="tw-mt-6 tw-flex tw-justify-center tw-space-x-4">
                                    {member.socials.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            title={social.label}
                                            className="tw-text-primary tw-transition-colors hover:tw-text-secondary"
                                        >
                                            <i className={social.icon} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="md:tw-col-span-2">
                            <h1 className="tw-mb-2 tw-text-3xl tw-font-bold">{member.name}</h1>
                            <p className="tw-mb-6 tw-text-xl tw-text-gray-600">
                                {member.designation}
                            </p>
                            <div className="tw-prose tw-max-w-none">
                                <p className="tw-text-lg">{member.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
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
