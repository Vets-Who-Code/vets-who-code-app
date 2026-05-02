import SEO from "@components/seo/page-seo";
import { EngagementModal } from "@components/ui/engagement-modal/EngagementModal";
import BlogArea from "@containers/blog/layout-03";
import BrandArea from "@containers/brand/layout-01";
import CourseArea from "@containers/course/layout-05";
import EventArea from "@containers/event/layout-02";
import FunfactArea from "@containers/funfact/layout-04";
import HeroArea from "@containers/hero/layout-04";
import MediaArea from "@containers/media/layout-01";
import NewsletterArea from "@containers/newsletter/layout-02";
import ServiceArea from "@containers/service/layout-03";
import TestimonialArea from "@containers/testimonial/layout-04";
import VideoArea from "@containers/video/layout-04";
import Layout from "@layout/layout-03";
import AlumniStrip from "@ui/alumni-strip";
import HeroCodeSnippet from "@ui/hero-code-snippet";
import HeroStatBelt from "@ui/hero-stat-belt";
import PullQuote from "@ui/pull-quote";
import Wrapper from "@ui/wrapper/wrapper-02";
import { normalizedData } from "@utils/methods";
import { IBlog, ICourse, IEvent, IMedia } from "@utils/types";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { getAllBlogs } from "../lib/blog";
import { getallCourses } from "../lib/course";
import { getallEvents } from "../lib/event";
import { getAllMediaPosts } from "../lib/mdx-pages";
import { getPageData } from "../lib/page";

interface PageContent {
  section: string;
  [key: string]: unknown;
}

interface PageData {
  page: {
    content: PageContent[];
  };
  courses: ICourse[];
  events: IEvent[];
  media: IMedia[];
  blogs: IBlog[];
}

type TProps = {
  data: PageData;
};

type PageProps = NextPage<TProps> & {
  Layout: typeof Layout;
};

const Home: PageProps = ({ data }) => {
  const content = normalizedData<PageContent>(data.page?.content, "section");

  return (
    <>
      <SEO title="Home" />

      {/* Hero — full navy, dark-section for grain overlay */}
      <HeroArea data={content?.["hero-area"]} />

      {/* Outcomes belt — three above-the-fold stats attached to hero */}
      <HeroStatBelt />

      <Wrapper className="tw-mb-[140px]">
        <ServiceArea data={content?.["service-area"]} space="none" />

        {/* Code snippet — "what you'll ship" beat after the service pitch */}
        <HeroCodeSnippet />

        {/* Section divider */}
        <div className="tw-container">
          <div className="section-divider" />
        </div>

        <FunfactArea data={content?.["funfact-area"]} titleSize="large" />
        <VideoArea data={content?.["video-area"]} space="top" />
      </Wrapper>

      {/* Section divider */}
      <div className="tw-container">
        <div className="section-divider" />
      </div>

      <CourseArea
        data={{ ...content?.["course-area"], courses: data.courses }}
        titleSize="large"
      />

      {/* Testimonials — dark background with subtle contrast */}
      <div className="dark-section">
        <TestimonialArea
          data={content?.["testimonial-area"]}
          titleSize="large"
        />
      </div>

      <EventArea
        data={{ ...content?.["event-area"], events: data.events }}
        titleSize="large"
      />

      {/* Mission pull-quote + alumni proof — dark section */}
      <div className="dark-section tw-bg-navy tw-py-20 md:tw-py-[120px]">
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

      <MediaArea
        data={{ ...content?.["media-area"], media: data.media }}
        titleSize="large"
      />

      {/* Blog — dark background */}
      <div className="dark-section">
        <BlogArea
          data={{ ...content?.["blog-area"], blogs: data.blogs }}
          titleSize="large"
        />
      </div>

      <BrandArea data={content?.["brand-area"]} />

      {/* Newsletter — CTA banner feel */}
      <div className="dark-section cta-banner">
        <NewsletterArea data={content?.["newsletter-area"]} />
      </div>

      <EngagementModal
        headline="Your Next Mission Starts Here."
        body="Support Vets Who Code — help veterans code, launch tech careers, and change their lives."
        cta1={{ label: "Donate Now", href: "/donate" }}
        cta2={{ label: "Join the Mission", href: "#newsletter" }}
      />
    </>
  );
};

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
  const page = getPageData("home", "index");
  const courses = getallCourses(["title", "thumbnail"], 0, 6);
  const events = getallEvents(
    ["title", "thumbnail", "start_date", "location"],
    0,
    6,
  );
  const allMedia = getAllMediaPosts<IMedia>(
    [
      "slug",
      "title",
      "mediaType",
      "url",
      "publication",
      "date",
      "image",
      "description",
    ],
    "media",
  );
  const media = allMedia
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const { blogs } = getAllBlogs(
    ["title", "image", "category", "postedAt"],
    0,
    3,
  );
  return {
    props: {
      data: {
        page,
        courses,
        events,
        media,
        blogs,
      },
      layout: {
        footerMode: "light",
      },
    },
  };
};

export default Home;
