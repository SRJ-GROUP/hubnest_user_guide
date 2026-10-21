---
title: Platform Administrators & Delegated Tenant Access Guide
description: Step-by-step user guide for root super administrators to manage platform admin accounts, assign roles, and handle delegated tenant support access in HubCRM.
---

# Platform Administrators & Delegated Tenant Access Guide

Operating an enterprise cloud application requires a small, highly trusted team of system operators, technical support engineers, and billing specialists. The **Platform Administrators Center** (`/super-admin/admins`) is where root Super Admins manage global staff accounts and oversee delegated support access.

---

## 🛡️ Super Admin vs. Tenant Admin: Key Differences

| Attribute | Platform Super Admin (Root) | Tenant Company Admin |
| :--- | :--- | :--- |
| **System Scope** | Entire multi-tenant cloud platform. | Single company organization only. |
| **Can Access** | All tenants, global billing, API keys, server health, telecom gateways. | Company users, pipelines, deals, customer contacts, company settings. |
| **Login URL** | `/super-admin/*` | `/admin/*` |

---

## ➕ How to Add a New Platform Administrator

1. Navigate to **Super Admin ➔ Admins** and click **+ Add Administrator**.
2. Enter their corporate email address and name.
3. Select their **Global Administrative Role**:
   * **Root Super Admin:** Unrestricted access to all tenants, billing, server telemetry, and API key management.
   * **Technical Support Specialist:** Can view tenant configurations and assist customers, but cannot edit global billing or delete organizations.
   * **Platform Billing Auditor:** Read-only access to global financial reports, MRR stats, and tax summaries.
4. **Enforce Two-Factor Authentication (MFA):** All platform administrators are strictly required to verify an OTP via hardware key or SMS on every login.
5. Click **Create Administrator**.

---

## 🤝 Delegated Tenant Support Mode ("Log In as Tenant")

When an enterprise customer calls technical support asking: *"Our sales pipeline isn't advancing; can your support team inspect our settings?"*:

1. In the **Tenant Directory**, locate the customer's organization.
2. Click **Request Delegated Support Access**:
   * The customer's primary admin receives a prompt to approve temporary 1-hour support access.
3. Once approved, the support engineer can enter the tenant workspace in **Delegated Mode**.
4. **Security & Privacy Safeguards:**
   * A prominent yellow banner appears at the top: `⚠️ Delegated Support Session Active — Session Auto-Expires in 55 Mins`.
   * Every single click and view during the session is recorded in the immutable audit log with the support engineer's identity stamped on every action.
