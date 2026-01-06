"use client"

import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  Mail, Zap, Shield, Brain, Sparkles, Filter, ArrowRight,
  FileText, Calendar, Trash2, ListTodo, LayoutDashboard,
  Bot, Layers
} from "lucide-react"
import { useRef, useState } from "react"

export default function FocusMailLanding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Hero zoom and fade effects
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const mockupOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const mockupY = useTransform(scrollYProgress, [0, 0.5], [100, -50])

  return (
    <div ref={containerRef} className="relative bg-[#fafaf9] text-[#1a1a1a] overflow-x-hidden font-sans">
      {/* Hero Section */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Main headline with zoom effect */}
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute z-20 text-center px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e4e4e7] shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-[#71717a]">Fully Customizable</span>
            </div>
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight text-balance">
              Intelligent.
              <br />
              <span className="text-[#71717a]">Automated.</span>
              <br />
              Organized.
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-[#52525b] max-w-2xl mx-auto text-pretty">
              FocusMail categorizes, automates, and cleans your inbox so you never miss a critical update.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#get-started"
                className="px-8 py-4 bg-[#18181b] text-white rounded-full font-medium hover:bg-[#18181b]/90 transition-colors shadow-lg shadow-black/5"
              >
                Get Started
              </a>
              <a
                href="/auth/login"
                className="px-8 py-4 bg-white border-2 border-[#18181b] text-[#18181b] rounded-full font-medium hover:bg-[#f5f5f5] transition-colors shadow-lg shadow-black/5"
              >
                Login
              </a>
            </div>
          </motion.div>

          {/* App mockup with parallax */}
          <motion.div style={{ opacity: mockupOpacity, y: mockupY }} className="absolute z-10">
            <div className="relative w-[90vw] max-w-5xl h-[600px] rounded-3xl bg-gradient-to-br from-white to-[#f4f4f5] shadow-2xl border border-[#e4e4e7] overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fafaf9]/50" />
              <div className="p-8 relative z-20">
                {/* Mockup Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                  </div>
                  <div className="px-3 py-1 bg-white rounded-md border border-[#e4e4e7] text-xs font-medium text-[#71717a]">
                    Inbox Zero Achieved
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="space-y-4">
                  <div className="h-16 bg-white rounded-xl shadow-sm border border-[#e4e4e7] flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><FileText size={20} /></div>
                      <div>
                        <p className="font-semibold text-sm">Invoice #4029</p>
                        <p className="text-xs text-[#71717a]">Critical • Due Tomorrow</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-600 rounded">Urgent</span>
                  </div>

                  <div className="h-16 bg-white rounded-xl shadow-sm border border-[#e4e4e7] flex items-center justify-between px-6 opacity-80">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Calendar size={20} /></div>
                      <div>
                        <p className="font-semibold text-sm">Design Review</p>
                        <p className="text-xs text-[#71717a]">Auto-synced to Calendar</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-600 rounded">Important</span>
                  </div>

                  <div className="h-16 bg-white rounded-xl shadow-sm border border-[#e4e4e7] flex items-center justify-between px-6 opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600"><Bot size={20} /></div>
                      <div>
                        <p className="font-semibold text-sm">Weekly Report</p>
                        <p className="text-xs text-[#71717a]">AI Summary Generated</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">Info</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chaos to Order Section (Updated for Auto-cleanup & Detection) */}
      <ChaosToOrderSection />

      {/* NEW: Comprehensive Feature Breakdown */}
      <DetailedFeatures />

      {/* How It Works (Updated Text) */}
      <HowItWorksSection />

      {/* CTA Footer */}
      <CTASection />
    </div>
  )
}

