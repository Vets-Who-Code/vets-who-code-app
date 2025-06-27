import type { FC } from "react";
import { ThreadListItemPrimitive, ThreadListPrimitive } from "@assistant-ui/react";
import { ArchiveIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/vetsai/ui/button";
import { TooltipIconButton } from "@/components/vetsai/assistant-ui/tooltip-icon-button";

const ThreadListNew: FC = () => {
    return (
        <ThreadListPrimitive.New asChild>
            <Button
                className="data-[active]:tw-bg-muted hover:tw-bg-muted text-start tw-flex tw-items-center tw-justify-start tw-gap-1 tw-rounded-lg tw-px-2.5 tw-py-2"
                variant="ghost"
            >
                <PlusIcon />
                New Thread
            </Button>
        </ThreadListPrimitive.New>
    );
};

const ThreadListItemTitle: FC = () => {
    return (
        <p className="tw-text-sm">
            <ThreadListItemPrimitive.Title fallback="New Chat" />
        </p>
    );
};

const ThreadListItemArchive: FC = () => {
    return (
        <ThreadListItemPrimitive.Archive asChild>
            <TooltipIconButton
                className="tw-text-foreground tw-ml-auto tw-mr-3 tw-size-4 tw-p-0 hover:tw-text-primary"
                variant="ghost"
                tooltip="Archive thread"
            >
                <ArchiveIcon />
            </TooltipIconButton>
        </ThreadListItemPrimitive.Archive>
    );
};

const ThreadListItem: FC = () => {
    return (
        <ThreadListItemPrimitive.Root className="data-[active]:tw-bg-muted hover:tw-bg-muted focus-visible:tw-bg-muted focus-visible:tw-ring-ring tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-transition-all focus-visible:tw-outline-none focus-visible:tw-ring-2">
            <ThreadListItemPrimitive.Trigger className="tw-flex-grow tw-px-3 tw-py-2 tw-text-start">
                <ThreadListItemTitle />
            </ThreadListItemPrimitive.Trigger>
            <ThreadListItemArchive />
        </ThreadListItemPrimitive.Root>
    );
};

const ThreadListItems: FC = () => {
    return <ThreadListPrimitive.Items components={{ ThreadListItem }} />;
};

export const ThreadList: FC = () => {
    return (
        <ThreadListPrimitive.Root className="tw-flex tw-flex-col tw-items-stretch tw-gap-1.5">
            <ThreadListNew />
            <ThreadListItems />
        </ThreadListPrimitive.Root>
    );
};
