import Anchor from "@ui/anchor";

type TProps = {
    children: React.ReactNode;
    path: string;
};

const NavLink = ({ children, path }: TProps) => {
    return (
        <Anchor
            path={path}
            className="tw-text-[16px] tw-font-medium tw-leading-normal tw-block tw-py-[19px] tw-text-white hover:tw-text-white"
        >
            {children}
        </Anchor>
    );
};
export default NavLink;
