import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Button from "@ui/button";

const Error404Page = () => {
    const router = useRouter();
    return (
        <>
            <SEO title="Page Not Found" />
            <div className="error-area">
                <div className="tw-container tw-h-screen tw-py-[100px] tw-flex tw-justify-center tw-items-center">
                    <div className="tw-text-center">
                        <div className="child:tw-mx-auto tw-mb-10">
                            <img
                                src="/images/others/page-404-image.png"
                                alt="Not Found"
                                width={407}
                                height={141}
                            />
                        </div>
                        <h3 className="tw-text-white tw-text-3xl md:tw-text-4xl lg:tw-text-[40px] tw-mb-[23px]">
                            Looks like you are lost.{" "}
                        </h3>
                        <p className="tw-text-white/50 tw-max-w-[560px] tw-mx-auto">
                            It looks like nothing was found at this location.
                            You can either go back to the last page or go to
                            homepage{" "}
                        </p>
                        <div className="tw-mt-8">
                            <Button
                                className="tw-m-2.5"
                                onClick={() => router.back()}
                            >
                                <i className="far fa-history tw-mr-3" /> Go back
                            </Button>
                            <Button className="tw-m-2.5" path="/">
                                <i className="far fa-home tw-mr-3" /> Homepage
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export function getStaticProps() {
    return { props: { className: "error-404 tw-bg-dark-50" } };
}

export default Error404Page;
