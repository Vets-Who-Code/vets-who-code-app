"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/util";

const TooltipProvider = ({
    delayDuration = 0,
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) => {
    return (
        <TooltipPrimitive.Provider
            data-slot="tooltip-provider"
            delayDuration={delayDuration}
            {...props}
        />
    );
};

const Tooltip = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) => {
    return (
        <TooltipProvider>
            <TooltipPrimitive.Root data-slot="tooltip" {...props} />
        </TooltipProvider>
    );
};

const TooltipTrigger = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => {
    return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
};

const TooltipContent = ({
    className,
    sideOffset = 0,
    children,
    ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                data-slot="tooltip-content"
                sideOffset={sideOffset}
                className={cn(
                    "tw-text-primary-foreground tw-origin-(--radix-tooltip-content-transform-origin) tw-z-50 tw-w-fit tw-text-balance tw-rounded-md tw-bg-primary tw-px-3 tw-py-1.5 tw-text-xs tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
                    className
                )}
                {...props}
            >
                {children}
                <TooltipPrimitive.Arrow className="tw-z-50 tw-size-2.5 tw-translate-y-[calc(-50%_-_2px)] tw-rotate-45 tw-rounded-[2px] tw-bg-primary tw-fill-primary" />
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
