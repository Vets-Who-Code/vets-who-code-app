import Social, { SocialLink } from "@ui/social";
import { IInstructor } from "@utils/types";

const BlogAuthor = ({ name, image, bio, socials }: IInstructor) => {
    return (
        <div className="blog-author tw:mt-10 tw:flex tw:flex-wrap tw:justify-center tw:md:justify-start">
            <div className="tw:min-w-[100px] tw:max-w-[140px] tw:shrink-0 tw:text-center">
                {image?.src && (
                    <img
                        alt={image?.alt || name}
                        src={image.src}
                        className="tw:rounded-full"
                        height="100"
                        width="100"
                    />
                )}
                {socials?.length > 0 && (
                    <Social color="dark" tooltip className="tw:mx-[-9px] tw:mt-[13px]">
                        {socials.map(({ icon, label, url }) => (
                            <SocialLink
                                key={label}
                                href={url}
                                label={label}
                                className="tw:px-2.5 tw:py-1.5"
                            >
                                <i className={icon} />
                            </SocialLink>
                        ))}
                    </Social>
                )}
            </div>
            <div className="tw:pt-7.5 tw:text-center tw:md:w-[calc(100%-140px)] tw:md:pl-7.5 tw:md:pt-0 tw:md:text-left">
                <h3 className="tw:mb-[13px] tw:text-base tw:uppercase tw:tracking-wider">{name}</h3>
                <p className="tw:mb-0">{bio}</p>
            </div>
        </div>
    );
};

export default BlogAuthor;
