# Integration Guide

## Table of Contents

1. [Authentication Integration](#authentication-integration)
2. [Email Service Integration](#email-service-integration)
3. [Payment Integration](#payment-integration)
4. [Route Protection](#route-protection)
5. [Testing Integrations](#testing-integrations)

---

## Authentication Integration

### BetterAuth Setup

The project uses **BetterAuth** for secure authentication with OAuth 2.0 support.

#### Files Involved
- `lib/auth.ts` - BetterAuth configuration
- `lib/auth-client.ts` - Client-side authentication utilities
- `app/api/auth/[...all]/route.ts` - Auth API endpoints
- `middleware.ts` - Route protection

#### Configuration

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/database/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    // Optional: OAuth providers
    // github(), google(), discord(), etc.
  ],
});
```

#### OAuth Provider Setup

To enable OAuth sign-in (Google, GitHub, etc.):

1. **Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials (Web application)
   - Set authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Secret to `.env.local`

2. **GitHub OAuth**
   - Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
   - Create new OAuth App
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Secret to `.env.local`

#### Database Tables

BetterAuth automatically creates:
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth provider connections
- `verification` - Email verification tokens

#### Client-Side Usage

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/client";

export const { signIn, signUp, signOut, useSession } = createAuthClient();
```

---

## Email Service Integration

### Resend Setup

**Resend** handles transactional email delivery.

#### Installation

```bash
npm install resend
```

#### Configuration

```typescript
// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAlertNotification(
  userEmail: string,
  event: {
    title: string;
    description: string;
    url: string;
    source: string;
  }
) {
  const { data, error } = await resend.emails.send({
    from: "alerts@yourdomain.com",
    to: userEmail,
    subject: `🎯 Alert: ${event.title}`,
    html: `
      <h2>${event.title}</h2>
      <p>${event.description}</p>
      <p><strong>Source:</strong> ${event.source}</p>
      <a href="${event.url}">View Details</a>
    `,
  });

  if (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }

  return { success: true, data };
}
```

#### Verified Senders

1. Go to [Resend Dashboard](https://resend.com)
2. Navigate to Senders
3. Add sender email (e.g., alerts@yourdomain.com)
4. Verify ownership via DNS records
5. Use in `from` field

### Email Scraping Integration (Future)

#### Using Nylas (Recommended)

```bash
npm install nylas
```

```typescript
// lib/email-integration.ts
import { Nylas } from "nylas";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
});

export async function scanUserEmails(userId: string, grantId: string) {
  try {
    // Fetch last 50 emails
    const messages = await nylas.messages.list({
      grant_id: grantId,
      limit: 50,
    });

    return messages;
  } catch (error) {
    console.error("Failed to fetch emails:", error);
    throw error;
  }
}

export async function matchAlertsToMessages(
  alerts: Alert[],
  messages: Message[],
  userId: string
) {
  const matchedEvents: Event[] = [];

  for (const msg of messages) {
    for (const alert of alerts) {
      // Check if message contains alert keywords
      const matched = alert.keywords.some(
        (keyword) =>
          msg.subject?.toLowerCase().includes(keyword.toLowerCase()) ||
          msg.body?.toLowerCase().includes(keyword.toLowerCase())
      );

      if (matched) {
        matchedEvents.push({
          userId,
          alertId: alert.id,
          title: msg.subject || "No subject",
          description: msg.body?.substring(0, 500) || "",
          url: "", // Email link if applicable
          source: "email",
          isMatched: true,
        });
      }
    }
  }

  return matchedEvents;
}
```

---

## Payment Integration

### Stripe Setup

#### Installation

```bash
npm install stripe
```

#### Configuration

```typescript
// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

export async function createCustomer(email: string, name: string) {
  return await stripe.customers.create({
    email,
    name,
  });
}

export async function createSubscription(
  customerId: string,
  priceId: string
) {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  });
}

export async function updateSubscription(
  subscriptionId: string,
  priceId: string
) {
  // Get current subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Update subscription item
  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: priceId,
      },
    ],
  });
}

export async function cancelSubscription(subscriptionId: string) {
  return await stripe.subscriptions.del(subscriptionId);
}
```

#### Database Integration

```typescript
// app/actions.ts
import { db } from "@/lib/db";
import { subscriptions } from "@/database/schema";

export async function createUserSubscription(
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  plan: string
) {
  return await db.insert(subscriptions).values({
    userId,
    stripeCustomerId,
    stripeSubscriptionId,
    plan,
    status: "active",
  });
}

export async function updateUserSubscription(
  subscriptionId: string,
  status: string,
  plan: string
) {
  return await db
    .update(subscriptions)
    .set({ status, plan, updatedAt: new Date() })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));
}
```

#### Webhook Handling

```typescript
// app/api/webhooks/stripe/route.ts
import { stripe } from "@/lib/stripe";
import { updateUserSubscription } from "@/app/actions";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    return new Response("Webhook signature verification failed", {
      status: 400,
    });
  }

  // Handle subscription events
  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    await updateUserSubscription(
      subscription.id,
      subscription.status,
      subscription.metadata.plan
    );
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    await updateUserSubscription(subscription.id, "canceled", "");
  }

  return new Response(JSON.stringify({ received: true }));
}
```

#### Pricing Plans

Set up in Stripe Dashboard:
- **Free** - $0/month, 5 alerts, basic features
- **Basic** - $9/month, 25 alerts, email notifications
- **Pro** - $29/month, unlimited alerts, SMS + push notifications

---

## Route Protection

### Middleware Configuration

```typescript
// middleware.ts
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/sign-up",
  "/auth/error",
  "/api/webhooks",
];

export default async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.some((route) => pathName.startsWith(route))) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // If not authenticated, redirect to login
  if (!session) {
    return NextResponse.redirect(
      new URL("/auth/login?redirect=" + pathName, request.nextUrl.origin)
    );
  }

  // If authenticated but on login page, redirect to dashboard
  if (
    pathName.startsWith("/auth/login") ||
    pathName.startsWith("/auth/sign-up")
  ) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

### Protected Pages

```typescript
// app/admin/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
```

---

## Testing Integrations

### Email Testing

```bash
# Test Resend API
curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "delivered@resend.dev",
    "subject": "Test Email",
    "html": "<strong>Test</strong>"
  }'
```

### Stripe Testing

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires auth:** `4000 0000 0000 3220`

Expiry: Any future date
CVC: Any 3 digits

### Database Testing

```bash
# Connect to PostgreSQL
psql -U postgres -d alert_db

# Check users
SELECT id, email, "emailVerified" FROM "user";

# Check alerts
SELECT * FROM "alert";

# Check subscriptions
SELECT * FROM "subscription";
```

---

## Troubleshooting

### OAuth Not Working
1. Verify callback URLs match exactly
2. Check `BETTER_AUTH_URL` matches deployment domain
3. Clear browser cookies and try again
4. Check OAuth app credentials in `.env.local`

### Emails Not Sending
1. Verify Resend API key is correct
2. Check sender email is verified in Resend
3. Review Resend dashboard for bounced emails
4. Test with `resend.emails.send()` directly

### Stripe Webhook Failures
1. Verify webhook secret in `.env.local`
2. Check endpoint URL matches Stripe dashboard
3. Review Stripe webhook logs for error details
4. Ensure request signature verification succeeds

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql postgresql://user:password@localhost:5432/alert_db

# Run migrations
npx drizzle-kit migrate

# Check migration status
npx drizzle-kit status
```

---

## Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use HTTPS in production** - Required for OAuth and payments
3. **Rotate secrets regularly** - Update API keys periodically
4. **Validate webhook signatures** - Verify Stripe webhook authenticity
5. **Use environment-specific keys** - Separate test and production
6. **Enable CORS carefully** - Restrict to your domain only
7. **Rate limit API endpoints** - Prevent abuse and brute force attacks
8. **Hash sensitive data** - Use bcrypt for passwords (if applicable)

---

## Support

For integration issues:
- BetterAuth: https://betterauth.dev/docs
- Resend: https://resend.com/docs
- Stripe: https://stripe.com/docs
- Nylas: https://www.nylas.com/docs
