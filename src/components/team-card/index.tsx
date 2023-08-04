import { forwardRef } from "react";
import Social, { SocialLink } from "@ui/social";
import { ImageType, ISocial } from "@utils/types";

type TProps = {
    image: ImageType;
    name: string;
    designation: string;
    socials?: ISocial[];
};

const TeamCard = forwardRef<HTMLDivElement, TProps>(
    ({ image, name, designation, socials }, ref) => {
        return (
            <div className="team-member tw-group" ref={ref}>
                <figure className="tw-relative tw-overflow-hidden">
                    {image?.src && (
                        <img
                            className="tw-w-full tw-transition-transform tw-duration-1000 tw-ease-out group-hover:tw-scale-110"
                            src={image.src}
                            alt={image?.alt || name}
                            width={image?.width || 350}
                            height={image?.height || 430}
                            loading="lazy"
                        />
                    )}
                    {socials && (
                        <Social
                            color="dark"
                            size="lg"
                            tooltip
                            className="tw-absolute tw-justify-center tw-bottom-5 tw-left-5 tw-right-5 tw-py-2.5 tw-opacity-0 tw-bg-white tw-transition-opacity tw-duration-300 group-hover:tw-opacity-100"
                        >
                            {socials.map((social) => (
                                <SocialLink
                                    key={social.label}
                                    href={social.url}
                                    label={social.label}
                                    className="tw-px-3.5"
                                >
                                    <i className={social.icon} />
                                </SocialLink>
                            ))}
                        </Social>
                    )}
                </figure>
                <div className="tw-mt-5 tw-text-center">
                    <h3>{name}</h3>
                    <p>{designation}</p>
                </div>
            </div>
        );
    }
);

export default TeamCard;
