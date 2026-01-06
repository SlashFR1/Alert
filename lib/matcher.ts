import { db } from "./db";
import { alerts, events, sentNotifications, users } from "@/database/schema";
import { eq, and, inArray, sql } from "drizzle-orm";
import { ScrapedEvent } from "./scraper";
import { sendAlertEmail } from "./email";

export async function processMatches(scrapedEvents: ScrapedEvent[]) {
    console.log(`Processing ${scrapedEvents.length} events...`);

    // 1. Save new events to DB to avoid re-processing same hash
    // Using ON CONFLICT logic (Drizzle syntax for specific dialect usually)
    // For simplicity, we check existence or standard insert.
    // Postgres 'insert ... on conflict do nothing'

    for (const event of scrapedEvents) {
        await db.insert(events)
            .values({
                source: event.source,
                title: event.title,
                url: event.url,
                hash: event.hash,
                price: event.price,
                publishedAt: event.publishedAt,
            })
            .onConflictDoNothing({ target: events.hash });
    }

    // 2. Fetch all active alerts
    const activeAlerts = await db
        .select({
            id: alerts.id,
            userId: alerts.userId,
            keyword: alerts.keyword,
            email: users.email,
        })
        .from(alerts)
        .innerJoin(users, eq(alerts.userId, users.id))
        .where(eq(alerts.isActive, true));

    // 3. Match Logic
    // Group matches by User to send 1 email per user
    const userMatches: Record<string, { email: string; events: ScrapedEvent[] }> = {};

    // Fetch only the events that correspond to the scraped hashes (to get their IDs if needed)
    // Actually we need the IDs for 'sentNotifications'. 
    // Let's re-fetch the events we just scraped/inserted to get their clean DB IDs.
    const relevantHashes = scrapedEvents.map((e) => e.hash);
    const dbEvents = await db
        .select()
        .from(events)
        .where(inArray(events.hash, relevantHashes));

    for (const alert of activeAlerts) {
        const keyword = alert.keyword.toLowerCase();

        for (const event of dbEvents) {
            const textToSearch = (event.title + " " + (event.price || "")).toLowerCase();

            if (textToSearch.includes(keyword)) {
                // MATCH FOUND!
                // Check if already sent
                const alreadySent = await db
                    .select()
                    .from(sentNotifications)
                    .where(
                        and(
                            eq(sentNotifications.userId, alert.userId),
                            eq(sentNotifications.eventId, event.id)
                        )
                    )
                    .limit(1);

                if (alreadySent.length === 0) {
                    // Add to queue
                    if (!userMatches[alert.userId]) {
                        userMatches[alert.userId] = { email: alert.email, events: [] };
                    }
                    // Avoid duplicates in the same batch
                    if (!userMatches[alert.userId].events.find((e) => e.hash === event.hash)) {
                        // We need to map DB event back to ScrapedEvent or similar for email
                        userMatches[alert.userId].events.push({
                            source: event.source,
                            title: event.title,
                            url: event.url,
                            price: event.price || undefined,
                            publishedAt: event.publishedAt || new Date(),
                            hash: event.hash
                        });
                    }

                    // Record sending (optimistic or after send)
                    await db.insert(sentNotifications).values({
                        userId: alert.userId,
                        eventId: event.id,
                    });
                }
            }
        }
    }

    // 4. Send Emails
    for (const userId in userMatches) {
        const { email, events } = userMatches[userId];
        if (events.length > 0) {
            console.log(`Sending email to ${email} with ${events.length} matches.`);
            await sendAlertEmail(email, events);
        }
    }
}
