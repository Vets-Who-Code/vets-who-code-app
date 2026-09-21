import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import type { ComponentType } from "react";
import { getApiDocs } from "../swagger";

const SwaggerUI = dynamic(
    () => import("swagger-ui-react"),
    { ssr: false },
) as ComponentType<{ spec: object }>;

export default function ApiDoc({ spec }: { spec: object }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/swagger-ui.css" />
            </Head>
            <SwaggerUI spec={spec} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const spec = getApiDocs();

    return {
        props: {
            spec,
        },
    };
};
