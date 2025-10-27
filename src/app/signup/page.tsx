"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Lock, ArrowRight, Github, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeNav, setActiveNav] = useState("home");

  // Supabase email/password signup
  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please enter both email and password!");
      return;
    }

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
    } else {
      setError("");
      alert(
        "Signup successful! Please check your email to confirm and login."
      );
      router.push("/login");
    }
  };

  // Optional: GitHub OAuth signup
  const handleGitHubSignup = async () => {
    const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (oauthError) setError(oauthError.message);
  };

  const aiPlatforms = [
    { name: "ChatGPT", color: "from-emerald-400 to-teal-400", icon: "🤖" },
    { name: "Gemini", color: "from-blue-400 to-indigo-400", icon: "✨" },
    { name: "Perplexity", color: "from-indigo-400 to-purple-400", icon: "🔍" }
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
                  CHATBOT
                </h1>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Service</p>
              </div>
            </motion.div>

            {/* Nav Links */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-8"
            >
              {["Home", "About us", "Blog", "Contacts"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveNav(item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
                    activeNav === item.toLowerCase() ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </motion.div>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <button 
                onClick={() => router.push("/login")}
                className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                Login
              </button>
              <button 
                onClick={() => router.push("/signup")}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                Sign Up
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">Multiple AI Models in One Dashboard</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-gray-900">Join the Future of</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Conversations
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              Create your account to access ChatGPT, Gemini, and Perplexity all in one place. 
              Experience the power of multiple AI platforms unified in a single, beautiful dashboard.
            </motion.p>

            {/* AI Platform Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {aiPlatforms.map((platform, idx) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`bg-gradient-to-r ${platform.color} px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <span className="text-white font-semibold text-sm flex items-center gap-2">
                    <span>{platform.icon}</span>
                    {platform.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              {["✓ Access multiple AI models instantly", "✓ Secure and private conversations", "✓ Beautiful, intuitive interface"].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="text-green-500 font-bold">{feature.split(" ")[0]}</span>
                  <span>{feature.substring(2)}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Section - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                >
                  <MessageSquare className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  Create Your Account
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 text-sm"
                >
                  Join thousands using AI smarter
                </motion.p>
              </div>

              <div className="space-y-5">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(79, 70, 229, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignup}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgb(31, 41, 55)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGitHubSignup}
                  className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Github className="w-5 h-5" />
                  <span>Sign up with GitHub</span>
                </motion.button> */}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <p className="text-center text-gray-600 text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => router.push("/login")}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center text-gray-500 text-xs mt-6"
            >
              By signing up, you agree to our Terms & Privacy Policy
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}