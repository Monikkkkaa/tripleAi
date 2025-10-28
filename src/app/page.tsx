"use client";
import { useState, useEffect } from "react";
import { Sparkles, Brain, Zap, Bot, MessageSquare, Shield, Rocket, ChevronRight, Check, Star, Users, TrendingUp, Github, Twitter, Linkedin, Mail, ArrowRight, Globe, Heart } from "lucide-react";

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aiPlatforms = [
    { name: "Gemini", color: "from-blue-400 to-indigo-400", icon: Brain, emoji: "✨", desc: "Google's latest AI powerhouse" },
    { name: "ChatGPT", color: "from-emerald-400 to-teal-400", icon: MessageSquare, emoji: "🤖", desc: "OpenAI's conversational genius" },
    { name: "Perplexity", color: "from-indigo-400 to-purple-400", icon: Sparkles, emoji: "🔍", desc: "Research-focused intelligence" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses from multiple AI models simultaneously with zero latency",
      color: "text-yellow-500",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade encryption ensures your conversations remain confidential",
      color: "text-indigo-500",
      gradient: "from-indigo-400 to-purple-400"
    },
    {
      icon: Rocket,
      title: "All-in-One Dashboard",
      description: "Seamlessly switch between ChatGPT, Gemini, and Perplexity without leaving the app",
      color: "text-blue-500",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share conversations and insights with your team in real-time",
      color: "text-green-500",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Track usage patterns and optimize your AI workflow with detailed insights",
      color: "text-pink-500",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      icon: Star,
      title: "Premium Support",
      description: "24/7 dedicated support to help you maximize your AI experience",
      color: "text-purple-500",
      gradient: "from-purple-400 to-fuchsia-400"
    }
  ];

  const stats = [
    { value: "100K+", label: "Active Users" },
    { value: "5M+", label: "Conversations" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      features: ["50 messages/day", "3 AI models", "Basic support", "1 user"],
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      features: ["Unlimited messages", "3 AI models", "Priority support", "5 users", "Advanced analytics", "Custom integrations"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      features: ["Unlimited everything", "Dedicated AI models", "24/7 support", "Unlimited users", "Custom deployment", "SLA guarantee"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)`,
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TRIO AI
              </h1>
            </div>



            <div className="flex items-center gap-3">
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-5 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => (window.location.href = "/signup")}
                className="relative group px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">Powered by 3 Leading AI Models</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                The Future of AI
              </span>
              <br />
              <span className="text-gray-900">In One Place</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Stop switching between platforms. Access{" "}
              <span className="text-emerald-600 font-semibold">ChatGPT</span>,{" "}
              <span className="text-blue-600 font-semibold">Gemini</span>, and{" "}
              <span className="text-purple-600 font-semibold">Perplexity</span>{" "}
              in one beautiful, unified dashboard.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold text-lg text-white transition-all hover:scale-105 shadow-xl hover:shadow-blue-500/50 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-gray-300 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-blue-300 transition-all flex items-center gap-2 shadow-md">
                Watch Demo
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, i) => (
                <div key={i} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {aiPlatforms.map((platform, index) => (
                <div
                  key={platform.name}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 hover:bg-white hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {platform.emoji}
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                      {platform.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{platform.desc}</p>
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative py-20 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to supercharge your AI workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 hover:bg-white hover:shadow-2xl hover:border-blue-300 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-gray-600 text-lg">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative group ${plan.popular ? 'md:-translate-y-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity ${plan.popular ? 'opacity-50' : ''}`} />
                <div className={`relative bg-white/90 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all h-full flex flex-col ${plan.popular ? 'border-blue-500 shadow-xl' : 'border-gray-200'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-300 rounded-3xl p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Ready to Transform Your AI Experience?
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already experiencing the future of AI
              </p>
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-xl hover:shadow-blue-500/50 flex items-center gap-2 mx-auto">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  TRIO AI
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                The ultimate AI platform bringing together ChatGPT, Gemini, and Perplexity in one seamless experience.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Twitter, href: "#" },
                  { Icon: Github, href: "#" },
                  { Icon: Linkedin, href: "#" },
                  { Icon: Mail, href: "#" }
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 border border-gray-200 rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                  >
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'API', 'Integrations', 'Changelog', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'Help Center', 'Community', 'Status', 'Security', 'Legal'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 text-sm flex items-center gap-2">
                © 2024 TRIO AI. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for AI enthusiasts
              </p>
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}