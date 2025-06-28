"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/vetsai/ui/button";
import { cn } from "@/lib/util";
import { Input } from "@/components/vetsai/ui/input";
import { Separator } from "@/components/vetsai/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/vetsai/ui/sheet";
import { Skeleton } from "@/components/vetsai/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/vetsai/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }

    return context;
}

const SidebarProvider = ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === "function" ? value(open) : value;
            if (setOpenProp) {
                setOpenProp(openState);
            } else {
                _setOpen(openState);
            }

            // This sets the cookie to keep the sidebar state.
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
        },
        [setOpenProp, open]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
        return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggleSidebar();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextProps>(
        () => ({
            state,
            open,
            setOpen,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
        }),
        [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <TooltipProvider delayDuration={0}>
                <div
                    data-slot="sidebar-wrapper"
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH,
                            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                            ...style,
                        } as React.CSSProperties
                    }
                    className={cn(
                        "tw-group/sidebar-wrapper has-data-[variant=inset]:tw-bg-sidebar tw-flex tw-min-h-svh tw-w-full",
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </TooltipProvider>
        </SidebarContext.Provider>
    );
};

const Sidebar = ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
}: React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
        return (
            <div
                data-slot="sidebar"
                className={cn(
                    "tw-bg-sidebar tw-text-sidebar-foreground w-(--sidebar-width) tw-flex tw-h-full tw-flex-col",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }

    if (isMobile) {
        return (
            <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
                <SheetContent
                    data-sidebar="sidebar"
                    data-slot="sidebar"
                    data-mobile="true"
                    className="tw-bg-sidebar tw-text-sidebar-foreground w-(--sidebar-width) tw-p-0 [&>button]:tw-hidden"
                    style={
                        {
                            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                        } as React.CSSProperties
                    }
                    side={side}
                >
                    <SheetHeader className="tw-sr-only">
                        <SheetTitle>Sidebar</SheetTitle>
                        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
                    </SheetHeader>
                    <div className="tw-flex tw-h-full tw-w-full tw-flex-col">{children}</div>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <div
            className="tw-text-sidebar-foreground tw-group tw-peer tw-hidden md:tw-block"
            data-state={state}
            data-collapsible={state === "collapsed" ? collapsible : ""}
            data-variant={variant}
            data-side={side}
            data-slot="sidebar"
        >
            {/* This is what handles the sidebar gap on desktop */}
            <div
                data-slot="sidebar-gap"
                className={cn(
                    "tw-w-(--sidebar-width) tw-relative tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
                    "tw-group-data-[collapsible=offcanvas]:tw-w-0",
                    "tw-group-data-[side=right]:tw-rotate-180",
                    variant === "floating" || variant === "inset"
                        ? "tw-group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                        : "tw-group-data-[collapsible=icon]:tw-w-(--sidebar-width-icon)"
                )}
            />
            <div
                data-slot="sidebar-container"
                className={cn(
                    "tw-w-(--sidebar-width) tw-fixed tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
                    side === "left"
                        ? "tw-group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)] tw-left-0"
                        : "tw-group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)] tw-right-0",
                    // Adjust the padding for floating and inset variants.
                    variant === "floating" || variant === "inset"
                        ? "tw-group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)] tw-p-2"
                        : "tw-group-data-[collapsible=icon]:tw-w-(--sidebar-width-icon) tw-group-data-[side=left]:tw-border-r tw-group-data-[side=right]:tw-border-l",
                    className
                )}
                {...props}
            >
                <div
                    data-sidebar="sidebar"
                    data-slot="sidebar-inner"
                    className="tw-bg-sidebar tw-group-data-[variant=floating]:tw-border-sidebar-border tw-group-data-[variant=floating]:tw-rounded-lg tw-group-data-[variant=floating]:tw-border tw-group-data-[variant=floating]:tw-shadow-sm tw-flex tw-h-full tw-w-full tw-flex-col"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

const SidebarTrigger = ({ className, onClick, ...props }: React.ComponentProps<typeof Button>) => {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon"
            className={cn("tw-size-7", className)}
            onClick={(event) => {
                onClick?.(event);
                toggleSidebar();
            }}
            {...props}
        >
            <PanelLeftIcon />
            <span className="tw-sr-only">Toggle Sidebar</span>
        </Button>
    );
};

const SidebarRail = ({ className, ...props }: React.ComponentProps<"button">) => {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            data-sidebar="rail"
            data-slot="sidebar-rail"
            aria-label="Toggle Sidebar"
            tabIndex={-1}
            onClick={toggleSidebar}
            title="Toggle Sidebar"
            className={cn(
                "hover:after:tw-bg-sidebar-border tw-group-data-[side=left]:tw--right-4 tw-group-data-[side=right]:tw-left-0 tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] sm:tw-flex",
                "tw-in-data-[side=left]:tw-cursor-w-resize tw-in-data-[side=right]:tw-cursor-e-resize",
                "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
                "hover:group-data-[collapsible=offcanvas]:tw-bg-sidebar tw-group-data-[collapsible=offcanvas]:tw-translate-x-0 tw-group-data-[collapsible=offcanvas]:after:tw-left-full",
                "[[data-side=left][data-collapsible=offcanvas]_&]:tw--right-2",
                "[[data-side=right][data-collapsible=offcanvas]_&]:tw--left-2",
                className
            )}
            {...props}
        />
    );
};

const SidebarInset = ({ className, ...props }: React.ComponentProps<"main">) => {
    return (
        <main
            data-slot="sidebar-inset"
            className={cn(
                "tw-bg-background tw-relative tw-flex tw-w-full tw-flex-1 tw-flex-col",
                "md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow-sm",
                className
            )}
            {...props}
        />
    );
};

const SidebarInput = ({ className, ...props }: React.ComponentProps<typeof Input>) => {
    return (
        <Input
            data-slot="sidebar-input"
            data-sidebar="input"
            className={cn("tw-bg-background tw-h-8 tw-w-full tw-shadow-none", className)}
            {...props}
        />
    );
};

const SidebarHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sidebar-header"
            data-sidebar="header"
            className={cn("tw-flex tw-flex-col tw-gap-2 tw-p-2", className)}
            {...props}
        />
    );
};

const SidebarFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sidebar-footer"
            data-sidebar="footer"
            className={cn("tw-flex tw-flex-col tw-gap-2 tw-p-2", className)}
            {...props}
        />
    );
};

const SidebarSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => {
    return (
        <Separator
            data-slot="sidebar-separator"
            data-sidebar="separator"
            className={cn("tw-bg-sidebar-border tw-mx-2 tw-w-auto", className)}
            {...props}
        />
    );
};

const SidebarContent = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sidebar-content"
            data-sidebar="content"
            className={cn(
                "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
                className
            )}
            {...props}
        />
    );
};

const SidebarGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sidebar-group"
            data-sidebar="group"
            className={cn("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", className)}
            {...props}
        />
    );
};

const SidebarGroupLabel = ({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            data-slot="sidebar-group-label"
            data-sidebar="group-label"
            className={cn(
                "tw-text-sidebar-foreground/70 tw-ring-sidebar-ring tw-outline-hidden tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-transition-[margin,opacity] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
                "tw-group-data-[collapsible=icon]:tw-opacity-0 tw-group-data-[collapsible=icon]:tw--mt-8",
                className
            )}
            {...props}
        />
    );
};

const SidebarGroupAction = ({
    className,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="sidebar-group-action"
            data-sidebar="group-action"
            className={cn(
                "tw-text-sidebar-foreground tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground tw-outline-hidden tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-transition-transform focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
                // Increases the hit area of the button on mobile.
                "after:tw-absolute after:tw--inset-2 md:after:tw-hidden",
                "tw-group-data-[collapsible=icon]:tw-hidden",
                className
            )}
            {...props}
        />
    );
};

const SidebarGroupContent = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sidebar-group-content"
            data-sidebar="group-content"
            className={cn("tw-w-full tw-text-sm", className)}
            {...props}
        />
    );
};

const SidebarMenu = ({ className, ...props }: React.ComponentProps<"ul">) => {
    return (
        <ul
            data-slot="sidebar-menu"
            data-sidebar="menu"
            className={cn("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", className)}
            {...props}
        />
    );
};

const SidebarMenuItem = ({ className, ...props }: React.ComponentProps<"li">) => {
    return (
        <li
            data-slot="sidebar-menu-item"
            data-sidebar="menu-item"
            className={cn("tw-group/menu-item tw-relative", className)}
            {...props}
        />
    );
};

