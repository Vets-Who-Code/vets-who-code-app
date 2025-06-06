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
                "tw-group tw-relative tw-inline-flex tw-cursor-pointer tw-items-center",
                className
            )}
        >
            <p className="tw-mb-0 tw-mr-3.8 tw-hidden tw-font-medium sm:tw-block">{label}</p>

            <i className="fas fa-share-alt tw-h-14 tw-w-14 tw-rounded-full tw-border-2 tw-border-gray-550 tw-text-center tw-text-lg tw-leading-[52px] tw-text-primary tw-transition-colors tw-duration-300 group-hover:tw-border-primary group-hover:tw-bg-primary group-hover:tw-text-white" />
            <Social color="light" tooltip flyout>
                <SocialLink
                    label="Facebook"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
                    onClick={clickHandler}
                    className="tw-px-3 tw-py-2.5"
                >
                    <i className="fab fa-facebook-f" />
                </SocialLink>
                <SocialLink
                    label="Twitter"
                    href={`https://twitter.com/intent/tweet?url=${href}`}
                    onClick={clickHandler}
                    className="tw-px-3 tw-py-2.5"
                >
                    <i className="fab fa-twitter" />
                </SocialLink>
                <SocialLink
                    label="Linkedin"
                    href={`https://www.linkedin.com/shareArticle?url=${href}`}
                    onClick={clickHandler}
                    className="tw-px-3 tw-py-2.5"
                >
                    <i className="fab fa-linkedin" />
                </SocialLink>
            </Social>
        </div>
    );
};

export default SocialShare;
