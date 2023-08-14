import Link from "next/link";

const PreworkButton = () => (
    <div className="tw-flex tw-justify-center tw-items-center">
        <Link href="https://github.com/Vets-Who-Code/Prework" passHref>
            <button
                type="button"
                className="tw-font-bold tw-justify-center tw-items-center tw-border tw-border-solid tw-rounded-md tw-transition-colors tw-min-w-max tw-bg-primary tw-border-primary tw-text-white hover:tw-bg-secondary hover:tw-border-secondary hover:tw-text-white tw-text-md tw-px-4 tw-py-1 tw-min-h-[48px] md:tw-min-h-[52px] md:tw-px-6 tw-flex tw-mt-7.5"
            >
                Go to Vets Who Code Prework
            </button>
        </Link>
    </div>
);

export default PreworkButton;
