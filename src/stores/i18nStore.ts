/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Innovation starts with a single keystroke ⌨️
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'es' | 'zh' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ru' | 'ar';

/**
 * Lazy-load static locale JSON files.
 * Vite will code-split each locale into its own chunk.
 */
const localeLoaders: Record<Exclude<Language, 'en'>, () => Promise<{ default: Record<string, string> }>> = {
  es: () => import('@/locales/es.json'),
  zh: () => import('@/locales/zh.json'),
  fr: () => import('@/locales/fr.json'),
  de: () => import('@/locales/de.json'),
  ja: () => import('@/locales/ja.json'),
  ko: () => import('@/locales/ko.json'),
  pt: () => import('@/locales/pt.json'),
  ru: () => import('@/locales/ru.json'),
  ar: () => import('@/locales/ar.json'),
};

interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const languages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true }
];

// Base English translations (source of truth)
export const baseTranslations: Record<string, string> = {
    // Navigation
    'nav.home': 'Home',
    'nav.examples': 'Examples',
    'nav.playground': 'Playground',
    'nav.sandbox': 'Sandbox',
    'nav.docs': 'Documentation',
    'nav.tutorials': 'Tutorials',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.community': 'Community',
    'nav.settings': 'Settings',
    
    // Hero
    'hero.title': 'Learn Web3 Development',
    'hero.subtitle': 'The Interactive Way',
    'hero.description': 'Build, deploy, and understand smart contracts with AI-powered tools and interactive tutorials.',
    'hero.cta.start': 'Start Building',
    'hero.cta.explore': 'Explore Examples',
    
    // Features
    'features.title': 'Revolutionary Features',
    'features.ai.title': 'AI Code Whisperer',
    'features.ai.description': 'Real-time AI analysis with voice control',
    'features.timemachine.title': 'Time Machine',
    'features.timemachine.description': 'Travel through code evolution',
    'features.exploit.title': 'Exploit Lab',
    'features.exploit.description': 'Learn security by hacking safely',
    'features.arena.title': 'Collaborative Arena',
    'features.arena.description': 'Code with AI teammates',
    'features.neural.title': 'Neural Gas Oracle',
    'features.neural.description': 'ML-powered gas optimization',
    'features.crosschain.title': 'Cross-Chain Deploy',
    'features.crosschain.description': 'Deploy to 8+ networks instantly',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.copy': 'Copy',
    'common.copied': 'Copied!',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.learn_more': 'Learn More',
    'common.get_started': 'Get Started',
    
    // Sandbox
    'sandbox.compile': 'Compile',
    'sandbox.deploy': 'Deploy',
    'sandbox.compiling': 'Compiling...',
    'sandbox.deploying': 'Deploying...',
    'sandbox.console': 'Console',
    'sandbox.files': 'Files',
    'sandbox.interaction': 'Interact',
    'sandbox.innovation': 'Innovation Mode',
    'sandbox.activate_innovation': 'Activate Innovation',
    
    // About
    'about.title': 'About Us',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.team': 'Meet the Team',
    'about.values': 'Our Values',
    'about.join': 'Join Our Mission',
    
    // Docs
    'docs.title': 'Documentation',
    'docs.search_placeholder': 'Search documentation...',
    'docs.getting_started': 'Getting Started',
    'docs.quick_links': 'Quick Links',
    'docs.read_time': 'min read',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.system': 'System',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Explore Page
    'explore.title': 'Explore the Community',
    'explore.subtitle': 'Discover shared projects, templates, and tutorials from developers around the world',
    'explore.search_placeholder': 'Search projects, templates, tutorials...',
    'explore.no_projects': 'No projects found',
    'explore.be_first': 'Be the first to share something!',
    'explore.create_project': 'Create a Project',
    'explore.showing': 'Showing {count} of {total} projects',
    
    // Categories
    'category.all': 'All',
    'category.sandbox': 'Sandboxes',
    'category.template': 'Templates',
    'category.tutorial': 'Tutorials',
    'category.example': 'Examples',
    
    // Sort
    'sort.recent': 'Most Recent',
    'sort.popular': 'Most Viewed',
    'sort.likes': 'Most Liked',
    
    // Tutorial Page
    'tutorial.difficulty': 'Difficulty',
    'tutorial.duration': 'Duration',
    'tutorial.prerequisites': 'Prerequisites',
    'tutorial.start': 'Start Tutorial',
    'tutorial.continue': 'Continue',
    'tutorial.complete': 'Complete',
    'tutorial.step': 'Step {current} of {total}',
    
    // Markets Page
    'markets.title': 'Live Markets',
    'markets.price': 'Price',
    'markets.change_24h': '24h Change',
    'markets.volume': 'Volume',
    'markets.market_cap': 'Market Cap',
    
    // DeFi
    'defi.analytics': 'Live DeFi Analytics',
    'defi.tvl': 'Total Value Locked',
    'defi.protocols': 'Top Protocols',
    'defi.learn_build': 'Learn How to Build This',
    
    // Auth
    'auth.connect_wallet': 'Connect Wallet',
    'auth.disconnect': 'Disconnect',
    'auth.sign_in': 'Sign In',
    'auth.sign_out': 'Sign Out',
    
    // Errors
    'error.generic': 'Something went wrong',
    'error.not_found': 'Page not found',
    'error.network': 'Network error',
    'error.try_again': 'Try Again',

    // Homepage
    'home.hero.tagline': '72+ AI Agents · 6 MCP Servers · 900+ Tools · One Repo',
    'home.how_it_works': 'How It Works',
    'home.how_it_works_sub': 'Give any AI model direct access to BNB Chain in three steps.',
    'home.step1.title': 'Pick an Agent',
    'home.step1.desc': 'Choose from 72+ pre-built agents — each one is a JSON file tuned for a specific protocol like PancakeSwap, Venus, or Binance Futures.',
    'home.step2.title': 'Connect MCP Servers',
    'home.step2.desc': 'Point Claude, ChatGPT, or any LLM at one of 6 MCP servers. Your AI can now read on-chain data, fetch prices, and interact with protocols.',
    'home.step3.title': 'Execute On-Chain',
    'home.step3.desc': '900+ tools across 60+ networks — swap tokens, check yields, audit contracts, track wallets. All through natural language.',
    'home.explore': 'Explore the Toolkit',

    // Nav groups
    'nav.learn': 'Learn',
    'nav.build': 'Build',
    'nav.explore': 'Explore',
    'nav.interactive_tutorials': 'Interactive Tutorials',
    'nav.examples_gallery': 'Examples Gallery',
    'nav.api_reference': 'API Reference',
    'nav.code_playground': 'Code Playground',
    'nav.sandbox_ide': 'Sandbox IDE',
    'nav.fullstack_builder': 'Full-Stack Builder',
    'nav.contract_templates': 'Contract Templates',
    'nav.innovation_lab': 'Innovation Lab',
    'nav.markets': 'Markets',
};

