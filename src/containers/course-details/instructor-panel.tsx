import Anchor from "@ui/anchor";
import Social, { SocialLink } from "@components/ui/social";
import { IInstructor } from "@utils/types";

type TProps = IInstructor;

const OverviewPanel = ({ name, image, designation, bio, socials }: TProps) => {
    return (
        <div className="instructor tw-grid tw-gap-7.5 md:tw-grid-cols-3 lg:tw-gap-[50px]">
            <figure className="md:tw-col-[1/1]">
                {image.src && (
                    <img
                        src={image.src}
                        alt={image?.alt || name}
                        width={238}
                        height={238}
                        loading="lazy"
                    />
                )}
            </figure>
            <div className="md:tw-col-[2/-1]">
                <h3>
                    <Anchor path="/profile">{name}</Anchor>
                </h3>
                <h6 className="tw-font-normal tw-text-body tw-leading-relaxed tw-mb-0">
                    /{designation}
                </h6>
                <p className="tw-mt-3.8 tw-mb-0">{bio}</p>

                <Social
                    shape="circle"
                    variant="outlined"
                    color="light"
                    className="tw-mt-7.5"
                >
                    {socials.map((social) => (
                        <SocialLink
                            key={social.label}
                            href={social.url}
                            label={social.label}
                            className="tw-mr-3"
                        >
                            <i className={social.icon} />
                        </SocialLink>
                    ))}
                </Social>
            </div>
        </div>
    );
};

export default OverviewPanel;
