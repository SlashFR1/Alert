# Alert Platform - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER (Browser)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Landing Page  →  Auth Pages  →  Admin Dashboard (Protected)            │
│  (Public)        (Public)       (Authenticated Users Only)              │
│                                                                           │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  React Components (Next.js with App Router)                      │   │
│  ├──────────────────────────────────────────────────────────────────┤   │
│  │  • UI Components (Shadcn/ui + Radix UI)                          │   │
│  │  • Form Handling (React Hook Form)                               │   │
│  │  • Animations (Framer Motion)                                    │   │
│  │  • State Management (Zustand, React Context)                     │   │
│  │  • HTTP Client (fetch with error handling)                       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
                        (HTTP REST API Calls)
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                       MIDDLEWARE LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  • Authentication Check                                                 │
│  • Route Protection (/admin/* → redirect if not authenticated)          │
│  • Session Validation                                                   │
│  • CORS Handling                                                        │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      API LAYER (Next.js Routes)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  1. AUTHENTICATION                                                      │
│     ├─ POST /api/auth/signup        → Create user account              │
│     ├─ POST /api/auth/signin        → Validate credentials             │
│     ├─ POST /api/auth/signout       → Destroy session                  │
│     ├─ GET  /api/auth/get-session   → Retrieve session                 │
│     └─ POST /api/auth/oauth/*       → OAuth provider flows             │
│                                                                           │
│  2. ALERT MANAGEMENT (Server Actions)                                  │
│     ├─ getAlerts()                  → Fetch user's alerts              │
│     ├─ createAlert()                → Create new alert                 │
│     ├─ updateAlert()                → Modify alert                     │
│     ├─ deleteAlert()                → Remove alert                     │
│     └─ toggleAlert()                → Activate/deactivate              │
│                                                                           │
│  3. EVENT DETECTION (Server Actions)                                   │
│     ├─ getEvents()                  → Fetch matched events             │
│     ├─ getEvent()                   → Get single event                 │
│     ├─ getEventStats()              → Statistics                       │
│     ├─ bookmarkEvent()              → Save important event             │
│     └─ markEventAsRead()            → Update read status               │
│                                                                           │
│  4. SUBSCRIPTION MANAGEMENT (Server Actions)                           │
│     ├─ getUserSubscription()        → Get current plan                 │
│     ├─ createSubscription()         → Start subscription               │
│     ├─ upgradePlan()                → Change plan                      │
│     └─ cancelSubscription()         → Stop subscription                │
│                                                                           │
│  5. BACKGROUND JOBS (Cron)                                             │
│     ├─ POST /api/cron?action=process-alerts    → Run alert engine     │
│     ├─ POST /api/cron?action=send-emails       → Send notifications   │
│     └─ POST /api/cron?action=sync-stripe       → Sync payments        │
│                                                                           │
│  6. WEBHOOKS                                                            │
│     └─ POST /api/webhooks/stripe   → Handle Stripe events             │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER (lib/)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Authentication Service (lib/auth.ts, lib/auth-client.ts)       │   │
│  │  └─ BetterAuth configuration & session management              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Email Service (lib/email.ts)                                    │   │
│  │  ├─ Resend API integration                                      │   │
│  │  └─ Email template rendering                                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Email Scraper (lib/scraper.ts)                                  │   │
│  │  ├─ Fetch emails from Gmail/Outlook (via Nylas)               │   │
│  │  ├─ Parse email content                                        │   │
│  │  └─ Extract metadata (sender, subject, body)                   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Alert Matcher (lib/matcher.ts)                                  │   │
│  │  ├─ Compare emails against user alerts                         │   │
│  │  ├─ Apply keyword matching logic                               │   │
│  │  └─ Score relevance                                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Stripe Service (lib/stripe.ts)                                  │   │
│  │  ├─ Create customers & subscriptions                           │   │
│  │  ├─ Process plan changes                                       │   │
│  │  └─ Handle webhooks                                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Database Access (lib/db.ts)                                     │   │
│  │  └─ Drizzle ORM instance                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Utilities (lib/utils.ts)                                        │   │
│  │  ├─ String manipulation                                        │   │
│  │  ├─ Date formatting                                            │   │
│  │  ├─ Error handling                                             │   │
│  │  └─ Validation helpers                                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                     DATA ACCESS LAYER (Drizzle ORM)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Type-safe database queries with Drizzle ORM                            │
│  • Automatic type inference                                             │
│  • SQL query builder                                                    │
│  • Migration management                                                 │
│                                                                           │
│  Schema (database/schema.ts):                                           │
│  ├─ users           - User accounts                                     │
│  ├─ sessions        - Active sessions                                   │
│  ├─ accounts        - OAuth provider accounts                           │
│  ├─ verifications   - Email verification tokens                        │
│  ├─ alerts          - User alert definitions                           │
│  ├─ events          - Detected opportunities                           │
│  ├─ sentNotifications - Notification history                           │
│  └─ subscriptions   - Billing information                              │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    PERSISTENCE LAYER (PostgreSQL)                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Primary Database: PostgreSQL 14+                                       │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ USER & AUTHENTICATION DATA                                     │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ • user (id, email, name, emailVerified, image, timestamps)    │    │
│  │ • session (id, userId, token, expiresAt, metadata)            │    │
│  │ • account (id, userId, providerId, OAuth tokens)              │    │
│  │ • verification (id, identifier, token, expiresAt)             │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ ALERT & EVENT DATA                                             │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ • alert (id, userId, name, keywords[], sources[], isActive)   │    │
│  │ • event (id, alertId, title, description, url, source, etc.)  │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ NOTIFICATIONS & SUBSCRIPTIONS                                  │    │
│  ├────────────────────────────────────────────────────────────────┤    │
│  │ • sentNotifications (id, userId, eventId, type, status)        │    │
│  │ • subscription (id, userId, stripeId, plan, status)            │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Complete User Journey

### 1. User Registration & Authentication

```
User Browser
    ↓
  Click "Sign Up" button
    ↓
POST /api/auth/signup (email, password, name)
    ↓
lib/auth.ts (BetterAuth)
    ↓
Hash password & validate
    ↓
Database: Insert user into "user" table
    ↓
Create session → Insert into "session" table
    ↓
Return user + session token
    ↓
Browser stores session in HTTP-only cookie
    ↓
Redirect to /admin (dashboard)
```

### 2. Create Alert Flow

```
User fills alert form
    ↓
Submit form
    ↓
Server Action: createAlert()
    ↓
Validation (name, keywords, sources)
    ↓
Database: INSERT into "alert" table
    ↓
Return created alert to UI
    ↓
Update dashboard view
```

### 3. Email Monitoring & Event Detection

```
┌─── Cron Job Runs Every 15 Minutes ───┐
│                                       │
│  1. lib/scraper.ts                  │
│     └─ Fetch emails via Nylas API  │
│                                       │
│  2. For each email:                 │
│     lib/matcher.ts                  │
│     └─ Check against all alerts    │
│                                       │
│  3. If match found:                 │
│     Database: INSERT into "event"  │
│                                       │
│  4. Send notification:              │
│     lib/email.ts                    │
│     └─ Use Resend API              │
│                                       │
│  5. Log notification:               │
│     Database: INSERT into          │
│     "sentNotifications"             │
│                                       │
└───────────────────────────────────────┘
         ↓
    User receives email notification
         ↓
    Clicks link to view event in dashboard
         ↓
    Admin page fetches event details
```

### 4. Payment & Subscription Flow

```
User clicks "Upgrade Plan"
    ↓
POST /api/checkout (plan: "pro")
    ↓
Create Stripe Checkout Session
    ↓
Redirect to Stripe payment page
    ↓
User enters card details
    ↓
Stripe processes payment
    ↓
Stripe sends webhook: customer.subscription.created
    ↓
/api/webhooks/stripe receives event
    ↓
Database: UPDATE "subscription" status to "active"
    ↓
Update user's plan in database
    ↓
Trigger email: "Welcome to Pro plan!"
    ↓
User can now access Pro features
```

---

## Technology Stack Details

### Frontend Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework | 14+ |
| **TypeScript** | Type safety | 5+ |
| **Tailwind CSS** | Styling | 3+ |
| **Shadcn/ui** | Components | Latest |
| **Radix UI** | Accessible primitives | Latest |
| **Framer Motion** | Animations | Latest |
| **React Hook Form** | Form handling | Latest |
| **Zustand** | State management | Latest |
| **Date-fns** | Date utilities | Latest |

### Backend Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | Full-stack framework | 14+ |
| **TypeScript** | Type safety | 5+ |
| **Drizzle ORM** | Database | 0.45+ |
| **BetterAuth** | Authentication | 1.4+ |
| **Cheerio** | HTML parsing | 1.1+ |

### External Services

| Service | Purpose |
|---------|---------|
| **PostgreSQL** | Primary database |
| **Stripe** | Payment processing |
| **Resend** | Email delivery |
| **Nylas** | Email API (recommended) |
| **OAuth Providers** | Social authentication |
| **Uptime Robot** | Cron job trigger |

---

## Scalability Considerations

### Horizontal Scaling

```
Load Balancer
    ↓
┌───────┬───────┬───────┐
│       │       │       │
App-1  App-2  App-3  ... (Next.js instances)
│       │       │
└───────┴───────┴───────┘
        ↓
    Shared Database (PostgreSQL)
        ↓
    Shared Cache (Redis - optional)
```

### Database Optimization

- **Indexes:** Add indexes on frequently queried columns
  ```sql
  CREATE INDEX idx_alerts_user_id ON alert(user_id);
  CREATE INDEX idx_events_alert_id ON event(alert_id);
  CREATE INDEX idx_sent_notifications_user_id ON sentNotifications(user_id);
  ```

- **Connection Pooling:** Use PgBouncer or similar
- **Read Replicas:** For high-volume reads
- **Partitioning:** Partition large tables by time

### Caching Strategy

```
Client Request
    ↓
Check Redis Cache
    ├─ Hit → Return cached data
    └─ Miss → Query database
              ↓
         Cache result
         Return data
```

Cacheable data:
- User profile
- Alert list
- Event statistics
- User subscription status

### Performance Monitoring

- **Application Monitoring:** Sentry, DataDog
- **Database Monitoring:** Query performance, slow queries
- **CDN:** Use for static assets
- **Database Query Optimization:** EXPLAIN ANALYZE

---

## Security Architecture

```
┌─────────────────────────────────────┐
│  HTTPS Encryption (TLS 1.3+)       │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Request Validation & Sanitization  │
│  • Input validation                 │
│  • Rate limiting                    │
│  • CORS headers                     │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Authentication & Authorization     │
│  • Session tokens                   │
│  • Role-based access control        │
│  • Middleware protection            │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Business Logic                     │
│  • Data validation                  │
│  • Error handling                   │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  Data Encryption                    │
│  • Passwords: bcrypt hashing        │
│  • Sensitive fields: encrypted      │
│  • Database connection: SSL         │
└─────────────────────────────────────┘
          ↓
┌─────────────────────────────────────┐
│  PostgreSQL Database                │
│  • Row-level security (RLS)         │
│  • Connection encryption            │
│  • Backup encryption                │
└─────────────────────────────────────┘
```

---

## Deployment Architecture

### Development Environment
```
Local Machine
├─ Next.js dev server (localhost:3000)
├─ PostgreSQL (local)
└─ .env.local (development keys)
```

### Production Environment (Vercel)
```
GitHub Repository
    ↓
Git Push
    ↓
Vercel Detects Change
    ↓
Build Process
├─ Install dependencies
├─ Run type check
├─ Run linter
├─ Build Next.js
└─ Run migrations
    ↓
Deploy to Edge Network
├─ API Routes (Serverless Functions)
├─ Static Assets (CDN)
└─ Middleware (Edge)
    ↓
PostgreSQL Database (AWS RDS or similar)
    ↓
External Services
├─ Stripe API
├─ Resend Email API
├─ Nylas Email API
└─ OAuth Providers
```

---

## Database Relationships

```
user (1) ─────────────────┬────────────────── (N) session
user (1) ─────────────────┬────────────────── (N) account
user (1) ─────────────────┬────────────────── (N) alert
user (1) ─────────────────┬────────────────── (1) subscription
user (1) ─────────────────┬────────────────── (N) sentNotifications

alert (1) ────────────────┬────────────────── (N) event

event (1) ────────────────┬────────────────── (N) sentNotifications
```

---

## Error Handling Strategy

```
Client Request
    ↓
Middleware Layer
├─ CORS/Security check → 403 Forbidden
├─ Authentication → 401 Unauthorized
└─ Rate limit → 429 Too Many Requests
    ↓
API Endpoint
├─ Input validation → 400 Bad Request
├─ Business logic → Custom error codes
└─ Database error → 500 Internal Server Error
    ↓
Error Response to Client
├─ Error message
├─ Error code
├─ Status code
└─ Debug info (dev only)
    ↓
Logging
├─ Sentry/DataDog
└─ Application logs
```

---

## Monitoring & Observability

### Metrics to Monitor

1. **Application Metrics**
   - Request latency
   - Error rate
   - Uptime

2. **Database Metrics**
   - Query latency
   - Connection pool usage
   - Slow queries

3. **Business Metrics**
   - Active users
   - Alerts created
   - Events detected
   - Conversion rate

4. **Infrastructure Metrics**
   - CPU usage
   - Memory usage
   - Disk space
   - Network bandwidth

### Logging Strategy

```
Application
    ↓
├─ Winston/Pino (Application logs)
├─ Drizzle Logger (Database queries)
├─ Next.js Logs (Framework logs)
└─ Sentry (Error tracking)
    ↓
Aggregation
├─ ELK Stack
├─ Datadog
└─ CloudWatch (AWS)
    ↓
Alerting
├─ High error rate → Alert team
├─ Database down → Page on-call
└─ Performance degradation → Investigate
```

---

## Conclusion

The Alert Platform architecture is designed to:

- ✅ **Scale horizontally** - Multiple application instances
- ✅ **Maintain performance** - Optimized queries and caching
- ✅ **Ensure security** - Encryption and authentication at every layer
- ✅ **Be maintainable** - Clear separation of concerns
- ✅ **Enable monitoring** - Comprehensive logging and metrics
- ✅ **Support growth** - Ready for production use

For questions about architecture or implementation details, refer to:
- [README.md](./README.md) - Project overview
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Development setup
- [API.md](./API.md) - API documentation
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Integration details
