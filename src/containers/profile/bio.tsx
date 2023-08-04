import Section from "@ui/section";
import Social, { SocialLink } from "@components/ui/social";

const ProfileBio = () => {
    return (
        <Section className="profile-area" space="bottom">
            <div className="tw-container tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-7.5 tw-items-start lg:tw-items-center">
                <figure className="tw-col-span-full md:tw-col-span-6 xl:tw-col-span-5">
                    <img
                        className="tw-w-full"
                        src="/images/profile/profile.jpeg"
                        alt="profile"
                        width={470}
                        height={470}
                    />
                </figure>
                <div className="tw-col-span-full md:tw-col-[7/-1]">
                    <h2 className="tw-mb-0 tw-leading-[1.42]">
                        Maggie Strickland
                    </h2>
                    <h3 className="tw-font-normal tw-text-body tw-text-h6 tw-leading-relaxed tw-mb-0">
                        /Advanced Educator
                    </h3>
                    <p className="tw-mb-0 tw-mt-3.8">
                        Maggie is a brilliant educator, whose life was spent for
                        computer science and love of nature. Being a female, she
                        encountered a lot of obstacles and was forbidden to work
                        in this field by her family. With a true spirit and
                        talented gift, she was able to succeed and set an
                        example for others.
                    </p>
                    <h4 className="tw-text-h5 tw-mt-9 tw-mb-2.5">Contact</h4>
                    <div className="contact-info-text">
                        <span className="phone">
                            Phone number:{" "}
                            <strong className="tw-text-heading">
                                (+88) - 1990 - 8668
                            </strong>{" "}
                        </span>
                        <br />
                        <span className="email">
                            Email:{" "}
                            <strong className="tw-text-heading">
                                maggiestrickland.instructor@gmail.com
                            </strong>
                        </span>
                    </div>
                    <Social
                        shape="circle"
                        variant="outlined"
                        color="light"
                        className="tw-mt-7.5"
                    >
                        <SocialLink
                            href="https://twitter.com"
                            label="twitter link"
                            className="tw-mr-3"
                        >
                            <i className="fab fa-twitter" />
                        </SocialLink>
                        <SocialLink
                            href="https://facebook.com"
                            label="facebook link"
                            className="tw-mr-3"
                        >
                            <i className="fab fa-facebook-f" />
                        </SocialLink>
                        <SocialLink
                            href="https://instagram.com"
                            label="instagram link"
                            className="tw-mr-3"
                        >
                            <i className="fab fa-instagram" />
                        </SocialLink>
                        <SocialLink
                            href="https://pinterest.com"
                            label="pinterest link"
                            className="tw-mr-3"
                        >
                            <i className="fab fa-pinterest" />
                        </SocialLink>
                        <SocialLink
                            href="https://youtube.com"
                            label="youtube link"
                            className="tw-mr-3"
                        >
                            <i className="fab fa-youtube" />
                        </SocialLink>
                    </Social>
                </div>
            </div>
        </Section>
    );
};

export default ProfileBio;
