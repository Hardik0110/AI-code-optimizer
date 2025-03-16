import { OptimizationOptions } from '../types';
import { OpenAI } from 'openai';

interface OptimizationResponse {
  optimizedCode: string;
  suggestions?: string[];
  executionTime?: number;
}

// Use environment variables for sensitive data
const baseURL = "https://api.sree.shop/v1";
const apiKey = "ddc-lkY6N38T84NQ8bu838OuNLH5nhY2EO3T7lApFgcQn2OM7C7Krg";

// Create API client with minimal configuration
const api = new OpenAI({
  apiKey,
  baseURL,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  dangerouslyAllowBrowser: true
});

export const optimizeCode = async (
  code: string, 
  options: OptimizationOptions
): Promise<OptimizationResponse> => {
  try {
    const startTime = performance.now();
    
    let systemPrompt = "You are an expert code optimizer. Your task is to optimize the given code";
    if (options.increaseReadability) systemPrompt += ", improve its readability";
    if (options.useHighLevelFunctions) systemPrompt += ", use high-level functions instead of loops and basic operations";
    if (options.useModernHooks) systemPrompt += ", replace class components with modern React hooks";
    if (options.optimizeImports) systemPrompt += ", organize and optimize imports";
    if (options.improveNaming) systemPrompt += ", improve variable and function naming for clarity";
    systemPrompt += ". Return ONLY the optimized code without any explanations or markdown formatting.";

    const completion = await api.chat.completions.create({
      model: "claude-3-5-sonnet", // Changed to a supported model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: code }
      ],
      temperature: 0.3,
      max_tokens: 2048
    });

    const optimizedCode = completion.choices[0].message.content || '';
    const executionTime = ((performance.now() - startTime) / 1000).toFixed(2);

    // Generate suggestions
    const suggestions: string[] = [];
    if (!options.increaseReadability) {
      suggestions.push('Consider enabling readability improvements for better maintainability');
    }
    if (!options.useHighLevelFunctions) {
      suggestions.push('High-level functions can make your code more concise and easier to understand');
    }
    if (!options.useModernHooks && (code.includes('React') || code.includes('react'))) {
      suggestions.push('Modern React hooks can simplify your component logic');
    }
    if (!options.optimizeImports && (code.includes('import') || code.includes('require'))) {
      suggestions.push('Optimizing imports can reduce bundle size and improve loading performance');
    }

    return {
      optimizedCode,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
      executionTime: parseFloat(executionTime)
    };
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to optimize code. Please try again later.');
  }
};