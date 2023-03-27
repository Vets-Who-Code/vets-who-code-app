import { useEffect, useState, MouseEvent } from "react";
import clsx from "clsx";
import Social, { SocialLink } from "@components/ui/social";

type TProps = {
    label: string;
    className?: string;
};

const SocialShare = ({ label, className }: TProps) => {
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
        <div
            className={clsx(
                "tw-inline-flex tw-items-center tw-relative tw-cursor-pointer tw-group",
                className
            )}
        >
            <p className="tw-mb-0 tw-mr-3.8 tw-font-medium tw-hidden sm:tw-block">
                {label}
            </p>

            <i className="fas fa-share-alt tw-w-14 tw-h-14 tw-leading-[52px] tw-text-lg tw-text-center tw-text-primary tw-border-2 tw-border-gray-550 tw-rounded-full tw-transition-colors tw-duration-300 group-hover:tw-bg-primary group-hover:tw-border-primary group-hover:tw-text-white" />
            <Social color="light" tooltip flyout>
                <SocialLink
                    label="Facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
                    onClick={clickHandler}
                    className="tw-py-2.5 tw-px-3"
                >
                    <i className="fab fa-facebook-f" />
                </SocialLink>
                <SocialLink
                    label="Twitter"
                    href={`https://twitter.com/intent/tweet?url=${href}`}
                    onClick={clickHandler}
                    className="tw-py-2.5 tw-px-3"
                >
                    <i className="fab fa-twitter" />
                </SocialLink>
                <SocialLink
                    label="Linkedin"
                    href={`https://www.linkedin.com/shareArticle?url=${href}`}
                    onClick={clickHandler}
                    className="tw-py-2.5 tw-px-3"
                >
                    <i className="fab fa-linkedin" />
                </SocialLink>
            </Social>
        </div>
    );
};

export default SocialShare;
