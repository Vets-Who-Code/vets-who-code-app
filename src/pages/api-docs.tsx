import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { getApiDocs } from "../swagger";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

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
