import React from "react";
import { Highlight } from "prism-react-renderer";
import { themes } from "prism-react-renderer";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  placeholder?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange, 
  language = "javascript",
  placeholder = "Write your code here..." 
}) => {
  return (
    <div className="code-editor">
      <textarea
        className="code-input"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <Highlight code={code || " "} language={language} theme={themes.dracula}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, margin: 0, padding: '16px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="line-number">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
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