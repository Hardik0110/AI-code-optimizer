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

  const optionItems = [
    { key: 'increaseReadability', label: 'Increase Readability' },
    { key: 'useHighLevelFunctions', label: 'Use High-Level Functions' },
    { key: 'useModernHooks', label: 'Use Modern React Hooks' },
    { key: 'optimizeImports', label: 'Optimize Imports' },
    { key: 'improveNaming', label: 'Improve Variable Naming' }
  ];

  return (
    <div className="optimization-options">
      <h3 className="options-title">Optimization Options</h3>
      <div className="options-grid">
        {optionItems.map(({ key, label }) => (
          <div key={key} className="option-item">
            <label className="option-label">
              <input
                type="checkbox"
                checked={options[key as keyof OptionType]}
                onChange={() => handleOptionChange(key as keyof OptionType)}
              />
              <span className="checkbox-custom"></span>
              <span className="option-text">{label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationOptions;