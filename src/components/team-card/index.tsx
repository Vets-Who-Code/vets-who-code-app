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
                    {image?.src ? (
                        <div className="tw-relative">
                            <img
                                className="tw-h-[430px] tw-w-[350px] tw-object-cover tw-grayscale tw-transition-all tw-duration-1000 tw-ease-out group-hover:tw-scale-110 group-hover:tw-grayscale-0"
                                src={image.src}
                                alt={image?.alt || name}
                                width={image?.width || 350}
                                height={image?.height || 430}
                                loading="lazy"
                                onError={(e) => {
                                    // Fallback to a placeholder if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null; // Prevent infinite loop
                                    target.src = "/images/profile/placeholder-profile.jpg";
                                }}
                            />
                        </div>
                    ) : (
                        <div className="tw-flex tw-h-[430px] tw-w-[350px] tw-items-center tw-justify-center tw-bg-gray-200">
                            <span className="tw-text-gray-500">No Image</span>
                        </div>
                    )}
                    {socials && Array.isArray(socials) && socials.length > 0 && (
                        <Social
                            color="dark"
                            size="xl"
                            tooltip
                            className="tw-absolute tw-bottom-3 tw-left-3 tw-right-3 tw-justify-center tw-bg-white tw-py-2.5 tw-opacity-0 tw-transition-opacity tw-duration-300 group-hover:tw-opacity-100"
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