// Loaded translations storage (populated from static JSON files)
let loadedTranslations: Record<Language, Record<string, string>> = {
  en: { ...baseTranslations },
  es: {},
  zh: {},
  fr: {},
  de: {},
  ja: {},
  ko: {},
  pt: {},
  ru: {},
  ar: {},
};

interface I18nStore {
  language: Language;
  isLoading: boolean;
  translationError: string | null;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string, params?: Record<string, string>) => string;
  isRTL: () => boolean;
  refreshTranslations: () => Promise<void>;
  clearCache: () => void;
}

export const useI18n = create<I18nStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      isLoading: false,
      translationError: null,
      
      setLanguage: async (lang: Language) => {
        set({ language: lang, isLoading: true, translationError: null });
        
        // Update document direction for RTL languages
        const langInfo = languages.find(l => l.code === lang);
        document.documentElement.dir = langInfo?.rtl ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // If English, no need to load anything
        if (lang === 'en') {
          loadedTranslations.en = { ...baseTranslations };
          set({ isLoading: false });
          return;
        }
        
        // If already loaded, use cached version
        if (Object.keys(loadedTranslations[lang]).length > 0) {
          set({ isLoading: false });
          return;
        }
        
        // Lazy-load the static JSON for this language
        try {
          const loader = localeLoaders[lang];
          const mod = await loader();
          loadedTranslations[lang] = mod.default;
          set({ isLoading: false });
        } catch (error: any) {
          console.error('Failed to load translations:', error);
          set({ isLoading: false, translationError: error.message });
        }
      },
      
      t: (key: string, params?: Record<string, string>) => {
        const { language } = get();
        
        // Get translation from loaded store, fall back to English, then to key
        let text = loadedTranslations[language]?.[key] 
          || loadedTranslations.en[key] 
          || baseTranslations[key]
          || key;
        
        // Replace parameters like {name} with actual values
        if (params) {
          Object.entries(params).forEach(([param, value]) => {
            text = text.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
          });
        }
        
        return text;
      },
      
      isRTL: () => {
        const { language } = get();
        const langInfo = languages.find(l => l.code === language);
        return langInfo?.rtl || false;
      },
      
      refreshTranslations: async () => {
        const { language, setLanguage } = get();
        // Reset cached translations for this language to force reload
        if (language !== 'en') {
          loadedTranslations[language] = {};
        }
        await setLanguage(language);
      },
      
      clearCache: () => {
        // Reset all loaded translations except English
        Object.keys(loadedTranslations).forEach(lang => {
          if (lang !== 'en') {
            loadedTranslations[lang as Language] = {};
          }
        });
      }
    }),
    {
      name: 'i18n-storage',
      partialize: (state) => ({ language: state.language })
    }
  )
);

/**
 * Initialize i18n — call once on app startup to load
 * translations for the persisted language.
 */
export function initI18n() {
  const { language, setLanguage } = useI18n.getState();
  if (language !== 'en') {
    setLanguage(language);
  }
}

export default useI18n;
