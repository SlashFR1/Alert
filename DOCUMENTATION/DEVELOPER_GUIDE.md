# Developer Setup Guide

## Quick Start

### 1. Prerequisites Check

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm/pnpm/bun
npm --version
pnpm --version
bun --version
```

### 2. Clone & Install

```bash
git clone <repository-url>
cd Alert
npm install  # or pnpm install / bun install
```

### 3. Environment Setup

```bash
# Copy example env file (if available)
cp .env.example .env.local

# Edit with your keys
nano .env.local
```

Required variables:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/alert_db
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Database Setup

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb alert_db

# Run migrations
npx drizzle-kit migrate

# Verify schema
psql alert_db -c "\dt"
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure Walkthrough

### Frontend Code (`app/` & `components/`)

**Landing Page Flow:**
```
app/page.tsx (Hero, Features, Pricing)
  ├─ Framer Motion animations
  ├─ Call-to-action buttons
  └─ Responsive design
```

**Authentication:**
```
app/auth/
  ├─ login/page.tsx       → Login form + OAuth buttons
  ├─ sign-up/page.tsx     → Registration form
  ├─ error/page.tsx       → Error messages
  └─ sign-up-success/page.tsx → Success confirmation
```

**Admin Dashboard:**
```
app/admin/
  ├─ layout.tsx              → Protected layout (checks auth)
  ├─ page.tsx                → Main dashboard overview
  ├─ dashboard-client.tsx    → Client-side dashboard components
  ├─ alerts/page.tsx         → Alert management CRUD
  ├─ events/page.tsx         → View matched events
  ├─ settings/page.tsx       → User preferences
  └─ subscription/page.tsx   → Plan management
```

**Reusable Components:**
```
components/ui/
  ├─ button.tsx          → Styled button component
  ├─ card.tsx            → Card container
  ├─ input.tsx           → Input field
  ├─ form.tsx            → Form wrapper
  ├─ dialog.tsx          → Modal dialog
  ├─ table.tsx           → Data table
  └─ [40+ more...]       → Full Shadcn UI library
```

### Backend Code (`lib/` & `database/`)

**Database Layer:**
```
database/schema.ts
  ├─ users       → User accounts
  ├─ sessions    → Active sessions
  ├─ accounts    → OAuth provider data
  ├─ alerts      → Alert definitions
  ├─ events      → Matched opportunities
  └─ subscriptions → Billing info
```

**Business Logic:**
```
lib/
  ├─ auth.ts           → BetterAuth setup
  ├─ auth-client.ts    → Client auth utils
  ├─ db.ts             → Database connection
  ├─ email.ts          → Resend email service
  ├─ scraper.ts        → Email/web scraping
  ├─ matcher.ts        → Alert matching engine
  └─ utils.ts          → Helpers
```

**Server Actions:**
```
lib/actions/
  ├─ auth.ts      → signOut()
  ├─ alerts.ts    → getAlerts(), createAlert(), updateAlert(), deleteAlert()
  └─ events.ts    → getEvents(), getEventStats()
```

---

## Common Development Tasks

### Adding a New Page

1. **Create the page file:**
   ```typescript
   // app/admin/new-feature/page.tsx
   export default function NewFeaturePage() {
     return (
       <div className="container py-8">
         <h1>New Feature</h1>
       </div>
     );
   }
   ```

2. **Add navigation link (if needed):**
   ```typescript
   // components/dashboard/sidebar.tsx
   // Add new link to navigation menu
   ```

### Adding a Database Table

1. **Define schema:**
   ```typescript
   // database/schema.ts
   export const myTable = pgTable("my_table", {
     id: serial("id").primaryKey(),
     name: text("name").notNull(),
     createdAt: timestamp("created_at").defaultNow(),
   });
   ```

2. **Create migration:**
   ```bash
   npx drizzle-kit generate:pg
   npx drizzle-kit migrate
   ```

3. **Create server action:**
   ```typescript
   // lib/actions/my-table.ts
   import { db } from "@/lib/db";
   import { myTable } from "@/database/schema";

   export async function getMyTableItems() {
     return await db.select().from(myTable);
   }
   ```

4. **Use in component:**
   ```typescript
   "use client";
   import { getMyTableItems } from "@/lib/actions/my-table";

   export default async function MyComponent() {
     const items = await getMyTableItems();
     return <div>{items.map(item => <div>{item.name}</div>)}</div>;
   }
   ```

### Creating a Server Action

```typescript
// lib/actions/example.ts
"use server";

