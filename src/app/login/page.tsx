"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      return;
    }

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="flex flex-col items-center w-full max-w-md relative z-10">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to continue</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="w-full bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500/50 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500/50 transition"
            />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold"
            >
              Login
            </motion.button>

            <p className="text-gray-400 text-sm text-center">
              Don't have an account?{" "}
              <span className="text-purple-400 cursor-pointer" onClick={() => router.push("/signup")}>
                Sign Up
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
