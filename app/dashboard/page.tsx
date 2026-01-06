"use client"

import { motion } from "framer-motion"
import { Plus, ArrowUpRight, Mail, Zap, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Overview</h1>
                    <p className="text-[#86868b] mt-1">Welcome back, Louis.</p>
                </div>
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-[#0071e3] text-white rounded-full font-medium shadow-md shadow-blue-500/20 hover:bg-[#0077ed] transition-all active:scale-95">
                    <Plus size={18} />
                    New Alert
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card 1 */}
                <StatCard title="Total Alerts" value="12" sub="+2 this week" icon={<Zap className="text-amber-500" />} />
                {/* Stat Card 2 */}
                <StatCard title="Emails Scanned" value="1,429" sub="Last 24h" icon={<Mail className="text-blue-500" />} />
                {/* Stat Card 3 */}
                <StatCard title="Matches Found" value="84" sub="High relevance" icon={<CheckCircle2 className="text-green-500" />} />
            </div>

            {/* Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Matches */}
                <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">Recent Matches</h2>
                        <button className="text-sm text-[#0071e3] font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors border border-transparent hover:border-black/5">
                                <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                                    <span className="text-lg">💼</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium truncate">Senior React Developer</h3>
                                    <p className="text-sm text-[#86868b]">Upwork • $60-80/hr</p>
                                </div>
                                <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-black transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status / Quick Tips */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-6 shadow-lg shadow-indigo-500/20">
                        <h3 className="font-semibold text-lg mb-2">Pro Tip</h3>
                        <p className="text-white/90 text-sm leading-relaxed mb-4">
                            Refine your "Frontend" alert by adding negative keywords like "-wordpress" to improve relevance.
                        </p>
                        <button className="text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
                            Edit Alert
                        </button>
                    </div>

                    <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-3xl p-6">
                        <h3 className="font-semibold text-lg mb-4">Active Sources</h3>
                        <div className="flex gap-4">
                            <SourceBadge name="LinkedIn" active />
                            <SourceBadge name="Upwork" active />
                            <SourceBadge name="Indeed" active={false} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, sub, icon }: { title: string, value: string, sub: string, icon: React.ReactNode }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-3xl p-6 relative overflow-hidden"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-[#86868b]">{title}</p>
                    <p className="text-3xl font-semibold mt-1 tracking-tight">{value}</p>
                </div>
                <div className="p-2 bg-white rounded-xl shadow-sm border border-black/5">
                    {icon}
                </div>
            </div>
            <p className="text-xs font-medium text-[#86868b] bg-black/5 inline-block px-2 py-1 rounded-lg">
                {sub}
            </p>
        </motion.div>
    )
}

function SourceBadge({ name, active }: { name: string, active: boolean }) {
    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${active ? 'bg-green-100/50 border-green-200 text-green-700' : 'bg-zinc-100 border-zinc-200 text-zinc-500'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-zinc-400'}`} />
            {name}
        </div>
    )
}
