import {
    useState,
    FunctionComponent,
    Children,
    isValidElement,
    cloneElement,
    ReactNode,
    ReactElement,
} from "react";
import clsx from "clsx";
import { TChildProps, ContainerProps } from "./types";
import TabList from "./tab-list";
import TabNav from "./tab-nav";
import TabContent from "./tab-content";
import TabPane from "./tab-pane";

const TabContainer = ({
    className,
    children,
    variant,
    idPrefix = "tab",
}: ContainerProps) => {
    const [value, setValue] = useState(0);

    const handleClick = (idx: number) => {
        setValue(idx);
    };

    const iterateOverChildren = (
        reactChildren: ReactNode,
        parent: "TabList" | "TabContent"
    ): ReactNode => {
        return Children.map(reactChildren, (child, idx) => {
            if (!isValidElement(child)) return child;
            const childProps = child.props as TChildProps;

            if (parent === "TabList") {
                return cloneElement(child as ReactElement, {
                    ...childProps,
                    onClick: () => handleClick(idx),
                    isActive: idx === value,
                    variant,
                    id: `${idPrefix}-${idx}`,
                    children: iterateOverChildren(
                        childProps.children as ReactNode,
                        parent
                    ),
                });
            }
            if (parent === "TabContent") {
                return cloneElement(child as ReactElement, {
                    ...childProps,
                    id: `${idPrefix}-${idx}`,
                    children: iterateOverChildren(
                        childProps.children as ReactNode,
                        parent
                    ),
                });
            }

            return null;
        });
    };

    const renderChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const childProps = child.props as TChildProps;

        const childType =
            (childProps.originalType as FunctionComponent) ||
            (child.type as FunctionComponent);
        const name = childType.displayName || childType.name;

        if (name === "TabList") {
            return cloneElement(child as ReactElement, {
                ...childProps,
                variant,
                children: iterateOverChildren(
                    childProps.children as ReactNode,
                    name
                ),
            });
        }
        if (name === "TabContent") {
            return cloneElement(child as ReactElement, {
                ...childProps,
                activeIdx: value,
                children: iterateOverChildren(
                    childProps.children as ReactNode,
                    name
                ),
            });
        }
        return cloneElement(child as ReactElement, {
            ...childProps,
            children: childProps.children,
        });
    });

    return <div className={clsx("tab", className)}>{renderChildren}</div>;
};

export { TabContainer, TabList, TabNav, TabContent, TabPane };
export type {
    TProps,
    TChildProps,
    TVariant,
    ContainerProps,
    TabProps,
    ContentProps,
    TabPaneProps,
} from "./types";

export default TabContainer;
