import SEO from "@components/seo/page-seo";
import { MonoMeta } from "@components/ui/design-system";
import { EngagementModal } from "@components/ui/engagement-modal/EngagementModal";
import BlogArea from "@containers/blog/layout-03";
import BrandArea from "@containers/brand/layout-01";
import EventArea from "@containers/event/layout-02";
import FunfactArea from "@containers/funfact/layout-04";
import HeroArea from "@containers/hero/layout-04";
import CurriculumColumns from "@containers/home/curriculum-columns";
import MediaArea from "@containers/media/layout-01";
import NewsletterArea from "@containers/newsletter/layout-02";
import ServiceArea from "@containers/service/layout-03";
import TestimonialArea from "@containers/testimonial/layout-04";
import VideoArea from "@containers/video/layout-04";
import Layout from "@layout/layout-03";
import AlumniStrip from "@ui/alumni-strip";
import HeroCodeSnippet from "@ui/hero-code-snippet";
import PullQuote from "@ui/pull-quote";
import StatBelt from "@ui/stat-belt";
import Wrapper from "@ui/wrapper/wrapper-02";
import { normalizedData } from "@utils/methods";
import { IBlog, IEvent, IMedia } from "@utils/types";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { getAllBlogs } from "../lib/blog";
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

            {/* Operations brief — status bar across the top, SF/CG signature */}
            <div className="tw-w-full tw-border-b tw-border-cream/10 tw-bg-navy tw-py-2.5">
                <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-gap-x-6 tw-gap-y-2">
                    <MonoMeta tone="bright" size="xs">
                        <span className="tw-flex tw-items-center tw-gap-2">
                            <span className="tw-relative tw-flex tw-h-[7px] tw-w-[7px]">
                                <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-red tw-opacity-75" />
                                <span className="tw-relative tw-inline-flex tw-h-[7px] tw-w-[7px] tw-rounded-full tw-bg-red tw-shadow-[0_0_10px_#c5203e]" />
                            </span>
                            Live · 2026 Cohort
                        </span>
                    </MonoMeta>
                    <MonoMeta tone="gold" size="xs">
                        Placement · <span className="tw-text-cream">97%</span>
                    </MonoMeta>
                    <MonoMeta tone="gold" size="xs">
                        Alumni earnings · <span className="tw-text-cream">$20M+</span>
                    </MonoMeta>
                    <MonoMeta tone="gold" size="xs">
                        Status · <span className="tw-text-cream">501(c)(3)</span>
                    </MonoMeta>
                    <MonoMeta tone="muted" size="xs" className="tw-ml-auto">
                        <span className="tw-text-cream">Applications Open</span>
                    </MonoMeta>
                </div>
            </div>

            {/* Hero — full navy, dark-section for grain overlay */}
            <HeroArea data={content?.["hero-area"]} />

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

            {/* Outcomes belt — results gate before the curriculum preview */}
            <StatBelt />

            <CurriculumColumns />

            {/* Testimonials — light */}
            <TestimonialArea data={content?.["testimonial-area"]} titleSize="large" />

            {/* Events — navy */}
            <div className="dark-section tw-bg-navy">
                <EventArea
                    data={{ ...content?.["event-area"], events: data.events }}
                    titleSize="large"
                />
            </div>

            {/* Mission pull-quote + alumni proof — light */}
            <div className="tw-py-20 md:tw-py-[120px]">
                <div className="tw-container">
                    <PullQuote
                        theme="light"
                        emphasis="We don't train veterans to fill seats."
                        continuation="We train them to be impactful on their engineering teams at companies that shape the world."
                    />
                    <div className="tw-mt-14 md:tw-mt-20">
                        <AlumniStrip align="center" theme="light" />
                    </div>
                </div>
            </div>

            {/* Media — navy */}
            <div className="dark-section tw-bg-navy">
                <MediaArea
                    data={{ ...content?.["media-area"], media: data.media }}
                    titleSize="large"
                />
            </div>

            {/* Blog — light */}
            <BlogArea data={{ ...content?.["blog-area"], blogs: data.blogs }} titleSize="large" />

            {/* Brand / partners — navy */}
            <div className="dark-section tw-bg-navy">
                <BrandArea data={content?.["brand-area"]} />
            </div>

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
    const events = getallEvents(["title", "thumbnail", "start_date", "location"], 0, 6);
    const allMedia = getAllMediaPosts<IMedia>(
        ["slug", "title", "mediaType", "url", "publication", "date", "image", "description"],
        "media"
    );
    const media = allMedia
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
    const { blogs } = getAllBlogs(["title", "image", "category", "postedAt"], 0, 3);
    return {
        props: {
            data: {
                page,
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
