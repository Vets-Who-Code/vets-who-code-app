import { ReactNode } from "react";

type TProps = {
    children: ReactNode;
};

const FallbackLayout = ({ children }: TProps) => {
    return <div className="tw-relative">{children}</div>;
};

export default FallbackLayout;