const sidebarMenuButtonVariants = cva(
    "tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-hidden tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-data-[sidebar=menu-action]/menu-item:tw-pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground tw-group-data-[collapsible=icon]:tw-size-8! group-data-[collapsible=icon]:tw-p-2! [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
    {
        variants: {
            variant: {
                default: "hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",
                outline:
                    "tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
            },
            size: {
                default: "tw-h-8 tw-text-sm",
                sm: "tw-h-7 tw-text-xs",
                lg: "tw-h-12 tw-text-sm tw-group-data-[collapsible=icon]:tw-p-0!",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const SidebarMenuButton = ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
        <Comp
            data-slot="sidebar-menu-button"
            data-sidebar="menu-button"
            data-size={size}
            data-active={isActive}
            className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
            {...props}
        />
    );

    if (!tooltip) {
        return button;
    }

    if (typeof tooltip === "string") {
        tooltip = {
            children: tooltip,
        };
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent
                side="right"
                align="center"
                tw-hidden={state !== "collapsed" || isMobile}
                {...tooltip}
            />
        </Tooltip>
    );
};

const SidebarMenuAction = ({
    className,
    asChild = false,
    showOnHover = false,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
}) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="sidebar-menu-action"
            data-sidebar="menu-action"
            className={cn(
                "tw-text-sidebar-foreground tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground peer-hover/menu-button:tw-text-sidebar-accent-foreground tw-outline-hidden tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-transition-transform focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
                // Increases the hit area of the button on mobile.
                "after:tw-absolute after:tw--inset-2 md:after:tw-hidden",
                "peer-data-[size=sm]/menu-button:tw-top-1",
                "peer-data-[size=default]/menu-button:tw-top-1.5",
                "peer-data-[size=lg]/menu-button:tw-top-2.5",
                "group-data-[collapsible=icon]:tw-hidden",
                showOnHover &&
                    "peer-data-[active=true]/menu-button:tw-text-sidebar-accent-foreground group-focus-within/menu-item:tw-opacity-100 group-hover/menu-item:tw-opacity-100 data-[state=open]:tw-opacity-100 md:tw-opacity-0",
                className
            )}
            {...props}
        />
    );
};

const SidebarMenuBadge = ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
        <div
            data-slot="sidebar-menu-badge"
            data-sidebar="menu-badge"
            className={cn(
                "tw-text-sidebar-foreground tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums",
                "peer-hover/menu-button:tw-text-sidebar-accent-foreground peer-data-[active=true]/menu-button:tw-text-sidebar-accent-foreground",
                "peer-data-[size=sm]/menu-button:tw-top-1",
                "peer-data-[size=default]/menu-button:tw-top-1.5",
                "peer-data-[size=lg]/menu-button:tw-top-2.5",
                "group-data-[collapsible=icon]:tw-hidden",
                className
            )}
            {...props}
        />
    );
};

const SidebarMenuSkeleton = ({
    className,
    showIcon = false,
    ...props
}: React.ComponentProps<"div"> & {
    showIcon?: boolean;
}) => {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);

    return (
        <div
            data-slot="sidebar-menu-skeleton"
            data-sidebar="menu-skeleton"
            className={cn(
                "tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2",
                className
            )}
            {...props}
        >
            {showIcon && (
                <Skeleton className="tw-size-4 tw-rounded-md" data-sidebar="menu-skeleton-icon" />
            )}
            <Skeleton
                className="tw-max-w-(--skeleton-width) tw-h-4 tw-flex-1"
                data-sidebar="menu-skeleton-text"
                style={
                    {
                        "--skeleton-width": width,
                    } as React.CSSProperties
                }
            />
        </div>
    );
};

const SidebarMenuSub = ({ className, ...props }: React.ComponentProps<"ul">) => {
    return (
        <ul
            data-slot="sidebar-menu-sub"
            data-sidebar="menu-sub"
            className={cn(
                "tw-border-sidebar-border tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-px-2.5 tw-py-0.5",
                "group-data-[collapsible=icon]:tw-hidden",
                className
            )}
            {...props}
        />
    );
};

const SidebarMenuSubItem = ({ className, ...props }: React.ComponentProps<"li">) => {
    return (
        <li
            data-slot="sidebar-menu-sub-item"
            data-sidebar="menu-sub-item"
            className={cn("group/menu-sub-item tw-relative", className)}
            {...props}
        />
    );
};

const SidebarMenuSubButton = ({
    asChild = false,
    size = "md",
    isActive = false,
    className,
    ...props
}: React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}) => {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            data-slot="sidebar-menu-sub-button"
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                "tw-text-sidebar-foreground tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground [&>svg]:tw-text-sidebar-accent-foreground outline-hidden tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 focus-visible:tw-ring-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
                "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
                size === "sm" && "tw-text-xs",
                size === "md" && "tw-text-sm",
                "group-data-[collapsible=icon]:tw-hidden",
                className
            )}
            {...props}
        />
    );
};

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
};
