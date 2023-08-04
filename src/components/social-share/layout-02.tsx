import { useEffect, useState, MouseEvent } from "react";
import Social, { SocialLink } from "@components/ui/social";

type TProps = {
    className?: string;
};

const SocialShare = ({ className }: TProps) => {
    const [href, setHref] = useState("");
    useEffect(() => {
        setHref(window.location.href);
    }, []);

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
            tooltip
            className={className}
        >
            <SocialLink
                label="Facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
                onClick={clickHandler}
                className="tw-mr-2.5"
            >
                <i className="fab fa-facebook-f" />
            </SocialLink>
            <SocialLink
                label="Twitter"
                href={`https://twitter.com/intent/tweet?url=${href}`}
                onClick={clickHandler}
                className="tw-mr-2.5"
            >
                <i className="fab fa-twitter" />
            </SocialLink>
            <SocialLink
                label="Linkedin"
                href={`https://www.linkedin.com/shareArticle?url=${href}`}
                onClick={clickHandler}
                className="tw-mr-2.5"
            >
                <i className="fab fa-linkedin" />
            </SocialLink>
        </Social>
    );
};

export default SocialShare;
