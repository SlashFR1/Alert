"use server";

import { db } from "@/lib/db";
import { alerts } from "@/database/schema";
import { auth } from "@/lib/auth"; // Access auth on server
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createAlert(formData: FormData) {
    const keyword = formData.get("keyword") as string;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    if (!keyword) return;

    await db.insert(alerts).values({
        userId: session.user.id,
        keyword,
        isActive: true,
    });

    revalidatePath("/dashboard");
}

export async function deleteAlert(id: number) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return;

    await db.delete(alerts).where(eq(alerts.id, id));
    revalidatePath("/dashboard");
}
