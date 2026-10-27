import { SectionEyebrow, SharpHeadline } from "@components/ui/design-system";
import {
    CONDUCT_STANDARD,
    GROWTH_STAGES,
    MENTOR_STANDARDS,
    type MentorStandard,
} from "@data/mentor-standards";
import Button from "@ui/button";

const SECTION = "tw-py-20 md:tw-py-[112px]";
const MONO = "tw-font-mono tw-uppercase";
const BODY_DARK = "tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-[rgba(185,214,242,0.86)]";
const BODY_LIGHT = "tw-font-body tw-text-[17px] tw-leading-[1.7] tw-text-gray-300";

const PROCESS = [
    {
        heading: "Rate yourself first",
        body: "You place yourself on each standard at kickoff and again mid-accelerator.",
    },
    {
        heading: "Reviewed with you, not on you",
        body: "Staff walk through your self-assessment with you. As mentors reach Coaching Others, they take this on as peer leads.",
    },
    {
        heading: "Feedback comes to you",
        body: "What your troops say reaches you directly, as input for growth, not a verdict.",
    },
];

const StandardCard = ({ standard }: { standard: MentorStandard }) => (
    <article className="tw-border-t-2 tw-border-red tw-bg-white tw-px-6 tw-py-8 md:tw-px-9 md:tw-py-10">
        <h3 className="tw-m-0 tw-font-heading tw-text-[26px] tw-font-black tw-uppercase tw-leading-[1.05] tw-tracking-[-0.02em] tw-text-navy">
            {standard.criterion}
        </h3>
        {standard.note && (
            <p className="tw-m-0 tw-mt-3 tw-font-body tw-text-[15px] tw-leading-[1.7] tw-text-gray-300">
                {standard.note}
            </p>
        )}
        <dl className="tw-m-0 tw-mt-7 tw-grid tw-gap-px tw-bg-gray-100 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
            {GROWTH_STAGES.map((stage) => (
                <div key={stage} className="tw-bg-white tw-p-5">
                    <dt className={`tw-text-[10px] tw-tracking-[0.1em] tw-text-gray-300 ${MONO}`}>
                        {stage}
                    </dt>
                    <dd className="tw-m-0 tw-mt-2 tw-font-body tw-text-[15px] tw-leading-[1.6] tw-text-ink">
                        {standard.stages[stage]}
                    </dd>
                </div>
            ))}
        </dl>
        <div className="tw-mt-6 tw-border-l-2 tw-border-gold tw-pl-5">
            <p className={`tw-m-0 tw-text-[10px] tw-tracking-[0.1em] tw-text-gray-300 ${MONO}`}>
                If you&apos;re struggling, VWC provides
            </p>
            <p className="tw-m-0 tw-mt-2 tw-font-body tw-text-[16px] tw-font-semibold tw-leading-[1.6] tw-text-navy">
                {standard.support}
            </p>
        </div>
    </article>
);

