import {
    ActionBarPrimitive,
    BranchPickerPrimitive,
    ComposerPrimitive,
    MessagePrimitive,
    ThreadPrimitive,
} from "@assistant-ui/react";
import type { FC } from "react";
import {
    ArrowDownIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CopyIcon,
    PencilIcon,
    RefreshCwIcon,
    SendHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/util";

import { Button } from "@/components/vetsai/ui/button";
import { MarkdownText } from "@/components/vetsai/assistant-ui/markdown-text";
import { TooltipIconButton } from "@/components/vetsai/assistant-ui/tooltip-icon-button";
import { ToolFallback } from "./tool-fallback";

const ThreadScrollToBottom: FC = () => {
    return (
        <ThreadPrimitive.ScrollToBottom asChild>
            <TooltipIconButton
                tooltip="Scroll to bottom"
                variant="outline"
                className="tw-absolute tw--top-8 tw-rounded-full disabled:tw-invisible"
            >
                <ArrowDownIcon />
            </TooltipIconButton>
        </ThreadPrimitive.ScrollToBottom>
    );
};

const ThreadWelcomeSuggestions: FC = () => {
    return (
        <div className="tw-mt-3 tw-flex tw-w-full tw-items-stretch tw-justify-center tw-gap-4">
            <ThreadPrimitive.Suggestion
                className="hover:tw-bg-muted/80 tw-flex tw-max-w-sm tw-grow tw-basis-0 tw-flex-col tw-items-center tw-justify-center tw-rounded-lg tw-border tw-p-3 tw-transition-colors tw-ease-in"
                prompt="What is the weather in Tokyo?"
                method="replace"
                autoSend
            >
                <span className="tw-line-clamp-2 tw-text-ellipsis tw-text-sm tw-font-semibold">
                    What is the weather in Tokyo?
                </span>
            </ThreadPrimitive.Suggestion>
            <ThreadPrimitive.Suggestion
                className="hover:tw-bg-muted/80 tw-flex tw-max-w-sm tw-grow tw-basis-0 tw-flex-col tw-items-center tw-justify-center tw-rounded-lg tw-border tw-p-3 tw-transition-colors tw-ease-in"
                prompt="What is assistant-ui?"
                method="replace"
                autoSend
            >
                <span className="tw-line-clamp-2 tw-text-ellipsis tw-text-sm tw-font-semibold">
                    What is assistant-ui?
                </span>
            </ThreadPrimitive.Suggestion>
        </div>
    );
};
const ThreadWelcome: FC = () => {
    return (
        <ThreadPrimitive.Empty>
            <div className="tw-flex tw-w-full tw-max-w-[var(--thread-max-width)] tw-flex-grow tw-flex-col">
                <div className="tw-flex tw-w-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center">
                    <p className="tw-mt-4 tw-font-medium">How can I help you today?</p>
                </div>
                <ThreadWelcomeSuggestions />
            </div>
        </ThreadPrimitive.Empty>
    );
};

const CircleStopIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            width="16"
            height="16"
        >
            <rect width="10" height="10" x="3" y="3" rx="2" />
        </svg>
    );
};

const ComposerAction: FC = () => {
    return (
        <>
            <ThreadPrimitive.If running={false}>
                <ComposerPrimitive.Send asChild>
                    <TooltipIconButton
                        tooltip="Send"
                        variant="default"
                        className="tw-my-2.5 tw-size-8 tw-p-2 tw-transition-opacity tw-ease-in"
                    >
                        <SendHorizontalIcon />
                    </TooltipIconButton>
                </ComposerPrimitive.Send>
            </ThreadPrimitive.If>
            <ThreadPrimitive.If running>
                <ComposerPrimitive.Cancel asChild>
                    <TooltipIconButton
                        tooltip="Cancel"
                        variant="default"
                        className="tw-my-2.5 tw-size-8 tw-p-2 tw-transition-opacity tw-ease-in"
                    >
                        <CircleStopIcon />
                    </TooltipIconButton>
                </ComposerPrimitive.Cancel>
            </ThreadPrimitive.If>
        </>
    );
};

const Composer: FC = () => {
    return (
        <ComposerPrimitive.Root className="focus-within:tw-border-ring/20 tw-flex tw-w-full tw-flex-wrap tw-items-end tw-rounded-lg tw-border tw-bg-inherit tw-px-2.5 tw-shadow-sm tw-transition-colors tw-ease-in">
            <ComposerPrimitive.Input
                rows={1}
                autoFocus
                placeholder="Write a message..."
                className="placeholder:tw-text-muted-foreground tw-max-h-40 tw-flex-grow tw-resize-none tw-border-none tw-bg-transparent tw-px-2 tw-py-4 tw-text-sm tw-outline-none focus:tw-ring-0 disabled:tw-cursor-not-allowed"
            />
            <ComposerAction />
        </ComposerPrimitive.Root>
    );
};

const UserMessage: FC = () => {
    return (
        <MessagePrimitive.Root className="tw-grid tw-w-full tw-max-w-[var(--thread-max-width)] tw-auto-rows-auto tw-grid-cols-[minmax(72px,1fr)_auto] tw-gap-y-2 tw-py-4 [&:where(>*)]:tw-col-start-2">
            <UserActionBar />

            <div className="tw-bg-muted tw-text-foreground tw-col-start-2 tw-row-start-2 tw-max-w-[calc(var(--thread-max-width)*0.8)] tw-break-words tw-rounded-3xl tw-px-5 tw-py-2.5">
                <MessagePrimitive.Content />
            </div>

            <BranchPicker className="tw-col-span-full tw-col-start-1 tw-row-start-3 tw--mr-1 tw-justify-end" />
        </MessagePrimitive.Root>
    );
};

