"use server"

import { createClient } from "@/lib/supabase/server"

export async function getEvents() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("events")
    .select(
      `
      *,
      alerts!inner (
        user_id,
        title
      )
    `,
    )
    .eq("alerts.user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return { data, error }
}

export async function getEventStats() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: "Unauthorized" }
  }

  // Get total events count
  const { count: totalEvents } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("alerts.user_id", user.id)

  // Get today's events
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count: todayEvents } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("alerts.user_id", user.id)
    .gte("created_at", today.toISOString())

  return {
    data: {
      totalEvents: totalEvents || 0,
      todayEvents: todayEvents || 0,
    },
    error: null,
  }
}
