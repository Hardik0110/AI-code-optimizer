export interface OptimizationOptions {
    increaseReadability: boolean;
    useHighLevelFunctions: boolean;
    useModernHooks: boolean;
    optimizeImports: boolean;
    improveNaming: boolean;
  }
  
  export interface CodeSnippet {
    id: string;
    title: string;
    code: string;
    language: string;
    createdAt: Date;
  }
  
  export interface ApiError {
    message: string;
    status?: number;
    code?: string;
  }