import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/util";

const Breadcrumb = ({ ...props }: React.ComponentProps<"nav">) => {
    return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
};

const BreadcrumbList = ({ className, ...props }: React.ComponentProps<"ol">) => {
    return (
        <ol
            data-slot="breadcrumb-list"
            className={cn(
                "tw-text-muted-foreground tw-flex tw-flex-wrap tw-items-center tw-gap-1.5 tw-break-words tw-text-sm sm:tw-gap-2.5",
                className
            )}
            {...props}
        />
    );
};

const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<"li">) => {
    return (
        <li
            data-slot="breadcrumb-item"
            className={cn("tw-inline-flex tw-items-center tw-gap-1.5", className)}
            {...props}
        />
    );
};

const BreadcrumbLink = ({
    asChild,
    className,
    ...props
}: React.ComponentProps<"a"> & {
    asChild?: boolean;
}) => {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            data-slot="breadcrumb-link"
            className={cn("hover:tw-text-foreground tw-transition-colors", className)}
            {...props}
        />
    );
};

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<"span">) => {
    return (
        <span
            data-slot="breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn("tw-text-foreground tw-font-normal", className)}
            {...props}
        />
    );
};

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => {
    return (
        <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className={cn("[&>svg]:tw-size-3.5", className)}
            {...props}
        >
            {children ?? <ChevronRight />}
        </li>
    );
};

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => {
    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn("tw-flex tw-size-9 tw-items-center tw-justify-center", className)}
            {...props}
        >
            <MoreHorizontal className="size-4" />
            <span className="tw-sr-only">More</span>
        </span>
    );
};

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
