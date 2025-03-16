import { optimizeCode } from './optimizerAPI';

const testCode = `
import React, { useState } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import OptimizationOptions from './components/OptimizationOptions';
import OutputSection from './components/OutputSection';
import { optimizeCode } from './api/optimizerAPI';
import './styles/global.css';

const App: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[] | undefined>(undefined);
  const [executionTime, setExecutionTime] = useState<number | undefined>(undefined);
  const [options, setOptions] = useState({
    increaseReadability: true,
    useHighLevelFunctions: false,
    useModernHooks: false,
    optimizeImports: true,
    improveNaming: false,
  });

  const handleOptimize = async () => {
    if (!inputCode.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await optimizeCode(inputCode, options);
      setOutputCode(result.optimizedCode);
      setSuggestions(result.suggestions);
      setExecutionTime(result.executionTime);
    } catch (err) {
      console.error('Optimization failed:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setOutputCode('');
      setSuggestions(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="editor-section">
          <h2 className="section-title">Input Code</h2>
          <CodeEditor 
            code={inputCode} 
            onChange={(value) => setInputCode(value)} 
            placeholder="Paste your code here..."
          />
        </div>
        
        <div className="options-section">
          <OptimizationOptions 
            options={options}
            onChange={setOptions}
          />
          <button 
            className="optimize-button" 
            onClick={handleOptimize}
            disabled={isLoading || !inputCode.trim()}
          >
            {isLoading ? 'Optimizing...' : 'Optimize Code'}
          </button>
        </div>
        
        <div className="output-section">
          <h2 className="section-title">Optimized Code</h2>
          <OutputSection 
            code={outputCode} 
            isLoading={isLoading} 
            error={error}
            suggestions={suggestions}
            executionTime={executionTime}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

`;

const testOptions = {
  increaseReadability: true,
  useHighLevelFunctions: true,
  useModernHooks: false,
  optimizeImports: false,
  improveNaming: true
};

async function testAPI() {
  try {
    console.log('Testing API with sample code...');
    const result = await optimizeCode(testCode, testOptions);
    console.log('Optimized Code:', result.optimizedCode);
    console.log('Execution Time:', result.executionTime, 'seconds');
    if (result.suggestions) {
      console.log('Suggestions:', result.suggestions);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testAPI();