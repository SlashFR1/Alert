# Alert Platform - Email Task Automation & Monitoring SaaS

> **Transform your inbox into an action plan.** Alert Platform is an intelligent email monitoring system that identifies tasks, deadlines, and urgent alerts from your emails, ensuring you never miss a beat.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Authentication](#authentication)
- [Admin Dashboard](#admin-dashboard)
- [Deployment](#deployment)

---

## ✨ Features

### Core Features
- **🔐 Secure Email Integration** - OAuth 2.0 integration with Gmail and Outlook. No passwords stored.
- **📧 Email Monitoring** - Automatically scan and parse incoming emails for tasks, deadlines, and keywords
- **🎯 Smart Alerts** - Create custom alerts based on keywords, senders, or patterns
- **📊 Event Detection** - Automatically capture and organize detected events and opportunities
- **💳 Subscription Management** - Stripe integration for flexible pricing plans (free, basic, pro)
- **🔔 Multi-channel Notifications** - Email notifications, SMS alerts, and web push notifications
- **📈 Analytics Dashboard** - Real-time statistics on alerts, events, and notification delivery
- **⚙️ User Settings** - Customizable preferences and alert management

### Security & Reliability
- **OAuth 2.0 Authentication** - Secure, credential-free email access
- **Read-only Email Access** - Never modifies or deletes user emails
- **Session Management** - Automatic token rotation and expiration handling
- **Rate Limiting** - Protected API endpoints with request throttling
- **Email Deduplication** - Prevents duplicate notifications via `sentNotifications` table

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Shadcn/ui** - High-quality React components
- **Framer Motion** - Smooth animations and interactions
- **React Hook Form** - Efficient form handling

### Backend
- **Next.js Server Actions** - Backend API logic
- **Better Auth** - Authentication framework
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Relational database
- **Cheerio** - Web scraping and HTML parsing

### Integrations
- **Stripe** - Payment processing and subscription management
- **Resend** - Transactional email service
- **Nylas/Context.io** (recommended) - Email API for Gmail/Outlook integration
- **Twilio** (optional) - SMS notifications
- **Pusher** (optional) - Real-time web notifications

---

## 📂 Project Structure

```
Alert/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # 🏠 Landing page
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Global styles
│   ├── api/                          # Backend API routes
│   │   ├── auth/[...all]/route.ts   # Better Auth endpoints
│   │   └── cron/route.ts            # Background job scheduler
│   ├── auth/                         # Authentication pages
│   │   ├── login/page.tsx           # 🔑 Login page
│   │   ├── sign-up/page.tsx         # 📝 Registration page
│   │   ├── sign-up-success/page.tsx # ✅ Success confirmation
│   │   └── error/page.tsx           # ❌ Error handling
│   ├── admin/                        # 🛡️ Protected admin area
│   │   ├── layout.tsx               # Admin layout with middleware check
│   │   ├── layout-client.tsx        # Client-side admin UI (sidebar, nav)
│   │   ├── page.tsx                 # 📊 Main dashboard
│   │   ├── dashboard-client.tsx     # Dashboard components
│   │   ├── alerts/                  # 🎯 Manage alerts
│   │   │   └── page.tsx             # Alert management interface
│   │   ├── events/                  # 📋 View detected events
│   │   │   └── page.tsx             # Events display page
│   │   ├── settings/                # ⚙️ User preferences
│   │   │   └── page.tsx
│   │   └── subscription/            # 💳 Manage subscription
│   │       └── page.tsx
│   ├── actions.ts                    # 🔧 Server actions (alerts CRUD)
│   └── dashboard/                    # (Legacy - merged into /admin)
│
├── components/                       # React components
│   ├── theme-provider.tsx           # Theme configuration
│   ├── dashboard/                   # Dashboard-specific components
│   │   └── sidebar.tsx              # Navigation sidebar
│   └── ui/                          # Reusable UI components
│       ├── button.tsx               # Button component
│       ├── input.tsx                # Input fields
│       ├── card.tsx                 # Card containers
│       ├── table.tsx                # Data tables
│       ├── dialog.tsx               # Modal dialogs
│       ├── form.tsx                 # Form components
│       └── [40+ more components]    # Full component library
│
├── database/                         # Database configuration
│   └── schema.ts                    # Drizzle ORM schema definition
│
├── lib/                             # Utility functions and services
│   ├── auth.ts                      # Better Auth configuration
│   ├── auth-client.ts               # Client-side auth utilities
│   ├── db.ts                        # Database connection
│   ├── email.ts                     # Email sending (Resend)
│   ├── scraper.ts                   # Email/web scraping logic
│   ├── matcher.ts                   # Alert matching algorithm
│   ├── utils.ts                     # General utilities
│   └── actions/
│       ├── auth.ts                  # Auth server actions
│       ├── alerts.ts                # Alert CRUD operations
│       └── events.ts                # Event queries and stats
│
├── public/                          # Static assets
├── middleware.ts                    # 🔐 Route protection middleware
├── next.config.ts                   # Next.js configuration
├── drizzle.config.ts               # Drizzle ORM configuration
├── tsconfig.json                   # TypeScript configuration
├── eslint.config.mjs               # ESLint configuration
├── postcss.config.mjs              # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── package.json                     # Dependencies and scripts
├── INTEGRATION.md                   # Integration guide (legacy)
└── README.md                        # This file

alert-front/front-alert/             # (Legacy frontend - consider removing)
└── [Deprecated - merged into root app/]
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ or **Bun**
- **PostgreSQL** 14+ (local or cloud)
- **Stripe** account (for payments)
- **Resend** account (for emails)
- **GitHub/Google OAuth apps** (for social authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Alert
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/alert_db

   # Better Auth
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000

   # Email Service (Resend)
   RESEND_API_KEY=your-resend-api-key

   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Email Integration (Future - Nylas)
   NYLAS_API_KEY=your-nylas-key
   NYLAS_API_URI=https://api.nylas.com

   # Optional: Social Auth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

4. **Set up the database**
   ```bash
   # Run migrations
   npx drizzle-kit migrate

   # (Optional) Seed with sample data
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture

### System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                     │
│  Landing Page → Auth Pages → Admin Dashboard               │
└────────────┬────────────────────────────────────────────────┘
             │ HTTP Requests
             ▼
┌─────────────────────────────────────────────────────────────┐
│               Backend (Next.js Server Actions)              │
│  • Authentication (Better Auth)                             │
│  • Alert Management (CRUD)                                  │
│  • Email Notifications                                      │
│  • Subscription Management (Stripe)                         │
└────────────┬────────────────────────────────────────────────┘
             │ SQL Queries
             ▼
┌─────────────────────────────────────────────────────────────┐
│          Database (PostgreSQL + Drizzle ORM)               │
│  • users, sessions, accounts, verifications                │
│  • alerts, events, sentNotifications                        │
│  • subscriptions, audit logs                               │
└─────────────────────────────────────────────────────────────┘
```

### Background Jobs
- **Email Scraping** - Cron job (`/api/cron`) runs periodically to fetch and parse emails
- **Alert Matching** - Compares scraped events with user alerts
- **Notification Sending** - Sends email/SMS to users when matches are found
- **Subscription Sync** - Periodically syncs with Stripe for billing updates

---

## 🗄️ Database Schema

### Core Tables

#### Users
```sql
users (user)
├── id: TEXT PRIMARY KEY
├── name: TEXT NOT NULL
├── email: TEXT NOT NULL UNIQUE
├── emailVerified: BOOLEAN
├── image: TEXT
├── createdAt: TIMESTAMP
└── updatedAt: TIMESTAMP
```

#### Authentication
```sql
sessions (session)  // Active user sessions
accounts (account)  // OAuth provider accounts
verifications       // Email verification tokens
```

#### Alerts
```sql
alerts (alert)
├── id: SERIAL PRIMARY KEY
├── userId: TEXT FOREIGN KEY → users.id
├── name: TEXT NOT NULL          // "Find freelance jobs"
├── keywords: TEXT[]             // ["typescript", "react"]
├── isActive: BOOLEAN DEFAULT true
├── sources: JSONB               // {linkedin: true, upwork: true}
├── createdAt: TIMESTAMP
└── updatedAt: TIMESTAMP
```

#### Events
```sql
events
├── id: SERIAL PRIMARY KEY
├── alertId: INT FOREIGN KEY → alerts.id
├── title: TEXT NOT NULL        // Job title
├── description: TEXT            // Full job description
├── url: TEXT                    // Link to opportunity
├── price: DECIMAL              // Salary/budget
├── source: TEXT                // linkedin, upwork, etc.
├── isMatched: BOOLEAN DEFAULT false
├── createdAt: TIMESTAMP
└── updatedAt: TIMESTAMP
```

#### Notifications
```sql
sentNotifications
├── id: SERIAL PRIMARY KEY
├── userId: TEXT FOREIGN KEY → users.id
├── eventId: INT FOREIGN KEY → events.id
├── type: TEXT                  // email, sms, push
├── status: TEXT                // sent, delivered, failed
├── sentAt: TIMESTAMP
└── readAt: TIMESTAMP NULLABLE
```

#### Subscriptions
```sql
subscriptions
├── id: SERIAL PRIMARY KEY
├── userId: TEXT FOREIGN KEY → users.id
├── stripeCustomerId: TEXT
├── stripeSubscriptionId: TEXT
├── status: TEXT                // active, inactive, past_due
├── plan: TEXT                  // free, basic, pro
├── createdAt: TIMESTAMP
└── updatedAt: TIMESTAMP
```

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/[...all]` - Better Auth endpoints
  - `/signin` - User login
  - `/signup` - User registration
  - `/signout` - User logout
  - `/oauth/google` - Google OAuth
  - `/oauth/github` - GitHub OAuth

### Cron Jobs
- `POST /api/cron` - Background job scheduler
  - Runs email scraping
  - Processes alert matching
  - Sends pending notifications
  - Syncs subscriptions

---

## 🔐 Authentication

### How It Works

1. **OAuth 2.0 Flow**
   - User clicks "Sign in with Google/GitHub"
   - Redirected to OAuth provider
   - Provider returns authorization code
   - Better Auth exchanges code for tokens
   - User session created in database

2. **Session Management**
   - Sessions stored in `sessions` table
   - Tokens expire after 30 days (configurable)
   - Automatic token refresh on activity
   - Secure HTTP-only cookies

3. **Route Protection**
   ```typescript
   // middleware.ts protects /admin/* routes
   // Unauthenticated users are redirected to /auth/login
   // Authenticated users can access dashboard
   ```

4. **Email Verification** (Optional)
   - Verification tokens stored in `verifications` table
   - Tokens expire after 24 hours
   - Only verified emails can access alerts

---

## 📊 Admin Dashboard

### Pages & Features

#### 1. Dashboard `/admin`
- **Statistics Overview**
  - Total active alerts
  - Events found this month
  - Notifications sent
  - Match success rate

#### 2. Alerts Management `/admin/alerts`
- ✅ Create new alert
- ✅ Edit alert keywords and sources
- ✅ Pause/activate alerts
- ✅ Delete alerts
- ✅ View alert statistics

#### 3. Events List `/admin/events`
- 📋 View all matched events
- 🔍 Search and filter results
- 🏷️ Tag events
- 📌 Save important findings
- 📤 Export to CSV/JSON

#### 4. Settings `/admin/settings`
- ⚙️ Account preferences
- 🔔 Notification preferences
- 🎨 Theme selection (light/dark)
- 🗑️ Account deletion

#### 5. Subscription `/admin/subscription`
- 💳 View current plan
- 📈 Usage statistics
- 🔄 Upgrade/downgrade plan
- 📊 Billing history
- 🧾 Download invoices

---

## 📧 Email Integration (Recommended Setup)

### Using Nylas (Recommended)

Nylas provides a unified API for Gmail, Outlook, Exchange, and more:

```bash
# Install Nylas SDK
npm install nylas
```

```typescript
// lib/email-integration.ts
import { Nylas } from "nylas";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
});

export async function getEmailsForUser(userId: string) {
  // Fetch emails for authenticated user
  const messages = await nylas.messages.list({
    grant_id: userGrant.id,
  });
  return messages;
}

export async function matchAlertsToEmails(alerts: Alert[], messages: Message[]) {
  // Compare alert keywords with email content
  // Return matching events
}
```

### Alternative: Using Gmail API directly

For a simpler setup with just Gmail:

```typescript
// lib/gmail.ts
import { gmail_v1, google } from "googleapis";

const gmail = google.gmail("v1");

export async function fetchGmailMessages(accessToken: string) {
  // Fetch and parse emails
}
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

Environment variables to configure on Vercel:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `RESEND_API_KEY`
- `NYLAS_API_KEY`

### Option 2: Docker

Create [Dockerfile](Dockerfile):
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Deploy to:
- **Railway** - `railway up`
- **Render** - Connect GitHub repo
- **AWS ECS** - Build and push image
- **DigitalOcean App Platform** - Deploy container

### Option 3: Traditional VPS (Ubuntu)

```bash
# Install dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs postgresql

# Clone and setup
git clone <repo>
cd Alert
npm ci
npm run build

# Set up PM2 for process management
npm install -g pm2
pm2 start npm --name "alert" -- start
pm2 save

# Configure reverse proxy (Nginx)
sudo nano /etc/nginx/sites-available/alert
sudo ln -s /etc/nginx/sites-available/alert /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## 📝 Development Guidelines

### Code Style
- Use **TypeScript** for type safety
- Follow **ESLint** rules: `npm run lint`
- Use **Prettier** for formatting (configured in ESLint)
- Component naming: PascalCase
- File naming: kebab-case

### Creating New Features
1. Create types in database schema
2. Run migrations: `npx drizzle-kit migrate`
3. Create server actions in `lib/actions/`
4. Create React components in `components/`
5. Add API routes if needed in `app/api/`
6. Write tests for critical logic

### Environment-Specific Setup
```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### Common Issues

**Problem:** Database connection fails
```bash
# Check PostgreSQL is running
psql -U postgres -d alert_db -c "SELECT 1"

# Verify DATABASE_URL format
# postgresql://user:password@localhost:5432/database
```

**Problem:** OAuth not working
- Verify callback URL matches in OAuth provider settings
- Check `BETTER_AUTH_URL` environment variable
- Ensure cookies are enabled in browser

**Problem:** Emails not sending
- Verify Resend API key is valid
- Check email is in verified senders list
- Review Resend dashboard for delivery logs

**Problem:** Cron jobs not running
- Verify `API_ROUTE_SECRET` is set (if using external cron service)
- Check server logs for errors
- Ensure database queries are optimal

---

## 📚 Additional Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Framework guide
- **[Drizzle ORM Docs](https://orm.drizzle.team)** - Database queries
- **[Better Auth Docs](https://betterauth.dev)** - Authentication
- **[Stripe API](https://stripe.com/docs/api)** - Payment processing
- **[Resend Docs](https://resend.com/docs)** - Email sending
- **[PostgreSQL Docs](https://www.postgresql.org/docs/)** - Database

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 👥 Support

For issues and questions:
- 📧 Email: support@alertplatform.dev
- 💬 Discord: [Community Server]
- 📖 Docs: [Full Documentation](https://docs.alertplatform.dev)
