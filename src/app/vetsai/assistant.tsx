"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/vetsai/assistant-ui/thread";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/vetsai/ui/sidebar";
import { AppSidebar } from "@/components/vetsai/app-sidebar";
import { Separator } from "@/components/vetsai/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/vetsai/ui/breadcrumb";
import "@assets/css/vetsai.css";

const Assistant = () => {
    const runtime = useChatRuntime({
        api: "/api/chat",
    });

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="tw-flex tw-h-16 tw-shrink-0 tw-items-center tw-gap-2 tw-border-b tw-px-4">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="tw-mr-2 tw-h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="tw-hidden md:tw-block">
                                    <BreadcrumbLink href="#">
                                        Build Your Own ChatGPT UX
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="tw-hidden md:tw-block" />
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

export default Assistant;
