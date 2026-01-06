"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
    LayoutDashboard,
    Bell,
    Settings,
    CreditCard,
    LogOut,
    Search,
    Plus
} from "lucide-react"

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Bell, label: "Alerts", href: "/dashboard/alerts" },
    { icon: CreditCard, label: "Subscription", href: "/dashboard/subscription" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 z-40 flex flex-col bg-[#fbfbfd]/80 backdrop-blur-xl border-r border-black/5">
            {/* Branding */}
            <div className="p-6">
                <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-black to-zinc-700 flex items-center justify-center text-white shadow-lg shadow-black/10">
                        <Bell size={16} fill="white" />
                    </div>
                    FocusMail
                </div>
            </div>

            {/* Primary Actions */}
            <div className="px-4 mb-6">
                <button className="w-full flex items-center gap-2 px-4 py-2.5 bg-white border border-black/5 shadow-sm rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors text-zinc-600">
                    <Search size={16} />
                    <span className="opacity-50">Search...</span>
                    <span className="ml-auto text-xs opacity-40">⌘K</span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative block"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-black/5"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={`relative px-4 py-2.5 flex items-center gap-3 rounded-xl transition-colors ${isActive ? "text-black font-medium" : "text-zinc-500 hover:bg-black/5"}`}>
                                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                {item.label}
                            </div>
                        </Link>
                    )
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-black/5">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Louis B.</p>
                        <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
                    </div>
                    <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    )
}
