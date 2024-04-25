import React from "react";
import AceEditor from "react-ace";

// Import the languages and themes you want to use
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

// Define a type for the props
type CodeEditorProps = {
    value: string;
    onChange: (newValue: string) => void;
};

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
            showPrintMargin
            showGutter
            highlightActiveLine
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
