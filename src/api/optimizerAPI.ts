import { OptimizationOptions } from '../types';

interface OptimizationResponse {
  optimizedCode: string;
  suggestions?: string[];
  executionTime?: number;
}

const baseURL = "http://localhost:3001";
const apiKey = "ddc-lkY6N38T84NQ8bu838OuNLH5nhY2EO3T7lApFgcQn2OM7C7Krg";

export const optimizeCode = async (
  code: string, 
  options: OptimizationOptions
): Promise<OptimizationResponse> => {
  try {
    const startTime = performance.now();
    
    const response = await fetch(`${baseURL}/v1/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ code, options })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    const executionTime = parseFloat(((performance.now() - startTime) / 1000).toFixed(2));

    return {
      optimizedCode: result.optimizedCode,
      suggestions: result.suggestions || [],
      executionTime
    };
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to optimize code. Please try again later.');
  }
};