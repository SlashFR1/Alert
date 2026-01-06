"use client"

import type React from "react"
import { LayoutDashboard, Bell, Calendar, CreditCard, Settings, Menu, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"

interface AdminLayoutClientProps {
  children: React.ReactNode
  user: any
  profile: any
}

export function AdminLayoutClient({ children, user, profile }: AdminLayoutClientProps) {
  const pathname = usePathname()

  const getInitials = (name: string) => {
    if (!name) return user.email?.charAt(0).toUpperCase() || "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const navigation = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/alerts", label: "Alerts", icon: Bell },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/subscription", label: "Subscription", icon: CreditCard },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#18181b] border-r border-[#27272a]">
        {/* Logo */}
        <div className="p-6 border-b border-[#27272a]">
          <Link href="/admin">
            <h1 className="text-2xl font-bold text-white">FocusMail</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-white bg-[#a855f7]/10 border border-[#a855f7]/20"
                      : "text-[#a1a1aa] hover:text-white hover:bg-[#27272a]"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#a855f7]" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-[#27272a]">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#27272a] rounded-lg mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(profile?.full_name || "")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{profile?.full_name || "User"}</p>
              <p className="text-xs text-[#a1a1aa] truncate">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="w-full border-[#27272a] text-[#a1a1aa] hover:text-white hover:bg-[#27272a] bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 bg-[#18181b] border-b border-[#27272a] backdrop-blur-xl">
          <div className="flex items-center justify-between p-4">
            <Link href="/admin">
              <h1 className="text-xl font-bold text-white">FocusMail</h1>
            </Link>
            <button className="text-[#a1a1aa] hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  )
}