const UserActionBar: FC = () => {
    return (
        <ActionBarPrimitive.Root
            hideWhenRunning
            autohide="not-last"
            className="tw-col-start-1 tw-row-start-2 tw-mr-3 tw-mt-2.5 tw-flex tw-flex-col tw-items-end"
        >
            <ActionBarPrimitive.Edit asChild>
                <TooltipIconButton tooltip="Edit">
                    <PencilIcon />
                </TooltipIconButton>
            </ActionBarPrimitive.Edit>
        </ActionBarPrimitive.Root>
    );
};

const EditComposer: FC = () => {
    return (
        <ComposerPrimitive.Root className="tw-bg-muted max-w-[var(--thread-max-width)] tw-my-4 tw-flex tw-w-full tw-flex-col tw-gap-2 tw-rounded-xl">
            <ComposerPrimitive.Input className="tw-text-foreground tw-flex tw-h-8 tw-w-full tw-resize-none tw-bg-transparent tw-p-4 tw-pb-0 tw-outline-none" />

            <div className="tw-mx-3 tw-mb-3 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-self-end">
                <ComposerPrimitive.Cancel asChild>
                    <Button variant="ghost">Cancel</Button>
                </ComposerPrimitive.Cancel>
                <ComposerPrimitive.Send asChild>
                    <Button>Send</Button>
                </ComposerPrimitive.Send>
            </div>
        </ComposerPrimitive.Root>
    );
};

const AssistantActionBar: FC = () => {
    return (
        <ActionBarPrimitive.Root
            hideWhenRunning
            autohide="not-last"
            autohideFloat="single-branch"
            className="tw-text-muted-foreground data-[floating]:tw-bg-background tw-col-start-3 tw-row-start-2 tw--ml-1 tw-flex tw-gap-1 data-[floating]:tw-absolute data-[floating]:tw-rounded-md data-[floating]:tw-border data-[floating]:tw-p-1 data-[floating]:tw-shadow-sm"
        >
            <ActionBarPrimitive.Copy asChild>
                <TooltipIconButton tooltip="Copy">
                    <MessagePrimitive.If copied>
                        <CheckIcon />
                    </MessagePrimitive.If>
                    <MessagePrimitive.If copied={false}>
                        <CopyIcon />
                    </MessagePrimitive.If>
                </TooltipIconButton>
            </ActionBarPrimitive.Copy>
            <ActionBarPrimitive.Reload asChild>
                <TooltipIconButton tooltip="Refresh">
                    <RefreshCwIcon />
                </TooltipIconButton>
            </ActionBarPrimitive.Reload>
        </ActionBarPrimitive.Root>
    );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({ className, ...rest }) => {
    return (
        <BranchPickerPrimitive.Root
            hideWhenSingleBranch
            className={cn(
                "tw-text-muted-foreground tw-inline-flex tw-items-center tw-text-xs",
                className
            )}
            {...rest}
        >
            <BranchPickerPrimitive.Previous asChild>
                <TooltipIconButton tooltip="Previous">
                    <ChevronLeftIcon />
                </TooltipIconButton>
            </BranchPickerPrimitive.Previous>
            <span className="tw-font-medium">
                <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
            </span>
            <BranchPickerPrimitive.Next asChild>
                <TooltipIconButton tooltip="Next">
                    <ChevronRightIcon />
                </TooltipIconButton>
            </BranchPickerPrimitive.Next>
        </BranchPickerPrimitive.Root>
    );
};

const AssistantMessage: FC = () => {
    return (
        <MessagePrimitive.Root className="tw-relative tw-grid tw-w-full tw-max-w-[var(--thread-max-width)] tw-grid-cols-[auto_auto_1fr] tw-grid-rows-[auto_1fr] tw-py-4">
            <div className="tw-text-foreground tw-col-span-2 tw-col-start-2 tw-row-start-1 tw-my-1.5 tw-max-w-[calc(var(--thread-max-width)*0.8)] tw-break-words tw-leading-7">
                <MessagePrimitive.Content
                    components={{ Text: MarkdownText, tools: { Fallback: ToolFallback } }}
                />
            </div>

            <AssistantActionBar />

            <BranchPicker className="tw-col-start-2 tw-row-start-2 tw--ml-2 tw-mr-2" />
        </MessagePrimitive.Root>
    );
};

export const Thread: FC = () => {
    return (
        <ThreadPrimitive.Root
            className="tw-bg-background tw-box-border tw-flex tw-h-full tw-flex-col tw-overflow-hidden"
            style={{
                ["--thread-max-width" as string]: "42rem",
            }}
        >
            <ThreadPrimitive.Viewport className="tw-flex tw-h-full tw-flex-col tw-items-center tw-overflow-y-scroll tw-scroll-smooth tw-bg-inherit tw-px-4 tw-pt-8">
                <ThreadWelcome />

                <ThreadPrimitive.Messages
                    components={{
                        UserMessage,
                        EditComposer,
                        AssistantMessage,
                    }}
                />

                <ThreadPrimitive.If empty={false}>
                    <div className="tw-min-h-8 tw-flex-grow" />
                </ThreadPrimitive.If>

                <div className="tw-sticky tw-bottom-0 tw-mt-3 tw-flex tw-w-full tw-max-w-[var(--thread-max-width)] tw-flex-col tw-items-center tw-justify-end tw-rounded-t-lg tw-bg-inherit tw-pb-4">
                    <ThreadScrollToBottom />
                    <Composer />
                </div>
            </ThreadPrimitive.Viewport>
        </ThreadPrimitive.Root>
    );
};
