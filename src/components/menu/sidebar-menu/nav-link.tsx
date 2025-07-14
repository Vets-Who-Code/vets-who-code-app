import clsx from "clsx";
import { useRouter } from "next/router";
import Anchor from "@ui/anchor";

type TProps = {
    children: React.ReactNode;
    path: string;
};

const NavLink = ({ children, path }: TProps) => {
    const router = useRouter();
    return (
        <Anchor
            path={path}
            className={clsx(
                "tw:relative tw:block tw:border tw:px-10 tw:py-4 tw:hover:text-white",
                "tw:before:absolute tw:before:left-4 tw:before:top-1/2 tw:before:h-1.5 tw:before:w-1.5 tw:before:-translate-y-1/2 tw:before:rounded-full tw:before:border tw:before:content-['']",
                router.pathname !== path &&
                    "tw:border-gray-500 tw:before:border-gray-400 tw:hover:border-primary tw:hover:bg-primary tw:hover:before:border-white",
                router.pathname === path &&
                    "tw:border-primary tw:bg-primary tw:text-white tw:before:border-white"
            )}
        >
            {children}
        </Anchor>
    );
};

export default NavLink;
