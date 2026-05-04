import Breadcrumb from "@components/breadcrumb";
// import GradationArea from "@containers/gradation";
import ApplyForm from "@components/forms/apply-form";
import SEO from "@components/seo/page-seo";
import CtaArea from "@containers/cta/layout-01";
import FunfactArea from "@containers/funfact/layout-02";
import HeroImageArea from "@containers/hero-image";
import PreworkButton from "@containers/prework-button";
import Layout from "@layout/layout-01";
import AlumniStrip from "@ui/alumni-strip";
import PullQuote from "@ui/pull-quote";
import Wrapper from "@ui/wrapper/wrapper-04";
import { normalizedData } from "@utils/methods";
import type { GetStaticProps, NextPage } from "next";
import { getPageData } from "../lib/page";

interface PageContent {
  section: string;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
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

const ApplyPage: PageProps = ({ data }) => {
  const content = normalizedData<PageContent>(data.page?.content, "section");
  return (
    <>
      <SEO title="Apply" />
      <Breadcrumb
        pages={[{ path: "/", label: "Home" }]}
        currentPage="Apply"
        showTitle={false}
      />
      <Wrapper>
        <CtaArea data={content["cta-area"]} space="none" />
        <PreworkButton />
        <FunfactArea data={content["funfact-area"]} />
      </Wrapper>

      {/* Mission pull-quote + alumni proof before applicants commit */}
      <div className="dark-section tw-bg-navy tw-mt-20 md:tw-mt-[120px] tw-py-20 md:tw-py-[120px]">
        <div className="tw-container">
          <PullQuote
            emphasis="We don't train veterans to fill seats."
            continuation="We train them to be impactful on their engineering teams at companies that shape the world."
          />
          <div className="tw-mt-14 md:tw-mt-20">
            <AlumniStrip align="center" />
          </div>
        </div>
      </div>

      <Wrapper>
        <HeroImageArea data={content["hero-image-area"]} />
      </Wrapper>
      <ApplyForm />
      {/* <GradationArea data={content["gradation-area"]} /> */}
    </>
  );
};

ApplyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
  const page = getPageData("inner", "apply-to-be-a-student");

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

export default ApplyPage;
