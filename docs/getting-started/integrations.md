---
title: Integrations and Configuration
description: How to configure API keys, webhook endpoints, payment gateways, and third-party integrations in HubNest.
---

# Integrations & Configuration

HubNest connects seamlessly with external services—including WhatsApp Business API, payment processors, transactional email servers, and custom developer applications.

---

## 1. API Configuration & Developer Access

Developers can access HubNest Platform APIs to synchronize customer data, automate lead creation, or trigger meeting links programmatically.

### Obtaining API Credentials
1. Log in to the **Platform Admin Console** (`admin.srjhubnest.com`).
2. Navigate to **Developer Settings** ➔ **API Keys**.
3. Click **Generate New API Key**.
4. Assign a label (e.g., `Production Website Integration`) and select granted scopes (`crm.read`, `crm.write`, `meeting.create`).
5. Copy the generated Bearer Token.

```bash
# Example Authenticated Request
curl -X GET "https://api.srjhubnest.com/platform/me/roles" \
     -H "Authorization: Bearer <YOUR_API_KEY>" \
     -H "Content-Type: application/json"
```

!!! warning "Store Secrets Safely"
    Your API token grants programmatic access to your company's tenant. Never commit API keys to public repositories or expose them in client-side JavaScript bundles.

---

## 2. Webhook Setup & Real-Time Events

Webhooks deliver real-time notifications to your custom servers whenever critical business events occur.

### Supported Event Types
* `meeting.started` / `meeting.ended`: Triggered when a HubMeet call begins or concludes.
* `recording.completed`: Fires when LiveKit finishes processing a meeting recording in S3.
* `deal.won`: Dispatched when a sales deal moves to "Won" in HubCRM.
* `payment.success`: Fires when a customer completes checkout in HubNest Pay.

### Registering a Webhook Endpoint
1. Go to **Admin Console** ➔ **Integrations** ➔ **Webhooks**.
2. Click **Add Webhook**.
3. Enter your server's public HTTPS URL (e.g., `https://your-server.com/api/hubnest-events`).
4. Select the event topics you wish to subscribe to.
5. Copy the **Signing Secret** provided.
6. Verify incoming payloads using HMAC-SHA256 signatures (`x-hubnest-signature`).

---

## 3. WhatsApp & Notification Integrations

Connect the **Notification Gateway** to communicate directly with leads and employees:

1. Open **HubNotification** from the sidebar.
2. Go to **Channels** ➔ **WhatsApp Business API**:
   * Enter your Meta Business Account ID and Phone Number ID.
   * Paste your Permanent System User Access Token.
3. Click **Verify Connection**.
4. Pre-approved WhatsApp message templates automatically sync into your HubNest dashboard.

---

## 4. Payment Gateway Configuration

Configure automated checkout and invoice payment processing:

1. Go to **Platform Admin** ➔ **Settings** ➔ **Payment Gateways**.
2. Select your provider:
   * **Razorpay**: Enter `Key ID` and `Key Secret`. Set webhook secret in your Razorpay dashboard pointing to `https://api.srjhubnest.com/platform/billing/razorpay/webhook`.
   * **PhonePe**: Enter `Merchant ID`, `Salt Key`, and `Salt Index`.
   * **Offline / Bank Wire**: Enter your company's Bank Name, Account Number, IFSC Code, and instructions for manual wire verification.
3. Click **Save Gateway Configuration**.
