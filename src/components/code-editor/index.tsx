"use client";

import dynamic from "next/dynamic";
import React from "react";

export type CodeEditorMode = "javascript" | "html" | "css";

// Define a type for the props
type CodeEditorProps = {
    value: string;
    onChange: (newValue: string) => void;
    /** Ace syntax mode. Defaults to "javascript" so existing callers are unaffected. */
    mode?: CodeEditorMode;
    /** Unique editor id — required when more than one editor renders on a page. */
    name?: string;
    /** CSS height for the editor (e.g. "24rem", "100%"). Defaults to Ace's default. */
    height?: string;
    readOnly?: boolean;
};

// Dynamically import AceEditor to prevent it from being bundled in serverless functions
const AceEditor = dynamic(
    async () => {
        const ace = await import("react-ace");
        // Preload every mode a lesson can use plus the theme, so switching file
        // tabs never awaits a chunk. All client-only (this import runs with ssr:false).
        await import("ace-builds/src-noconflict/mode-javascript");
        await import("ace-builds/src-noconflict/mode-html");
        await import("ace-builds/src-noconflict/mode-css");
        await import("ace-builds/src-noconflict/theme-monokai");
        return ace;
    },
    {
        ssr: false, // Disable server-side rendering for this component
        loading: () => (
            <div className="tw-flex tw-h-96 tw-items-center tw-justify-center tw-rounded tw-border tw-border-gray-300 tw-bg-gray-50">
                <div className="tw-text-center">
                    <div className="tw-mb-2 tw-text-gray-300">Loading editor...</div>
                    <div className="tw-h-2 tw-w-32 tw-animate-pulse tw-rounded tw-bg-gray-300" />
                </div>
            </div>
        ),
    }
);

const CodeEditor: React.FC<CodeEditorProps> = ({
    value,
    onChange,
    mode = "javascript",
    name = "vwc-code-editor",
    height,
    readOnly = false,
}) => {
    return (
        <AceEditor
            mode={mode}
            theme="monokai"
            value={value}
            onChange={onChange}
            name={name}
            readOnly={readOnly}
            width="100%"
            {...(height ? { height } : {})}
            editorProps={{ $blockScrolling: true }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
        />
    );
};

export default CodeEditor;
