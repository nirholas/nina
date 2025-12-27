/**
 * ✨ built by nich
 * 🌐 GitHub: github.com/nirholas
 * 💫 Making the digital world a better place 🌐
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { useThemeStore } from '@/stores/themeStore';
import { useWalletStore } from '@/stores/walletStore';
import ShareModal from './ShareModal';
import WalletConnect from '@/components/WalletConnect';
import {
  Play,
  RotateCcw,
  Download,
  Share2,
  Settings,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelLeftOpen,
  PanelBottomClose,
  PanelBottomOpen,
  Plus,
  X,
  FileCode,
  FileJson,
  FileType,
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  Moon,
  Sun,
  Code2,
  Terminal,
  Bug,
  Layers,
  Zap,
  Trash2,
  Edit3,
  MoreVertical,
  Github,
  ExternalLink,
  Sparkles,
  Search,
  Replace,
  Command,
  Braces,
  Layout,
  SplitSquareHorizontal,
  GripVertical,
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/utils/helpers';

// =============================================================================
// TYPES
// =============================================================================

interface SandboxFile {
  id: string;
  name: string;
  language: string;
  content: string;
  isEntry?: boolean;
}

interface SandboxFolder {
  id: string;
  name: string;
  files: SandboxFile[];
  folders: SandboxFolder[];
  isOpen?: boolean;
}

interface ConsoleMessage {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info' | 'clear';
  content: string;
  timestamp: Date;
  count?: number;
}

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

interface EditorSettings {
  theme: string;
  fontSize: number;
  tabSize: number;
  wordWrap: 'on' | 'off';
  minimap: boolean;
  lineNumbers: 'on' | 'off';
  formatOnSave: boolean;
  vimMode: boolean;
  autoSave: boolean;
  ligatures: boolean;
}

interface SandboxProps {
  initialFiles?: SandboxFile[];
  title?: string;
  description?: string;
  readOnly?: boolean;
  showHeader?: boolean;
  defaultLayout?: 'horizontal' | 'vertical' | 'preview-only' | 'editor-only';
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DEVICE_PRESETS: DevicePreset[] = [
  { name: 'Desktop', width: 1280, height: 800, icon: <Monitor className="w-4 h-4" /> },
  { name: 'Tablet', width: 768, height: 1024, icon: <Tablet className="w-4 h-4" /> },
  { name: 'Mobile', width: 375, height: 667, icon: <Smartphone className="w-4 h-4" /> },
];

const EDITOR_THEMES = [
  { id: 'vs-dark', name: 'Dark (VS Code)' },
  { id: 'light', name: 'Light' },
  { id: 'hc-black', name: 'High Contrast' },
];

const FILE_ICONS: Record<string, React.ReactNode> = {
  html: <FileCode className="w-4 h-4 text-orange-500" />,
  css: <FileType className="w-4 h-4 text-blue-500" />,
  js: <Braces className="w-4 h-4 text-yellow-500" />,
  javascript: <Braces className="w-4 h-4 text-yellow-500" />,
  ts: <Braces className="w-4 h-4 text-blue-600" />,
  typescript: <Braces className="w-4 h-4 text-blue-600" />,
  json: <FileJson className="w-4 h-4 text-green-500" />,
  sol: <Code2 className="w-4 h-4 text-purple-500" />,
  solidity: <Code2 className="w-4 h-4 text-purple-500" />,
  md: <FileType className="w-4 h-4 text-gray-500" />,
  default: <File className="w-4 h-4 text-gray-400" />,
};

const DEFAULT_FILES: SandboxFile[] = [
  {
    id: 'html',
    name: 'index.html',
    language: 'html',
    isEntry: true,
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <h1>Hello, World! 🚀</h1>
    <p>Start editing to see your changes live.</p>
    <button id="counter-btn">Clicked: 0 times</button>
  </div>
  <script src="app.js"></script>
</body>
</html>`
  },
  {
    id: 'css',
    name: 'styles.css',
    language: 'css',
    content: `/* Modern CSS Reset & Base Styles */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

#app {
  text-align: center;
  padding: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 24px;
}

