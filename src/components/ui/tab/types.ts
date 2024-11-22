import type { ReactNode } from "react";

export type TVariant = "underline";

export type TProps = {
    className?: string;
    children?: ReactNode;
};

export type TChildProps = {
    [key: string]: unknown;
    variant?: TVariant;
    originalType?: React.FunctionComponent;
    children?: ReactNode;
    className?: string;
};

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
