"use client"

import { User, Mail, Bell, Shield, LogOut, ChevronRight } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-2xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Settings</h1>
                <p className="text-[#86868b] mt-1">Manage your account preferences.</p>
            </div>

            {/* Account Section */}
            <section>
                <h2 className="text-lg font-semibold mb-4 ml-1">Account</h2>
                <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-3xl overflow-hidden divide-y divide-zinc-100">
                    <SettingsItem icon={User} label="Name" value="Louis Baffour" />
                    <SettingsItem icon={Mail} label="Email" value="louis@example.com" />
                    <SettingsItem icon={Shield} label="Password" value="••••••••" isAction />
                </div>
            </section>

            {/* Notifications Section */}
            <section>
                <h2 className="text-lg font-semibold mb-4 ml-1">Notifications</h2>
                <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-3xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-[#1d1d1f]">Email Digest</h3>
                            <p className="text-sm text-[#86868b]">Receive a daily summary of new matches.</p>
                        </div>
                        <ToggleSwitch defaultChecked />
                    </div>

                    <div className="w-full h-px bg-zinc-100" />

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-[#1d1d1f]">Instant Alerts</h3>
                            <p className="text-sm text-[#86868b]">Get notified immediately for high matches.</p>
                        </div>
                        <ToggleSwitch />
                    </div>
                </div>
            </section>

            {/* Danger Zone */}
            <section>
                <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-4 rounded-3xl transition-colors flex items-center justify-center gap-2">
                    <LogOut size={18} />
                    Sign Out
                </button>
            </section>
        </div>
    )
}

function SettingsItem({ icon: Icon, label, value, isAction }: { icon: any, label: string, value: string, isAction?: boolean }) {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-white/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-100/50 flex items-center justify-center text-zinc-500">
                    <Icon size={16} />
                </div>
                <span className="font-medium text-[#1d1d1f]">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-zinc-500 text-sm">{value}</span>
                {isAction && <ChevronRight size={16} className="text-zinc-300 group-hover:text-zinc-500" />}
            </div>
        </div>
    )
}

function ToggleSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
            <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34c759]"></div>
        </label>
    )
}
