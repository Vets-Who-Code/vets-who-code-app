import SEO from "@components/seo/page-seo";
import CapabilitiesSection from "@containers/software-factory/capabilities";
import CtaSection from "@containers/software-factory/cta";
import DifferentiatorsSection from "@containers/software-factory/differentiators";
import EngagementsSection from "@containers/software-factory/engagements";
import HeroSection from "@containers/software-factory/hero";
import ProcessSection from "@containers/software-factory/process";
import SponsorSection from "@containers/software-factory/sponsor";
import TeamSection from "@containers/software-factory/team";
import TestimonialsSection from "@containers/software-factory/testimonials";
import Layout from "@layout/layout-01";
import { NextPage } from "next";

const SoftwareFactoryPage: NextPage & { Layout: typeof Layout } = () => {
    return (
        <>
            <SEO
                title="Software Factory | Vets Who Code"
                description="Veteran-led engineering team for hire, embedded inside a 501(c)(3) nonprofit. Hire us for the work; fund the mission as a side effect."
            />
            <HeroSection />
            <CapabilitiesSection />
            <ProcessSection />
            <EngagementsSection />
            <SponsorSection />
            <TeamSection />
            <DifferentiatorsSection />
            <TestimonialsSection />
            <CtaSection />
        </>
    );
};

SoftwareFactoryPage.Layout = Layout;

export default SoftwareFactoryPage;
