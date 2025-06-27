"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/util";

const Sheet = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) => {
    return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

const SheetTrigger = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) => {
    return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

const SheetClose = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) => {
    return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
};

const SheetPortal = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) => {
    return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

const SheetOverlay = ({
    className,
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) => {
    return (
        <SheetPrimitive.Overlay
            data-slot="sheet-overlay"
            className={cn(
                "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/50 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
                className
            )}
            {...props}
        />
    );
};

const SheetContent = ({
    className,
    children,
    side = "right",
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
}) => {
    return (
        <SheetPortal>
            <SheetOverlay />
            <SheetPrimitive.Content
                data-slot="sheet-content"
                className={cn(
                    "tw-bg-background tw-fixed tw-z-50 tw-flex tw-flex-col tw-gap-4 tw-shadow-lg tw-transition tw-ease-in-out data-[state=closed]:tw-duration-300 data-[state=open]:tw-duration-500 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out",
                    side === "right" &&
                        "tw-inset-y-0 tw-right-0 tw-h-full tw-w-3/4 tw-border-l data-[state=closed]:tw-slide-out-to-right data-[state=open]:tw-slide-in-from-right sm:tw-max-w-sm",
                    side === "left" &&
                        "tw-inset-y-0 tw-left-0 tw-h-full tw-w-3/4 tw-border-r data-[state=closed]:tw-slide-out-to-left data-[state=open]:tw-slide-in-from-left sm:tw-max-w-sm",
                    side === "top" &&
                        "tw-inset-x-0 tw-top-0 tw-h-auto tw-border-b data-[state=closed]:tw-slide-out-to-top data-[state=open]:tw-slide-in-from-top",
                    side === "bottom" &&
                        "tw-inset-x-0 tw-bottom-0 tw-h-auto tw-border-t data-[state=closed]:tw-slide-out-to-bottom data-[state=open]:tw-slide-in-from-bottom",
                    className
                )}
                {...props}
            >
                {children}
                <SheetPrimitive.Close className="tw-ring-offset-background focus:tw-ring-ring tw-rounded-xs focus:tw-outline-hidden tw-absolute tw-right-4 tw-top-4 tw-opacity-70 tw-transition-opacity hover:tw-opacity-100 focus:tw-ring-2 focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-secondary">
                    <XIcon className="tw-size-4" />
                    <span className="tw-sr-only">Close</span>
                </SheetPrimitive.Close>
            </SheetPrimitive.Content>
        </SheetPortal>
    );
};

const SheetHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sheet-header"
            className={cn("tw-flex tw-flex-col tw-gap-1.5 tw-p-4", className)}
            {...props}
        />
    );
};

const SheetFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sheet-footer"
            className={cn("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", className)}
            {...props}
        />
    );
};

const SheetTitle = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) => {
    return (
        <SheetPrimitive.Title
            data-slot="sheet-title"
            className={cn("tw-text-foreground tw-font-semibold", className)}
            {...props}
        />
    );
};

const SheetDescription = ({
    className,
    ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) => {
    return (
        <SheetPrimitive.Description
            data-slot="sheet-description"
            className={cn("tw-text-muted-foreground tw-text-sm", className)}
            {...props}
        />
    );
};

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
};