button {
  background: #ffffff;
  color: #667eea;
  border: none;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

button:active {
  transform: translateY(0);
}`
  },
  {
    id: 'js',
    name: 'app.js',
    language: 'javascript',
    content: `// Interactive Counter Example
let count = 0;

const button = document.getElementById('counter-btn');

button.addEventListener('click', () => {
  count++;
  button.textContent = \`Clicked: \${count} times\`;
  
  // Add a fun animation
  button.style.transform = 'scale(1.1)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 100);
  
  console.log(\`Button clicked! Count is now: \${count}\`);
});

// Log when the page loads
console.log('🚀 App initialized!');
console.info('ℹ️ Try clicking the button');`
  }
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function WebSandbox({
  initialFiles = DEFAULT_FILES,
  title = 'Web Sandbox',
  description,
  readOnly = false,
  showHeader = true,
  defaultLayout = 'horizontal'
}: SandboxProps) {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  
  const { mode: appTheme } = useThemeStore();
  const [files, setFiles] = useState<SandboxFile[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState(initialFiles[0]?.id || '');
  const [openTabs, setOpenTabs] = useState<string[]>([initialFiles[0]?.id || '']);
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layout, setLayout] = useState<'horizontal' | 'vertical' | 'preview-only' | 'editor-only'>(defaultLayout);
  const [splitPosition, setSplitPosition] = useState(50);
  const [devicePreset, setDevicePreset] = useState<DevicePreset | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  const { address, isConnected } = useWalletStore();
  
  const [settings, setSettings] = useState<EditorSettings>({
    theme: appTheme === 'dark' ? 'vs-dark' : 'light',
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    minimap: true,
    lineNumbers: 'on',
    formatOnSave: true,
    vimMode: false,
    autoSave: true,
    ligatures: true,
  });
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const runTimeoutRef = useRef<NodeJS.Timeout>();
  
  // ---------------------------------------------------------------------------
  // COMPUTED
  // ---------------------------------------------------------------------------
  
  const activeFile = files.find(f => f.id === activeFileId);
  
  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  
  const getFileIcon = (language: string) => {
    return FILE_ICONS[language] || FILE_ICONS.default;
  };
  
  const updateFile = useCallback((fileId: string, content: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, content } : f
    ));
    
    // Auto-run after debounce
    if (autoRun) {
      if (runTimeoutRef.current) {
        clearTimeout(runTimeoutRef.current);
      }
      runTimeoutRef.current = setTimeout(() => {
        runCode();
      }, 500);
    }
  }, [autoRun]);
  
  const runCode = useCallback(() => {
    setIsRunning(true);
    setConsoleMessages([]);
    
    const htmlFile = files.find(f => f.language === 'html');
    const cssFile = files.find(f => f.language === 'css');
    const jsFile = files.find(f => f.language === 'javascript' || f.language === 'js');
    
    // Build the preview HTML
    let htmlContent = htmlFile?.content || '<html><body></body></html>';
    
    // Inject CSS
    if (cssFile) {
      const styleTag = `<style>\n${cssFile.content}\n</style>`;
      if (htmlContent.includes('</head>')) {
        htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
      } else if (htmlContent.includes('<body')) {
        htmlContent = htmlContent.replace('<body', `${styleTag}\n<body`);
      }
    }
    
    // Create console override script
    const consoleOverride = `
      <script>
        (function() {
          const originalConsole = { ...console };
          const postMessage = (type, args) => {
            parent.postMessage({
              type: 'console',
              method: type,
              args: args.map(arg => {
                try {
                  if (typeof arg === 'object') {
                    return JSON.stringify(arg, null, 2);
                  }
                  return String(arg);
                } catch (e) {
                  return String(arg);
                }
              })
            }, '*');
          };
          
          console.log = (...args) => { postMessage('log', args); originalConsole.log(...args); };
          console.warn = (...args) => { postMessage('warn', args); originalConsole.warn(...args); };
          console.error = (...args) => { postMessage('error', args); originalConsole.error(...args); };
          console.info = (...args) => { postMessage('info', args); originalConsole.info(...args); };
          console.clear = () => { postMessage('clear', []); originalConsole.clear(); };
          
          window.onerror = (msg, url, line, col, error) => {
            postMessage('error', [\`Error: \${msg} (line \${line})\`]);
            return false;
          };
          
          window.onunhandledrejection = (e) => {
            postMessage('error', [\`Unhandled Promise Rejection: \${e.reason}\`]);
          };
        })();
      </script>
    `;
    
    // Inject console override
    if (htmlContent.includes('<head>')) {
      htmlContent = htmlContent.replace('<head>', `<head>\n${consoleOverride}`);
    } else {
      htmlContent = consoleOverride + htmlContent;
    }
    
    // Inject JS (if not already linked)
    if (jsFile && !htmlContent.includes('src="app.js"') && !htmlContent.includes("src='app.js'")) {
      const scriptTag = `<script>\n${jsFile.content}\n</script>`;
      if (htmlContent.includes('</body>')) {
        htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
      } else {
        htmlContent += scriptTag;
      }
    } else if (jsFile) {
      // Replace the external script reference with inline
      htmlContent = htmlContent.replace(
        /<script\s+src=["']app\.js["']\s*><\/script>/gi,
        `<script>\n${jsFile.content}\n</script>`
      );
    }
    
    // Replace CSS link with inline
    if (cssFile) {
      htmlContent = htmlContent.replace(
        /<link\s+rel=["']stylesheet["']\s+href=["']styles\.css["']\s*\/?>/gi,
        ''
      );
    }
    
    // Write to iframe
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
    
    setTimeout(() => setIsRunning(false), 100);
  }, [files]);
  
  const addConsoleMessage = useCallback((type: ConsoleMessage['type'], content: string) => {
    setConsoleMessages(prev => {
      // Check if last message is the same (for grouping)
      const last = prev[prev.length - 1];
      if (last && last.type === type && last.content === content) {
        return prev.map((msg, i) => 
          i === prev.length - 1 ? { ...msg, count: (msg.count || 1) + 1 } : msg
        );
      }
      
      return [...prev, {
        id: Date.now().toString() + Math.random(),
        type,
        content,
        timestamp: new Date()
      }];
    });
  }, []);
  
  const openFile = (fileId: string) => {
    setActiveFileId(fileId);
    if (!openTabs.includes(fileId)) {
      setOpenTabs(prev => [...prev, fileId]);
    }
  };
  
  const closeTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(id => id !== fileId);
    setOpenTabs(newTabs);
    
    if (activeFileId === fileId && newTabs.length > 0) {
      setActiveFileId(newTabs[newTabs.length - 1]);
    }
  };
  
  const createNewFile = () => {
    const name = prompt('Enter file name (e.g., utils.js):');
    if (!name) return;
    
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const langMap: Record<string, string> = {
      html: 'html',
      css: 'css',
      js: 'javascript',
      ts: 'typescript',
      json: 'json',
      sol: 'solidity',
      md: 'markdown'
    };
    
    const newFile: SandboxFile = {
      id: Date.now().toString(),
      name,
      language: langMap[ext] || 'plaintext',
      content: ''
    };
    
    setFiles(prev => [...prev, newFile]);
    openFile(newFile.id);
  };
  
  const deleteFile = (fileId: string) => {
    if (files.length <= 1) {
      alert('Cannot delete the last file');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setOpenTabs(prev => prev.filter(id => id !== fileId));
    
    if (activeFileId === fileId) {
      const remaining = files.filter(f => f.id !== fileId);
      setActiveFileId(remaining[0]?.id || '');
    }
  };
  
  const copyShareLink = async () => {
    // Open share modal for connected wallets, wallet modal for guests
    if (!isConnected || !address) {
      setShowWalletModal(true);
      return;
    }
    setShowShareModal(true);
  };
  
  const quickCopyLink = async () => {
    // Quick copy current URL for sharing (existing behavior)
    const code = JSON.stringify(files);
    const encoded = btoa(encodeURIComponent(code));
    const url = `${window.location.origin}/sandbox?code=${encoded}`;
    
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const downloadProject = () => {
    // Create a zip-like download (simplified as individual files)
    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  
  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };
  
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (settings.formatOnSave) {
        formatCode();
      }
      runCode();
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      setSearchOpen(true);
    });
  };
  
  // ---------------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------------
  
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console') {
        const { method, args } = event.data;
        if (method === 'clear') {
          setConsoleMessages([]);
        } else {
          addConsoleMessage(method, args.join(' '));
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addConsoleMessage]);
  
  // Initial run
  useEffect(() => {
    runCode();
  }, []);
  
  // Update theme when app theme changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      theme: appTheme === 'dark' ? 'vs-dark' : 'light'
    }));
  }, [appTheme]);
  
  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  
  const consoleIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warn': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col h-screen bg-gray-900 text-white overflow-hidden",
        isFullscreen && "fixed inset-0 z-50"
      )}
    >
      {/* Header */}
      {showHeader && (
        <header className="flex items-center justify-between px-4 h-12 bg-gray-800 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary-500" />
              <span className="font-semibold text-sm">{title}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Run Button */}
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              Run
            </button>
            
            {/* Auto-run Toggle */}
            <button
              onClick={() => setAutoRun(!autoRun)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                autoRun ? "bg-primary-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              )}
              title="Auto-run on change"
            >
              <Zap className="w-4 h-4" />
              Auto
            </button>
            
            <div className="w-px h-6 bg-gray-700" />
            
            {/* Layout Controls */}
            <div className="flex items-center bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setLayout('horizontal')}
                className={cn("p-1.5 rounded", layout === 'horizontal' && "bg-gray-600")}
                title="Horizontal split"
              >
                <SplitSquareHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('vertical')}
                className={cn("p-1.5 rounded", layout === 'vertical' && "bg-gray-600")}
                title="Vertical split"
              >
                <Layout className="w-4 h-4 rotate-90" />
              </button>
            </div>
            
            {/* Device Presets */}
            <div className="flex items-center bg-gray-700 rounded-lg p-1">
              {DEVICE_PRESETS.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => setDevicePreset(devicePreset?.name === preset.name ? null : preset)}
                  className={cn(
                    "p-1.5 rounded transition-colors",
                    devicePreset?.name === preset.name && "bg-gray-600"
                  )}
                  title={preset.name}
                >
                  {preset.icon}
                </button>
              ))}
            </div>
            
            <div className="w-px h-6 bg-gray-700" />
            
            {/* Actions */}
            <button
              onClick={copyShareLink}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Share"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={downloadProject}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                showSettings ? "bg-gray-700" : "hover:bg-gray-700"
              )}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </header>
      )}
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - File Tree */}
        {showSidebar && (
          <aside className="w-56 bg-gray-850 border-r border-gray-700 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Files</span>
              <button
                onClick={createNewFile}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="New file"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-2">
              {files.map(file => (
                <div
                  key={file.id}
                  className={cn(
                    "group flex items-center gap-2 px-3 py-1.5 cursor-pointer transition-colors",
                    activeFileId === file.id 
                      ? "bg-gray-700 text-white" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  )}
                  onClick={() => openFile(file.id)}
                >
                  {getFileIcon(file.language)}
                  <span className="flex-1 text-sm truncate">{file.name}</span>
                  {file.isEntry && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-primary-600/30 text-primary-400 rounded">
                      entry
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-600 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => setShowSidebar(false)}
              className="flex items-center justify-center gap-2 px-3 py-2 border-t border-gray-700 text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <PanelLeftClose className="w-4 h-4" />
              Hide Sidebar
            </button>
          </aside>
        )}
        
        {/* Toggle Sidebar Button (when hidden) */}
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-800 border border-gray-700 rounded-r-lg hover:bg-gray-700 transition-colors"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}
        
        {/* Editor + Preview */}
        <div className={cn(
          "flex-1 flex overflow-hidden",
          layout === 'vertical' && "flex-col"
        )}>
          {/* Editor Panel */}
          {layout !== 'preview-only' && (
            <div 
              className={cn(
                "flex flex-col bg-gray-900 overflow-hidden",
                layout === 'horizontal' && "border-r border-gray-700"
              )}
              style={{ 
                width: layout === 'horizontal' ? `${splitPosition}%` : '100%',
                height: layout === 'vertical' ? `${splitPosition}%` : '100%'
              }}
            >
              {/* Tabs */}
              <div className="flex items-center bg-gray-800 border-b border-gray-700 overflow-x-auto">
                {openTabs.map(tabId => {
                  const file = files.find(f => f.id === tabId);
                  if (!file) return null;
                  
                  return (
                    <div
                      key={tabId}
                      className={cn(
                        "group flex items-center gap-2 px-3 py-2 border-r border-gray-700 cursor-pointer transition-colors",
                        activeFileId === tabId 
                          ? "bg-gray-900 text-white" 
                          : "bg-gray-800 text-gray-400 hover:text-gray-200"
                      )}
                      onClick={() => setActiveFileId(tabId)}
                    >
                      {getFileIcon(file.language)}
                      <span className="text-sm whitespace-nowrap">{file.name}</span>
                      <button
                        onClick={(e) => closeTab(tabId, e)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-700 rounded transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
              
              {/* Editor */}
              <div className="flex-1">
                {activeFile && (
                  <Editor
                    height="100%"
                    language={activeFile.language}
                    value={activeFile.content}
                    theme={settings.theme}
                    onChange={(value) => updateFile(activeFile.id, value || '')}
                    onMount={handleEditorMount}
                    options={{
                      fontSize: settings.fontSize,
                      tabSize: settings.tabSize,
                      wordWrap: settings.wordWrap,
                      minimap: { enabled: settings.minimap },
                      lineNumbers: settings.lineNumbers,
                      readOnly,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      padding: { top: 16 },
                      fontLigatures: settings.ligatures,
                      smoothScrolling: true,
                      cursorBlinking: 'smooth',
                      cursorSmoothCaretAnimation: 'on',
                      renderWhitespace: 'selection',
                      bracketPairColorization: { enabled: true },
                    }}
                  />
                )}
              </div>
            </div>
          )}
          
          {/* Resize Handle */}
          {layout !== 'preview-only' && layout !== 'editor-only' && (
            <div
              className={cn(
                "flex items-center justify-center bg-gray-700 hover:bg-primary-600 transition-colors cursor-col-resize group",
                layout === 'horizontal' ? "w-1" : "h-1 cursor-row-resize"
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                const startPos = layout === 'horizontal' ? e.clientX : e.clientY;
                const startSplit = splitPosition;
                const container = containerRef.current;
                if (!container) return;
                
                const handleMouseMove = (e: MouseEvent) => {
                  const containerRect = container.getBoundingClientRect();
                  const containerSize = layout === 'horizontal' 
                    ? containerRect.width - (showSidebar ? 224 : 0)
                    : containerRect.height - 48; // minus header
                  const currentPos = layout === 'horizontal' ? e.clientX : e.clientY;
                  const offset = layout === 'horizontal' 
                    ? containerRect.left + (showSidebar ? 224 : 0)
                    : containerRect.top + 48;
                  const newPos = ((currentPos - offset) / containerSize) * 100;
                  setSplitPosition(Math.min(Math.max(newPos, 20), 80));
                };
                
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            >
              <GripVertical className={cn(
                "w-3 h-3 text-gray-500 group-hover:text-white transition-colors",
                layout === 'vertical' && "rotate-90"
              )} />
            </div>
          )}
          
          {/* Preview Panel */}
          {layout !== 'editor-only' && (
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
              {/* Preview Frame */}
              <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100">
                <div
                  style={{
                    width: devicePreset ? devicePreset.width : '100%',
                    height: devicePreset ? devicePreset.height : '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  className={cn(
                    devicePreset && "shadow-2xl rounded-lg overflow-hidden border border-gray-300"
                  )}
                >
                  <iframe
                    ref={iframeRef}
                    title="Preview"
                    className="w-full h-full bg-white"
                    sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                  />
                </div>
              </div>
              
              {/* Console */}
              {showConsole && (
                <div className="h-48 bg-gray-900 border-t border-gray-700 flex flex-col">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-400">Console</span>
                      {consoleMessages.length > 0 && (
                        <span className="text-xs px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">
                          {consoleMessages.length}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setConsoleMessages([])}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Clear console"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                      <button
                        onClick={() => setShowConsole(false)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Hide console"
                      >
                        <PanelBottomClose className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto font-mono text-xs">
                    {consoleMessages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Console output will appear here
                      </div>
                    ) : (
                      consoleMessages.map(msg => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex items-start gap-2 px-3 py-1.5 border-b border-gray-800",
                            msg.type === 'error' && "bg-red-500/10",
                            msg.type === 'warn' && "bg-yellow-500/10"
                          )}
                        >
                          {consoleIcon(msg.type)}
                          <span className={cn(
                            "flex-1 whitespace-pre-wrap break-all",
                            msg.type === 'error' && "text-red-400",
                            msg.type === 'warn' && "text-yellow-400",
                            msg.type === 'info' && "text-blue-400",
                            msg.type === 'log' && "text-gray-300"
                          )}>
                            {msg.content}
                          </span>
                          {msg.count && msg.count > 1 && (
                            <span className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-400 text-[10px]">
                              {msg.count}
                            </span>
                          )}
                          <span className="text-gray-600 text-[10px]">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
              
              {/* Console Toggle (when hidden) */}
              {!showConsole && (
                <button
                  onClick={() => setShowConsole(true)}
                  className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-800 border-t border-gray-700 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <PanelBottomOpen className="w-4 h-4" />
                  Show Console
                  {consoleMessages.filter(m => m.type === 'error').length > 0 && (
                    <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">
                      {consoleMessages.filter(m => m.type === 'error').length} errors
                    </span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <aside className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <span className="font-semibold">Settings</span>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Editor Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
                >
                  {EDITOR_THEMES.map(theme => (
                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Font Size: {settings.fontSize}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="24"
                  value={settings.fontSize}
                  onChange={(e) => setSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              {/* Tab Size */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tab Size</label>
                <div className="flex gap-2">
                  {[2, 4].map(size => (
                    <button
                      key={size}
                      onClick={() => setSettings(prev => ({ ...prev, tabSize: size }))}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm transition-colors",
                        settings.tabSize === size
                          ? "bg-primary-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      )}
                    >
                      {size} spaces
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Toggles */}
              <div className="space-y-3">
                {[
                  { key: 'minimap', label: 'Show Minimap' },
                  { key: 'wordWrap', label: 'Word Wrap', getValue: (v: string) => v === 'on', setValue: (v: boolean) => v ? 'on' : 'off' },
                  { key: 'formatOnSave', label: 'Format on Save' },
                  { key: 'ligatures', label: 'Font Ligatures' },
                ].map(({ key, label, getValue, setValue }) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-300">{label}</span>
                    <button
                      onClick={() => {
                        setSettings(prev => ({
                          ...prev,
                          [key]: getValue 
                            ? setValue!(!getValue(prev[key as keyof EditorSettings] as string))
                            : !prev[key as keyof EditorSettings]
                        }));
                      }}
                      className={cn(
                        "w-10 h-6 rounded-full transition-colors relative",
                        (getValue 
                          ? getValue(settings[key as keyof EditorSettings] as string)
                          : settings[key as keyof EditorSettings])
                          ? "bg-primary-600"
                          : "bg-gray-600"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                        (getValue 
                          ? getValue(settings[key as keyof EditorSettings] as string)
                          : settings[key as keyof EditorSettings])
                          ? "translate-x-5"
                          : "translate-x-1"
                      )} />
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
      
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        projectData={{
          title: 'Web Project',
          description: '',
          files: files.map(f => ({ filename: f.name, content: f.content })),
          category: 'sandbox'
        }}
        onShare={(url) => {
          console.log('Shared at:', url);
        }}
      />
      
      {/* Wallet Connect Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connect your wallet to share projects and access community features.
            </p>
            <WalletConnect onConnect={() => setShowWalletModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
