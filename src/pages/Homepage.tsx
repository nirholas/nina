/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Code with purpose, build with passion 🔥
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Code, 
  Image, 
  Vote, 
  Layers,
  Bot,
  Brain,
  Sparkles,
  Search,
  ChevronRight,
  Zap,
  Shield,
  Globe,
  ArrowDownUp,
  Coins,
  Lock,
  DollarSign,
  Sprout,
  ShoppingCart,
  BookOpen
} from 'lucide-react';
import { Example } from '@/types';
import { cn } from '@/utils/helpers';

const examples: Example[] = [
  // Basic Web3 Examples
  {
    id: 'wallet-connect',
    title: 'Wallet Connection',
    description: 'Connect MetaMask, view balance, and interact with Ethereum networks',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'beginner',
    tags: ['ethereum', 'wallet', 'metamask'],
    component: () => null,
    icon: Wallet,
  },
  {
    id: 'token-swap',
    title: 'Token Swapper',
    description: 'Swap tokens using decentralized exchanges with live price quotes',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'beginner',
    tags: ['defi', 'swap', 'dex'],
    component: () => null,
    icon: ArrowDownUp,
  },
  
  // DeFi Examples
  {
    id: 'defi-lending',
    title: 'DeFi Lending Protocol',
    description: 'Deposit assets to earn interest and borrow against collateral like Aave',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['defi', 'lending', 'borrowing', 'aave'],
    component: () => null,
    icon: DollarSign,
  },
  {
    id: 'yield-farming',
    title: 'Yield Farming',
    description: 'Stake LP tokens to earn rewards from liquidity provision',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['defi', 'farming', 'liquidity', 'rewards'],
    component: () => null,
    icon: Sprout,
  },
  {
    id: 'staking',
    title: 'Token Staking',
    description: 'Stake tokens to earn passive rewards with flexible or locked periods',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'beginner',
    tags: ['staking', 'rewards', 'passive-income'],
    component: () => null,
    icon: Lock,
  },
  
  // NFT Examples
  {
    id: 'nft-minter',
    title: 'NFT Minter',
    description: 'Create and mint NFTs with IPFS storage and metadata',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['nft', 'ipfs', 'erc721'],
    component: () => null,
    icon: Image,
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    description: 'Buy, sell, and trade unique digital collectibles like OpenSea',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['nft', 'marketplace', 'trading'],
    component: () => null,
    icon: ShoppingCart,
  },
  
  // DAO Examples
  {
    id: 'dao-governance',
    title: 'DAO Governance',
    description: 'Create proposals and vote on DAO decisions with token-based voting',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['dao', 'governance', 'voting'],
    component: () => null,
    icon: Vote,
  },
  
  // Token Examples
  {
    id: 'erc20-token',
    title: 'ERC-20 Token',
    description: 'Standard fungible token implementation with transfer and approval',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'beginner',
    tags: ['token', 'erc20', 'fungible'],
    component: () => null,
    icon: Coins,
  },
  {
    id: 'token-vesting',
    title: 'Token Vesting',
    description: 'Time-locked token distribution for team members and investors',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['token', 'vesting', 'timelock'],
    component: () => null,
    icon: Lock,
  },
  
  // Security Examples
  {
    id: 'multisig-wallet',
    title: 'Multi-Signature Wallet',
    description: 'Secure wallet requiring multiple approvals for transactions',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'advanced',
    tags: ['security', 'multisig', 'wallet'],
    component: () => null,
    icon: Shield,
  },
  
  // Cross-Chain Examples
  {
    id: 'cross-chain-bridge',
    title: 'Cross-Chain Bridge',
    description: 'Transfer tokens between Ethereum, Polygon, Arbitrum, and Optimism',
    category: 'web3',
    chain: 'multi',
    difficulty: 'advanced',
    tags: ['bridge', 'cross-chain', 'layer2'],
    component: () => null,
    icon: Layers,
  },
  
  // Solana Examples
  {
    id: 'solana-token',
    title: 'Solana SPL Token',
    description: 'Work with SOL and SPL tokens on the Solana blockchain',
    category: 'web3',
    chain: 'solana',
    difficulty: 'intermediate',
    tags: ['solana', 'spl', 'token'],
    component: () => null,
    icon: Coins,
  },
  
  // Smart Contract Examples
  {
    id: 'smart-contract',
    title: 'Smart Contract Deployer',
    description: 'Write, compile, and deploy Solidity smart contracts to testnets',
    category: 'web3',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['solidity', 'smart-contracts', 'deployment'],
    component: () => null,
    icon: Code,
  },
  
  // AI Examples
  {
    id: 'ai-contract-generator',
    title: 'AI Contract Generator',
    description: 'Generate smart contracts using AI based on natural language',
    category: 'hybrid',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['ai', 'smart-contracts', 'automation'],
    component: () => null,
    icon: Bot,
  },
  {
    id: 'blockchain-analyzer',
    title: 'Blockchain Data Analyzer',
    description: 'Analyze on-chain data with AI-powered insights',
    category: 'hybrid',
    chain: 'multi',
    difficulty: 'advanced',
    tags: ['ai', 'analytics', 'blockchain'],
    component: () => null,
    icon: Brain,
  },
  {
    id: 'nft-art-generator',
    title: 'AI NFT Art Generator',
    description: 'Generate and mint AI-created artwork as NFTs',
    category: 'hybrid',
    chain: 'ethereum',
    difficulty: 'intermediate',
    tags: ['ai', 'nft', 'generative-art'],
    component: () => null,
    icon: Sparkles,
  },
];

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web3' | 'ai' | 'hybrid'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredExamples = examples.filter((example) => {
    const matchesSearch = 
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || example.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || example.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categoryColors = {
    web3: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    ai: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    hybrid: 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300',
  };

  const difficultyColors = {
    beginner: 'text-green-600 dark:text-green-400',
    intermediate: 'text-yellow-600 dark:text-yellow-400',
    advanced: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6 shadow-lg">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Lyra Web3 Playground
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            An open-source platform for interactive blockchain development. Explore the playground,
            use production-ready templates, and follow guided tutorials to learn and build.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Code className="w-5 h-5 text-primary-600" />
              <span className="font-semibold">40+ Templates</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <BookOpen className="w-5 h-5 text-primary-600" />
              <span className="font-semibold">50+ Tutorials</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Shield className="w-5 h-5 text-primary-600" />
              <span className="font-semibold">Open Source</span>
            </div>
          </div>
        </div>

        {/* Interactive Sandbox CTA Banner */}
        <Link 
          to="/sandbox"
          className="block mb-12 group"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-8 h-8" />
                  <h2 className="text-3xl font-bold">Interactive Sandbox</h2>
                </div>
                <p className="text-white/90 text-lg mb-4">
                  Full-featured browser IDE with multi-file editing, live compilation, and
                  testnet deployment support. AI-assisted features are listed as coming soon.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Multi-File Editor</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Live Deployment</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">AI Features (Coming Soon)</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Contract Testing</span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
                <span className="text-white font-semibold text-lg">Launch Sandbox</span>
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* Template Playground Link */}
        <Link 
          to="/playground"
          className="block mb-8 group"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-gradient">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                    AI Contract Playground
                  </h2>
                  <p className="text-white/90 text-sm md:text-base">
                    Generate, edit, and deploy smart contracts with AI assistance
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold group-hover:bg-gray-100 transition-colors">
                <span>Try Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </Link>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search examples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-base"
            />
          </div>

          {/* Mobile-friendly horizontal scrollable filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Filter */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 shrink-0">Category:</span>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-1 px-1 scrollbar-hide">
                {(['all', 'web3', 'ai', 'hybrid'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap min-h-[40px]',
                      selectedCategory === cat
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500'
                    )}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 shrink-0">Level:</span>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-1 px-1 scrollbar-hide">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap min-h-[40px]',
                      selectedDifficulty === diff
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500'
                    )}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Examples Grid */}
        {filteredExamples.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              No examples found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example, index) => {
              const Icon = example.icon || Code;
              return (
                <Link
                  key={example.id}
                  to={`/example/${example.id}`}
                  className="group card hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      'p-3 rounded-xl transition-transform group-hover:scale-110',
                      categoryColors[example.category]
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={cn(
                      'text-xs font-medium px-2 py-1 rounded-full',
                      difficultyColors[example.difficulty]
                    )}>
                      {example.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {example.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {example.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {example.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Start exploring our interactive examples, connect your wallet, and dive into the world of Web3 and AI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/nirholas/lyra-web3-playground"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View on GitHub
            </a>
            <Link
              to="/docs"
              className="btn-secondary"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
