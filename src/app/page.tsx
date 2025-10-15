"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Bot, MessageSquare, Shield, Rocket } from "lucide-react";

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const aiPlatforms = [
    { name: "Gemini", color: "from-blue-400 to-cyan-400", icon: Brain },
    { name: "ChatGPT", color: "from-green-400 to-emerald-400", icon: MessageSquare },
    { name: "Perplexity", color: "from-purple-400 to-pink-400", icon: Sparkles }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses from multiple AI models simultaneously"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are encrypted and never stored"
    },
    {
      icon: Rocket,
      title: "Web3 Powered",
      description: "Built on decentralized infrastructure for maximum reliability"
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center text-white overflow-hidden bg-gray-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600/20 via-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-16"
        >
          <div className="text-sm text-gray-400">Wisdomise Task</div>
          <div className="text-sm text-gray-400">Ayda Jebelli</div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center mb-20">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="mx-auto mb-8 w-32 h-32 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl">
              <div className="absolute inset-4 bg-gray-900 rounded-full"></div>
              <Bot className="w-16 h-16 text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-cyan-300 relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))" }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl sm:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
          >
            Web3 AI Chatbot
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 mb-4"
          >
            2024
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Experience the future of AI interaction. Compare responses from <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">Gemini</span>, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-semibold">ChatGPT</span>, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Perplexity</span> in one unified dashboard. Powered by Web3 for unmatched security and decentralization.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 justify-center mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/login'}
              className="group px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-xl relative overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/signup'}
              className="px-10 py-4 rounded-full border-2 border-purple-400/50 text-white font-semibold hover:border-purple-400 transition-all shadow-xl backdrop-blur-sm"
            >
              Sign Up
            </motion.button>
          </motion.div>

          {/* AI Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {aiPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-gray-600 transition-all">
                  <platform.icon className={`w-12 h-12 mb-4 mx-auto text-transparent bg-clip-text bg-gradient-to-br ${platform.color}`} style={{ filter: hoveredCard === index ? "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))" : "none" }} />
                  <h3 className="text-xl font-semibold text-white mb-2">{platform.name}</h3>
                  <p className="text-gray-400 text-sm">Advanced AI model</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all"
              >
                <feature.icon className="w-10 h-10 mb-4 mx-auto text-purple-400" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>Powered by Web3 • Decentralized • Secure</p>
        </motion.div>
      </div>
    </div>
  );
}