import clsx from "clsx";
import Social, { SocialLink } from "@ui/social";

const Social01 = ({ className }: { className?: string }) => (
    <Social color="dark" size="lg" className={clsx(className)}>
        <SocialLink
            href="https://www.twitter.com/"
            label="twitter"
            className="tw-px-2.5"
        >
            <i className="fab fa-twitter" />
        </SocialLink>
        <SocialLink
            href="https://www.facebook.com/"
            label="facebook"
            className="tw-px-2.5"
        >
            <i className="fab fa-facebook-f" />
        </SocialLink>
        <SocialLink
            href="https://www.instagram.com/"
            label="instagram"
            className="tw-px-2.5"
        >
            <i className="fab fa-instagram" />
        </SocialLink>
        <SocialLink
            href="https://www.linkedin.com/"
            label="linkedin"
            className="tw-px-2.5"
        >
            <i className="fab fa-linkedin" />
        </SocialLink>
    </Social>
);

export default Social01;
