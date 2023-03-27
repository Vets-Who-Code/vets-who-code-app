import clsx from "clsx";
import Social, { SocialLink } from "@components/ui/social";
import WidgetTitle from "./widget-title";

type TProps = {
    className?: string;
    mode?: "light" | "dark";
};

const TextWidget = ({ className, mode }: TProps) => {
    return (
        <div className={clsx(className)}>
            <WidgetTitle mode={mode}>Mailing Address</WidgetTitle>
            <div
                className={clsx(
                    "content ",
                    mode === "dark" && "tw-text-gray-400"
                )}
            >
                <p className="tw-mb-[11px]">
                    31860 Sandy Plains Road, Ste 204 PMB 206
                </p>
                <p className="tw-mb-[11px]">
                    <a
                        href="#!"
                        className={clsx(
                            "hover:tw-text-primary",
                            mode === "dark" && "tw-text-gray-400"
                        )}
                    >
                        hello@vetswhocode.io{" "}
                    </a>
                </p>
            </div>
            <Social
                color={mode === "dark" ? "white" : "light"}
                className="tw-gap-6.1 tw-mt-6.1"
            >
                <SocialLink href="https://facebook.com" label="Facebook lnik">
                    <i className="fab fa-facebook-square" />
                </SocialLink>
                <SocialLink href="https://twitter.com" label="twitter lnik">
                    <i className="fab fa-twitter" />
                </SocialLink>
                <SocialLink href="https://instagram.com" label="instagram lnik">
                    <i className="fab fa-instagram" />
                </SocialLink>
                <SocialLink href="https://linkedin.com" label="linkedin lnik">
                    <i className="fab fa-linkedin" />
                </SocialLink>
            </Social>
        </div>
    );
};

export default TextWidget;
