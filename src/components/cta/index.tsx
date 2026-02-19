import Link from "next/link";

const CTA = () => {
    return (
        <div className="tw-bg-secondary tw-text-white tw-p-12 tw-rounded-2xl tw-shadow-lg tw-text-center">
            <h2 className="tw-text-3xl tw-font-bold">Ready to Start Your Mission?</h2>
            <p className="tw-mt-2 tw-text-lg">
                Apply to our program and join the ranks of veterans who have successfully
                transitioned into the tech industry.
            </p>
            <Link
                href="/apply"
                className="tw-mt-6 tw-bg-accent tw-text-secondary tw-font-bold tw-rounded-lg tw-px-6 tw-py-3 tw-inline-block hover:tw-bg-accent-dark"
            >
                Apply Now
            </Link>
        </div>
    );
};

export default CTA;
