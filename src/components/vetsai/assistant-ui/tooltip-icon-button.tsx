"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "@/components/vetsai/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/vetsai/ui/tooltip";
import { cn } from "@/lib/util";

export type TooltipIconButtonProps = ComponentPropsWithoutRef<typeof Button> & {
    tooltip: string;
    side?: "top" | "bottom" | "left" | "right";
};

export const TooltipIconButton = forwardRef<HTMLButtonElement, TooltipIconButtonProps>(
    ({ children, tooltip, side = "bottom", className, ...rest }, ref) => {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            {...rest}
                            className={cn("tw-size-6 tw-p-1", className)}
                            ref={ref}
                        >
                            {children}
                            <span className="tw-sr-only">{tooltip}</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>{tooltip}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }
);

TooltipIconButton.displayName = "TooltipIconButton";
