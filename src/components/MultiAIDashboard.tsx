"use client";
import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles, Zap, Brain, LogOut, Code, Copy, Download, Trash2, Settings, Moon, Sun, Mic, StopCircle, Volume2, Maximize2, Minimize2, History, MessageSquare, Palette, Type, Layout, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MultiAIDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState({
    gemini: [],
    perplexity: [],
    chatgpt: [],
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState({
    gemini: false,
    perplexity: false,
    chatgpt: false,
  });
  const [darkMode, setDarkMode] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [expandedPanel, setExpandedPanel] = useState(null);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("default");
  const [layout, setLayout] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const chatRefs = {
    gemini: useRef(null),
    perplexity: useRef(null),
    chatgpt: useRef(null),
  };

  // Background themes
  const backgroundThemes = {
    default: darkMode 
      ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900' 
      : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100',
    professional: darkMode 
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800'
      : 'bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200',
    nature: darkMode
      ? 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900'
      : 'bg-gradient-to-br from-green-50 via-emerald-100 to-teal-100',
    ocean: darkMode
      ? 'bg-gradient-to-br from-blue-900 via-cyan-800 to-sky-900'
      : 'bg-gradient-to-br from-blue-50 via-cyan-100 to-sky-100',
    sunset: darkMode
      ? 'bg-gradient-to-br from-orange-900 via-red-800 to-purple-900'
      : 'bg-gradient-to-br from-orange-50 via-red-100 to-purple-100',
  };

  // Categories for organizing chats
  const categories = [
    { id: "all", name: "All Chats", count: 0 },
    { id: "recent", name: "Recent", count: 0 },
    { id: "programming", name: "Programming", count: 0 },
    { id: "research", name: "Research", count: 0 },
    { id: "creative", name: "Creative", count: 0 },
    { id: "business", name: "Business", count: 0 },
    { id: "education", name: "Education", count: 0 }
  ];

  // Load chat sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("chatSessions");
    if (savedSessions) {
      try {
        const sessions = JSON.parse(savedSessions);
        // Ensure each session has required properties
        const validatedSessions = sessions.map(session => ({
          id: session.id || `session_${Date.now()}`,
          title: session.title || "Untitled Chat",
          messages: session.messages || { gemini: [], perplexity: [], chatgpt: [] },
          timestamp: session.timestamp || new Date().toISOString(),
          lastUpdated: session.lastUpdated || new Date().toISOString(),
          messageCount: session.messageCount || 0,
          category: session.category || "recent",
          tags: session.tags || [] // Ensure tags array exists
        }));
        setChatSessions(validatedSessions);
        
        // Load the latest session if available
        if (validatedSessions.length > 0) {
          const latestSession = validatedSessions[validatedSessions.length - 1];
          setCurrentSessionId(latestSession.id);
          setMessages(latestSession.messages);
        }
      } catch (error) {
        console.error("Error loading chat sessions:", error);
        setChatSessions([]);
      }
    }

    // Load user preferences
    const preferences = localStorage.getItem("userPreferences");
    if (preferences) {
      try {
        const { bgColor, font, layout: savedLayout } = JSON.parse(preferences);
        setBackgroundColor(bgColor || "default");
        setFontSize(font || "medium");
        setLayout(savedLayout || "grid");
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const preferences = {
      bgColor: backgroundColor,
      font: fontSize,
      layout: layout,
      darkMode: darkMode
    };
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [backgroundColor, fontSize, layout, darkMode]);

  // Auto-save current session when messages change
  useEffect(() => {
    if (currentSessionId && (messages.gemini.length > 0 || messages.perplexity.length > 0 || messages.chatgpt.length > 0)) {
      const autoSave = setTimeout(() => {
        saveToHistory();
      }, 2000);

      return () => clearTimeout(autoSave);
    }
  }, [messages, currentSessionId]);

  // Save current session to chat history
  const saveToHistory = () => {
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

    const session = {
      id: sessionId,
      title: sessionTitle,
      messages: messages,
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messageCount: messages.gemini.length + messages.perplexity.length + messages.chatgpt.length,
      category: "recent",
      tags: []
    };

    const existingSessionIndex = chatSessions.findIndex(s => s.id === sessionId);
    let updatedSessions;

    if (existingSessionIndex >= 0) {
      // Update existing session
      updatedSessions = [...chatSessions];
      updatedSessions[existingSessionIndex] = session;
    } else {
      // Add new session
      updatedSessions = [...chatSessions, session];
    }
    
    setChatSessions(updatedSessions);
    setCurrentSessionId(sessionId);
    localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
  };

  // Load session from history
  const loadSession = (sessionId) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(sessionId);
      setShowChatHistory(false);
      setExpandedPanel(null);
    }
  };

  // Start new chat session
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

  // Delete chat session
  const deleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat session?")) {
      const updatedSessions = chatSessions.filter(s => s.id !== sessionId);
      setChatSessions(updatedSessions);
      localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
      
      if (sessionId === currentSessionId) {
        startNewChat();
      }
    }
  };

  // Clear all history
  const clearAllHistory = () => {
    if (confirm("Are you sure you want to clear ALL chat history? This action cannot be undone.")) {
      setChatSessions([]);
      localStorage.removeItem("chatSessions");
      startNewChat();
    }
  };

  // Export all chat history
  const exportAllChats = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalSessions: chatSessions.length,
      sessions: chatSessions
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-chat-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Filter sessions based on search and category
  const filteredSessions = chatSessions.filter(session => {
    const sessionTags = session.tags || [];
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sessionTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === "all" || session.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get session statistics
  const getSessionStats = () => {
    const totalMessages = chatSessions.reduce((sum, session) => sum + (session.messageCount || 0), 0);
    const categoriesCount = {};
    
    chatSessions.forEach(session => {
      const category = session.category || "recent";
      categoriesCount[category] = (categoriesCount[category] || 0) + 1;
    });

    return { totalMessages, categoriesCount };
  };

  const sessionStats = getSessionStats();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    Object.values(chatRefs).forEach(ref => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    });
  }, [messages]);

  // 🚪 Logout
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  // 📋 Copy to Clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // 💾 Download Chat History
  const downloadChatHistory = (provider) => {
    const chatHistory = messages[provider]
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}${msg.code ? '\n\nCODE:\n' + msg.code : ''}`)
      .join("\n\n");
    
    const blob = new Blob([chatHistory], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${provider}-chat-${new Date().toISOString()}.txt`;
    a.click();
  };

  // 🗑️ Clear Chat
  const clearChat = (provider) => {
    if (confirm(`Clear ${provider} chat history?`)) {
      setMessages((prev) => ({
        ...prev,
        [provider]: [],
      }));
    }
  };

  // 🎤 Voice Input (simulated)
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setInput("Sample voice input: Tell me about AI");
        setIsRecording(false);
      }, 2000);
    }
  };

  // 🔊 Text to Speech
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Format API response for better readability
  const formatResponse = (content) => {
    if (!content) return { explanation: "", codeBlocks: [] };

    // Remove extra spaces and normalize line breaks
    let cleanContent = content.replace(/\n\s*\n/g, '\n\n').trim();
    
    // Extract code blocks
    const codeBlocks = [];
    let explanation = cleanContent.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
      const codeBlock = {
        language: lang || 'text',
        code: code.trim()
      };
      codeBlocks.push(codeBlock);
      return `\n\n[CODE_BLOCK_${codeBlocks.length - 1}]\n\n`;
    });

    // Clean up explanation
    explanation = explanation
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
      .replace(/\*(.*?)\*/g, '$1')     // Remove markdown italic
      .replace(/#{1,6}\s?/g, '')       // Remove markdown headers
      .replace(/\n{3,}/g, '\n\n')      // Limit consecutive newlines
      .trim();

    return {
      explanation: explanation,
      codeBlocks: codeBlocks
    };
  };

  // ✉️ Send to specific AI
  const sendToAI = async (provider, text) => {
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
            content: `Error: ${error.message}`,
            timestamp: new Date().toLocaleTimeString(),
          },
        ],
      }));
    }

    setLoading((prev) => ({ ...prev, [provider]: false }));
  };

  // 🧠 Send to All
  const sendToAll = async () => {
    if (!input.trim()) return;

    const userMessage = { 
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendToAll();
    }
  };

  const fontSizes = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  // Toggle panel expansion
  const togglePanel = (provider) => {
    setExpandedPanel(expandedPanel === provider ? null : provider);
  };

  // 💬 Chat Section
  const ChatSection = ({
    title,
    messages,
    loading,
    gradient,
    icon: Icon,
    provider,
  }) => (
    <div className={`flex-1 flex flex-col bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all ${
      expandedPanel && expandedPanel !== provider ? 'hidden' : ''
    } ${expandedPanel === provider ? 'col-span-3' : ''}`}>
      <div className={`bg-gradient-to-r ${gradient} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="text-white/70 text-xs">{messages.length} messages</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => togglePanel(provider)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
            title={expandedPanel === provider ? "Minimize" : "Maximize"}
          >
            {expandedPanel === provider ? (
              <Minimize2 className="w-4 h-4 text-white" />
            ) : (
              <Maximize2 className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={() => downloadChatHistory(provider)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
            title="Download Chat"
          >
            <Download className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => clearChat(provider)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div 
        ref={chatRefs[provider]}
        className="flex-1 overflow-y-auto p-4 space-y-4 leading-relaxed custom-scrollbar"
      >
        {messages.length === 0 && (
          <div className="text-center text-white/50 mt-8">
            <Icon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Waiting for your question...</p>
            <p className="text-sm mt-2">Ask anything and compare AI responses!</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-2 ${
              msg.role === "user" ? "items-end" : "items-start"
            } animate-fadeIn`}
          >
            {msg.role === "user" ? (
              <div className="group relative max-w-md">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-purple-300" />
                    <span className="text-xs text-purple-300 font-semibold">You</span>
                  </div>
                  <p className={`${fontSizes[fontSize]} leading-relaxed whitespace-pre-wrap`}>{msg.content}</p>
                  <span className="text-xs text-white/50 mt-2 block">{msg.timestamp}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(msg.content)}
                  className="absolute top-2 right-2 p-1 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <div className="group relative max-w-2xl w-full">
                <div className="bg-white/10 text-white p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-white/80" />
                    <span className="text-xs text-white/80 font-semibold">{title}</span>
                  </div>
                  
                  <div className={`${fontSizes[fontSize]} whitespace-pre-wrap leading-relaxed space-y-3`}>
                    {msg.content && msg.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-white/90">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {msg.codeBlocks && msg.codeBlocks.length > 0 && (
                    <div className="space-y-3 mt-4">
                      {msg.codeBlocks.map((codeBlock, codeIdx) => (
                        <div key={codeIdx} className="bg-black/70 rounded-lg overflow-hidden border border-white/10">
                          <div className="flex items-center justify-between bg-black/40 px-3 py-2 border-b border-white/10">
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                              <Code className="w-3 h-3" />
                              <span className="font-mono">{codeBlock.language}</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(codeBlock.code)}
                              className="p-1 hover:bg-white/10 rounded transition-all"
                              title="Copy Code"
                            >
                              <Copy className="w-3 h-3 text-gray-300" />
                            </button>
                          </div>
                          <pre className={`p-4 text-green-300 font-mono ${fontSizes[fontSize]} overflow-x-auto leading-relaxed`}>
                            {codeBlock.code}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                    <span className="text-xs text-white/50">{msg.timestamp}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(msg.content)}
                        className="p-1 hover:bg-white/10 rounded transition-all"
                        title="Copy Text"
                      >
                        <Copy className="w-3 h-3 text-white/70" />
                      </button>
                      <button
                        onClick={() => speakText(msg.content)}
                        className="p-1 hover:bg-white/10 rounded transition-all"
                        title="Read Aloud"
                      >
                        <Volume2 className="w-3 h-3 text-white/70" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start animate-fadeIn">
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}
            >
              <Icon className="w-5 h-5 text-white animate-spin" />
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`h-screen ${backgroundThemes[backgroundColor]} flex flex-col relative overflow-hidden transition-all duration-500`}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <div className={`relative z-10 ${darkMode ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-xl border-b ${darkMode ? 'border-white/20' : 'border-gray-300'} p-4 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Multi-AI Dashboard
              </h1>
              <p className={`${darkMode ? 'text-purple-200' : 'text-purple-600'} text-sm`}>
                Compare and visualize AI responses in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChatHistory(!showChatHistory)}
              className={`p-3 ${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200 hover:bg-gray-300'} rounded-full transition-all`}
              title="Chat History"
            >
              <History className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>

            <button
              onClick={startNewChat}
              className={`p-3 ${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200 hover:bg-gray-300'} rounded-full transition-all`}
              title="New Chat"
            >
              <MessageSquare className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 ${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200 hover:bg-gray-300'} rounded-full transition-all`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-gray-900" />}
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-3 ${darkMode ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-200 hover:bg-gray-300'} rounded-full transition-all`}
              title="Settings"
            >
              <Settings className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full transition-all shadow-lg hover:scale-105 transform"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className={`mt-4 p-6 ${darkMode ? 'bg-white/10' : 'bg-white/90'} rounded-xl border ${darkMode ? 'border-white/20' : 'border-gray-300'} backdrop-blur-sm animate-fadeIn`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings & Preferences</h3>
              <button
                onClick={() => setShowSettings(false)}
                className={`p-1 ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200'} rounded`}
              >
                <Minimize2 className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appearance Settings */}
              <div className="space-y-4">
                <h4 className={`font-medium flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Palette className="w-4 h-4" /> Appearance
                </h4>
                
                <div>
                  <label className={`block text-sm mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                    Background Theme
                  </label>
                  <select
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className={`w-full px-3 py-2 ${darkMode ? 'bg-white/20 text-white' : 'bg-white text-gray-900'} rounded-lg border ${darkMode ? 'border-white/20' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="default">Default Purple</option>
                    <option value="professional">Professional Blue</option>
                    <option value="nature">Nature Green</option>
                    <option value="ocean">Ocean Blue</option>
                    <option value="sunset">Sunset Orange</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                    Layout
                  </label>
                  <select
                    value={layout}
                    onChange={(e) => setLayout(e.target.value)}
                    className={`w-full px-3 py-2 ${darkMode ? 'bg-white/20 text-white' : 'bg-white text-gray-900'} rounded-lg border ${darkMode ? 'border-white/20' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="grid">Grid Layout</option>
                    <option value="vertical">Vertical Stack</option>
                  </select>
                </div>
              </div>

              {/* Text Settings */}
              <div className="space-y-4">
                <h4 className={`font-medium flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Type className="w-4 h-4" /> Text & Display
                </h4>
                
                <div>
                  <label className={`block text-sm mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                    Font Size
                  </label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className={`w-full px-3 py-2 ${darkMode ? 'bg-white/20 text-white' : 'bg-white text-gray-900'} rounded-lg border ${darkMode ? 'border-white/20' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                    Auto-save Chats
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      className="w-4 h-4 text-purple-500 bg-white/20 border-white/20 rounded focus:ring-purple-500"
                    />
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Enabled (every 2 seconds)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Management */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Management</h4>
              <div className="flex gap-3">
                <button
                  onClick={exportAllChats}
                  className="px-4 py-2 bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded-lg transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export All Chats
                </button>
                <button
                  onClick={clearAllHistory}
                  className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All History
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Chat History Panel */}
        {showChatHistory && (
          <div className={`mt-4 ${darkMode ? 'bg-white/10' : 'bg-white/90'} rounded-xl border ${darkMode ? 'border-white/20' : 'border-gray-300'} backdrop-blur-sm animate-fadeIn max-h-96 overflow-hidden flex flex-col`}>
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Chat History ({chatSessions.length} sessions)
                </h3>
                <div className="flex gap-2">
                  {chatSessions.length > 0 && (
                    <button
                      onClick={exportAllChats}
                      className="px-3 py-1 text-xs bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded-lg transition-all"
                    >
                      Export
                    </button>
                  )}
                  <button
                    onClick={() => setShowChatHistory(false)}
                    className={`p-1 ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200'} rounded`}
                  >
                    <Minimize2 className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Total Chats</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{chatSessions.length}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Total Messages</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sessionStats.totalMessages}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Categories</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Object.keys(sessionStats.categoriesCount).length}</p>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>Active</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{currentSessionId ? 'Yes' : 'No'}</p>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 ${darkMode ? 'bg-white/10 text-white placeholder-white/50' : 'bg-white text-gray-900 placeholder-gray-500'} rounded-lg border ${darkMode ? 'border-white/20' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className={`w-4 h-4 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-all ${
                      activeCategory === category.id
                        ? 'bg-purple-500 text-white'
                        : darkMode
                          ? 'bg-white/10 text-white/70 hover:bg-white/20'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                    {sessionStats.categoriesCount[category.id] && (
                      <span className="ml-1 text-xs opacity-70">
                        ({sessionStats.categoriesCount[category.id]})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {filteredSessions.length === 0 ? (
                <div className="text-center py-8">
                  <History className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} />
                  <p className={`${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {chatSessions.length === 0 ? 'No chat history yet' : 'No matching chats found'}
                  </p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-white/40' : 'text-gray-400'}`}>
                    {chatSessions.length === 0 ? 'Start a conversation to see your history here' : 'Try changing your search or filter'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSessions.slice().reverse().map((session) => (
                    <div
                      key={session.id}
                      onClick={() => loadSession(session.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all border ${
                        currentSessionId === session.id 
                          ? 'bg-purple-500/30 border-purple-500/50' 
                          : darkMode 
                            ? 'bg-white/5 hover:bg-white/10 border-white/10' 
                            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {session.title}
                            </p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              session.category === 'programming' ? 'bg-blue-500/20 text-blue-300' :
                              session.category === 'research' ? 'bg-green-500/20 text-green-300' :
                              session.category === 'creative' ? 'bg-purple-500/20 text-purple-300' :
                              session.category === 'business' ? 'bg-yellow-500/20 text-yellow-300' :
                              session.category === 'education' ? 'bg-red-500/20 text-red-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {session.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                              {new Date(session.timestamp).toLocaleString()}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                              {session.messageCount} messages
                            </p>
                            {(session.tags && session.tags.length > 0) ? (
                              <div className="flex gap-1">
                                {session.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className={`px-1 py-0.5 text-xs rounded ${
                                    darkMode ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-600'
                                  }`}>
                                    #{tag}
                                  </span>
                                ))}
                                {session.tags.length > 2 && (
                                  <span className={`px-1 py-0.5 text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                                    +{session.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <button
                          onClick={(e) => deleteSession(session.id, e)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-all ml-2"
                          title="Delete Session"
                        >
                          <Trash2 className={`w-4 h-4 ${darkMode ? 'text-white/60' : 'text-gray-600'}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chat Panels */}
      <div className="flex-1 relative z-10 p-4 overflow-hidden">
        <div className={`max-w-7xl mx-auto h-full gap-4 ${
          expandedPanel ? 'grid grid-cols-3' : 
          layout === 'vertical' ? 'flex flex-col' : 'flex'
        }`}>
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
      </div>

      {/* Input */}
      <div className={`relative z-10 ${darkMode ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-xl border-t ${darkMode ? 'border-white/20' : 'border-gray-300'} p-4 shadow-lg`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {currentSessionId && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}>
                  💾 Auto-saving...
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                {chatSessions.length} saved chats
              </span>
            </div>
          </div>

          <div className={`flex gap-3 ${darkMode ? 'bg-white/20' : 'bg-white'} backdrop-blur-sm rounded-full p-2 shadow-xl border ${darkMode ? 'border-white/20' : 'border-gray-300'}`}>
            <button
              onClick={toggleRecording}
              className={`p-3 ${isRecording ? 'bg-red-500' : darkMode ? 'bg-white/20' : 'bg-gray-200'} hover:bg-opacity-80 rounded-full transition-all`}
              title="Voice Input"
            >
              {isRecording ? (
                <StopCircle className="w-5 h-5 text-white animate-pulse" />
              ) : (
                <Mic className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
              )}
            </button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask all AIs at once... (Press Enter to send)"
              className={`flex-1 px-6 py-3 bg-transparent ${darkMode ? 'text-white placeholder-purple-200' : 'text-gray-900 placeholder-gray-500'} focus:outline-none ${fontSizes[fontSize]}`}
              disabled={loading.gemini || loading.perplexity || loading.chatgpt}
            />
            
            <button
              onClick={sendToAll}
              disabled={
                loading.gemini ||
                loading.perplexity ||
                loading.chatgpt ||
                !input.trim()
              }
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-105 transform flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="font-semibold">Send to All</span>
            </button>
          </div>
          <p className={`text-center ${darkMode ? 'text-purple-200' : 'text-purple-600'} text-xs mt-2`}>
            ✨ Compare AI responses • Auto-saves history • Multiple themes • Clean formatting
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}