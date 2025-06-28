import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const ToolFallback: ToolCallContentPartComponent = ({ toolName, argsText, result }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <div className="tw-mb-4 tw-flex tw-w-full tw-flex-col tw-gap-3 tw-rounded-lg tw-border tw-py-3">
            <div className="tw-flex tw-items-center tw-gap-2 tw-px-4">
                <CheckIcon className="tw-size-4" />
                <p className="">
                    Used tool: <b>{toolName}</b>
                </p>
                <div className="tw-flex-grow" />
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
            </div>
            {!isCollapsed && (
                <div className="tw-flex tw-flex-col tw-gap-2 tw-border-t tw-pt-2">
                    <div className="tw-px-4">
                        <pre className="tw-whitespace-pre-wrap">{argsText}</pre>
                    </div>
                    {result !== undefined && (
                        <div className="tw-border-t tw-border-dashed tw-px-4 tw-pt-2">
                            <p className="tw-font-semibold">Result:</p>
                            <pre className="tw-whitespace-pre-wrap">
                                {typeof result === "string"
                                    ? result
                                    : JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
