import Breadcrumb from "@components/breadcrumb";
import SEO from "@components/seo/page-seo";
import { sitemapColumns, sitemapExtraColumns, SitemapColumn } from "@data/sitemap-links";
import Layout from "@layout/layout-01";
import Anchor from "@ui/anchor";
import type { GetStaticProps, NextPage } from "next";

type PageProps = NextPage & {
    Layout: typeof Layout;
};

const Section = ({ column }: { column: SitemapColumn }) => (
    <div>
        <h2 className="tw-mb-4 tw-text-xl tw-font-bold tw-text-secondary md:tw-text-2xl">
            {column.heading}
        </h2>
        <ul className="tw-space-y-2">
            {column.links.map((link) => (
                <li key={link.path}>
                    <Anchor
                        path={link.path}
                        className="tw-text-base tw-text-body hover:tw-text-primary"
                    >
                        {link.label}
                    </Anchor>
                </li>
            ))}
        </ul>
    </div>
);

const SitemapPage: PageProps = () => {
    const allColumns = [...sitemapColumns, ...sitemapExtraColumns];

    return (
        <>
            <SEO title="Sitemap | Vets Who Code" />
            <Breadcrumb pages={[{ path: "/", label: "home" }]} currentPage="Sitemap" />
            <div className="tw-container tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]">
                <div className="tw-mx-auto tw-max-w-5xl">
                    <p className="tw-mb-10 tw-text-lg tw-text-body">
                        Every page on vetswhocode.io, grouped by what you&apos;re trying to do.
                        Looking for our XML sitemap?{" "}
                        <a
                            href="/sitemap.xml"
                            className="tw-text-primary hover:tw-underline"
                        >
                            View sitemap.xml
                        </a>
                        .
                    </p>
                    <div className="tw-grid tw-grid-cols-1 tw-gap-10 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                        {allColumns.map((column) => (
                            <Section key={column.heading} column={column} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

SitemapPage.Layout = Layout;

export const getStaticProps: GetStaticProps = () => ({
    props: {
        layout: {
            headerShadow: true,
            headerFluid: false,
            footerMode: "light",
        },
    },
});

export default SitemapPage;
