import * as React from "react";
import { Github, MessagesSquare } from "lucide-react";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/vetsai/ui/sidebar";
import { ThreadList } from "./assistant-ui/thread-list";

export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="https://assistant-ui.com" target="_blank">
                                <div className="tw-bg-sidebar-primary tw-text-sidebar-primary-foreground tw-flex tw-aspect-square tw-size-8 tw-items-center tw-justify-center tw-rounded-lg">
                                    <MessagesSquare className="size-4" />
                                </div>
                                <div className="tw-flex tw-flex-col tw-gap-0.5 tw-leading-none">
                                    <span className="tw-font-semibold">assistant-ui</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <ThreadList />
            </SidebarContent>

            <SidebarRail />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href="https://github.com/assistant-ui/assistant-ui"
                                target="_blank"
                            >
                                <div className="tw-bg-sidebar-primary text-sidebar-primary-foreground tw-flex tw-aspect-square tw-size-8 tw-items-center tw-justify-center tw-rounded-lg">
                                    <Github className="size-4" />
                                </div>
                                <div className="tw-flex tw-flex-col tw-gap-0.5 tw-leading-none">
                                    <span className="tw-font-semibold">GitHub</span>
                                    <span className="">View Source</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
