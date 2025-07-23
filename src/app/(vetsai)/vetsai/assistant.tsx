"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@assets/components/assistant-ui/thread";
import { AppSidebar } from "@assets/components/app-sidebar";
import { Session } from "next-auth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/assets/components/ui/sidebar";
import { Separator } from "@assets/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    // BreadcrumbLink,
    BreadcrumbList,
    // BreadcrumbPage,
    // BreadcrumbSeparator,
} from "@/assets/components/ui/breadcrumb";
import { PDFAttachmentAdapter } from "@/lib/ai/pdf-attachment-adapter";

interface AssistantProps {
    user: Session["user"];
}

export const Assistant = ({ user }: AssistantProps) => {
    const runtime = useChatRuntime({
        api: "/api/chat",
        adapters: {
            attachments: new PDFAttachmentAdapter(),
        },
    });

    return (
        <AssistantRuntimeProvider runtime={runtime}>
            <SidebarProvider>
                <AppSidebar user={user} />
                <SidebarInset>
                    <header className="bg-background sticky top-0 z-1 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    VetsAI
                                    {/* <BreadcrumbLink href="#">VetsAI</BreadcrumbLink> */}
                                </BreadcrumbItem>
                                {/* <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Starter Template</BreadcrumbPage>
                                </BreadcrumbItem> */}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <Thread />
                </SidebarInset>
            </SidebarProvider>
        </AssistantRuntimeProvider>
    );
};
