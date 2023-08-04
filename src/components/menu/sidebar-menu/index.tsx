import clsx from "clsx";
import NavLink from "./nav-link";

type TProps = {
    menu: Array<{
        id: number;
        label: string;
        path: string;
    }>;
    className?: string;
};

const SidebarMenu = ({ menu, className }: TProps) => {
    return (
        <ul className={clsx("sidebar-widget-menu", className)}>
            {menu?.map(({ id, label, path }) => (
                <li key={id} className="-tw-mt-px first:tw-mt-0">
                    <NavLink path={path}>{label}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default SidebarMenu;
