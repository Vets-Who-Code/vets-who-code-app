import clsx from "clsx";
import Anchor from "@ui/anchor";
import { TSubMenu } from "@utils/types";

type TProps = {
    className?: string;
    menu: TSubMenu[];
    isExpand: boolean;
};

const Submenu = ({ menu, isExpand, className }: TProps) => {
    return (
        <ul
            className={clsx(
                "tw-py-[14px] tw-border-t tw-border-t-white/[.15]",
                className
            )}
        >
            {menu.map(({ id, label, path }) => (
                <li key={id} className="tw-relative">
                    <Anchor
                        path={path}
                        className={clsx(
                            "tw-inline-block tw-text-base tw-font-medium tw-leading-normal tw-py-2.5 tw-text-white/[0.7] hover:tw-text-white",
                            className
                        )}
                        tabIndex={isExpand ? 0 : -1}
                    >
                        {label}
                    </Anchor>
                </li>
            ))}
        </ul>
    );
};

export default Submenu;
