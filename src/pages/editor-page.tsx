// pages/editor.tsx

import CodeEditor from "@components/code-editor"; // Adjust the import path according to your project structure
import React, { useState } from "react";

const EditorPage: React.FC = () => {
    // State to hold the code text
    const [code, setCode] = useState<string>("// Write your JavaScript code here\n");

    // Function to handle code changes from the CodeEditor
    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
    };

    return (
        <div style={{ margin: "20px" }}>
            <h1>Code Editor</h1>
            <CodeEditor value={code} onChange={handleCodeChange} />
        </div>
    );
};

export default EditorPage;
