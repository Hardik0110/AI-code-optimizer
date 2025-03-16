import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/OutputSection.css';

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

  if (isLoading) {
    return (
      <div className="output-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Optimizing your code...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="output-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="output-container">
        <div className="empty-state">
          <p>Optimized code will appear here</p>
          <div className="mandala-placeholder"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="output-container">
      <div className="output-toolbar">
        {executionTime && (
          <span className="execution-time">Processed in {executionTime}s</span>
        )}
        <button onClick={copyToClipboard} className="copy-button">
          Copy Code
        </button>
      </div>
      
      <div className="code-container custom-scrollbar">
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            margin: 0,
            borderRadius: '4px',
            padding: '1em',
            maxHeight: '500px',
            overflow: 'auto',
            backgroundColor: 'var(--code-background)',
            fontSize: '14px',
            fontFamily: "'Fira Code', monospace"
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      
      {suggestions && suggestions.length > 0 && (
        <div className="suggestions">
          <h4 className="suggestions-title">Suggestions:</h4>
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OutputSection;