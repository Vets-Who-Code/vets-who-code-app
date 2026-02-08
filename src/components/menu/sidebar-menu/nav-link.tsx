import Anchor from "@ui/anchor";
import clsx from "clsx";
import { useRouter } from "next/router";

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
                "tw-relative tw-block tw-border tw-px-10 tw-py-4 hover:tw-text-white",
                "before:tw-absolute before:tw-left-4 before:tw-top-1/2 before:tw-h-1.5 before:tw-w-1.5 before:-tw-translate-y-1/2 before:tw-rounded-full before:tw-border before:tw-content-['']",
                router.pathname !== path &&
                    "tw-border-gray-500 before:tw-border-gray-400 hover:tw-border-primary hover:tw-bg-primary hover:before:tw-border-white",
                router.pathname === path &&
                    "tw-border-primary tw-bg-primary tw-text-white before:tw-border-white"
            )}
        >
            {children}
        </Anchor>
    );
};

export default NavLink;
