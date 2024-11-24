import { Children, isValidElement, cloneElement, ReactNode, ReactElement } from "react";
import clsx from "clsx";

interface IProps {
    children: ReactNode;
    striped?: boolean;
    bordered?: boolean;
    className?: string;
}

// Enhanced type for child props
interface TChildProps {
    className?: string;
    children?: ReactNode;
    [key: string]: unknown;
}

type TableSectionType = "thead" | "tbody" | "tfoot";

const BasicTable = ({ children, className, striped, bordered }: IProps) => {
    const baseTHClass = "tw-py-7.5 tw-px-7.5 tw-text-center";
    const baseTDClass = "tw-py-2.5 tw-px-5 tw-text-center";
    const borderedClass =
        bordered && "tw-border tw-border-black/[0.08] tw-border-l-0 first:tw-border-l";

    const iterateOverChildren = (reactChildren: ReactNode, parent: TableSectionType): ReactNode => {
        return Children.map(reactChildren, (child) => {
            if (!isValidElement(child)) return child;

            const childProps = child.props as TChildProps;
            const childType = child.type as keyof JSX.IntrinsicElements;

            const baseProps = {
                ...childProps,
            };

            if (parent === "thead") {
                return cloneElement(child as ReactElement<TChildProps>, {
                    ...baseProps,
                    className: clsx(
                        (childType === "th" || childType === "td") && [baseTHClass, borderedClass],
                        childProps.className
                    ),
                    children: iterateOverChildren(childProps.children, parent),
                });
            }

            if (parent === "tbody" || parent === "tfoot") {
                return cloneElement(child as ReactElement<TChildProps>, {
                    ...baseProps,
                    className: clsx(
                        (childType === "th" || childType === "td") && [baseTDClass, borderedClass],
                        childType === "th" && "!text-heading font-medium",
                        childType === "tr" && [striped && "even:tw-bg-black/[0.02]"],
                        childProps.className
                    ),
                    children: iterateOverChildren(childProps.children, parent),
                });
            }
            return null;
        });
    };

    const renderChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        const childProps = child.props as TChildProps;
        const childType = child.type as keyof JSX.IntrinsicElements;

        const baseProps = {
            ...childProps,
        };

        if (childType === "thead" || childType === "tbody" || childType === "tfoot") {
            return cloneElement(child as ReactElement<TChildProps>, {
                ...baseProps,
                children: iterateOverChildren(childProps.children, childType),
            });
        }

        return cloneElement(child as ReactElement<TChildProps>, {
            ...baseProps,
            children: childProps.children,
        });
    });

    return (
        <div className="table-responsive">
            <table className={clsx("table tw-w-full", className)}>{renderChildren}</table>
        </div>
    );
};

export default BasicTable;
