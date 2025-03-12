import React from 'react';

interface OptionType {
  increaseReadability: boolean;
  useHighLevelFunctions: boolean;
  useModernHooks: boolean;
  optimizeImports: boolean;
  improveNaming: boolean;
}

interface OptimizationOptionsProps {
  options: OptionType;
  onChange: (options: OptionType) => void;
}

const OptimizationOptions: React.FC<OptimizationOptionsProps> = ({ options, onChange }) => {
  const handleOptionChange = (option: keyof OptionType) => {
    onChange({
      ...options,
      [option]: !options[option]
    });
  };

  return (
    <div className="optimization-options">
      <h3 className="options-title">Optimization Options</h3>
      <div className="options-grid">
        <div className="option-item">
          <label className="option-label">
            <input
              type="checkbox"
              checked={options.increaseReadability}
              onChange={() => handleOptionChange('increaseReadability')}
            />
            <span className="checkbox-custom"></span>
            <span className="option-text">Increase Readability</span>
          </label>
        </div>
        
        <div className="option-item">
          <label className="option-label">
            <input
              type="checkbox"
              checked={options.useHighLevelFunctions}
              onChange={() => handleOptionChange('useHighLevelFunctions')}
            />
            <span className="checkbox-custom"></span>
            <span className="option-text">Use High-Level Functions</span>
          </label>
        </div>
        
        <div className="option-item">
          <label className="option-label">
            <input
              type="checkbox"
              checked={options.useModernHooks}
              onChange={() => handleOptionChange('useModernHooks')}
            />
            <span className="checkbox-custom"></span>
            <span className="option-text">Use Modern React Hooks</span>
          </label>
        </div>
        
        <div className="option-item">
          <label className="option-label">
            <input
              type="checkbox"
              checked={options.optimizeImports}
              onChange={() => handleOptionChange('optimizeImports')}
            />
            <span className="checkbox-custom"></span>
            <span className="option-text">Optimize Imports</span>
          </label>
        </div>
        
        <div className="option-item">
          <label className="option-label">
            <input
              type="checkbox"
              checked={options.improveNaming}
              onChange={() => handleOptionChange('improveNaming')}
            />
            <span className="checkbox-custom"></span>
            <span className="option-text">Improve Variable Naming</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OptimizationOptions;