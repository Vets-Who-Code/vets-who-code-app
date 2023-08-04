import { ReactNode, useState } from "react";
import clsx from "clsx";
import { CurriculumProvider } from "@contexts/curriculum-context";
import { ICurriculum } from "@utils/types";
import Sidebar from "../sidebar";
import Header from "../headers/header-04";

type TProps = {
    children: ReactNode;
    course: {
        title: string;
        path: string;
        slug: string;
    };
    curriculum: ICurriculum[];
};

const Layout = ({ children, course, curriculum }: TProps) => {
    const [open, setOpen] = useState(true);

    return (
        <CurriculumProvider curriculum={curriculum}>
            <Header
                className={clsx(
                    open ? "tw-left-0 lg:tw-left-[340px]" : "tw-left-0"
                )}
                course={course}
            />
            <Sidebar open={open} courseSlug={course.slug} />
            <button
                onClick={() => setOpen((prev) => !prev)}
                type="button"
                aria-label="Toggle sidebar"
                className={clsx(
                    "tw-absolute tw-top-14 tw-z-30 tw-ml-0.5 tw-w-12 tw-h-12 tw-bg-white tw-rounded-r tw-text-primary tw-shadow-2sm tw-shadow-black/[0.08] tw-transition-all tw-duration-300 hover:tw-bg-primary hover:tw-text-white",
                    open
                        ? "tw-left-0 md:tw-left-[340px]"
                        : "tw-left-[340px] md:tw-left-0"
                )}
            >
                <i className="fa fa-exchange" />
            </button>
            <main
                className={clsx(
                    "tw-mt-24 md:tw-mt-15 tw-overflow-y-scroll tw-max-h-screen tw-transition-all tw-duration-300",
                    open ? "lg:tw-ml-[340px]" : "lg:tw-ml-0"
                )}
            >
                {children}
            </main>
        </CurriculumProvider>
    );
};

export default Layout;
