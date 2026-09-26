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
                // Visibility, margin, opacity and pointer-events come from the caller's
                // className so the open and closed token sets never coexist. Visibility is not
                // transitioned: Firefox renders a reversed visibility transition as hidden for a
                // frame and drops focus from the submenu link, and a closed submenu should leave
                // the tab order at once anyway.
                "tw-absolute tw-left-0 tw-top-full tw-z-20 tw-w-60 tw-border-b-4 tw-border-b-primary tw-bg-white tw-py-4 tw-shadow-2md tw-shadow-black/5 tw-transition-[opacity,margin-top] tw-duration-400",
                className
            )}
            {...rest}
        >
            {menu.map(({ id, label, path }) => (
                <li key={id} className="tw-relative">
                    <Anchor
                        path={path}
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
