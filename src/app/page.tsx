"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Bot, MessageSquare, Shield, Rocket } from "lucide-react";

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const aiPlatforms = [
    { name: "Gemini", color: "from-blue-400 to-indigo-400", icon: Brain, emoji: "✨" },
    { name: "ChatGPT", color: "from-emerald-400 to-teal-400", icon: MessageSquare, emoji: "🤖" },
    { name: "Perplexity", color: "from-indigo-400 to-purple-400", icon: Sparkles, emoji: "🔍" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses from multiple AI models simultaneously",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are encrypted and never stored",
      color: "text-indigo-500"
    },
    {
      icon: Rocket,
      title: "All in One Dashboard",
      description: "Access ChatGPT, Gemini, and Perplexity in a single interface",
      color: "text-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TRIO AI
                </h1>
              </div>
            </motion.div>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                Login
              </button>
              <button
                onClick={() => (window.location.href = "/signup")}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Sign Up
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-5 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">Multiple AI Models in One Dashboard</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-900">TRIO AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Experience the future of AI interaction. Get answers from{" "}
            <span className="font-semibold text-blue-600">ChatGPT</span>,{" "}
            <span className="font-semibold text-indigo-600">Gemini</span>, and{" "}
            <span className="font-semibold text-purple-600">Perplexity</span>{" "}
            in one unified, beautiful dashboard.
          </motion.p>

          {/* Chatbot Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-20 relative max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-300/30 rounded-full blur-2xl"></div>

              <div className="relative flex items-center justify-center gap-8">
                {/* Laptop */}
                <div className="relative">
                  <div className="w-80 h-48 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-700">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-full flex items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Brain className="w-20 h-20 text-white" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-96 h-4 bg-gray-700 rounded-b-xl mx-auto -mt-1"></div>
                </div>

                {/* Robot */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-16 right-20"
                >
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center">
                      <Bot className="w-20 h-20 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-8 -left-12 bg-white rounded-2xl px-4 py-2 shadow-lg"
                    >
                      <span className="text-2xl">💬</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* AI Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {aiPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl">
                  <div className={`text-5xl mb-4 transform group-hover:scale-110 transition-transform`}>
                    {platform.emoji}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm">Advanced AI model</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:bg-white/80 hover:border-blue-200 transition-all shadow-md hover:shadow-lg"
              >
                <feature.icon className={`w-10 h-10 mb-4 mx-auto ${feature.color}`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Carousel Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center gap-2 mb-8"
          >
            {[0, 1, 2, 3, 4].map((dot) => (
              <div
                key={dot}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  dot === 0 ? "bg-blue-600 w-8" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 bg-gray-900 text-white py-4"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-400">© 2024 TRIO AI. All rights reserved.</p>
            <p className="text-gray-400">Powered by AI • Secure • Fast</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
