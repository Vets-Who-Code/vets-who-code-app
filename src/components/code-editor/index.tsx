"use client";

import dynamic from "next/dynamic";
import React from "react";

// Define a type for the props
type CodeEditorProps = {
    value: string;
    onChange: (newValue: string) => void;
};

// Dynamically import AceEditor to prevent it from being bundled in serverless functions
const AceEditor = dynamic(
    async () => {
        const ace = await import("react-ace");
        // Import mode and theme dynamically
        await import("ace-builds/src-noconflict/mode-javascript");
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

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            value={value}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
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
