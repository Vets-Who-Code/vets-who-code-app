import Section from "@ui/section";
import Social, { SocialLink } from "@components/ui/social";

const ProfileBio = () => {
    return (
        <Section className="profile-area" space="bottom">
            <div className="tw-container tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-7.5 tw-items-start lg:tw-items-center">
                <figure className="tw-col-span-full md:tw-col-span-6 xl:tw-col-span-5">
                    <img
                        className="tw-w-full"
                        src="https://res.cloudinary.com/vetswhocode/image/upload/v1683429329/jerome-headshot-bw-3900.jpg"
                        alt="profile"
                        width={470}
                        height={470}
                    />
                </figure>
                <div className="tw-col-span-full md:tw-col-[7/-1]">
                    <h2 className="tw-mb-0 tw-leading-[1.42]">Jerome Hardaway</h2>
                    <h3 className="tw-font-normal tw-text-body tw-text-h6 tw-leading-relaxed tw-mb-0">
                        Executive Director
                    </h3>
                    <p className="tw-mb-0 tw-mt-3.8">
                        With over 10 years of software engineering experience, Jerome is a leader in
                        developing and delivering AI products that enhance the user experience and
                        empower millions of customers worldwide. He currently works as a Senior
                        Software Engineer at Microsoft, where he applies his skills in Python,
                        Javascript, and user-centered design to create innovative solutions and
                        technologies for various platforms and domains.
                    </p>

                    <p className="tw-mb-0 tw-mt-3.8">
                        Jerome is also passionate about teaching and mentoring diverse and
                        underrepresented communities in the tech industry. He is the Founder and
                        Executive Director of Vets Who Code, a nonprofit organization that teaches
                        veterans and military spouses how to code for free and helps them find
                        fulfilling careers in the tech sector. Jerome shares his knowledge and
                        expertise with learners and peers through courses on LinkedIn Learning and
                        FrontEnd Masters, as well as through his recognition as a LinkedIn Top
                        Voice, a GitHub Star, and a Twilio Champion. Jerome&apos;s mission is to
                        make the tech industry more accessible, diverse, and innovative, and he is
                        always looking for new ways to achieve this goal.
                    </p>
                    <h4 className="tw-text-h5 tw-mt-9 tw-mb-2.5">Contact</h4>
                    <div className="contact-info-text">
                        <br />
                        <span className="email">
                            Email:{" "}
                            <strong className="tw-text-heading">jerome@vetswhocode.io</strong>
                        </span>
                    </div>
                    <Social shape="circle" variant="outlined" color="light" className="tw-mt-7.5">
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
