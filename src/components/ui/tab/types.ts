export type TProps = {
    className?: string;
    children: React.ReactNode;
};

export type TChildProps = {
    [x: string]: unknown;
};

type TVariant = "underline";

export type ContainerProps = TProps & {
    variant?: TVariant;
    idPrefix?: string;
};

export type TabProps = TProps & {
    onClick?: () => void;
    isActive?: boolean;
    variant?: TVariant;
    id?: string;
};
export type ContentProps = TProps & {
    activeIdx?: number;
};

export type TabPaneProps = TProps & {
    id?: string;
};
