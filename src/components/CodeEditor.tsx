import React from "react";
import { Highlight } from "prism-react-renderer";
import { themes } from "prism-react-renderer"; // Import themes object

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  placeholder?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, language = "javascript" }) => {
  return (
    <div className="code-editor">
      <textarea
        className="code-input"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your code here..."
      />
      <Highlight code={code} language={language} theme={themes.dracula}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeEditor;
