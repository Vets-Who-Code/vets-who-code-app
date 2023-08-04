import clsx from "clsx";
import Anchor from "@ui/anchor";
import { TSubMenu } from "@utils/types";

type TProps = React.HTMLAttributes<HTMLElement> & {
    className?: string;
    menu: TSubMenu[];
};

const Submenu = ({ menu, className, onFocus, ...rest }: TProps) => {
    return (
        <ul
            className={clsx(
                "tw-absolute tw-z-20 tw-top-full tw-left-0 tw-w-60 tw-mt-5 tw-py-4 tw-transition-all tw-duration-400 tw-bg-white tw-border-b-4 tw-border-b-primary tw-shadow-2md tw-shadow-black/5 tw-visible tw-opacity-0 tw-pointer-events-none",
                className
            )}
            {...rest}
        >
            {menu.map(({ id, label, path }) => (
                <li key={id} role="none" className="tw-relative">
                    <Anchor
                        path={path}
                        role="menuitem"
                        className="tw-flex tw-items-center tw-text-secondary tw-px-7.5 tw-py-2"
                    >
                        {label}
                    </Anchor>
                </li>
            ))}
        </ul>
    );
};

export default Submenu;
