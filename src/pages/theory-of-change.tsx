import SEO from "@components/seo/page-seo";
import CtaArea from "@containers/cta/layout-01";
import HeroArea from "@containers/hero/layout-07";
import Layout from "@layout/layout-01";
import { normalizedData } from "@utils/methods";
import type { GetStaticProps } from "next";
import { getPageData } from "../lib/page";

// Base content interface
interface PageContent extends Record<string, unknown> {
    section: string;
    title?: string;
    content?: string;
    metadata?: Record<string, unknown>;
    customFields?: Record<string, unknown>;
    section_title?: {
        title?: string;
        subtitle?: string;
    };
    items?: Array<{
        id: number | string;
        headings?: Array<{ id: number | string; content: string }>;
        texts?: Array<{ id: number | string; content: string }>;
        images?: Array<{ src: string }>;
    }>;
    buttons?: Array<{
        id: number | string;
        content: string;
        path: string;
    }>;
}

type TProps = {
    data: {
        page: {
            content: PageContent[];
        };
    };
};

type PageWithLayout = {
    (props: TProps): JSX.Element;
    Layout: typeof Layout;
};

const TheoryOfChange: PageWithLayout = ({ data }) => {
    const content = normalizedData<PageContent>(data.page?.content, "section");
    const theoryOfChangeData = content?.["theory-of-change-area"];

    return (
        <>
            <SEO title="Theory of Change | Vets Who Code" />
            <h1 className="tw-sr-only">Theory of Change</h1>
            <HeroArea data={content?.["hero-area"]} />

            {theoryOfChangeData && (
                <div className="tw-py-15 md:tw-py-20 lg:tw-py-28">
                    <div className="tw-container">
                        {theoryOfChangeData.section_title?.title && (
                            <h2 className="tw-mb-4 tw-text-center tw-text-3xl tw-font-bold md:tw-text-4xl lg:tw-text-5xl">
                                {theoryOfChangeData.section_title.title}
                            </h2>
                        )}
                        {theoryOfChangeData.section_title?.subtitle && (
                            <p className="tw-mb-10 tw-text-center tw-text-lg md:tw-mb-16">
                                {theoryOfChangeData.section_title.subtitle}
                            </p>
                        )}
                        {theoryOfChangeData.items?.map((item, itemIndex) => (
                            <div key={item.id} className="tw-mb-16 last:tw-mb-0">
                                {item.headings?.map((heading) => (
                                    <h3
                                        key={heading.id}
                                        className="tw-mb-5 tw-text-2xl tw-font-semibold"
                                    >
                                        {heading.content}
                                    </h3>
                                ))}
                                <div className="tw-text-base tw-text-gray-200">
                                    {item.texts?.map((text, index) => {
                                        if (item.texts && item.texts.length > 1 && index === 0) {
                                            return (
                                                <p key={text.id} className="tw-mb-4">
                                                    {text.content}
                                                </p>
                                            );
                                        }

                                        if (item.texts && item.texts.length > 1 && index > 0) {
                                            // For list items after the intro paragraph
                                            return (
                                                <div
                                                    key={text.id}
                                                    className="tw-mb-3 tw-flex last:tw-mb-0"
                                                >
                                                    <div className="tw-mr-2">•</div>
                                                    <div>{text.content}</div>
                                                </div>
                                            );
                                        }

                                        // For sections with only a single paragraph
                                        return (
                                            <p key={text.id} className="tw-mb-4">
                                                {text.content}
                                            </p>
                                        );
                                    })}
                                </div>

                                {theoryOfChangeData.items &&
                                    itemIndex < theoryOfChangeData.items.length - 1 && (
                                        <hr className="tw-my-10 tw-border-gray-200" />
                                    )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <CtaArea data={content?.["cta-area"]} space="bottom" />
        </>
    );
};

TheoryOfChange.Layout = Layout;

export const getStaticProps: GetStaticProps = () => {
    const page = getPageData("inner", "theory-of-change");

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

export default TheoryOfChange;
