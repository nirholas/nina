/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Crafting digital magic since day one ✨
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
  Sparkles,
  Copy,
  CheckCircle,
  AlertCircle,
  Play,
  Rocket,
  Code2,
  FileCode,
  Menu,
  X,
  Wallet,
  Network,
  Loader2
} from 'lucide-react';
import { copyToClipboard } from '@/utils/helpers';
import { contractTemplates, ContractTemplate, searchTemplates } from '@/utils/contractTemplates';
import { useWalletStore } from '@/stores/walletStore';
import { useThemeStore } from '@/stores/themeStore';
import { LyraCompiler, CompileOutput, CompiledContract } from '@/services/lyraCompiler';

export default function ContractPlayground() {
  const { address, isConnected, chainId } = useWalletStore();
  const { mode } = useThemeStore();
  
  // State
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileResult, setCompileResult] = useState<CompileOutput | null>(null);
  const [compilerLog, setCompilerLog] = useState<string[]>([]);
  
  const editorRef = useRef<any>(null);
  
  // Initialize Lyra Compiler with progress callback
  const compiler = useMemo(() => new LyraCompiler({
    onProgress: (msg) => setCompilerLog(prev => [...prev, msg])
  }), []);

  // Filter templates
  const filteredTemplates = searchQuery 
    ? searchTemplates(searchQuery)
    : selectedCategory === 'all' 
      ? contractTemplates 
      : contractTemplates.filter(t => t.category === selectedCategory);

  // Categories
  const categories = [
    { id: 'all', name: 'All Templates', count: contractTemplates.length },
    { id: 'token', name: 'Tokens', count: contractTemplates.filter(t => t.category === 'token').length },
    { id: 'nft', name: 'NFTs', count: contractTemplates.filter(t => t.category === 'nft').length },
    { id: 'defi', name: 'DeFi', count: contractTemplates.filter(t => t.category === 'defi').length },
    { id: 'dao', name: 'DAO', count: contractTemplates.filter(t => t.category === 'dao').length },
    { id: 'security', name: 'Security', count: contractTemplates.filter(t => t.category === 'security').length },
    { id: 'other', name: 'Utilities', count: contractTemplates.filter(t => t.category === 'other').length },
  ];

  // Blockchain networks
  const networks = [
    { id: 1, name: 'Ethereum Mainnet', testnet: false },
    { id: 11155111, name: 'Sepolia Testnet', testnet: true },
    { id: 137, name: 'Polygon Mainnet', testnet: false },
    { id: 80001, name: 'Mumbai Testnet', testnet: true },
    { id: 42161, name: 'Arbitrum One', testnet: false },
    { id: 10, name: 'Optimism', testnet: false },
  ];

  // Load template when selected
  useEffect(() => {
    if (selectedTemplate) {
      setCode(selectedTemplate.code);
      setError(null);
    }
  }, [selectedTemplate]);

  // AI Generation Handler
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe what contract you want to generate');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Simulate AI generation with delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simple keyword matching for demo (in production, use OpenAI/Claude)
      const matchedTemplates = searchTemplates(prompt);
      const template = matchedTemplates.length > 0 
        ? matchedTemplates[0] 
        : contractTemplates[0];

      setSelectedTemplate(template);
      
      // Add a comment with the prompt (sanitized)
      const sanitizedPrompt = prompt.replace(/[^\w\s.,!?-]/g, '').substring(0, 200);
      const codeWithPrompt = `// Generated from prompt: "${sanitizedPrompt}"\n\n${template.code}`;
      setCode(codeWithPrompt);
      setDeploymentStatus(null);
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate contract');
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy Handler
  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Compile Handler - Real compilation with Lyra Compiler
  const handleCompile = async () => {
    if (!code.trim()) {
      setError('No contract code to compile');
      return;
    }

    setIsCompiling(true);
    setError(null);
    setCompileResult(null);
    setCompilerLog([]);
    setDeploymentStatus('Starting compilation...');
    
    try {
      // Real compilation using Lyra Compiler
      const result = await compiler.compile({
        source: code,
        optimize: true,
        runs: 200,
      });
      
      setCompileResult(result);
      
      if (result.success) {
        const contractNames = result.contracts.map(c => c.name).join(', ');
        const warningCount = result.warnings.length;
        const warningMsg = warningCount > 0 ? ` (${warningCount} warning${warningCount > 1 ? 's' : ''})` : '';
        setDeploymentStatus(`✓ Compiled successfully: ${contractNames}${warningMsg}\n\nReady to deploy.`);
      } else {
        const errorMessages = result.errors.map(e => e.formattedMessage || e.message).join('\n');
        throw new Error(errorMessages || 'Compilation failed');
      }
    } catch (err: any) {
      console.error('Compilation error:', err);
      setError(err.message || 'Compilation failed');
      setDeploymentStatus(null);
    } finally {
      setIsCompiling(false);
    }
  };

  // Deploy Handler
  const handleDeploy = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!compileResult?.success || compileResult.contracts.length === 0) {
      setError('Please compile the contract first');
      return;
    }

    setIsDeploying(true);
    setError(null);
    setDeploymentStatus('Preparing deployment...');

    try {
      const contract = compileResult.contracts[0]; // Use first contract
      const networkName = networks.find(n => n.id === chainId)?.name || 'Unknown Network';
      
      // Check if MetaMask/wallet is available
      if (typeof window.ethereum === 'undefined') {
        throw new Error('No wallet detected. Please install MetaMask.');
      }

      setDeploymentStatus(`Deploying ${contract.name} to ${networkName}...`);
      
      // Get ethers from window (loaded via CDN or npm)
      const { ethers } = await import('ethers');
      
      // Create provider and signer from MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Create contract factory
      const factory = new ethers.ContractFactory(
        contract.abi,
        contract.bytecode,
        signer
      );
      
      setDeploymentStatus(`Waiting for transaction confirmation...`);
      
      // Deploy the contract
      const deployedContract = await factory.deploy();
      
      // Wait for deployment to complete
      await deployedContract.waitForDeployment();
      
      const contractAddress = await deployedContract.getAddress();
      
      setDeploymentStatus(
        `✓ Contract deployed successfully!\n\nContract: ${contract.name}\nAddress: ${contractAddress}\nNetwork: ${networkName}\n\nYou can now interact with your contract.`
      );
    } catch (err: any) {
      console.error('Deployment error:', err);
      // Handle user rejection
      if (err.code === 4001 || err.code === 'ACTION_REJECTED') {
        setError('Transaction rejected by user');
      } else {
        setError(err.message || 'Failed to deploy contract');
      }
      setDeploymentStatus(null);
    } finally {
      setIsDeploying(false);
    }
  };

  // Example prompts
  const examplePrompts = [
    'Create an ERC20 token with minting functionality',
    'Build an NFT collection with max supply and minting price',
    'Make a simple escrow contract for payments',
    'Create a staking contract with rewards',
    'Build a DAO governance with voting',
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 flex-shrink-0">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mr-4"
        >
          {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        <div className="flex items-center space-x-3 flex-1">
          <Sparkles className="w-6 h-6 text-primary-600" />
          <h1 className="text-xl font-bold">AI Contract Playground</h1>
        </div>

        <div className="flex items-center space-x-3">
          {isConnected ? (
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Wallet className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
              </span>
              <Network className="w-4 h-4 text-green-600" />
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Connect wallet to deploy
            </div>
          )}
          
          <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600">
            Back to Examples
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* AI Prompt Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary-600" />
                AI Generator
              </h2>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your contract..."
                className="w-full h-24 p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full mt-2 btn-primary py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>

              {/* Example Prompts */}
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Examples:</p>
                <div className="space-y-1">
                  {examplePrompts.slice(0, 3).map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="w-full text-left p-1.5 text-xs bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Templates Section */}
            <div className="flex-1 overflow-auto p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <FileCode className="w-5 h-5 mr-2" />
                Templates
              </h2>

              {/* Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 mb-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />

              {/* Categories */}
              <div className="space-y-1 mb-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{category.count}</span>
                  </button>
                ))}
              </div>

              {/* Template List */}
              <div className="space-y-2">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedTemplate?.id === template.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                    }`}
                  >
                    <div className="font-medium text-sm mb-1">{template.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {template.description}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        template.difficulty === 'beginner' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : template.difficulty === 'intermediate'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                        {template.difficulty}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        {template.blockchain}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 space-x-2">
            <button
              onClick={handleCompile}
              disabled={!code.trim() || isCompiling}
              className="btn-secondary text-sm flex items-center disabled:opacity-50"
            >
              {isCompiling ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isCompiling ? 'Compiling...' : 'Compile'}
            </button>
            
            <button
              onClick={handleDeploy}
              disabled={!compileResult?.success || isDeploying || !isConnected}
              className="btn-primary text-sm flex items-center disabled:opacity-50"
            >
              <Rocket className="w-4 h-4 mr-2" />
              {isDeploying ? 'Deploying...' : 'Deploy'}
            </button>

            <div className="flex-1" />

            <button
              onClick={handleCopy}
              disabled={!code.trim()}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 flex items-center disabled:opacity-50"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Error/Status Messages */}
          {(error || deploymentStatus || compilerLog.length > 0) && (
            <div className="px-4 pt-4 space-y-2">
              {error && (
                <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <pre className="text-sm text-red-800 dark:text-red-200 whitespace-pre-wrap font-mono">{error}</pre>
                </div>
              )}
              
              {compilerLog.length > 0 && isCompiling && (
                <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5 animate-spin" />
                  <div className="text-sm text-blue-800 dark:text-blue-200 font-mono">
                    {compilerLog.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                </div>
              )}
              
              {deploymentStatus && (
                <div className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap font-mono">
                    {deploymentStatus}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            {code ? (
              <Editor
                height="100%"
                defaultLanguage="sol"
                language="sol"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme={mode === 'dark' ? 'vs-dark' : 'light'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  wordWrap: 'on',
                }}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <Code2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No Contract Loaded</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Generate a contract using AI or select a template from the sidebar to get started
                  </p>
                  <div className="space-y-2 text-sm text-left bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="font-medium text-blue-900 dark:text-blue-100">Quick Tips:</p>
                    <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                      <li>• Use AI to generate contracts from natural language</li>
                      <li>• Browse 40+ pre-built templates</li>
                      <li>• Edit code in real-time with syntax highlighting</li>
                      <li>• Deploy to any supported blockchain</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          {selectedTemplate && (
            <div className="h-auto bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-1">{selectedTemplate.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedTemplate.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedTemplate.difficulty === 'beginner' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : selectedTemplate.difficulty === 'intermediate'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {selectedTemplate.difficulty}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
