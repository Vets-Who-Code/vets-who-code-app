import type { JobCodeStory } from "@lib/blog";
import Link from "next/link";
import { SectionHeader } from "./section-helpers";

interface Props {
    code: string;
    stories: JobCodeStory[];
}

const AlumniStories = ({ code, stories }: Props) => {
    if (stories.length === 0) return null;

    return (
        <section
            id="sec-stories"
            className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24"
        >
            <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                <SectionHeader
                    number="/ 08"
                    eyebrow="Alumni Story"
                    title={`Hear it from a ${code} who made the jump.`}
                    lede="A veteran who did this job, in their own words: what carried over and what it took to become a software engineer."
                />

                <div className="tw-grid tw-grid-cols-1 tw-gap-0 tw-border-t tw-border-l tw-border-cream/10 md:tw-grid-cols-2">
                    {stories.map((story) => (
                        <article
                            key={story.slug}
                            className="tw-flex tw-flex-col tw-gap-5 tw-border-r tw-border-b tw-border-cream/10 tw-p-8"
                        >
                            {story.image?.src && (
                                <img
                                    src={story.image.src}
                                    alt={story.image.alt ?? story.title}
                                    loading="lazy"
                                    className="tw-aspect-[16/9] tw-w-full tw-object-cover"
                                />
                            )}
                            <h3 className="tw-font-heading tw-font-medium tw-text-[22px] tw-text-cream tw-uppercase tw-leading-[1.2] [letter-spacing:-0.01em]">
                                {story.title}
                            </h3>
                            {story.excerpt && (
                                <p className="tw-font-body tw-text-[#DEE2E6] tw-text-[14.5px] tw-leading-[1.6]">
                                    {story.excerpt}
                                </p>
                            )}
                            <Link
                                href={`/blogs/${story.slug}`}
                                className="tw-mt-auto tw-inline-flex tw-items-center tw-gap-2 tw-self-start tw-border tw-border-accent tw-px-4 tw-py-2 tw-font-bold tw-font-mono tw-text-[11px] tw-text-accent tw-uppercase tw-tracking-[0.1em] tw-transition-colors hover:tw-bg-accent hover:tw-text-secondary"
                            >
                                Read the story →
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AlumniStories;
