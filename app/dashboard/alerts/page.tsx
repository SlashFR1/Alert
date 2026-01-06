"use client"

import { motion } from "framer-motion"
import { Plus, Bell, Trash2, PauseCircle, PlayCircle, Search } from "lucide-react"

const mockAlerts = [
    { id: 1, keyword: "Frontend Developer", sources: ["LinkedIn", "Upwork"], frequency: "Instant", active: true },
    { id: 2, keyword: "React Native", sources: ["Indeed"], frequency: "Daily", active: false },
    { id: 3, keyword: "Next.js Contractor", sources: ["LinkedIn"], frequency: "Instant", active: true },
]

export default function AlertsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">My Alerts</h1>
                    <p className="text-[#86868b] mt-1">Manage your keyword monitors.</p>
                </div>
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-[#1d1d1f] text-white rounded-full font-medium shadow-lg shadow-black/10 hover:bg-black transition-all active:scale-95">
                    <Plus size={18} />
                    Create Alert
                </button>
            </div>

            {/* Search / Filter Bar */}
            <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl p-2 flex items-center gap-2 max-w-md">
                <div className="p-2 text-zinc-400">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search alerts..."
                    className="bg-transparent w-full outline-none text-sm placeholder:text-zinc-400"
                />
            </div>

            {/* Alerts List */}
            <div className="grid gap-4">
                {mockAlerts.map((alert, i) => (
                    <AlertCard key={alert.id} alert={alert} index={i} />
                ))}
            </div>
        </div>
    )
}

function AlertCard({ alert, index }: { alert: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${alert.active ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-400'}`}>
                    <Bell size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-[#1d1d1f] flex items-center gap-2">
                        "{alert.keyword}"
                        {!alert.active && <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 font-medium">Paused</span>}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        {alert.sources.map((s: string) => (
                            <span key={s} className="text-xs font-medium px-2 py-1 rounded-lg bg-zinc-100 text-zinc-600 border border-zinc-200">
                                {s}
                            </span>
                        ))}
                        <span className="text-xs text-zinc-400 pl-2 border-l border-zinc-200">
                            {alert.frequency}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-[#1d1d1f] transition-colors" title={alert.active ? "Pause" : "Resume"}>
                    {alert.active ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                </button>
                <button className="p-2 rounded-xl hover:bg-red-50 text-zinc-500 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 size={20} />
                </button>
            </div>
        </motion.div>
    )
}
