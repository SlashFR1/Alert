import type React from "react"
import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLayoutClient } from "./layout-client"

export const metadata: Metadata = {
  title: "Admin Dashboard - FocusMail",
  description: "Manage your alerts and monitor opportunities",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <AdminLayoutClient user={user} profile={profile}>
      {children}
    </AdminLayoutClient>
  )
}
