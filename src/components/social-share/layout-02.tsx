import { canonicalFor } from "@components/seo/page-seo";
import Social, { SocialLink } from "@components/ui/social";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

type TProps = {
    className?: string;
};

const SocialShare = ({ className }: TProps) => {
    // From the router, not window.location in an effect, so the server HTML
    // already carries the URL instead of an empty `url=`.
    const href = encodeURIComponent(canonicalFor(useRouter().asPath));

    const clickHandler = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const url = e.currentTarget.href;
        window.open(
            url,
            "Twitter",
            "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,width=800,height=600,resizable=1"
        );
    };

    return (
        <Social
            shape="circle"
            variant="outlined"
            color="light"
            tooltip={true}
            className={className}
        >
            <SocialLink
                label="Facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
                onClick={clickHandler}
                className="tw-mr-2.5"
            >
                <i className="fab fa-facebook-f" aria-hidden="true" />
            </SocialLink>
            <SocialLink
                label="Twitter"
                href={`https://twitter.com/intent/tweet?url=${href}`}
                onClick={clickHandler}
                className="tw-mr-2.5"
            >
                <i className="fab fa-twitter" aria-hidden="true" />
            </SocialLink>
            <SocialLink
                label="Linkedin"
                href={`https://www.linkedin.com/shareArticle?url=${href}`}
                onClick={clickHandler}
                className="tw-mr-2.5"
            >
                <i className="fab fa-linkedin" aria-hidden="true" />
            </SocialLink>
        </Social>
    );
};

export default SocialShare;
