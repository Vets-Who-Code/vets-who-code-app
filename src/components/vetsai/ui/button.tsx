import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/util";

const buttonVariants = cva(
    "tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-transition-all disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg:not([class*='size-'])]:tw-size-4 tw-shrink-0 [&_svg]:tw-shrink-0 tw-outline-none focus-visible:tw-border-ring focus-visible:tw-ring-ring/50 focus-visible:tw-ring-[3px] aria-invalid:tw-ring-destructive/20 dark:aria-invalid:tw-ring-destructive/40 aria-invalid:tw-border-destructive",
    {
        variants: {
            variant: {
                default:
                    "tw-bg-primary tw-text-primary-foreground tw-shadow-xs hover:tw-bg-primary/90",
                destructive:
                    "tw-bg-destructive tw-text-white tw-shadow-xs hover:tw-bg-destructive/90 focus-visible:tw-ring-destructive/20 dark:focus-visible:tw-ring-destructive/40 dark:tw-bg-destructive/60",
                outline:
                    "tw-border bg-background tw-shadow-xs hover:tw-bg-accent hover:tw-text-accent-foreground dark:tw-bg-input/30 dark:tw-border-input dark:hover:tw-bg-input/50",
                secondary:
                    "tw-bg-secondary tw-text-secondary-foreground tw-shadow-xs hover:tw-bg-secondary/80",
                ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground dark:hover:tw-bg-accent/50",
                link: "tw-text-primary tw-underline-offset-4 hover:tw-underline",
            },
            size: {
                default: "tw-h-9 tw-px-4 tw-py-2 has-[>svg]:tw-px-3",
                sm: "tw-h-8 tw-rounded-md tw-gap-1.5 tw-px-3 has-[>svg]:tw-px-2.5",
                lg: "tw-h-10 tw-rounded-md tw-px-6 has-[>svg]:tw-px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = ({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
};

export { Button, buttonVariants };
