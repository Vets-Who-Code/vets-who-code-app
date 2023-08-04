import Social, { SocialLink } from "@ui/social";
import { IInstructor } from "@utils/types";

const BlogAuthor = ({ name, image, bio, socials }: IInstructor) => {
    return (
        <div className="blog-author tw-mt-10 tw-flex tw-flex-wrap tw-justify-center md:tw-justify-start">
            <div className="tw-text-center tw-max-w-[140px] tw-min-w-[100px] tw-shrink-0">
                {image?.src && (
                    <img
                        alt={image?.alt || name}
                        src={image.src}
                        className="tw-rounded-full"
                        height="100"
                        width="100"
                    />
                )}
                {socials?.length > 0 && (
                    <Social
                        color="dark"
                        tooltip
                        className="tw-mt-[13px] tw-mx-[-9px]"
                    >
                        {socials.map(({ icon, label, url }) => (
                            <SocialLink
                                key={label}
                                href={url}
                                label={label}
                                className="tw-py-1.5 tw-px-2.5"
                            >
                                <i className={icon} />
                            </SocialLink>
                        ))}
                    </Social>
                )}
            </div>
            <div className="md:tw-w-[calc(100%_-_140px)] tw-text-center tw-pt-7.5 md:tw-text-left md:tw-pt-0 md:tw-pl-7.5">
                <h3 className="tw-mb-[13px] tw-text-base tw-uppercase tw-tracking-wider">
                    {name}
                </h3>
                <p className="tw-mb-0">{bio}</p>
            </div>
        </div>
    );
};

export default BlogAuthor;
