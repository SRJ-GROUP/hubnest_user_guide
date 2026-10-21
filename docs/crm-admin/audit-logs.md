---
title: Security Audit Logs & Login Monitoring Guide
description: Step-by-step user guide for company administrators to review immutable audit logs, track employee logins, detect data export leaks, and maintain compliance in HubCRM.
---

# Security Audit Logs & Login Monitoring Guide

Protecting your company's customer relationships, pricing contracts, and confidential financial records requires absolute accountability. If an employee exports 5,000 leads to Excel before resigning, or if an unauthorized login attempt occurs from an unfamiliar foreign IP address, administrators need immediate visibility.

HubCRM's **Immutable Audit Log System** (`/admin/audit-logs`) records every significant action across your workspace in a tamper-proof security ledger.

---

## 🔒 What Events Are Automatically Logged?

HubCRM captures four critical categories of user activity automatically:

```mermaid
graph TD
    Audit["🔒 Immutable Security Audit Ledger"]
    
    Audit --> E1["1. Authentication & Logins<br/>Login Success, Failed Password, MFA Verified,<br/>IP Address, Device & Geolocation"]
    Audit --> E2["2. Data Exports & Downloads<br/>Who exported Leads or Contacts to Excel,<br/>Exact Timestamp & Total Record Count"]
    Audit --> E3["3. Security & Permission Changes<br/>Who elevated a user's role, modified RBAC scopes,<br/>or created an API token"]
    Audit --> E4["4. Record Deletions<br/>Who deleted or archived a high-value deal,<br/>account, or commercial contract"]
```

---

## 🔍 How to Investigate Suspicious Activity

When you open `/admin/audit-logs`, you are greeted by an intuitive, filterable activity stream:

| Timestamp | User | Action Category | Details | IP Address & Location |
| :--- | :--- | :--- | :--- | :--- |
| **Oct 16, 11:42 AM** | Rohit Verma | `EXPORT_LEADS` | Exported 450 Leads to Excel (`leads_oct.xlsx`) | `49.36.12.82` (Mumbai, India) |
| **Oct 16, 09:15 AM** | Sneha Sen | `LOGIN_SUCCESS`| Logged in via Keycloak SSO | `103.21.54.10` (Delhi, India) |
| **Oct 15, 08:30 PM** | Unknown User | `LOGIN_FAILED` | 3 Failed Password Attempts for `admin@corp.com` | `185.220.101.4` (Tor Exit Node) ⚠️ |

### Investigation Tools:
* **Filter by User:** Type an employee's name to see every single action they performed during their shift.
* **Filter by Action Type:** Filter by **Data Exports** to ensure client lists are only being downloaded by authorized managers.
* **Filter by Failed Logins:** Spot brute-force password guessing attempts and lock affected user accounts with 1 click.

---

## 🛡️ Exporting Audit Logs for Compliance (ISO / SOC2)

When preparing for annual IT security reviews or data privacy audits:

1. Select the required reporting period (e.g., *Last 90 Days* or *Annual Year*).
2. Click **Export Audit Trail (CSV / PDF)**.
3. The exported file contains cryptographic hash stamps verifying that no logs have been edited or deleted.
