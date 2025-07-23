import { motion } from "motion/react";
import Section from "@components/ui/engagement-modal";
import DonateForm from "@components/forms/donate-form";
import { SectionTitleType, TSection } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";

const AnimatedDonateForm = motion(DonateForm);

type TProps = TSection & {
    data: {
        section_title?: SectionTitleType;
    };
};

const DonateFormArea = ({ data: { section_title }, space }: TProps) => {
    return (
        <Section className="donate-form-area" space={space}>
            <div className="tw:container">
                {/* Intro Section */}
                <div className="tw:mb-10 tw:text-center">
                    {section_title && (
                        <motion.h1
                            className="tw:mb-6 tw:text-4xl tw:font-bold tw:leading-tight tw:lg:text-5xl"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        >
                            Support Our <span className="tw:text-primary">Mission</span>
                        </motion.h1>
                    )}

                    <motion.p
                        className="tw:mx-auto tw:mb-8 tw:max-w-3xl tw:text-lg"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        Your generosity fuels the technology veterans count on, sustains
                        life-changing mentorship, and accelerates a platform built to stay ahead of
                        the industry. Because of you, those who served aren’t just finding their
                        place in tech — they’re leading it.
                    </motion.p>
                </div>

                {/* Donation Impact Metrics */}
                <motion.div
                    className="tw:mb-12 tw:grid tw:grid-cols-2 tw:gap-6 tw:md:grid-cols-4"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    <div className="tw:text-center">
                        <span className="tw:block tw:text-4xl tw:font-bold tw:text-primary">
                            300+
                        </span>
                        <span className="tw:mt-2 tw:block">Veterans Served</span>
                    </div>
                    <div className="tw:text-center">
                        <span className="tw:block tw:text-4xl tw:font-bold tw:text-primary">
                            90%
                        </span>
                        <span className="tw:mt-2 tw:block">Job Placement Rate</span>
                    </div>
                    <div className="tw:text-center">
                        <span className="tw:block tw:text-4xl tw:font-bold tw:text-primary">
                            40%
                        </span>
                        <span className="tw:mt-2 tw:block">Average Salary Increase</span>
                    </div>
                    <div className="tw:text-center">
                        <span className="tw:block tw:text-4xl tw:font-bold tw:text-primary">
                            80%
                        </span>
                        <span className="tw:mt-2 tw:block">
                            Felt Supported for Learning Journey
                        </span>
                    </div>
                </motion.div>

                {/* Donation Form */}
                <AnimatedDonateForm
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                />

                {/* Testimonials */}
                <div className="tw:mt-16">
                    <motion.h3
                        className="tw:mb-8 tw:text-center tw:text-2xl tw:font-bold"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        How Your Support Makes an Impact
                    </motion.h3>

                    <motion.div
                        className="tw:grid tw:grid-cols-1 tw:gap-6 tw:md:grid-cols-2 tw:lg:grid-cols-3"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <div className="tw:rounded-lg tw:bg-white tw:p-6 tw:shadow-sm">
                            <p className="tw:mb-4 tw:italic">
                                &quot;Participating in Vets Who Code significantly boosted my
                                confidence confidence and honed my skills. Since completing the
                                program, I have secured a role as a Staff Software Engineer at Jump,
                                a ticketing startup focused on live events.&quot;
                            </p>
                            <div className="tw:flex tw:items-center">
                                <img
                                    src="https://res.cloudinary.com/vetswhocode/image/upload/f_auto,q_auto,g_auto/v1721082085/josh-morton.jpg"
                                    alt="Josh Morton"
                                    className="tw:h-10 tw:w-10 tw:rounded-full tw:object-cover"
                                />
                                <div className="tw:ml-3">
                                    <p className="tw:font-medium">Josh Morton</p>
                                    <p className="tw:text-sm tw:text-[#091f40]">
                                        Army Veteran, Software Developer
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tw:rounded-lg tw:bg-white tw:p-6 tw:shadow-sm">
                            <p className="tw:mb-4 tw:italic">
                                &quot;The impact of VWC on my career has been profound. The
                                knowledge and skills I gained have greatly enhanced my career. In
                                just two years, I more than doubled my salary, providing financial
                                security for my family and allowing my wife to stay home with our
                                kids. But more than that, I&#39;ve grown as a person and as a
                                professional, and that&#39;s something no amount of money can
                                buy.&quot;
                            </p>
                            <div className="tw:flex tw:items-center">
                                <img
                                    src="https://res.cloudinary.com/vetswhocode/image/upload/v1721086509/Image_from_iOS_pdujsr.jpg"
                                    alt="Cameron Porter"
                                    className="tw:h-10 tw:w-10 tw:rounded-full tw:object-cover"
                                />
                                <div className="tw:ml-3">
                                    <p className="tw:font-medium">Cameron Porter.</p>
                                    <p className="tw:text-sm tw:text-[#091f40]">
                                        US Army, Software Engineer
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tw:rounded-lg tw:bg-white tw:p-6 tw:shadow-sm tw:md:col-span-2 tw:lg:col-span-1">
                            <p className="tw:mb-4 tw:italic">
                                &quot;Without a doubt, I would hire from Vets Who Code again. The
                                experience has been overwhelmingly positive, and I believe in
                                veterans&#39; immense value to our team and our healthcare
                                mission.&quot;
                            </p>
                            <div className="tw:flex tw:items-center">
                                <img
                                    src="https://res.cloudinary.com/vetswhocode/image/upload/v1748652090/AB1_6721_towfh2.jpg"
                                    alt="Darnell Settles"
                                    className="tw:h-10 tw:w-10 tw:rounded-full tw:object-cover"
                                />
                                <div className="tw:ml-3">
                                    <p className="tw:font-medium">Darnell Settles III</p>
                                    <p className="tw:text-sm tw:text-[#091f40]">
                                        Director of Web and Digital Strategy, Methodist Le Bonheur
                                        Healthcare
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default DonateFormArea;
