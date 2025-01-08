import type { NextPage } from "next";
import SEO from "@components/seo/page-seo";
import Layout from "@layout/layout-01";
import React from "react";

interface BenefitCardProps {
    icon: string;
    title: string;
    description: string;
}

type PageWithLayout = NextPage & {
    Layout: typeof Layout;
};

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
    <div className="tw-text-center">
        <div className="tw-flex tw-justify-center tw-mb-4">
            <i className={`${icon} tw-text-6xl tw-text-red-700`} />
        </div>
        <h3 className="tw-text-xl tw-font-bold tw-text-blue-900 tw-mb-2">{title}</h3>
        <p>{description}</p>
    </div>
);

const benefits: BenefitCardProps[] = [
    {
        icon: "fab fa-handshake",
        title: "INTERNSHIPS",
        description:
            "Test-drive the talent, increase productivity, enhance perspective with a diverse pool of candidates.",
    },
    {
        icon: "fab fa-comments",
        title: "GUARANTEED INTERVIEWS",
        description:
            "Veterans are at risk of unemployment and underemployment. By guaranteeing an interview for veterans who successfully complete our curriculum you will increase their chances of securing gainful employment.",
    },
    {
        icon: "fab fa-money-bill-alt",
        title: "DONATIONS",
        description: "Donate to the VWC organization to enable the training of more veterans.",
    },
];

const SponsorPage: PageWithLayout = () => {
    return (
        <>
            <SEO title="Become a Sponsor" />
            <div className="tw-min-h-screen tw-bg-white">
                {/* Hero Section */}
                <section className="tw-bg-blue-900 tw-text-white tw-py-16">
                    <div className="tw-container tw-mx-auto tw-px-4">
                        <h1 className="tw-text-5xl tw-font-bold tw-text-center tw-mb-4">
                            WE WANT YOU
                        </h1>
                        <div className="tw-flex tw-justify-center">
                            <div className="tw-bg-red-700 tw-p-4 tw--mb-20 tw-relative">
                                <div className="tw-text-2xl tw-font-semibold">#VetsWhoCode</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <main className="tw-container tw-mx-auto tw-px-4 tw-py-16">
                    <div className="tw-text-center tw-max-w-4xl tw-mx-auto tw-mb-16">
                        <p className="tw-text-xl tw-text-blue-900">
                            After completing the VWC curriculum, our pool of veterans are able,
                            willing, and highly qualified to enter the civilian workforce. Become a
                            VWC Sponsor today and honor our veterans by making a real investment in
                            helping their career by providing:
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="tw-grid md:tw-grid-cols-3 tw-gap-8 tw-mb-16">
                        {benefits.map((benefit, index) => (
                            <BenefitCard key={index} {...benefit} />
                        ))}
                    </div>

                    {/* Benefits Section */}
                    <section className="tw-bg-blue-800 tw-text-white tw-p-8 tw-rounded-lg tw-mb-16">
                        <h2 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-8">
                            BENEFITS OF BECOMING A VWC SPONSOR
                        </h2>
                        <div className="tw-space-y-6">
                            <p className="tw-text-lg">
                                Add top-quality talent with a wealth of technical and soft skills to
                                your organization today. Only 1/4 of the U.S. population meet the
                                military's rigorous physical, behavioral and educational
                                requirements.
                            </p>
                            <p className="tw-text-lg">
                                Individuals who have served in the military are exceptionally
                                well-trained, highly-disciplined, accustomed to working in teams,
                                goal-orientated and possess strong leadership qualities. This
                                combination of skills and attributes aligns exceptionally well with
                                the tech industry; veterans are already prepared to work harder and
                                move faster on day one. Because employers prioritize attitude first
                                and foremost, military members can fill critical positions and
                                become valuable members of any team immediately.
                            </p>
                            <p className="tw-text-lg">
                                The Work Opportunity Tax Credit (WOTC) is a federal income tax
                                credit available to employers who hire and retain veterans and
                                individuals from targeted groups with significant barriers to
                                employment. There is no limit on the number of individuals an
                                employer can hire to qualify to claim the WOTC.
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="tw-text-center tw-bg-red-700 tw-text-white tw-p-8 tw-rounded-lg">
                        <h2 className="tw-text-2xl tw-font-bold tw-mb-4">
                            Contact Ayumi Bennett, Technical Program Manager
                        </h2>
                        <p className="tw-text-xl tw-mb-6">
                            ayumi@vetswhocode.io to learn how you can support a veteran today.
                        </p>
                        <p className="tw-text-sm">
                            Vets Who Code Inc. is an exempt organization as described in Section
                            501(c)(3) of the Internal Revenue Code. EIN 86-2122804
                        </p>
                    </section>
                </main>

                {/* Footer */}
                <footer className="tw-bg-blue-900 tw-text-white tw-py-4 tw-text-center">
                    <p>
                        VISIT HTTPS://VETSWHOCODE.IO/SYLLABUS TO LEARN MORE ABOUT OUR FLAGSHIP
                        CURRICULUM.
                    </p>
                </footer>
            </div>
        </>
    );
};

SponsorPage.Layout = Layout;

export default SponsorPage;