// ------------------------------------------------------------------
// COMPONENT: Chaos to Order
// ------------------------------------------------------------------
function ChaosToOrderSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const leftX = useTransform(scrollYProgress, [0.2, 0.6], [-200, 0])
  const rightX = useTransform(scrollYProgress, [0.2, 0.6], [200, 0])
  const centerScale = useTransform(scrollYProgress, [0.3, 0.7], [0.5, 1])
  const centerOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])

  return (
    <section ref={sectionRef} className="relative py-40 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[clamp(2.5rem,8vw,6rem)] font-bold text-center mb-32 leading-tight"
        >
          From Noise
          <br />
          <span className="text-[#71717a]">to Clarity</span>
        </motion.h2>

        <div className="relative h-[400px] flex items-center justify-center">
          {/* Junk/Repetitive emails from left */}
          <motion.div style={{ x: leftX }} className="absolute left-0 space-y-4 hidden md:block">
            {["Duplicate Invoice", "Newsletter #402", "Spam Alert", "Old Promo"].map((label, i) => (
              <motion.div
                key={i}
                className="px-6 py-3 bg-[#fca5a5]/20 border border-[#fca5a5] text-[#b91c1c] rounded-xl shadow-sm backdrop-blur-sm flex items-center gap-2"
              >
                <Trash2 size={16} /> {label}
              </motion.div>
            ))}
          </motion.div>

          {/* Unsorted emails from right */}
          <motion.div style={{ x: rightX }} className="absolute right-0 space-y-4 hidden md:block">
            {["Meeting Request", "Contract.pdf", "Server Alert", "Payment Link"].map((label, i) => (
              <motion.div
                key={i}
                className="px-6 py-3 bg-[#f3f4f6] border border-[#d1d5db] text-[#4b5563] rounded-xl shadow-sm backdrop-blur-sm"
              >
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* Center funnel result */}
          <motion.div
            style={{ scale: centerScale, opacity: centerOpacity }}
            className="relative z-10 px-8 py-8 md:px-12 bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] text-white rounded-3xl shadow-2xl flex flex-col items-center gap-4"
          >
            <Shield className="w-16 h-16" />
            <div className="text-center">
              <p className="text-2xl font-bold">Auto-Prioritized</p>
              <p className="text-white/80 mt-2">Critical detection active</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// COMPONENT: Detailed Features (The Core Request)
// ------------------------------------------------------------------
function DetailedFeatures() {
  const categories = [
    {
      id: "management",
      title: "Intelligent Email Management",
      subtitle: "Fully Customizable",
      color: "text-blue-600",
      bg: "bg-blue-50",
      features: [
        { icon: <Filter size={24} />, title: "Auto Prioritization", desc: "Categorize as Urgent, Important, or Info." },
        { icon: <FileText size={24} />, title: "Critical Detection", desc: "Identifies invoices, contracts & alerts." },
        { icon: <Layers size={24} />, title: "Smart Organization", desc: "Groups by topic. Detects duplicates." },
        { icon: <Trash2 size={24} />, title: "Auto-cleanup", desc: "Archives unimportant emails automatically." },
      ]
    },
    {
      id: "automation",
      title: "AI-Powered Automation",
      subtitle: "Fully Configurable",
      color: "text-purple-600",
      bg: "bg-purple-50",
      features: [
        { icon: <Brain size={24} />, title: "Smart Digests", desc: "Daily summaries by sender or topic." },
        { icon: <Zap size={24} />, title: "Info Extraction", desc: "Detects dates, amounts, and deadlines." },
        { icon: <Bot size={24} />, title: "Reply Suggestions", desc: "Drafts AI-assisted responses instantly." },
        { icon: <ListTodo size={24} />, title: "Task Generation", desc: "Turns emails into To-Do items." },
      ]
    },
    {
      id: "productivity",
      title: "Productivity & Control",
      subtitle: "User-Controlled",
      color: "text-orange-600",
      bg: "bg-orange-50",
      features: [
        { icon: <LayoutDashboard size={24} />, title: "Custom Dashboard", desc: "Clear overview of priorities." },
        { icon: <Calendar size={24} />, title: "Calendar Sync", desc: "Integrates with Google & Outlook." },
        { icon: <Shield size={24} />, title: "Inbox Zero", desc: "Guidance to maintain a clean inbox." },
        { icon: <Mail size={24} />, title: "Smart Alerts", desc: "Reminders for unanswered critical emails." },
      ]
    }
  ]

  return (
    <section className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto space-y-32">
        {categories.map((cat, i) => (
          <div key={cat.id} className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Header for Category */}
            <div className={`lg:col-span-4 ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 1 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${cat.bg} ${cat.color}`}>
                  {cat.subtitle}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#18181b]">{cat.title}</h2>
                <p className="text-xl text-[#71717a]">
                  Powerful tools designed to adapt to your workflow, not the other way around.
                </p>
              </motion.div>
            </div>

            {/* Grid of Features */}
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              {cat.features.map((feat, idx) => (
                <FeatureCardSmall key={idx} feature={feat} index={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FeatureCardSmall({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-2xl border border-[#e4e4e7] bg-[#fafaf9] hover:bg-white hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-white border border-[#e4e4e7] flex items-center justify-center mb-4 text-[#18181b]">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-[#18181b]">{feature.title}</h3>
      <p className="text-[#71717a]">{feature.desc}</p>
    </motion.div>
  )
}


// ------------------------------------------------------------------
// COMPONENT: How It Works
// ------------------------------------------------------------------
function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const scanProgress = useTransform(scrollYProgress, [0.3, 0.7], [0, 100])

  return (
    <section ref={sectionRef} className="py-40 px-4 bg-gradient-to-b from-[#fafaf9] to-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[clamp(2.5rem,8vw,5rem)] font-bold mb-12 leading-tight"
        >
          Key Info
          <br />
          <span className="text-[#71717a]">Extraction</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-[#52525b] mb-20 text-pretty"
        >
          We automatically detect dates, amounts, deadlines, and links.
        </motion.p>

        <div className="relative w-full h-[400px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Email icon */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-[#a855f7]/20 rounded-3xl blur-2xl" />
              <FileText className="w-32 h-32 text-[#8b5cf6] relative z-10" />

              {/* Scanning lines effect */}
              <motion.div
                style={{
                  y: useTransform(scanProgress, [0, 100], [-150, 150]),
                }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent"
              />

              {/* Data points being extracted */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 1.5] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                  viewport={{ once: false }}
                  className="absolute px-2 py-1 bg-white text-[10px] font-mono border border-[#a855f7] text-[#a855f7] rounded shadow-sm"
                  style={{
                    left: `${50 + Math.cos((i * Math.PI) / 3) * 60}%`,
                    top: `${50 + Math.sin((i * Math.PI) / 3) * 60}%`,
                  }}
                >
                  {["$450.00", "Due: Oct 12", "Link Found", "Invoice", "Urgent"][i % 5]}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------
// COMPONENT: CTA
// ------------------------------------------------------------------
function CTASection() {
  return (
    <section id="get-started" className="py-40 px-4 bg-gradient-to-b from-white to-[#fafaf9]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[clamp(2.5rem,8vw,5rem)] font-bold mb-8 leading-tight"
        >
          Ready to
          <br />
          <span className="text-[#71717a]">Automate Your Inbox?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-[#52525b] mb-12 text-pretty"
        >
          Start your custom dashboard today.
        </motion.p>

        <Link href="/dashboard">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] text-white text-xl font-semibold rounded-2xl shadow-2xl overflow-hidden cursor-pointer inline-block"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get Started
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </Link>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-[#71717a]"
        >
          Compatible with Gmail & Outlook
        </motion.p>
      </div>
    </section>
  )
}