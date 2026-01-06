# API Documentation

This document outlines all API routes and server actions available in the Alert Platform.

## Table of Contents

- [Authentication Endpoints](#authentication-endpoints)
- [Alert Endpoints](#alert-endpoints)
- [Event Endpoints](#event-endpoints)
- [User Endpoints](#user-endpoints)
- [Subscription Endpoints](#subscription-endpoints)
- [Cron Endpoints](#cron-endpoints)

---

## Authentication Endpoints

All authentication routes are handled by BetterAuth.

### Base URL
```
/api/auth
```

### Sign Up

**Endpoint:** `POST /api/auth/signup`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "emailVerified": false,
    "image": null,
    "createdAt": "2024-01-05T10:00:00Z"
  },
  "session": {
    "id": "session-123",
    "token": "auth-token...",
    "expiresAt": "2024-02-04T10:00:00Z"
  }
}
```

**Response (Error):**
```json
{
  "error": "Email already exists",
  "code": "USER_EXISTS"
}
```

### Sign In

**Endpoint:** `POST /api/auth/signin`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "emailVerified": true
  },
  "session": {
    "id": "session-123",
    "token": "auth-token...",
    "expiresAt": "2024-02-04T10:00:00Z"
  }
}
```

### Sign Out

**Endpoint:** `POST /api/auth/signout`

**Headers:**
```
Authorization: Bearer <session-token>
```

**Response:**
```json
{
  "success": true
}
```

### Get Session

**Endpoint:** `GET /api/auth/get-session`

**Response (Authenticated):**
```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "session": {
    "id": "session-123",
    "expiresAt": "2024-02-04T10:00:00Z"
  }
}
```

**Response (Not Authenticated):**
```json
null
```

### OAuth Endpoints

**Google OAuth:**
- `GET /api/auth/oauth/google` - Initiate Google OAuth flow
- `GET /api/auth/callback/google?code=<code>` - OAuth callback

**GitHub OAuth:**
- `GET /api/auth/oauth/github` - Initiate GitHub OAuth flow
- `GET /api/auth/callback/github?code=<code>` - OAuth callback

---

## Alert Endpoints

All alert operations use server actions in `lib/actions/alerts.ts`.

### Get All Alerts

**Server Action:** `getAlerts()`

```typescript
import { getAlerts } from "@/lib/actions/alerts";

const alerts = await getAlerts();
// Returns: Alert[]
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": "user-123",
    "name": "Find TypeScript Jobs",
    "keywords": ["typescript", "react", "next.js"],
    "isActive": true,
    "sources": ["linkedin", "upwork"],
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-05T10:00:00Z"
  }
]
```

### Get Alert by ID

**Server Action:** `getAlert(alertId: number)`

```typescript
import { getAlert } from "@/lib/actions/alerts";

const alert = await getAlert(1);
```

**Response:**
```json
{
  "id": 1,
  "userId": "user-123",
  "name": "Find TypeScript Jobs",
  "keywords": ["typescript", "react"],
  "isActive": true,
  "sources": ["linkedin", "upwork"],
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### Create Alert

**Server Action:** `createAlert(data: CreateAlertInput)`

```typescript
import { createAlert } from "@/lib/actions/alerts";

const newAlert = await createAlert({
  name: "Find Remote Jobs",
  keywords: ["remote", "work-from-home"],
  sources: ["linkedin", "upwork", "github"],
  isActive: true
});
```

**Response:**
```json
{
  "id": 2,
  "userId": "user-123",
  "name": "Find Remote Jobs",
  "keywords": ["remote", "work-from-home"],
  "sources": ["linkedin", "upwork", "github"],
  "isActive": true,
  "createdAt": "2024-01-05T10:00:00Z",
  "updatedAt": "2024-01-05T10:00:00Z"
}
```

### Update Alert

**Server Action:** `updateAlert(alertId: number, data: UpdateAlertInput)`

```typescript
import { updateAlert } from "@/lib/actions/alerts";

const updated = await updateAlert(1, {
  name: "Find TypeScript & React Jobs",
  keywords: ["typescript", "react", "node.js"],
  isActive: true
});
```

**Response:**
```json
{
  "id": 1,
  "userId": "user-123",
  "name": "Find TypeScript & React Jobs",
  "keywords": ["typescript", "react", "node.js"],
  "isActive": true,
  "sources": ["linkedin", "upwork"],
  "updatedAt": "2024-01-05T15:30:00Z"
}
```

### Delete Alert

**Server Action:** `deleteAlert(alertId: number)`

```typescript
import { deleteAlert } from "@/lib/actions/alerts";

await deleteAlert(1);
```

**Response:**
```json
{
  "success": true,
  "message": "Alert deleted successfully"
}
```

### Activate/Deactivate Alert

**Server Action:** `toggleAlert(alertId: number, isActive: boolean)`

```typescript
import { toggleAlert } from "@/lib/actions/alerts";

await toggleAlert(1, false); // Deactivate
await toggleAlert(1, true);  // Activate
```

**Response:**
```json
{
  "id": 1,
  "isActive": false,
  "updatedAt": "2024-01-05T15:30:00Z"
}
```

---

## Event Endpoints

All event operations use server actions in `lib/actions/events.ts`.

### Get All Events

**Server Action:** `getEvents(filters?: EventFilters)`

```typescript
import { getEvents } from "@/lib/actions/events";

const events = await getEvents({
  alertId: 1,
  source: "linkedin",
  isMatched: true,
  limit: 50,
  offset: 0
});
```

**Response:**
```json
[
  {
    "id": 101,
    "alertId": 1,
    "title": "Senior TypeScript Developer",
    "description": "We're looking for a senior TypeScript developer...",
    "url": "https://linkedin.com/jobs/123",
    "price": 120000,
    "source": "linkedin",
    "isMatched": true,
    "createdAt": "2024-01-05T10:00:00Z"
  }
]
```

### Get Event by ID

**Server Action:** `getEvent(eventId: number)`

```typescript
import { getEvent } from "@/lib/actions/events";

const event = await getEvent(101);
```

### Get Event Statistics

**Server Action:** `getEventStats()`

```typescript
import { getEventStats } from "@/lib/actions/events";

const stats = await getEventStats();
```

**Response:**
```json
{
  "totalEvents": 254,
  "matchedEvents": 189,
  "totalBySource": {
    "linkedin": 120,
    "upwork": 89,
    "github": 45
  },
  "eventsThisMonth": 54,
  "avgPricePerEvent": 85000
}
```

### Mark Event as Read

**Server Action:** `markEventAsRead(eventId: number)`

```typescript
import { markEventAsRead } from "@/lib/actions/events";

await markEventAsRead(101);
```

### Save/Bookmark Event

**Server Action:** `bookmarkEvent(eventId: number)`

```typescript
import { bookmarkEvent } from "@/lib/actions/events";

await bookmarkEvent(101);
```

**Response:**
```json
{
  "success": true,
  "bookmarked": true
}
```

---

## User Endpoints

### Get Current User

**Server Action:** `getCurrentUser()`

```typescript
const user = await getCurrentUser();
```

**Response:**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  "emailVerified": true,
  "image": "https://...",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### Update User Profile

**Server Action:** `updateUserProfile(data: UpdateUserInput)`

```typescript
import { updateUserProfile } from "@/lib/actions/auth";

const updated = await updateUserProfile({
  name: "Jane Doe",
  image: "https://..."
});
```

**Response:**
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "Jane Doe",
  "image": "https://...",
  "updatedAt": "2024-01-05T10:00:00Z"
}
```

### Delete User Account

**Server Action:** `deleteUserAccount(password: string)`

```typescript
import { deleteUserAccount } from "@/lib/actions/auth";

await deleteUserAccount("SecurePassword123!");
```

**Response:**
```json
{
  "success": true,
  "message": "Account deleted"
}
```

---

## Subscription Endpoints

### Get Subscription

**Server Action:** `getUserSubscription()`

```typescript
import { getUserSubscription } from "@/lib/actions/subscription";

const subscription = await getUserSubscription();
```

**Response:**
```json
{
  "id": 1,
  "userId": "user-123",
  "stripeCustomerId": "cus_123",
  "stripeSubscriptionId": "sub_123",
  "status": "active",
  "plan": "pro",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### Create Subscription

**Server Action:** `createSubscription(priceId: string)`

```typescript
import { createSubscription } from "@/lib/actions/subscription";

const subscription = await createSubscription("price_basic");
```

### Update Subscription Plan

**Server Action:** `upgradePlan(newPriceId: string)`

```typescript
import { upgradePlan } from "@/lib/actions/subscription";

await upgradePlan("price_pro");
```

### Cancel Subscription

**Server Action:** `cancelSubscription()`

```typescript
import { cancelSubscription } from "@/lib/actions/subscription";

await cancelSubscription();
```

**Response:**
```json
{
  "success": true,
  "status": "canceled"
}
```

---

## Cron Endpoints

### Run Background Jobs

**Endpoint:** `POST /api/cron`

**Headers:**
```
Authorization: Bearer <CRON_SECRET>
```

**Request:**
```json
{
  "action": "process-alerts" | "sync-stripe" | "send-emails"
}
```

**Response (Success):**
```json
{
  "success": true,
  "action": "process-alerts",
  "processed": 150,
  "timestamp": "2024-01-05T10:00:00Z"
}
```

### Triggered Cron Jobs

**Job 1: Process Email Alerts**
```
POST /api/cron?action=process-alerts
```
- Runs every 15 minutes
- Fetches new emails
- Matches against user alerts
- Creates new events

**Job 2: Send Notifications**
```
POST /api/cron?action=send-emails
```
- Runs every hour
- Sends pending email notifications
- Tracks delivery status
- Prevents duplicates

**Job 3: Stripe Sync**
```
POST /api/cron?action=sync-stripe
```
- Runs daily
- Syncs subscription statuses
- Updates billing information
- Handles failed payments

---

## Error Responses

### Standard Error Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `UNAUTHORIZED` | 401 | Not authenticated |
| `FORBIDDEN` | 403 | Not authorized for this action |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `INVALID_INPUT` | 400 | Invalid request data |
| `ALREADY_EXISTS` | 409 | Resource already exists |
| `SERVER_ERROR` | 500 | Server error |

### Example Error Response

```json
{
  "error": "Alert with ID 999 not found",
  "code": "NOT_FOUND",
  "statusCode": 404
}
```

---

## Rate Limiting

API routes have rate limiting:

- **Authentication:** 5 requests per minute per IP
- **Alert Operations:** 100 requests per minute per user
- **Cron Jobs:** 1 request per minute (requires secret)

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704369000
```

---

## Pagination

List endpoints support pagination:

```typescript
const alerts = await getAlerts({
  limit: 20,    // Items per page
  offset: 40    // Skip first 40 items
});
```

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 40,
    "hasMore": true
  }
}
```

---

## Webhook Events

### Stripe Webhooks

```
POST /api/webhooks/stripe
```

**Events:**
- `customer.subscription.updated` - Plan upgraded/downgraded
- `customer.subscription.deleted` - Subscription canceled
- `invoice.payment_failed` - Payment failed
- `invoice.payment_succeeded` - Payment successful

---

## Authentication

All endpoints (except public ones) require authentication:

**Using Session Token:**
```typescript
const response = await fetch("/api/alerts", {
  headers: {
    "Authorization": `Bearer ${sessionToken}`
  }
});
```

**Using Cookies (Automatic):**
Cookies are automatically sent with requests from the browser.

---

## Rate Limit Examples

```bash
# Get all alerts (count: 1)
curl -H "Authorization: Bearer token" \
  https://yourdomain.com/api/alerts

# Create alert (count: 1)
curl -X POST -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alert"}' \
  https://yourdomain.com/api/alerts
```

---

## Testing with cURL

### Create Alert

```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Alert",
    "keywords": ["test"],
    "sources": ["linkedin"]
  }'
```

### Get Events

```bash
curl http://localhost:3000/api/events \
  -H "Authorization: Bearer your-token"
```

### Run Cron Job

```bash
curl -X POST http://localhost:3000/api/cron \
  -H "Authorization: Bearer your-cron-secret" \
  -H "Content-Type: application/json" \
  -d '{"action": "process-alerts"}'
```

---

## SDK Usage

### TypeScript/JavaScript

```typescript
import { apiClient } from "@/lib/api-client";

// Create alert
const alert = await apiClient.alerts.create({
  name: "My Alert",
  keywords: ["js", "react"],
  sources: ["linkedin"]
});

// Get events
const events = await apiClient.events.list({ limit: 10 });

// Update subscription
await apiClient.subscriptions.upgrade("price_pro");
```

---

## Support

For API issues:
- Check error codes in [Error Responses](#error-responses)
- Review authentication in [Authentication](#authentication)
- Test with provided cURL examples
- Check server logs for detailed errors
