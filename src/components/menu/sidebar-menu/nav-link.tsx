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
                "tw-relative tw-block tw-py-4 tw-px-10 tw-border hover:tw-text-white ",
                "before:tw-absolute before:tw-content-[''] before:tw-left-4 before:tw-top-1/2 before:-tw-translate-y-1/2 before:tw-w-1.5 before:tw-h-1.5 before:tw-rounded-full before:tw-border",
                router.pathname !== path &&
                    "tw-border-gray-500 hover:tw-bg-primary hover:tw-border-primary before:tw-border-gray-400 hover:before:tw-border-white",
                router.pathname === path &&
                    "tw-bg-primary tw-border-primary tw-text-white before:tw-border-white"
            )}
        >
            {children}
        </Anchor>
    );
};

export default NavLink;