const MentorStandardsArea = () => (
    <>
        {/* Hero */}
        <section className="tw-bg-navy tw-pb-[104px] tw-pt-[120px]">
            <div className="tw-container">
                <SectionEyebrow label="Mentor Corps" subLabel="Standards" tone="dark" />
                <h1 className="tw-mt-7 tw-font-heading tw-font-black tw-uppercase tw-leading-[0.94] tw-tracking-[-0.02em] tw-text-white [font-size:clamp(44px,7vw,96px)]">
                    Mentor to
                    <br />
                    <span className="tw-text-gold">standard.</span>
                </h1>
                <p className={`tw-mt-8 tw-max-w-[60ch] ${BODY_DARK}`}>
                    The published mentor standards and development guide. Five standards, four
                    growth stages: what good mentoring looks like, and what VWC provides when you
                    are struggling. One hard line stays: conduct. Everything else is coaching, not
                    grading.
                </p>
            </div>
        </section>

        {/* Growth stages */}
        <section className={`tw-bg-white ${SECTION}`}>
            <div className="tw-container">
                <SectionEyebrow label="01 / Growth Stages" />
                <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                    Grow through
                    <br />
                    four stages.
                </SharpHeadline>
                <ol className="tw-m-0 tw-mt-12 tw-grid tw-list-none tw-gap-6 tw-p-0 sm:tw-grid-cols-2 lg:tw-grid-cols-4">
                    {GROWTH_STAGES.map((stage, i) => (
                        <li
                            key={stage}
                            className={`tw-border tw-border-gray-100 tw-p-6 ${i === GROWTH_STAGES.length - 1 ? "tw-border-t-2 tw-border-t-red" : ""}`}
                        >
                            <span className="tw-font-heading tw-text-[22px] tw-font-black tw-uppercase tw-leading-[1.1] tw-text-navy">
                                {stage}
                            </span>
                        </li>
                    ))}
                </ol>
                <p className={`tw-mt-8 tw-max-w-[62ch] ${BODY_LIGHT}`}>
                    Mentors at{" "}
                    <strong className="tw-font-semibold tw-text-navy">Coaching Others</strong>{" "}
                    become peer leads for new mentors.
                </p>
            </div>
        </section>

        {/* Standards */}
        <section className={`tw-bg-cream ${SECTION}`}>
            <div className="tw-container">
                {/* Charcoal, not slate: slate on cream fails contrast. */}
                <SectionEyebrow label="02 / The Standards" className="[&_span]:tw-text-gray-300" />
                <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                    Know what good
                    <br />
                    looks like.
                </SharpHeadline>
                <div className="tw-mt-14 tw-flex tw-flex-col tw-gap-[30px]">
                    {MENTOR_STANDARDS.map((standard) => (
                        <StandardCard key={standard.criterion} standard={standard} />
                    ))}
                </div>
            </div>
        </section>

        {/* Conduct */}
        <section className={`tw-bg-navy ${SECTION}`}>
            <div className="tw-container tw-grid tw-grid-cols-[repeat(auto-fit,minmax(280px,1fr))] tw-items-start tw-gap-16">
                <div>
                    <SectionEyebrow label="03 / The One Hard Line" tone="dark" />
                    <h2 className="tw-m-0 tw-mt-4 tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-white [font-size:clamp(34px,4.4vw,60px)]">
                        {CONDUCT_STANDARD.criterion}
                        <br />
                        <span className="tw-text-gold">is pass or fail.</span>
                    </h2>
                    <p className={`tw-mt-6 tw-max-w-[46ch] ${BODY_DARK}`}>
                        Conduct protects veterans, so it can&apos;t be &ldquo;developing.&rdquo; A
                        mentor who breaches it rotates off, whatever their growth stage.
                    </p>
                </div>
                <div>
                    <ul className="tw-m-0 tw-list-none tw-p-0">
                        {CONDUCT_STANDARD.covers.map((item, i) => (
                            <li
                                key={item}
                                className={`tw-border-t tw-border-[rgba(185,214,242,0.12)] tw-py-5 tw-font-heading tw-text-[17px] tw-font-bold tw-uppercase tw-text-white ${i === CONDUCT_STANDARD.covers.length - 1 ? "tw-border-b" : ""}`}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="tw-mt-8 tw-border-l-2 tw-border-gold tw-pl-5">
                        <p
                            className={`tw-m-0 tw-text-[10px] tw-tracking-[0.1em] tw-text-[rgba(185,214,242,0.7)] ${MONO}`}
                        >
                            VWC provides
                        </p>
                        <p className="tw-m-0 tw-mt-2 tw-font-body tw-text-[16px] tw-font-semibold tw-leading-[1.6] tw-text-white">
                            {CONDUCT_STANDARD.support}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Process */}
        <section className={`tw-bg-white ${SECTION}`}>
            <div className="tw-container">
                <SectionEyebrow label="04 / How Growth Works" />
                <SharpHeadline as="h2" size="h2" className="tw-mt-4">
                    Coach, don&apos;t
                    <br />
                    score.
                </SharpHeadline>
                <div className="tw-mt-12 tw-grid tw-grid-cols-[repeat(auto-fit,minmax(240px,1fr))] tw-gap-6">
                    {PROCESS.map((step) => (
                        <article key={step.heading} className="tw-border tw-border-gray-100 tw-p-7">
                            <h3 className="tw-m-0 tw-font-heading tw-text-[20px] tw-font-bold tw-uppercase tw-leading-[1.2] tw-tracking-[-0.01em] tw-text-navy">
                                {step.heading}
                            </h3>
                            <p className="tw-m-0 tw-mt-3 tw-font-body tw-text-[15px] tw-leading-[1.7] tw-text-gray-300">
                                {step.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="tw-bg-navy tw-py-20 md:tw-py-[104px]">
            <div className="tw-container tw-grid tw-grid-cols-[repeat(auto-fit,minmax(280px,1fr))] tw-items-center tw-gap-12">
                <h2 className="tw-m-0 tw-font-heading tw-font-black tw-uppercase tw-leading-[1.02] tw-tracking-[-0.02em] tw-text-white [font-size:clamp(32px,4vw,52px)]">
                    Take one cohort.
                </h2>
                <div className="tw-flex tw-flex-wrap tw-gap-4 md:tw-justify-self-end">
                    <Button path="/mentor" color="primary" size="md">
                        Apply to mentor
                    </Button>
                    <Button path="/programs/mentorship" color="light" variant="outlined" size="md">
                        See the program
                    </Button>
                </div>
            </div>
        </section>
    </>
);

export default MentorStandardsArea;
