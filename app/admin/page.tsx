import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { getAlerts } from "@/lib/actions/alerts"
import { getEvents } from "@/lib/actions/events"
import { AdminDashboardClient } from "./dashboard-client"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch data in parallel
  const [alertsResult, eventsResult] = await Promise.all([getAlerts(), getEvents()])

  const alerts = alertsResult.data || []
  const events = (eventsResult.data || []).slice(0, 5) // Only show 5 recent events

  // Calculate stats
  const activeAlerts = alerts.filter((a) => a.is_active).length
  const todayEvents = events.filter((e) => {
    const eventDate = new Date(e.created_at)
    const today = new Date()
    return eventDate.toDateString() === today.toDateString()
  }).length

  const stats = {
    activeAlerts,
    eventsFound: events.length,
    notificationsSent: events.length, // This would come from sent_notifications table
    successRate: 94,
  }

  return <AdminDashboardClient stats={stats} recentEvents={events} />
}
