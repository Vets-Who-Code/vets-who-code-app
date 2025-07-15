import { useRouter } from "next/router";
import SEO from "@components/seo/page-seo";
import Button from "@ui/button";

const Error404Page = () => {
    const router = useRouter();
    return (
        <>
            <SEO title="Page Not Found" />
            <div className="error-area">
                <div className="tw:container tw:flex tw:h-screen tw:items-center tw:justify-center tw:py-[100px]">
                    <div className="tw:text-center">
                        <div className="tw:mb-10 tw:child:mx-auto">
                            <img
                                src="/images/others/page-404-image.png"
                                alt="Not Found"
                                width={407}
                                height={141}
                            />
                        </div>
                        <h3 className="tw:mb-[23px] tw:text-3xl tw:text-white tw:md:text-4xl tw:lg:text-[40px]">
                            Looks like you are lost.{" "}
                        </h3>
                        <p className="tw:mx-auto tw:max-w-[560px] tw:text-white/50">
                            It looks like nothing was found at this location. You can either go back
                            to the last page or go to homepage{" "}
                        </p>
                        <div className="tw:mt-8">
                            <Button className="tw:m-2.5" onClick={() => router.back()}>
                                <i className="far fa-history tw:mr-3" /> Go back
                            </Button>
                            <Button className="tw:m-2.5" path="/">
                                <i className="far fa-home tw:mr-3" /> Homepage
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export function getStaticProps() {
    return { props: { className: "error-404 tw:bg-dark-50" } };
}

export default Error404Page;
