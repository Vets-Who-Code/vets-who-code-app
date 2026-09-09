import ContactUsForm from "@components/forms/contact-us-form";
import SafeHTML from "@components/safe-html";
import { SectionEyebrow } from "@components/ui/design-system";
import { scrollUpVariants } from "@utils/variants";
import { motion } from "motion/react";

// Mirrors the loose shape of ItemType in @utils/types: ids come out of JSON as
// either string or number depending on the file.
type Item = {
    id: string | number;
    title: string;
    texts?: { id: string | number; content: string }[];
    description?: string;
};

type TProps = {
    info?: {
        eyebrow?: string;
        section_title?: { title: string };
        lede?: string;
        items?: Item[];
        response_time?: { title: string; content: string };
    };
    form?: { section_title?: { title: string } };
    faq?: {
        eyebrow?: string;
        section_title?: { title: string };
        items?: Item[];
    };
};

// 2% fractal noise, the design system's standard dark-section grain. Never higher.
const GRAIN =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const grain = { backgroundImage: GRAIN, opacity: 0.02, pointerEvents: "none" } as const;

const reveal = {
    initial: "offscreen",
    whileInView: "onscreen",
    viewport: { once: true, amount: 0.4 },
    variants: scrollUpVariants,
} as const;

const ContactUsArea = ({ info, form, faq }: TProps) => {
    return (
        <section className="tw-bg-gray-50 tw-px-4 tw-py-10 md:tw-px-8 md:tw-py-24">
            <div className="tw-mx-auto tw-max-w-[1230px]">
                <motion.div className="tw-mb-8 tw-max-w-[640px] md:tw-mb-14" {...reveal}>
                    {info?.eyebrow && <SectionEyebrow label={info.eyebrow} />}
                    <h1 className="tw-mb-[18px] tw-mt-[18px] tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-navy [font-size:clamp(34px,5.5vw,56px)]">
                        {info?.section_title?.title}
                    </h1>
                    {info?.lede && (
                        <p className="tw-m-0 tw-font-body tw-text-[17px] tw-leading-[1.74] tw-text-gray-300 [text-wrap:pretty]">
                            {info.lede}
                        </p>
                    )}
                </motion.div>

                <div className="tw-grid tw-grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] tw-items-start tw-gap-6 lg:tw-gap-10">
                    {/* Direct lines — navy panel */}
                    <motion.div
                        className="tw-relative tw-isolate tw-overflow-hidden tw-border tw-border-[rgba(185,214,242,0.08)] tw-bg-navy tw-p-7 md:tw-p-11"
                        {...reveal}
                    >
                        <div className="tw-absolute tw-inset-0 -tw-z-10" style={grain} />
                        <SectionEyebrow label="Direct lines" tone="dark" className="tw-mb-7" />
                        <div className="tw-flex tw-flex-col tw-gap-[30px]">
                            {info?.items?.map((item) => (
                                <div key={item.id}>
                                    <h3 className="tw-mb-2.5 tw-font-heading tw-text-sm tw-font-bold tw-uppercase tw-tracking-[0.04em] tw-text-white">
                                        {item.title}
                                    </h3>
                                    {item.texts?.map((text) => (
                                        <SafeHTML
                                            key={text.id}
                                            as="p"
                                            className="tw-m-0 tw-font-body tw-text-base tw-leading-[1.6] tw-text-gray-50 child:tw-text-[#84C1FF] child:tw-border-b child:tw-border-transparent hover:child:tw-border-white hover:child:tw-text-white"
                                            content={text.content}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {info?.response_time && (
                            <div className="tw-mt-9 tw-border-t tw-border-[rgba(185,214,242,0.08)] tw-pt-7">
                                <span
                                    aria-hidden="true"
                                    className="tw-mb-[18px] tw-inline-block tw-h-px tw-w-12 tw-bg-red"
                                />
                                <h3 className="tw-mb-2.5 tw-font-heading tw-text-sm tw-font-bold tw-uppercase tw-tracking-[0.04em] tw-text-white">
                                    {info.response_time.title}
                                </h3>
                                <p className="tw-m-0 tw-font-body tw-text-base tw-leading-[1.6] tw-text-navy-sky">
                                    {info.response_time.content}
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Form card */}
                    <motion.div {...reveal}>
                        <ContactUsForm heading={form?.section_title?.title} />
                    </motion.div>
                </div>

                {faq?.items?.length ? (
                    <motion.div
                        className="tw-mt-14 tw-border-t tw-border-gray-100 tw-pt-10 md:tw-mt-[120px] md:tw-pt-16"
                        {...reveal}
                    >
                        {faq.eyebrow && <SectionEyebrow label={faq.eyebrow} className="tw-mb-4" />}
                        <h2 className="tw-mb-7 tw-font-heading tw-font-black tw-uppercase tw-tracking-[-0.02em] tw-text-navy md:tw-mb-12 [font-size:clamp(24px,3.4vw,36px)]">
                            {faq.section_title?.title}
                        </h2>
                        <div className="tw-grid tw-grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] tw-gap-6 lg:tw-gap-10">
                            {faq.items.map((item) => (
                                <article
                                    key={item.id}
                                    className="tw-border tw-border-t-2 tw-border-gray-100 tw-border-t-transparent tw-bg-white tw-p-[30px] tw-transition-[transform,border-color,box-shadow] tw-duration-300 tw-ease-[cubic-bezier(0.3,0.2,0.3,0.3)] hover:tw--translate-y-0.5 hover:tw-border-t-red hover:tw-shadow-[0_10px_30px_rgba(9,31,64,0.1)]"
                                >
                                    <h3 className="tw-mb-3 tw-font-heading tw-text-base tw-font-bold tw-leading-[1.35] tw-text-navy">
                                        {item.title}
                                    </h3>
                                    <p className="tw-m-0 tw-font-body tw-text-[15px] tw-leading-[1.74] tw-text-gray-300 [text-wrap:pretty]">
                                        {item.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </motion.div>
                ) : null}
            </div>
        </section>
    );
};

export default ContactUsArea;
