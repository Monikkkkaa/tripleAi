"use client";
import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles, Zap, Brain, LogOut, Code, Copy, Download, Trash2, Settings, Moon, Sun, Mic, StopCircle, Volume2, Maximize2, Minimize2, History, MessageSquare, Palette, Type, Layout, Search, X, Plus, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

// Define types
interface Message {
  role: string;
  content: string;
  codeBlocks?: CodeBlock[];
  timestamp?: string;
}

interface CodeBlock {
  language: string;
  code: string;
}

interface LoadingState {
  gemini: boolean;
  perplexity: boolean;
  chatgpt: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: { [key: string]: Message[] };
  timestamp: string;
  lastUpdated: string;
  messageCount: number;
  category: string;
  tags: string[];
  userId: string;
}

interface UserPreferences {
  bgColor: string;
  font: string;
  layout: string;
  darkMode: boolean;
  userId: string;
}

interface CurrentUser {
  id: string;
  email: string;
  name: string;
  loginTime: string;
}

export default function MultiAIDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    gemini: [],
    perplexity: [],
    chatgpt: [],
  });
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<LoadingState>({
    gemini: false,
    perplexity: false,
    chatgpt: false,
  });
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<string>("medium");
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);
  const [showChatHistory, setShowChatHistory] = useState<boolean>(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("default");
  const [layout, setLayout] = useState<string>("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  
  const chatRefs = {
    gemini: useRef<HTMLDivElement>(null),
    perplexity: useRef<HTMLDivElement>(null),
    chatgpt: useRef<HTMLDivElement>(null),
  };

  const profileRef = useRef<HTMLDivElement>(null);

  // Categories
  const categories = [
    { id: "all", name: "All Chats", icon: "📚" },
    { id: "recent", name: "Recent", icon: "🕐" },
    { id: "programming", name: "Programming", icon: "💻" },
    { id: "research", name: "Research", icon: "🔬" },
    { id: "creative", name: "Creative", icon: "🎨" },
    { id: "business", name: "Business", icon: "💼" },
  ];

  // Check authentication and load user-specific data
  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (!userData) {
      router.push("/login");
      return;
    }

    try {
      const user: CurrentUser = JSON.parse(userData);
      setCurrentUser(user);
      loadUserData(user.id);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadUserData = (userId: string) => {
    // Load user-specific chat sessions
    const savedSessions = localStorage.getItem(`chatSessions_${userId}`);
    if (savedSessions) {
      try {
        const sessions: ChatSession[] = JSON.parse(savedSessions);
        const validatedSessions = sessions.map(session => ({
          id: session.id || `session_${Date.now()}`,
          title: session.title || "Untitled Chat",
          messages: session.messages || { gemini: [], perplexity: [], chatgpt: [] },
          timestamp: session.timestamp || new Date().toISOString(),
          lastUpdated: session.lastUpdated || new Date().toISOString(),
          messageCount: session.messageCount || 0,
          category: session.category || "recent",
          tags: session.tags || [],
          userId: session.userId || userId
        }));
        setChatSessions(validatedSessions);
        
        if (validatedSessions.length > 0) {
          const latestSession = validatedSessions[validatedSessions.length - 1];
          setCurrentSessionId(latestSession.id);
          setMessages(latestSession.messages);
        } else {
          // New user - start fresh
          setMessages({ gemini: [], perplexity: [], chatgpt: [] });
          setCurrentSessionId(`session_${Date.now()}`);
        }
      } catch (error) {
        console.error("Error loading chat sessions:", error);
        setChatSessions([]);
      }
    } else {
      // New user - no existing data
      setChatSessions([]);
      setMessages({ gemini: [], perplexity: [], chatgpt: [] });
      setCurrentSessionId(`session_${Date.now()}`);
    }

    // Load user-specific preferences
    const preferences = localStorage.getItem(`userPreferences_${userId}`);
    if (preferences) {
      try {
        const { bgColor, font, layout: savedLayout, darkMode: savedDarkMode }: UserPreferences = JSON.parse(preferences);
        setBackgroundColor(bgColor || "default");
        setFontSize(font || "medium");
        setLayout(savedLayout || "grid");
        setDarkMode(savedDarkMode || false);
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const preferences: UserPreferences = {
      bgColor: backgroundColor,
      font: fontSize,
      layout: layout,
      darkMode: darkMode,
      userId: currentUser.id
    };
    localStorage.setItem(`userPreferences_${currentUser.id}`, JSON.stringify(preferences));
  }, [backgroundColor, fontSize, layout, darkMode, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    if (currentSessionId && (messages.gemini.length > 0 || messages.perplexity.length > 0 || messages.chatgpt.length > 0)) {
      const autoSave = setTimeout(() => {
        saveToHistory();
      }, 2000);

      return () => clearTimeout(autoSave);
    }
  }, [messages, currentSessionId, currentUser]);

  const saveToHistory = () => {
    if (!currentUser) return;
    
    if (messages.gemini.length === 0 && messages.perplexity.length === 0 && messages.chatgpt.length === 0) {
      return;
    }

    const sessionId = currentSessionId || `session_${Date.now()}`;
    const firstUserMessage = messages.gemini.find(m => m.role === "user") || 
                            messages.perplexity.find(m => m.role === "user") || 
                            messages.chatgpt.find(m => m.role === "user");
    
    const sessionTitle = firstUserMessage 
      ? (firstUserMessage.content.length > 30 
          ? firstUserMessage.content.substring(0, 30) + "..." 
          : firstUserMessage.content)
      : `Chat ${new Date().toLocaleString()}`;

    const session: ChatSession = {
      id: sessionId,
      title: sessionTitle,
      messages: messages,
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messageCount: messages.gemini.length + messages.perplexity.length + messages.chatgpt.length,
      category: "recent",
      tags: [],
      userId: currentUser.id
    };

    const existingSessionIndex = chatSessions.findIndex(s => s.id === sessionId);
    let updatedSessions: ChatSession[];

    if (existingSessionIndex >= 0) {
      updatedSessions = [...chatSessions];
      updatedSessions[existingSessionIndex] = session;
    } else {
      updatedSessions = [...chatSessions, session];
    }
    
    setChatSessions(updatedSessions);
    setCurrentSessionId(sessionId);
    localStorage.setItem(`chatSessions_${currentUser.id}`, JSON.stringify(updatedSessions));
  };

  const loadSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(sessionId);
      setShowChatHistory(false);
      setExpandedPanel(null);
    }
  };

  const startNewChat = () => {
    if (messages.gemini.length > 0 || messages.perplexity.length > 0 || messages.chatgpt.length > 0) {
      saveToHistory();
    }
    
    setMessages({
      gemini: [],
      perplexity: [],
      chatgpt: [],
    });
    setCurrentSessionId(`session_${Date.now()}`);
    setExpandedPanel(null);
  };

  const deleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat session?")) {
      const updatedSessions = chatSessions.filter(s => s.id !== sessionId);
      setChatSessions(updatedSessions);
      if (currentUser) {
        localStorage.setItem(`chatSessions_${currentUser.id}`, JSON.stringify(updatedSessions));
      }
      
      if (sessionId === currentSessionId) {
        startNewChat();
      }
    }
  };

  const clearAllHistory = () => {
    if (confirm("Are you sure you want to clear ALL chat history?")) {
      setChatSessions([]);
      if (currentUser) {
        localStorage.removeItem(`chatSessions_${currentUser.id}`);
      }
      startNewChat();
    }
  };

  const exportAllChats = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      user: currentUser?.email,
      totalSessions: chatSessions.length,
      sessions: chatSessions
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-chat-backup-${currentUser?.email}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const filteredSessions = chatSessions.filter(session => {
    const sessionTags = session.tags || [];
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sessionTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === "all" || session.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    Object.values(chatRefs).forEach(ref => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    });
  }, [messages]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      router.push("/login");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const downloadChatHistory = (provider: string) => {
    const chatHistory = messages[provider]
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}${msg.codeBlocks ? '\n\nCODE:\n' + msg.codeBlocks.map(cb => cb.code).join('\n\n') : ''}`)
      .join("\n\n");
    
    const blob = new Blob([chatHistory], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${provider}-chat-${new Date().toISOString()}.txt`;
    a.click();
  };

  const clearChat = (provider: string) => {
    if (confirm(`Clear ${provider} chat history?`)) {
      setMessages((prev) => ({
        ...prev,
        [provider]: [],
      }));
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setInput("Sample voice input: Tell me about AI");
        setIsRecording(false);
      }, 2000);
    }
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const formatResponse = (content: string) => {
    if (!content) return { explanation: "", codeBlocks: [] };

    let cleanContent = content.replace(/\n\s*\n/g, '\n\n').trim();
    
    const codeBlocks: CodeBlock[] = [];
    let explanation = cleanContent.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
      const codeBlock: CodeBlock = {
        language: lang || 'text',
        code: code.trim()
      };
      codeBlocks.push(codeBlock);
      return `\n\n[CODE_BLOCK_${codeBlocks.length - 1}]\n\n`;
    });

    explanation = explanation
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return {
      explanation: explanation,
      codeBlocks: codeBlocks
    };
  };

  const sendToAI = async (provider: string, text: string) => {
    setLoading((prev) => ({ ...prev, [provider]: true }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, message: text }),
      });

      const data = await response.json();

      if (data.success) {
        const content = data.content || "";
        const formatted = formatResponse(content);

        setMessages((prev) => ({
          ...prev,
          [provider]: [
            ...prev[provider],
            {
              role: "bot",
              content: formatted.explanation || "Here's the response:",
              codeBlocks: formatted.codeBlocks,
              timestamp: new Date().toLocaleTimeString(),
            },
          ],
        }));
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessages((prev) => ({
        ...prev,
        [provider]: [
          ...prev[provider],
          { 
            role: "bot", 
            content: `Error: ${(error as Error).message}`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      }));
    }

    setLoading((prev) => ({ ...prev, [provider]: false }));
  };

  const sendToAll = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: "user", 
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => ({
      gemini: [...prev.gemini, userMessage],
      perplexity: [...prev.perplexity, userMessage],
      chatgpt: [...prev.chatgpt, userMessage],
    }));

    const query = input;
    setInput("");
    await Promise.all([
      sendToAI("gemini", query),
      sendToAI("perplexity", query),
      sendToAI("chatgpt", query),
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendToAll();
    }
  };

  const togglePanel = (provider: string) => {
    setExpandedPanel(expandedPanel === provider ? null : provider);
  };

  interface ChatSectionProps {
    title: string;
    messages: Message[];
    loading: boolean;
    gradient: string;
    icon: React.ComponentType<any>;
    provider: string;
  }

  const ChatSection: React.FC<ChatSectionProps> = ({
    title,
    messages,
    loading,
    gradient,
    icon: Icon,
    provider,
  }) => (
    <div className={`chat-section ${expandedPanel && expandedPanel !== provider ? 'hidden' : ''} ${expandedPanel === provider ? 'expanded' : ''}`}>
      <div className={`chat-header gradient-${gradient.split(' ')[0].replace('from-', '')}`}>
        <div className="header-left">
          <div className="icon-wrapper">
            <Icon className="header-icon" />
          </div>
          <div>
            <h2 className="chat-title">{title}</h2>
            <p className="message-count">{messages.length} messages</p>
          </div>
        </div>
        
        <div className="header-actions">
          <button onClick={() => togglePanel(provider)} className="action-btn" title={expandedPanel === provider ? "Minimize" : "Maximize"}>
            {expandedPanel === provider ? <Minimize2 className="action-icon" /> : <Maximize2 className="action-icon" />}
          </button>
          <button onClick={() => downloadChatHistory(provider)} className="action-btn" title="Download Chat">
            <Download className="action-icon" />
          </button>
          <button onClick={() => clearChat(provider)} className="action-btn" title="Clear Chat">
            <Trash2 className="action-icon" />
          </button>
        </div>
      </div>

      <div ref={chatRefs[provider as keyof typeof chatRefs]} className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <Icon className="empty-icon" />
            <p className="empty-title">Waiting for your question...</p>
            <p className="empty-subtitle">Ask anything and compare AI responses!</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}>
            {msg.role === "user" ? (
              <div className="message-bubble user-bubble">
                <div className="message-header">
                  <div className="user-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <span className="sender-name">You</span>
                </div>
                <p className="message-text">{msg.content}</p>
                <span className="message-time">{msg.timestamp}</span>
                <button onClick={() => copyToClipboard(msg.content)} className="copy-btn">
                  <Copy className="copy-icon" />
                </button>
              </div>
            ) : (
              <div className="message-bubble bot-bubble">
                <div className="bot-header">
                  <div className={`bot-avatar gradient-${gradient.split(' ')[0].replace('from-', '')}`}>
                    <Icon className="bot-icon" />
                  </div>
                  <span className="bot-name">{title} Response</span>
                </div>
                
                <div className="bot-content">
                  {msg.content && msg.content.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="bot-paragraph">{paragraph}</p>
                  ))}
                </div>

                {msg.codeBlocks && msg.codeBlocks.length > 0 && (
                  <div className="code-blocks">
                    {msg.codeBlocks.map((codeBlock, codeIdx) => (
                      <div key={codeIdx} className="code-block">
                        <div className="code-header">
                          <div className="code-lang">
                            <Code className="code-icon" />
                            <span>{codeBlock.language}</span>
                          </div>
                          <button onClick={() => copyToClipboard(codeBlock.code)} className="code-copy-btn" title="Copy Code">
                            <Copy className="code-copy-icon" />
                          </button>
                        </div>
                        <pre className="code-content">{codeBlock.code}</pre>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="bot-footer">
                  <span className="bot-time">{msg.timestamp}</span>
                  <div className="bot-actions">
                    <button onClick={() => copyToClipboard(msg.content)} className="bot-action-btn" title="Copy Text">
                      <Copy className="bot-action-icon" />
                    </button>
                    <button onClick={() => speakText(msg.content)} className="bot-action-btn" title="Read Aloud">
                      <Volume2 className="bot-action-icon" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="loading-indicator">
            <div className={`loading-avatar gradient-${gradient.split(' ')[0].replace('from-', '')}`}>
              <Icon className="loading-icon" />
            </div>
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (!currentUser) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`dashboard bg-${backgroundColor}`}>
      {/* Header */}
      <div className="main-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Sparkles className="sparkle-icon" />
            </div>
            <div>
              <h1 className="main-title">TRIO AI</h1>
              <p className="main-subtitle">Compare responses from ChatGPT, Gemini & Perplexity</p>
            </div>
          </div>

          <div className="header-controls">
            <div className="header-buttons">
              <button onClick={() => setShowChatHistory(!showChatHistory)} className="header-btn history-btn" title="Chat History">
                <History className="btn-icon" />
              </button>
              <button onClick={startNewChat} className="header-btn new-chat-btn" title="New Chat">
                <Plus className="btn-icon" />
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className="header-btn settings-btn" title="Settings">
                <Settings className="btn-icon" />
              </button>
            </div>

            {/* Profile and Logout Section */}
            <div className="profile-logout-section" ref={profileRef}>
              <div 
                className="profile-icon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title={currentUser.name}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-info">
                    <div className="profile-avatar">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-details">
                      <p className="profile-name">{currentUser.name}</p>
                      <p className="profile-email">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="profile-menu-divider"></div>
                  <button 
                    onClick={handleLogout}
                    className="profile-menu-item logout-menu-item"
                  >
                    <LogOut className="menu-item-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              <button onClick={handleLogout} className="logout-btn">
                <LogOut className="btn-icon" /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="settings-panel">
            <div className="settings-header">
              <h3 className="settings-title">
                <Settings className="settings-icon" />
                Settings & Preferences
              </h3>
              <button onClick={() => setShowSettings(false)} className="close-btn">
                <X className="close-icon" />
              </button>
            </div>
            
            <div className="settings-grid">
              <div className="settings-section">
                <h4 className="section-title">
                  <Palette className="section-icon" /> Appearance
                </h4>
                
                <div className="form-group">
                  <label className="form-label">Background Theme</label>
                  <select value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="form-select">
                    <option value="default">Default Blue</option>
                    <option value="professional">Professional</option>
                    <option value="nature">Nature Green</option>
                    <option value="ocean">Ocean Blue</option>
                    <option value="sunset">Sunset Orange</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Layout Style</label>
                  <select value={layout} onChange={(e) => setLayout(e.target.value)} className="form-select">
                    <option value="grid">Grid Layout</option>
                    <option value="vertical">Vertical Stack</option>
                  </select>
                </div>
              </div>

              <div className="settings-section">
                <h4 className="section-title">
                  <Type className="section-icon" /> Text & Display
                </h4>
                
                <div className="form-group">
                  <label className="form-label">Font Size</label>
                  <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="form-select">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div className="auto-save-info">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={true} readOnly className="checkbox-input" />
                    Auto-save enabled (every 2s)
                  </label>
                </div>
              </div>
            </div>

            <div className="data-management">
              <h4 className="section-title">Data Management</h4>
              <div className="action-buttons">
                <button onClick={exportAllChats} className="export-btn">
                  <Download className="btn-icon" />
                  Export All Chats
                </button>
                <button onClick={clearAllHistory} className="clear-btn">
                  <Trash2 className="btn-icon" />
                  Clear All History
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat History Panel */}
        {showChatHistory && (
          <div className="history-panel">
            <div className="history-header">
              <h3 className="history-title">📚 Chat History ({chatSessions.length})</h3>
              <div className="history-actions">
                {chatSessions.length > 0 && (
                  <button onClick={exportAllChats} className="export-small-btn">Export</button>
                )}
                <button onClick={() => setShowChatHistory(false)} className="close-btn">
                  <X className="close-icon" />
                </button>
              </div>
            </div>

            <div className="search-wrapper">
              <div className="search-icon-wrapper">
                <Search className="search-icon" />
              </div>
              <input
                type="text"
                placeholder="Search your conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                  <X className="clear-search-icon" />
                </button>
              )}
            </div>

            <div className="categories">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
            
            <div className="sessions-list">
              {filteredSessions.length === 0 ? (
                <div className="no-sessions">
                  <History className="no-sessions-icon" />
                  <p className="no-sessions-text">
                    {chatSessions.length === 0 ? 'No chat history yet' : 'No matching chats found'}
                  </p>
                </div>
              ) : (
                <div className="sessions">
                  {filteredSessions.slice().reverse().map((session) => (
                    <div
                      key={session.id}
                      onClick={() => loadSession(session.id)}
                      className={`session-item ${currentSessionId === session.id ? 'active' : ''}`}
                    >
                      <div className="session-content">
                        <p className="session-title">
                          <ChevronRight className="chevron-icon" />
                          {session.title}
                        </p>
                        <div className="session-meta">
                          <p className="session-date">
                            {new Date(session.timestamp).toLocaleDateString()}
                          </p>
                          <span className="session-count">
                            {session.messageCount} msgs
                          </span>
                        </div>
                      </div>
                      <button onClick={(e) => deleteSession(session.id, e)} className="delete-session-btn">
                        <Trash2 className="delete-icon" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chat Panels */}
      <div className={`chat-container layout-${layout}`}>
        <ChatSection
          title="Gemini"
          messages={messages.gemini}
          loading={loading.gemini}
          gradient="from-purple-500 to-pink-500"
          icon={Sparkles}
          provider="gemini"
        />
        <ChatSection
          title="Perplexity"
          messages={messages.perplexity}
          loading={loading.perplexity}
          gradient="from-blue-500 to-cyan-500"
          icon={Zap}
          provider="perplexity"
        />
        <ChatSection
          title="ChatGPT"
          messages={messages.chatgpt}
          loading={loading.chatgpt}
          gradient="from-green-500 to-emerald-500"
          icon={Brain}
          provider="chatgpt"
        />
      </div>

      {/* Input Section */}
      <div className="input-section">
        <div className="input-container">
          <div className="input-wrapper">
            <button onClick={toggleRecording} className={`voice-btn ${isRecording ? 'recording' : ''}`} title="Voice Input">
              {isRecording ? <StopCircle className="voice-icon pulse" /> : <Mic className="voice-icon" />}
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask all AIs at once"
              className="main-input"
              disabled={loading.gemini || loading.perplexity || loading.chatgpt}
            />
            
            <button
              onClick={sendToAll}
              disabled={loading.gemini || loading.perplexity || loading.chatgpt || !input.trim()}
              className="send-btn"
            >
              <Send className="send-icon" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}