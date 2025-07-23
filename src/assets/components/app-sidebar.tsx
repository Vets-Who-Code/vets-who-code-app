import * as React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "./ui/sidebar";
import { ThreadList } from "./assistant-ui/thread-list";

interface AppSidebarProps {
    user: Session["user"];
}

export const AppSidebar = ({
    user,
    ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="https://vetswhocode.io" target="_blank">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <img
                                        src="https://res.cloudinary.com/vetswhocode/image/upload/e_bgremoval/f_auto,q_auto/v1609084190/hashflag-white-vscode_n5k5db.jpg"
                                        alt="Vets Who Code Hashflag"
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">VetsAI</span>
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
                            <div className="flex">
                                {user.image && (
                                    <img
                                        src={user.image}
                                        alt={user.name || user.id}
                                        className="aspect-square h-[36px] rounded-lg object-contain"
                                    />
                                )}
                                {user.name || user.id}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
