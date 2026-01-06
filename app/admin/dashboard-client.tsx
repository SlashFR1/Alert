"use client"

import { motion } from "framer-motion"
import { Bell, Calendar, Settings, TrendingUp, CheckCircle, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardClientProps {
  stats: {
    activeAlerts: number
    eventsFound: number
    notificationsSent: number
    successRate: number
  }
  recentEvents: any[]
}

export function AdminDashboardClient({ stats, recentEvents }: DashboardClientProps) {
  const statsConfig = [
    {
      label: "Active Alerts",
      value: stats.activeAlerts.toString(),
      change: "+3 this week",
      icon: <Bell className="w-5 h-5" />,
      color: "from-[#8b5cf6] to-[#a855f7]",
    },
    {
      label: "Events Found",
      value: stats.eventsFound.toString(),
      change: "+12 today",
      icon: <Calendar className="w-5 h-5" />,
      color: "from-[#f59e0b] to-[#f97316]",
    },
    {
      label: "Notifications Sent",
      value: stats.notificationsSent.toString(),
      change: "+24 this week",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "from-[#10b981] to-[#14b8a6]",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      change: "+2% vs last week",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-[#ec4899] to-[#f43f5e]",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-xl text-[#a1a1aa]">Welcome back, monitor your opportunities</p>
            </div>
            <Link href="/admin/alerts/new">
              <Button className="bg-[#a855f7] hover:bg-[#8b5cf6] text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Alert
              </Button>
            </Link>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a]" />
            <Input
              placeholder="Search events, alerts, or notifications..."
              className="w-full pl-12 bg-[#18181b] border-[#27272a] text-white placeholder:text-[#71717a] h-12 rounded-xl"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsConfig.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              <div className="relative p-6 bg-[#18181b] rounded-2xl border border-[#27272a] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>{stat.icon}</div>
                  <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-[#a1a1aa] mb-2">{stat.label}</p>
                  <p className="text-xs text-[#10b981]">{stat.change}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-[#18181b] rounded-2xl border border-[#27272a] p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Recent Events</h3>
              <Link href="/admin/events" className="text-sm text-[#a855f7] hover:text-[#8b5cf6] transition-colors">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {recentEvents.length === 0 ? (
                <p className="text-[#a1a1aa] text-center py-8">No events yet. Create an alert to start monitoring!</p>
              ) : (
                recentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="p-4 bg-[#0a0a0a] rounded-xl border border-[#27272a] hover:border-[#a855f7]/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white group-hover:text-[#a855f7] transition-colors flex-1">
                        {event.title}
                      </h4>
                      <span className="px-3 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded-full text-xs font-medium">
                        New
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                        <span>Source: {event.source}</span>
                        {event.price && <span className="text-[#10b981] font-semibold">{event.price}</span>}
                      </div>
                      {event.matched_keywords && (
                        <div className="flex gap-1">
                          {event.matched_keywords.slice(0, 3).map((keyword: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-[#27272a] text-[#a1a1aa] rounded text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-[#18181b] rounded-2xl border border-[#27272a] p-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/alerts/new">
                <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#27272a] hover:border-[#a855f7]/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#a855f7]/10 text-[#a855f7]">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-[#a855f7] transition-colors">
                        Create Alert
                      </p>
                      <p className="text-xs text-[#a1a1aa]">Add new keyword alert</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/admin/events">
                <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#27272a] hover:border-[#f59e0b]/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#f59e0b]/10 text-[#f59e0b]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-[#f59e0b] transition-colors">View Events</p>
                      <p className="text-xs text-[#a1a1aa]">Browse all matched events</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/admin/subscription">
                <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#27272a] hover:border-[#10b981]/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#10b981]/10 text-[#10b981]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-[#10b981] transition-colors">
                        Upgrade Plan
                      </p>
                      <p className="text-xs text-[#a1a1aa]">Manage subscription</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/admin/settings">
                <div className="p-4 bg-[#0a0a0a] rounded-xl border border-[#27272a] hover:border-[#71717a]/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#71717a]/10 text-[#71717a]">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-[#71717a] transition-colors">Settings</p>
                      <p className="text-xs text-[#a1a1aa]">Configure your account</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
