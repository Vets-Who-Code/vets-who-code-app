import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import type { SwaggerUIProps } from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { getApiDocs } from "../swagger";

const SwaggerUI = dynamic<SwaggerUIProps>(
    () => import("swagger-ui-react"),
    { ssr: false },
);

export default function ApiDoc({ spec }: { spec: object }) {
    return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
    const spec = getApiDocs();

    return {
        props: {
            spec,
        },
    };
};
