import { pgTable, serial, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const sessions = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull().references(() => users.id),
});

export const accounts = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId").notNull().references(() => users.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const verifications = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
});

export const subscriptions = pgTable("subscription", {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull().references(() => users.id),
    stripeCustomerId: text("stripe_customer_id"),
    stripeSubscriptionId: text("stripe_subscription_id"),
    status: text("status").default("inactive"), // active, inactive, past_due
    plan: text("plan").default("free"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const alerts = pgTable("alert", {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull().references(() => users.id),
    keyword: text("keyword").notNull(), // Specific keyword to match
    sourceFilter: text("source_filter"), // Optional domain filter
    isActive: boolean("is_active").default(true),
    lastChecked: timestamp("last_checked").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("event", {
    id: serial("id").primaryKey(),
    source: text("source").notNull(), // e.g., "linkedin", "upwork"
    title: text("title").notNull(),
    url: text("url").notNull(),
    hash: text("hash").notNull().unique(), // To prevent duplicates
    price: text("price"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const sentNotifications = pgTable("sent_notification", {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull().references(() => users.id),
    eventId: integer("event_id").notNull().references(() => events.id),
    sentAt: timestamp("sent_at").defaultNow(),
});
