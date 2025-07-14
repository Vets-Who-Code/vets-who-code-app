"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/vetsai/assistant-ui/thread";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/vetsai/ui/sidebar";
import { Separator } from "@/components/vetsai/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/vetsai/ui/breadcrumb";
import { AppSidebar } from "@/components/vetsai/app-sidebar";

export const Assistant = () => {
    const runtime = useChatRuntime({
        api: "/api/chat",
    });

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Build Your Own ChatGPT UX
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Starter Template</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <Thread />
                </SidebarInset>
            </SidebarProvider>
        </AssistantRuntimeProvider>
    );
};
