import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
            <DashboardSidebar />
            <main className="pl-64 min-h-screen relative">
                <div className="max-w-6xl mx-auto p-8 pt-12">
                    {children}
                </div>
            </main>
        </div>
    )
}