import { db } from "@/lib/db";
import { myTable } from "@/database/schema";

export async function createItem(name: string) {
  // Server-side logic
  const result = await db.insert(myTable).values({ name }).returning();
  return result;
}
```

Use in client component:
```typescript
"use client";
import { createItem } from "@/lib/actions/example";

export function MyForm() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await createItem("New Item");
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Styling Components

The project uses **Tailwind CSS**:

```typescript
export function MyComponent() {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border">
      <h2 className="text-lg font-semibold">Title</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Action
      </button>
    </div>
  );
}
```

Use Shadcn components for consistency:
```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold">Title</h2>
      <Button>Action</Button>
    </Card>
  );
}
```

---

## Testing & Debugging

### Running Tests

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Build check
npm run build
```

### Debugging Database Queries

```bash
# Enable query logs in drizzle
// lib/db.ts
import { sql } from "drizzle-orm";

export const db = drizzle(connection, {
  logger: true,  // Logs all SQL queries
});
```

### Debugging Server Actions

```typescript
"use server";

export async function myAction() {
  console.log("Server-side log - visible in terminal"); // Terminal
  console.log("Browser log - visible in DevTools");     // Browser console
}
```

### Database Inspection

```bash
# Connect to database
psql alert_db

# View tables
\dt

# View alerts for user
SELECT * FROM "alert" WHERE "userId" = 'user-id';

# View recent events
SELECT * FROM "event" ORDER BY "createdAt" DESC LIMIT 10;
```

---

## Performance Optimization

### Database Query Optimization

```typescript
// ❌ Bad: N+1 queries
const alerts = await db.select().from(alerts_table);
for (const alert of alerts) {
  const events = await db.select().from(events_table).where(...);
  // This queries for each alert!
}

// ✅ Good: Single query with join
const results = await db
  .select()
  .from(alerts_table)
  .leftJoin(events_table, eq(alerts_table.id, events_table.alertId));
```

### Image Optimization

```typescript
import Image from "next/image";

// ❌ Bad
<img src="/image.jpg" />

// ✅ Good
<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority // For above-the-fold images
/>
```

### Caching Server Actions

```typescript
import { cache } from "react";

export const getCachedAlerts = cache(async (userId: string) => {
  // This result is cached per request
  return await db.select().from(alerts).where(eq(alerts.userId, userId));
});
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Set all environment variables in production
- [ ] Run database migrations
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] Test OAuth with production credentials
- [ ] Test Stripe webhooks
- [ ] Enable HTTPS
- [ ] Set up monitoring/error tracking
- [ ] Set up database backups
- [ ] Test email delivery with real mail service

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/my-feature

# Create pull request on GitHub
# After review, merge to main

# Deploy
git checkout main
git pull
npm run build
# Deploy to Vercel/Railway/etc.
```

---

## Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npx prettier --write "." # Format code

# Database
npx drizzle-kit generate:pg  # Generate migrations
npx drizzle-kit migrate      # Run migrations
npx drizzle-kit studio       # Open Drizzle Studio (GUI)

# Debugging
node --inspect=9229 node_modules/.bin/next dev  # Debug mode

# Dependencies
npm outdated         # Check for outdated packages
npm audit            # Check security vulnerabilities
npm update           # Update packages
```

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [BetterAuth](https://betterauth.dev/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Need Help?

- Check existing issues/discussions on GitHub
- Review code in similar files for patterns
- Use TypeScript hover docs: Hover over symbols in VS Code
- Check ESLint errors for common mistakes
