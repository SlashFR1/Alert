"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getAlerts() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return { data, error }
}

export async function createAlert(formData: {
  title: string
  keywords: string[]
  sources: string[]
  frequency: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("alerts")
    .insert({
      user_id: user.id,
      title: formData.title,
      keywords: formData.keywords,
      sources: formData.sources,
      frequency: formData.frequency,
      is_active: true,
    })
    .select()
    .single()

  revalidatePath("/admin/alerts")
  return { data, error }
}

export async function deleteAlert(alertId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("alerts").delete().eq("id", alertId).eq("user_id", user.id)

  revalidatePath("/admin/alerts")
  return { error }
}

export async function toggleAlertStatus(alertId: string, isActive: boolean) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase
    .from("alerts")
    .update({ is_active: isActive })
    .eq("id", alertId)
    .eq("user_id", user.id)

  revalidatePath("/admin/alerts")
  return { error }
}
