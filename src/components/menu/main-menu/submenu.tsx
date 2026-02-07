import Anchor from "@ui/anchor";
import { TSubMenu } from "@utils/types";
import clsx from "clsx";

type TProps = React.HTMLAttributes<HTMLElement> & {
    className?: string;
    menu: TSubMenu[];
};

const Submenu = ({ menu, className, onFocus, ...rest }: TProps) => {
    return (
        <ul
            className={clsx(
                "tw-pointer-events-none tw-visible tw-absolute tw-left-0 tw-top-full tw-z-20 tw-mt-5 tw-w-60 tw-border-b-4 tw-border-b-primary tw-bg-white tw-py-4 tw-opacity-0 tw-shadow-2md tw-shadow-black/5 tw-transition-all tw-duration-400",
                className
            )}
            {...rest}
        >
            {menu.map(({ id, label, path }) => (
                <li key={id} role="none" className="tw-relative">
                    <Anchor
                        path={path}
                        role="menuitem"
                        className="tw-flex tw-items-center tw-px-7.5 tw-py-2 tw-text-secondary"
                    >
                        {label}
                    </Anchor>
                </li>
            ))}
        </ul>
    );
};

export default Submenu;
