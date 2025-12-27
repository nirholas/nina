/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Code is poetry written for machines 📝
 */

import { FileText, Scale, AlertTriangle, Gavel, Users, Zap, Globe, Calendar, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = 'December 26, 2025';

  const sections = [
    {
      icon: CheckCircle,
      title: '1. Acceptance of Terms',
      content: `By accessing and using Lyra Web3 Playground ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.

The Platform is designed for educational purposes and to help developers learn blockchain development. It is provided as-is for learning and experimentation.`
    },
    {
      icon: Zap,
      title: '2. Description of Service',
      content: `Lyra Web3 Playground provides:

• Interactive code editors for writing and testing smart contracts
• Educational examples and tutorials for blockchain development  
• Tools to compile and deploy contracts to test networks
• A sandbox environment for experimenting with Web3 technologies

The Platform is free to use and open source.`
    },
    {
      icon: Users,
      title: '3. User Responsibilities',
      content: `When using the Platform, you agree to:

• Use the Platform only for lawful purposes
• Not deploy malicious or harmful smart contracts
• Not attempt to exploit, hack, or compromise the Platform
• Take responsibility for any contracts you deploy to blockchain networks
• Understand that blockchain transactions are irreversible
• Keep your wallet credentials secure (we never ask for private keys)
• Not use the Platform for any illegal activities`
    },
    {
      icon: AlertTriangle,
      title: '4. Disclaimer of Warranties',
      content: `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.

• Code examples are for educational purposes and may not be production-ready
• Smart contract templates should be audited before production use
• We do not guarantee the security or correctness of any code
• Blockchain networks may experience downtime or congestion
• Transaction fees (gas) are determined by the network, not by us

You acknowledge that blockchain development carries inherent risks and you use the Platform at your own risk.`
    },
    {
      icon: Scale,
      title: '5. Limitation of Liability',
      content: `To the maximum extent permitted by law, Lyra Web3 Playground and its creators shall not be liable for:

• Any loss of cryptocurrency or digital assets
• Failed or incorrect smart contract deployments
• Any damages arising from the use of code from the Platform
• Network fees or gas costs incurred
• Third-party wallet or blockchain network issues
• Any indirect, incidental, or consequential damages

You are solely responsible for reviewing and testing any code before deployment.`
    },
    {
      icon: Globe,
      title: '6. Intellectual Property',
      content: `• The Platform's source code is open source under the MIT License
• Code examples and tutorials may be used freely for learning
• You retain ownership of any original code you create
• Third-party libraries are subject to their respective licenses
• The "Lyra" name and branding are property of the project maintainers`
    },
    {
      icon: Gavel,
      title: '7. Modifications to Terms',
      content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the Platform.

Your continued use of the Platform after changes constitutes acceptance of the modified terms.

We encourage you to review these terms periodically.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl">
            Please read these terms carefully before using Lyra Web3 Playground.
          </p>
          <div className="flex items-center gap-2 mt-4 text-white/60">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Important Notice */}
        <div className="mb-12 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">
                Important: Educational Purpose Only
              </h2>
              <p className="text-amber-700 dark:text-amber-300">
                This platform is designed for learning and experimentation. Smart contracts 
                deployed through this platform should be thoroughly tested and audited before 
                any production use. Always use testnets for learning and never deploy untested 
                code to mainnet with real funds.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <section.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                
                <div className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agreement */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-xl text-center">
          <h3 className="font-bold text-lg mb-2">By Using This Platform</h3>
          <p className="text-gray-600 dark:text-gray-400">
            You acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Questions about these terms? Open an issue on GitHub.
          </p>
          <a 
            href="https://github.com/nirholas/lyra-web3-playground/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Globe className="w-4 h-4" />
            Contact on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
