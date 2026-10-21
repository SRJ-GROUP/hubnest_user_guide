---
title: Global Subscription Plans, Pricing & SaaS Revenue Guide
description: Step-by-step user guide for platform super administrators to design software pricing tiers, configure feature entitlements, and monitor global SaaS revenue in HubCRM.
---

# Global Subscription Plans, Pricing & SaaS Revenue Guide

Running HubCRM as a software-as-a-service business requires flexible pricing tiers, automated recurring subscription billing, and clear revenue metrics. The **Global Subscription Plans Center** (`/super-admin/billing`) lets Super Admins create plans, configure feature access, and monitor platform-wide Monthly Recurring Revenue (MRR).

---

## 💳 The 3 Standard Platform Tiers

HubCRM comes pre-configured with three scalable pricing tiers designed for different business stages:

| Plan Tier | Target Customer | Included Features & Entitlements | Pricing Model |
| :--- | :--- | :--- | :--- |
| **Starter Tier** | Small teams (1–10 Users) | Core Leads, Visual Deal Kanban Pipeline, Contacts & Accounts, Basic Reporting. | Flat base fee or per-user monthly. |
| **Professional Tier** | Growing businesses (10–50 Users) | Everything in Starter + WhatsApp Business Bridge, Multi-Pipeline Control, GST/VAT Invoicing, and Customer Support Desk. | Per-user monthly / annual. |
| **Enterprise Tier** | Large corporations (50+ Users) | Everything in Professional + AI Copywriting Studio, Salesforce Migration Engine, Developer API Keys (`hn_live_*`), and Dedicated Account Support. | Annual volume contract with custom seats. |

---

## ➕ Creating or Customizing a Plan

1. Navigate to **Super Admin ➔ Global Plans** and click **+ Add New Plan**.
2. **Plan Name & Description:** e.g., *"Enterprise Growth Plan"*.
3. **Set Commercial Pricing:**
   * **Monthly Price Per Seat:** e.g., *₹1,200 / user / month* (or *$18*).
   * **Annual Price Per Seat:** e.g., *₹960 / user / month* (giving clients a 20% incentive to commit annually).
4. **Feature Toggles (Entitlements):**  
   Check the features unlocked for this tier:
   * [x] Omnichannel VoIP Calling & WhatsApp
   * [x] Multi-Currency Invoicing
   * [x] AI Content Studio & Telemetry
   * [x] Salesforce Migration Engine
5. Click **Publish Plan**. New tenants can now select this tier during self-service onboarding or renewal!

---

## 📈 Tracking Platform-Wide SaaS Revenue

At the top of the Billing screen, live financial gauges track your platform's economic health:

* **Monthly Recurring Revenue (MRR):** The predictable recurring revenue earned every single month across all active paying tenant organizations.
* **Annual Recurring Revenue (ARR):** `MRR x 12` — your annual revenue benchmark.
* **Average Revenue Per Account (ARPU):** Average monthly spend per client organization.
* **Gross Churn Rate:** Percentage of accounts canceling or failing to renew (aim to keep this under 2%).
