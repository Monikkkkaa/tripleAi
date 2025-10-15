"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Wisdomise Task
          </h1>
          <p className="text-xs text-gray-400">Ayda Jebelli</p>
        </div>
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => router.push("/")}
        className="absolute top-8 right-8 bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/40 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:text-white hover:scale-105 shadow-md backdrop-blur-md"
      >
        ← Back to Home
      </motion.button>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-md">
        {/* Logo Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-2xl rotate-45 transform-gpu">
              <div className="w-10 h-10 bg-white/20 rounded-lg -rotate-45 transform-gpu backdrop-blur-sm"></div>
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl opacity-50 blur-md"></div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            Web3 AI Chatbot
          </h2>
          <p className="text-gray-400 text-sm">Join the future of AI conversations</p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Create Account</h3>
            <p className="text-gray-400 text-sm">Start your Web3 journey today</p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
              >
                <p className="text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleSignup}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>

            {/* Optional GitHub OAuth Button */}
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={handleGitHubSignup}
              className="w-full py-4 mt-2 bg-gray-700/50 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-600/50 hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Sign up with GitHub</span>
            </motion.button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-sm">© 2024 Wisdomise. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
