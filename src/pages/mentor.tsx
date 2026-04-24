import Breadcrumb from "@components/breadcrumb";
import TextBlock from "@components/common/text-block";
import MentorForm from "@components/forms/mentor-form";
import SEO from "@components/seo/page-seo";
import CtaArea from "@containers/cta/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import GradationArea from "@containers/gradation";
import HeroImageArea from "@containers/hero-image";
import Layout from "@layout/layout-01";
import Wrapper from "@ui/wrapper/wrapper-04";
import { normalizedData } from "@utils/methods";
import type { GetStaticProps, NextPage } from "next";
import { getPageData } from "../lib/page";

interface PageContent {
    section: string;
    [key: string]: unknown; // Add index signature
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

type PageProps = NextPage<TProps> & {
    Layout: typeof Layout;
};

const MentorPage: PageProps = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    const mentorText = [
        "VWC mentors don't tutor. They operate as engineering managers for veterans transitioning into software engineering — running 1-on-1s, reviewing code, challenging assumptions, and preparing troops for the standards they'll face on real engineering teams.",
        "We pair working engineers with small cohorts of 10–15 veterans and military spouses going through our 17-week accelerator. Your commitment is real but manageable: weekly check-ins, async code reviews, and direct involvement in someone's career trajectory.",
        "Our alumni are engineering at Microsoft, Accenture, Amazon, Google, GitHub, Booz Allen, and Deloitte. Many of them came back to mentor the next cohort. That pipeline started with someone doing exactly what you're considering right now.",
    ];

    const lookingFor = [
        "Working software engineers with production experience — frontend, backend, full-stack, DevOps, AI/ML, or cloud infrastructure.",
        "Engineers who can commit to weekly check-ins and async code reviews for the duration of a 17-week cohort.",
        "People who give direct, honest feedback. Our troops come from the military — they don't need to be coddled, they need to be coached.",
        "VWC alumni who want to come back and pay it forward are especially welcome.",
    ];

    return (
        <>
            <SEO title="Become A Mentor" />
            <Breadcrumb
                pages={[{ path: "/", label: "Home" }]}
                currentPage="Become A Mentor"
                showTitle={false}
            />
            <Wrapper>
                <HeroImageArea data={content["hero-image-area"]} />
                <div className="tw-container tw-my-8 tw-pt-16">
                    <TextBlock
                        content={mentorText}
                        heading="Your Engineering Experience Is Someone's Career Breakthrough"
                        textSize="lg"
                        spacing="normal"
                        highlight={true}
                    />
                </div>
                <FunfactArea data={content["funfact-area"]} />
            </Wrapper>
            <GradationArea data={content["gradation-area"]} />
            <section className="tw-py-16 md:tw-py-20">
                <div className="tw-container">
                    <div className="tw-mx-auto tw-max-w-4xl">
                        <h2 className="tw-mb-8 tw-text-3xl tw-font-bold tw-text-secondary md:tw-text-4xl">
                            Who We&apos;re Looking For
                        </h2>
                        <ul className="tw-space-y-4 tw-text-lg tw-text-body">
                            {lookingFor.map((item) => (
                                <li key={item} className="tw-flex tw-gap-3">
                                    <span className="tw-mt-2 tw-h-2 tw-w-2 tw-shrink-0 tw-rounded-full tw-bg-primary" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="tw-mt-8 tw-text-lg tw-text-body">
                            You don&apos;t need to be a veteran to mentor. You need to be good at
                            your job and willing to invest time in someone who&apos;s working to get
                            where you are.
                        </p>
                    </div>
                </div>
            </section>
            <section className="tw-bg-gray-50 tw-py-16 md:tw-py-20">
                <div className="tw-container">
                    <div className="tw-mx-auto tw-max-w-4xl">
                        <h2 className="tw-mb-10 tw-text-3xl tw-font-bold tw-text-secondary md:tw-text-4xl">
                            Why Engineers Mentor With Us
                        </h2>
                        <div className="tw-grid tw-gap-8 md:tw-grid-cols-2">
                            <div className="tw-rounded-lg tw-border-l-4 tw-border-primary tw-bg-white tw-p-6 tw-shadow-sm">
                                <h3 className="tw-mb-3 tw-text-xl tw-font-bold tw-text-secondary">
                                    It&apos;s not charity work. It&apos;s engineering leadership
                                    practice.
                                </h3>
                                <p className="tw-text-body">
                                    Mentoring a VWC troop is the closest thing to managing a junior
                                    engineer without the HR paperwork. You&apos;ll practice giving
                                    code reviews that teach, running 1-on-1s that develop people,
                                    and translating your experience into guidance someone else can
                                    act on. Senior engineers and engineering managers consistently
                                    tell us that mentoring with VWC made them better at their day
                                    job.
                                </p>
                            </div>
                            <div className="tw-rounded-lg tw-border-l-4 tw-border-primary tw-bg-white tw-p-6 tw-shadow-sm">
                                <h3 className="tw-mb-3 tw-text-xl tw-font-bold tw-text-secondary">
                                    Your time has measurable impact.
                                </h3>
                                <p className="tw-text-body">
                                    This isn&apos;t a pen-pal program. Our troops ship code, pass
                                    technical interviews, and get hired. When your mentee lands a
                                    role at a company you respect, you&apos;ll know your Thursday
                                    evening code reviews had something to do with it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="tw-mb-16">
                <MentorForm />
            </div>
            <div className="tw-h-16" />
            <CtaArea data={content["cta-area"]} space="none" />
            <div className="tw-h-16" />
        </>
    );
};

MentorPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "become-a-mentor");

    return {
        props: {
            data: {
                page,
            },
            layout: {
                headerShadow: true,
                headerFluid: false,
                footerMode: "light",
            },
        },
    };
};

export default MentorPage;
