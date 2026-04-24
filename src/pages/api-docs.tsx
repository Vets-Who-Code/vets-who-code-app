import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { getApiDocs } from "../swagger";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDoc({ spec }: { spec: object }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
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
