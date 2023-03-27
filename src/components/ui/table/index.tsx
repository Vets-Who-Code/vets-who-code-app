import { Children, isValidElement, cloneElement, ReactNode } from "react";
import clsx from "clsx";

interface IProps {
    children: ReactNode;
    striped?: boolean;
    bordered?: boolean;
    className?: string;
}

type TChildProps = {
    [x: string]: unknown;
};

const BasicTable = ({ children, className, striped, bordered }: IProps) => {
    const baseTHClass = "tw-py-7.5 tw-px-7.5 tw-text-center";
    const baseTDClass = "tw-py-2.5 tw-px-5 tw-text-center";
    const borderedClass =
        bordered &&
        "tw-border tw-border-black/[0.08] tw-border-l-0 first:tw-border-l";

    const iterateOverChildren = (
        reactChildren: ReactNode,
        parent: "thead" | "tbody" | "tfoot"
    ): ReactNode => {
        return Children.map(reactChildren, (child) => {
            if (!isValidElement(child)) return child;
            const childProps: TChildProps = child.props as TChildProps;

            const props = {
                ...childProps,
            };

            const childType = child.type;

            if (parent === "thead") {
                return cloneElement(child, {
                    ...props,
                    className: clsx(
                        (childType === "th" || childType === "td") && [
                            baseTHClass,
                            borderedClass,
                        ],
                        childProps.className as string
                    ),
                    children: iterateOverChildren(
                        childProps.children as ReactNode,
                        parent
                    ),
                });
            }
            if (parent === "tbody" || parent === "tfoot") {
                return cloneElement(child, {
                    ...props,
                    className: clsx(
                        (childType === "th" || childType === "td") && [
                            baseTDClass,
                            borderedClass,
                        ],
                        childType === "th" && "!text-heading font-medium",
                        childType === "tr" && [
                            striped && "even:tw-bg-black/[0.02]",
                        ],
                        childProps.className as string
                    ),
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
        const childProps: TChildProps = child.props as TChildProps;
        const props = {
            ...childProps,
        };

        const childType = child.type;

        if (
            childType === "thead" ||
            childType === "tbody" ||
            childType === "tfoot"
        ) {
            return cloneElement(child, {
                ...props,
                children: iterateOverChildren(
                    childProps.children as ReactNode,
                    childType
                ),
            });
        }
        return cloneElement(child, {
            ...props,
            children: childProps.children as ReactNode,
        });
    });

    return (
        <div className="table-responsive">
            <table className={clsx("table tw-w-full", className)}>
                {renderChildren}
            </table>
        </div>
    );
};

export default BasicTable;
