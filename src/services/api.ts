/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Keep shining, keep coding 🌞
 */

/**
 * API Client for Lyra Web3 Playground Server
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchAPI<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const result: ApiResponse<T> = await response.json();

    if (!result.success || !response.ok) {
      throw new Error(result.error || 'API request failed');
    }

    return result.data as T;
  } catch (error: any) {
    console.error('API Error:', error);
    throw error;
  }
}

// Compilation API
export interface CompileRequest {
  code: string;
  version?: string;
  optimize?: boolean;
}

export interface CompileResult {
  bytecode: string;
  abi: any[];
  warnings?: string[];
}

export async function compileContract(request: CompileRequest): Promise<CompileResult> {
  return fetchAPI<CompileResult>('/compile', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// Deployment API
export interface DeployRequest {
  bytecode: string;
  abi: any[];
  network?: string;
  constructorArgs?: any[];
}

export interface DeployResult {
  address: string;
  transactionHash: string;
  network: string;
  explorerUrl?: string;
}

export async function deployContract(request: DeployRequest): Promise<DeployResult> {
  return fetchAPI<DeployResult>('/deploy', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// AI API
export interface GenerateRequest {
  prompt: string;
}

export interface GenerateResult {
  code: string;
  explanation: string;
}

export async function generateContract(request: GenerateRequest): Promise<GenerateResult> {
  return fetchAPI<GenerateResult>('/ai/generate', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export interface ExplainRequest {
  code: string;
  question?: string;
}

export interface ExplainResult {
  explanation: string;
}

export async function explainCode(request: ExplainRequest): Promise<ExplainResult> {
  return fetchAPI<ExplainResult>('/ai/explain', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export interface GenerateTestsRequest {
  code: string;
  framework?: 'hardhat' | 'foundry';
}

export interface GenerateTestsResult {
  tests: string;
}

export async function generateTests(request: GenerateTestsRequest): Promise<GenerateTestsResult> {
  return fetchAPI<GenerateTestsResult>('/ai/tests', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// Faucet API
export interface FaucetRequest {
  address: string;
  network?: string;
}

export interface FaucetResult {
  transactionHash: string;
  amount: string;
  network: string;
}

export async function requestFaucetFunds(request: FaucetRequest): Promise<FaucetResult> {
  return fetchAPI<FaucetResult>('/faucet/request', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

// IPFS API
export interface IPFSUploadRequest {
  content: string;
  name?: string;
  metadata?: Record<string, any>;
}

export interface IPFSUploadResult {
  cid: string;
  url: string;
  gateway: string;
}

export async function uploadToIPFS(request: IPFSUploadRequest): Promise<IPFSUploadResult> {
  return fetchAPI<IPFSUploadResult>('/ipfs/upload', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export interface IPFSPinRequest {
  cid: string;
  name?: string;
}

export interface IPFSPinResult {
  success: boolean;
  message: string;
}

export async function pinToIPFS(request: IPFSPinRequest): Promise<IPFSPinResult> {
  return fetchAPI<IPFSPinResult>('/ipfs/pin', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}
