"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"

export default function SubscriptionPage() {
    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto pt-8">
                <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">Upgrade your focus.</h1>
                <p className="text-[#86868b] mt-4 text-lg">Choose the plan that fits your workflow. Cancel anytime.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
                {/* Free Plan */}
                <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-3xl p-8 flex flex-col">
                    <h2 className="text-2xl font-semibold text-[#1d1d1f]">Free</h2>
                    <p className="text-4xl font-bold mt-4">$0 <span className="text-lg font-normal text-zinc-500">/mo</span></p>
                    <p className="text-sm text-zinc-500 mt-2">Perfect for casual monitoring.</p>

                    <button className="mt-8 py-3 px-6 rounded-2xl border border-zinc-200 font-medium text-[#1d1d1f] hover:bg-zinc-50 transition-colors">
                        Current Plan
                    </button>

                    <ul className="mt-8 space-y-4">
                        <FeatureItem text="3 Active Alerts" />
                        <FeatureItem text="Daily Email Digest" />
                        <FeatureItem text="Basic Sources (Indeed)" />
                        <FeatureItem text="24h Delay" disabled />
                    </ul>
                </div>

                {/* Pro Plan */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white border border-blue-100 shadow-xl shadow-blue-500/10 rounded-3xl p-8 flex flex-col relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Sparkles size={12} /> POPULAR
                        </span>
                    </div>

                    <h2 className="text-2xl font-semibold text-[#1d1d1f]">Pro</h2>
                    <p className="text-4xl font-bold mt-4">$19 <span className="text-lg font-normal text-zinc-500">/mo</span></p>
                    <p className="text-sm text-zinc-500 mt-2">For serious freelancers & agencies.</p>

                    <button className="mt-8 py-3 px-6 rounded-2xl bg-[#0071e3] text-white font-medium hover:bg-[#0077ed] transition-colors shadow-lg shadow-blue-500/20">
                        Upgrade to Pro
                    </button>

                    <ul className="mt-8 space-y-4">
                        <FeatureItem text="Unlimited Alerts" />
                        <FeatureItem text="Instant Notifications" />
                        <FeatureItem text="All Sources (LinkedIn, Upwork...)" />
                        <FeatureItem text="AI Matching & Filtering" />
                        <FeatureItem text="Priority Support" />
                    </ul>
                </motion.div>
            </div>
        </div>
    )
}

function FeatureItem({ text, disabled = false }: { text: string, disabled?: boolean }) {
    return (
        <li className={`flex items-center gap-3 ${disabled ? 'opacity-50' : ''}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${disabled ? 'bg-zinc-100 text-zinc-400' : 'bg-blue-50 text-blue-600'}`}>
                <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium text-zinc-700">{text}</span>
        </li>
    )
}
