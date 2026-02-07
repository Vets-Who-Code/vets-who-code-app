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
        "Our mentorship program creates valuable connections between tech professionals and those seeking to advance their careers, with a special focus on veterans and military spouses from all training backgrounds.",
        "Whether you're an experienced developer looking to mentor or someone seeking guidance to grow in tech, our program offers a structured path to meaningful professional relationships that benefit both parties.",
        "Through regular pair programming sessions, weekly check-ins, and personalized guidance, our mentorship program accelerates learning, builds accountability, and fosters lasting professional growth for everyone involved.",
        "Join our community today by filling out the form below—whether as a mentor sharing expertise or a mentee seeking guidance—and become part of something that makes a lasting impact on the future of our tech community.",
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
                        heading="Join Our Vets Who Code Mentorship Program"
                        textSize="lg"
                        spacing="normal"
                        highlight={true}
                    />
                </div>
                <FunfactArea data={content["funfact-area"]} />
            </Wrapper>
            <GradationArea data={content["gradation-area"]} />
            <div className="tw-mb-16">
                <MentorForm />
            </div>
            <div className="tw-h-16" /> {/* This worked for space after MentorForm */}
            <CtaArea data={content["cta-area"]} space="none" />
            <div className="tw-h-16" /> {/* New spacer after CtaArea */}
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
