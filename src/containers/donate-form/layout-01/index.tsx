import { motion } from "motion/react";
import Section from "@ui/section";
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
            <div className="tw-container">
                {/* Intro Section */}
                <div className="tw-mb-10 tw-text-center">
                    {section_title && (
                        <motion.h1
                            className="tw-mb-6 tw-text-4xl tw-font-bold tw-leading-tight lg:tw-text-5xl"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={scrollUpVariants}
                        >
                            Support Our <span className="tw-text-primary">Mission</span>
                        </motion.h1>
                    )}

                    <motion.p
                        className="tw-mx-auto tw-mb-8 tw-max-w-3xl tw-text-lg"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        Your donation helps us provide free coding education and mentorship to
                        veterans transitioning to civilian careers in technology. Every contribution
                        makes a difference in a veteran&apos;s journey into the tech industry.
                    </motion.p>
                </div>

                {/* Donation Impact Metrics */}
                <motion.div
                    className="tw-mb-12 tw-grid tw-grid-cols-2 tw-gap-6 md:tw-grid-cols-4"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={scrollUpVariants}
                >
                    <div className="tw-text-center">
                        <span className="tw-block tw-text-4xl tw-font-bold tw-text-primary">
                            400+
                        </span>
                        <span className="tw-mt-2 tw-block">Veterans Served</span>
                    </div>
                    <div className="tw-text-center">
                        <span className="tw-block tw-text-4xl tw-font-bold tw-text-primary">
                            80%
                        </span>
                        <span className="tw-mt-2 tw-block">Job Placement Rate</span>
                    </div>
                    <div className="tw-text-center">
                        <span className="tw-block tw-text-4xl tw-font-bold tw-text-primary">
                            50+
                        </span>
                        <span className="tw-mt-2 tw-block">Employer Partners</span>
                    </div>
                    <div className="tw-text-center">
                        <span className="tw-block tw-text-4xl tw-font-bold tw-text-primary">
                            $75K+
                        </span>
                        <span className="tw-mt-2 tw-block">Avg. Starting Salary</span>
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
                <div className="tw-mt-16">
                    <motion.h3
                        className="tw-mb-8 tw-text-center tw-text-2xl tw-font-bold"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        How Your Support Makes an Impact
                    </motion.h3>

                    <motion.div
                        className="tw-grid tw-grid-cols-1 tw-gap-6 md:tw-grid-cols-2 lg:tw-grid-cols-3"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={scrollUpVariants}
                    >
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <p className="tw-mb-4 tw-italic">
                                "Vets Who Code gave me the skills and confidence to transition from
                                military service to a fulfilling career in tech. The mentorship and
                                community support were invaluable."
                            </p>
                            <div className="tw-flex tw-items-center">
                                <div className="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-300" />
                                <div className="tw-ml-3">
                                    <p className="tw-font-medium">John D.</p>
                                    <p className="tw-text-sm tw-text-gray-600">
                                        Army Veteran, Software Developer
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow">
                            <p className="tw-mb-4 tw-italic">
                                "As a donor, I've seen firsthand how my contributions help veterans
                                build new careers. The transparency and impact of this organization
                                keeps me coming back."
                            </p>
                            <div className="tw-flex tw-items-center">
                                <div className="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-300" />
                                <div className="tw-ml-3">
                                    <p className="tw-font-medium">Sarah M.</p>
                                    <p className="tw-text-sm tw-text-gray-600">Recurring Donor</p>
                                </div>
                            </div>
                        </div>
                        <div className="tw-rounded-lg tw-bg-white tw-p-6 tw-shadow md:tw-col-span-2 lg:tw-col-span-1">
                            <p className="tw-mb-4 tw-italic">
                                "Our company has hired multiple VWC graduates and each one brings
                                exceptional technical skills along with the discipline and
                                leadership qualities developed in military service."
                            </p>
                            <div className="tw-flex tw-items-center">
                                <div className="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-300" />
                                <div className="tw-ml-3">
                                    <p className="tw-font-medium">Michael R.</p>
                                    <p className="tw-text-sm tw-text-gray-600">
                                        Tech Company Hiring Manager
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
