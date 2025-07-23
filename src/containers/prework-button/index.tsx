import Link from "next/link";

const PreworkButton = () => (
    <div className="tw:flex tw:items-center tw:justify-center">
        <Link href="https://github.com/Vets-Who-Code/Prework" passHref>
            <button
                type="button"
                className="tw:mt-7.5 tw:flex tw:min-h-[48px] tw:min-w-max tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-solid tw:border-primary tw:bg-primary tw:px-4 tw:py-1 tw:text-md tw:font-bold tw:text-white tw:transition-colors tw:hover:border-secondary tw:hover:bg-secondary tw:hover:text-white tw:md:min-h-[52px] tw:md:px-6"
            >
                Go to Vets Who Code Prework
            </button>
        </Link>
    </div>
);

export default PreworkButton;
