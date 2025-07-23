import Link from "next/link";

type Program = {
    slug: string;
    title: string;
    description: string;
};

type Props = {
    program: Program;
};

const ProgramCard = ({ program }: Props) => {
    return (
        <div className="tw:bg-white tw:rounded-xl tw:shadow-sm tw:p-6 tw:border tw:border-gray-200 tw:hover:shadow-md tw:transition">
            <h2 className="tw:mb-2 tw:text-2xl tw:font-semibold">{program.title}</h2>
            <p className="tw:mb-4 tw:text-gray-700">{program.description}</p>
            <Link
                href={`/programs/${program.slug}`}
                className="tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-blue-400 tw:mt-auto tw:inline-block tw:font-medium tw:text-blue-700 tw:underline"
                aria-label={`Learn more about ${program.title}`}
            >
                Learn more
            </Link>
        </div>
    );
};

export default ProgramCard;
