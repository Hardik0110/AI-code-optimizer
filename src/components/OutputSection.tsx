import React from 'react';
// ...existing code...
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// ...existing code...

interface OutputSectionProps {
  code: string;
  isLoading: boolean;
  error: string | null;
  suggestions?: string[];
  executionTime?: number;
}

const OutputSection: React.FC<OutputSectionProps> = ({ 
  code, 
  isLoading, 
  error,
  suggestions,
  executionTime
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
      });
  };

  return (
    <div className="output-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="chakra-loading"></div>
          <p>Optimizing your code using AI...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
        </div>
      ) : code ? (
        <>
          <div className="output-toolbar">
            <div className="execution-time">
              {executionTime !== undefined && (
                <span>Processed in {executionTime}s</span>
              )}
            </div>
            <button className="copy-button" onClick={copyToClipboard}>
              Copy Code
            </button>
          </div>
          <div className="output-code">
            <SyntaxHighlighter
              language="typescript"
              wrapLines={true}
              showLineNumbers={true}
            >
              {code}
            </SyntaxHighlighter>
          </div>
          {suggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              <h4 className="suggestions-title">Suggestions</h4>
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="empty-output">
          <p>Optimized code will appear here</p>
          <div className="mandala-placeholder"></div>
        </div>
      )}
    </div>
  );
};

export default OutputSection;