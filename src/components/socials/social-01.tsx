import clsx from "clsx";
import Social, { SocialLink } from "@ui/social";

const Social01 = ({ className }: { className?: string }) => (
    <Social color="dark" size="lg" className={clsx(className)}>
        <SocialLink href="https://github.com/Vets-Who-Code" label="github" className="tw-px-2.5">
            <i className="fab fa-github" />
        </SocialLink>
        <SocialLink
            href="https://www.facebook.com/TheOfficialVetsWhoCode/"
            label="facebook"
            className="tw-px-2.5"
        >
            <i className="fab fa-facebook-f" />
        </SocialLink>
        <SocialLink href="https://dev.to/vetswhocode" label="Practical Dev" className="tw-px-2.5">
            <i className="fab fa-dev" />
        </SocialLink>
        <SocialLink
            href="https://www.linkedin.com/company/vets-who-code"
            label="linkedin"
            className="tw-px-2.5"
        >
            <i className="fab fa-linkedin" />
        </SocialLink>
    </Social>
);

export default Social01;
